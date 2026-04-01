import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { CHAPTERS, type Interpretation, type SceneQuestion } from '@/data/chapters';
import { getCardByName } from '@/data/deck';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';
import { toast } from 'sonner';
import CardSpread from '@/components/game/CardSpread';
import ScoreRecord, { type AnswerRecord } from '@/components/game/ScoreRecord';
import NotesJournal from '@/components/game/NotesJournal';

// Phases: narrative → pick question → shuffling → revealed → choose answer → result → next scene
type Phase = 'narrative' | 'pick-question' | 'shuffling' | 'revealed' | 'choose' | 'result' | 'final' | 'complete';

export default function Play() {
  const { id } = useParams<{ id: string }>();
  const chapterId = Number(id);
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { track } = useAnalytics();

  const [sceneIndex, setSceneIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>('narrative');
  const [selectedQuestion, setSelectedQuestion] = useState<SceneQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<Interpretation | null>(null);
  const [score, setScore] = useState(0);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [hintVisible, setHintVisible] = useState(false);
  const [notes, setNotes] = useState<{ sceneIndex: number; sceneTitle: string; text: string }[]>([]);
  const [answerRecords, setAnswerRecords] = useState<AnswerRecord[]>([]);
  const [finalAttempts, setFinalAttempts] = useState(0);
  const [lastAttemptDate, setLastAttemptDate] = useState<string | null>(null);
  const [progressId, setProgressId] = useState<string | null>(null);
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  // Load saved progress
  useEffect(() => {
    if (!user || !chapter) return;
    supabase.from('game_progress').select('*').eq('user_id', user.id).eq('chapter_id', chapterId).maybeSingle()
      .then(({ data }) => {
        if (data) {
          setProgressId(data.id);
          setSceneIndex(data.scene_index);
          setScore(data.score);
          setHintsLeft(data.hints_left);
          setFinalAttempts(data.final_attempts);
          setLastAttemptDate(data.last_attempt_date);
          setNotes(Array.isArray(data.notes) ? (data.notes as any[]) : []);
          const used = Array.isArray(data.used_cards) ? (data.used_cards as any[]) : [];
          if (used.length > 0 && typeof used[0] === 'object' && 'question' in used[0]) {
            setAnswerRecords(used as AnswerRecord[]);
          }
          if (data.completed) setPhase('complete');
        }
      });
  }, [user, chapterId, chapter]);

  // Auto-save
  const saveProgress = useCallback(async (overrides: Record<string, any> = {}) => {
    if (!user || !chapter) return;
    const payload = {
      user_id: user.id,
      chapter_id: chapterId,
      scene_index: sceneIndex,
      score,
      hints_left: hintsLeft,
      final_attempts: finalAttempts,
      last_attempt_date: lastAttemptDate,
      notes: notes as any,
      used_cards: answerRecords as any,
      ...overrides,
      updated_at: new Date().toISOString(),
    };

    if (progressId) {
      await supabase.from('game_progress').update(payload).eq('id', progressId);
    } else {
      const { data } = await supabase.from('game_progress').insert(payload).select('id').maybeSingle();
      if (data) setProgressId(data.id);
    }
  }, [user, chapterId, sceneIndex, score, hintsLeft, finalAttempts, lastAttemptDate, notes, answerRecords, progressId, chapter]);

  // Debounced auto-save
  useEffect(() => {
    if (!user || !chapter || phase === 'complete') return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => saveProgress(), 2000);
    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current); };
  }, [sceneIndex, score, hintsLeft, notes, answerRecords, saveProgress, user, chapter, phase]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><p className="text-primary glow-text font-['Cinzel']">Loading...</p></div>;
  if (!chapter) return <div className="min-h-screen flex items-center justify-center"><p className="text-destructive font-['Cinzel']">Chapter not found</p><Button className="ml-4" onClick={() => navigate('/campaign')}>Back</Button></div>;

  const scene = chapter.scenes[sceneIndex];
  const totalScenes = chapter.scenes.length;
  const questionCards = selectedQuestion ? selectedQuestion.cardNames.map(name => getCardByName(name)).filter(Boolean) : [];

  // Pick one of 3 questions for this scene
  const handlePickQuestion = (q: SceneQuestion) => {
    setSelectedQuestion(q);
    setHintVisible(false);
    setPhase('shuffling');
    // Auto-reveal after shuffle animation
    setTimeout(() => setPhase('revealed'), 2000);
  };

  // After revealed, go directly to choose
  const proceedToChoose = () => {
    setPhase('choose');
  };

  // Choose interpretation
  const handleChoice = (interp: Interpretation) => {
    setSelectedAnswer(interp);
    setScore(prev => prev + interp.points);
    const record: AnswerRecord = {
      sceneIndex,
      sceneTitle: scene?.title || '',
      question: selectedQuestion?.question || '',
      cardNames: selectedQuestion?.cardNames || [],
      chosenAnswer: interp.text,
      quality: interp.quality,
      points: interp.points,
    };
    setAnswerRecords(prev => [...prev, record]);
    setPhase('result');
    track('answer_chosen', { chapter: chapterId, scene: sceneIndex, quality: interp.quality, points: interp.points });
  };

  // Use hint — reveals all card meanings for current question
  const useHint = () => {
    if (hintsLeft <= 0) return;
    setHintsLeft(prev => prev - 1);
    setHintVisible(true);
    track('hint_used', { chapter: chapterId, scene: sceneIndex, hintsRemaining: hintsLeft - 1 });
  };

  // Next scene
  const handleNext = () => {
    setSelectedAnswer(null);
    setSelectedQuestion(null);
    setHintVisible(false);

    if (sceneIndex < totalScenes - 1) {
      const nextScene = sceneIndex + 1;
      setSceneIndex(nextScene);
      setPhase('narrative');

      if (chapter.scenes[nextScene]?.isFinal) {
        const today = new Date().toISOString().slice(0, 10);
        if (lastAttemptDate === today && finalAttempts >= 3) {
          toast.error('You have used all 3 attempts today for the final scene. Come back tomorrow!');
        }
      }
    } else {
      setPhase('complete');
      saveProgress({ completed: true, earned_badges: [chapter.badge] as any });
      track('chapter_completed', { chapter: chapterId, score });
    }
  };

  // Final scene attempt
  const handleFinalChoice = (option: { text: string; isCorrect: boolean; ending: string }) => {
    const today = new Date().toISOString().slice(0, 10);
    const newAttempts = lastAttemptDate === today ? finalAttempts + 1 : 1;
    setFinalAttempts(newAttempts);
    setLastAttemptDate(today);

    if (option.isCorrect) {
      setPhase('complete');
      saveProgress({ completed: true, earned_badges: [chapter.badge] as any, final_attempts: newAttempts, last_attempt_date: today });
      track('chapter_completed', { chapter: chapterId, score, finalAttempt: newAttempts });
      toast.success(option.ending);
    } else {
      toast.error(option.ending);
      if (newAttempts >= 3) {
        toast.error('No more attempts today. Come back tomorrow!');
      } else {
        toast.info(`${3 - newAttempts} attempt(s) remaining today.`);
      }
      saveProgress({ final_attempts: newAttempts, last_attempt_date: today });
    }
  };

  const bgStyle = scene?.backgroundImage ? { backgroundImage: `url(${scene.backgroundImage})` } : {};

  return (
    <div className="min-h-screen p-4 md:p-8 relative" style={{ background: 'linear-gradient(180deg, hsl(260,35%,12%), hsl(240,20%,6%))' }}>
      {scene?.backgroundImage && <div className="scene-bg" style={bgStyle} />}

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <Button variant="outline" size="sm" onClick={() => navigate('/campaign')}>← Campaign</Button>
          <div className="text-sm text-muted-foreground font-['Cinzel']">
            Scene {sceneIndex + 1}/{totalScenes} · Score: {score} · Hints: {hintsLeft}
          </div>
        </div>

        <h2 className="text-xl text-primary glow-text font-['Cinzel'] mb-2">{scene?.title || chapter.title}</h2>

        {/* Phase: Complete */}
        {phase === 'complete' && (
          <div className="text-center space-y-4 fade-in">
            <p className="text-2xl text-primary font-['Cinzel']">{chapter.badgeEmoji} Chapter Complete!</p>
            <p className="text-foreground">Final Score: {score}</p>
            <p className="text-primary">Badge Earned: {chapter.badge}</p>
            <ScoreRecord records={answerRecords} totalScore={score} />
            <Button onClick={() => navigate('/campaign')}>Return to Campaign</Button>
          </div>
        )}

        {/* Phase: Narrative — show story intro then 3 question choices */}
        {phase === 'narrative' && scene && (
          <div className="space-y-4 fade-in">
            <div className="p-4 rounded-lg border border-border/50 bg-card/60">
              <p className="text-foreground italic leading-relaxed">{scene.narrative}</p>
            </div>
            {scene.isFinal && scene.finalOptions ? (
              <div className="space-y-2">
                <p className="text-primary font-['Cinzel'] text-sm">Make your final deduction:</p>
                {(() => {
                  const today = new Date().toISOString().slice(0, 10);
                  const attemptsToday = lastAttemptDate === today ? finalAttempts : 0;
                  if (attemptsToday >= 3) {
                    return <p className="text-destructive text-sm">You've used all 3 attempts today. Return tomorrow.</p>;
                  }
                  return scene.finalOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleFinalChoice(opt)}
                      className="w-full text-left p-3 rounded-lg border border-border/50 bg-card/40 hover:border-primary/60 transition-all text-foreground"
                    >
                      {opt.text}
                    </button>
                  ));
                })()}
              </div>
            ) : (
              <div className="space-y-2">
                <p className="text-primary font-['Cinzel'] text-sm text-center">Choose a clue to investigate:</p>
                {scene.questions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handlePickQuestion(q)}
                    className="w-full text-left p-3 rounded-lg border border-border/50 bg-card/40 hover:border-primary/60 transition-all text-foreground text-sm"
                  >
                    🔍 {q.question}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Phase: Shuffling — auto-shuffle animation */}
        {phase === 'shuffling' && selectedQuestion && (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground italic text-sm">The cards are being consulted...</p>
            <CardSpread cards={questionCards.map(c => c!)} phase="shuffling" showMeanings={false} />
          </div>
        )}

        {/* Phase: Revealed — cards shown, meanings hidden unless hint used, proceed to answers */}
        {phase === 'revealed' && selectedQuestion && (
          <div className="space-y-4 fade-in">
            <CardSpread
              cards={questionCards.map(c => c!)}
              phase="revealed"
              showMeanings={hintVisible}
              cardMeanings={selectedQuestion.cardMeanings}
            />
            <div className="p-3 rounded-lg border border-primary/30 bg-card/60 text-center">
              <p className="text-primary font-['Cinzel'] text-sm">{selectedQuestion.question}</p>
            </div>
            {/* Hint button */}
            {!hintVisible && hintsLeft > 0 && (
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={useHint}>
                💡 Use Hint to Reveal Card Meanings ({hintsLeft} left)
              </Button>
            )}
            <Button onClick={proceedToChoose} className="w-full font-['Cinzel']">
              Choose Your Interpretation
            </Button>
          </div>
        )}

        {/* Phase: Choose — pick from 3 interpretations */}
        {phase === 'choose' && selectedQuestion && (
          <div className="space-y-3 fade-in">
            <CardSpread
              cards={questionCards.map(c => c!)}
              phase="revealed"
              showMeanings={hintVisible}
              cardMeanings={selectedQuestion.cardMeanings}
            />
            <p className="text-primary font-['Cinzel'] text-sm text-center">{selectedQuestion.question}</p>

            {!hintVisible && hintsLeft > 0 && (
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={useHint}>
                💡 Use Hint ({hintsLeft} left)
              </Button>
            )}

            {selectedQuestion.interpretations.map((interp, i) => (
              <button
                key={i}
                onClick={() => handleChoice(interp)}
                className="w-full text-left p-3 rounded-lg border border-border/50 bg-card/40 hover:border-primary/60 transition-all text-foreground text-sm"
              >
                {interp.text}
              </button>
            ))}
          </div>
        )}

        {/* Phase: Result */}
        {phase === 'result' && selectedAnswer && (
          <div className="space-y-4 fade-in">
            <div className={`p-4 rounded-lg border text-center ${
              selectedAnswer.quality === 'correct' ? 'border-green-500/50 bg-green-950/30' :
              selectedAnswer.quality === 'partial' ? 'border-yellow-500/50 bg-yellow-950/30' :
              'border-red-500/50 bg-red-950/30'
            }`}>
              <p className="font-['Cinzel'] text-lg">
                {selectedAnswer.quality === 'correct' ? '✨ Accurate!' : selectedAnswer.quality === 'partial' ? '🔶 Partially Accurate' : '❌ Not Accurate'}
              </p>
              <p className="text-sm text-foreground mt-1">{selectedAnswer.text}</p>
              <p className="text-xs text-muted-foreground mt-2">+{selectedAnswer.points} points</p>
              {selectedAnswer.explanation && <p className="text-xs text-muted-foreground mt-1 italic">{selectedAnswer.explanation}</p>}
            </div>
            <Button onClick={handleNext} className="w-full font-['Cinzel']">
              {sceneIndex < totalScenes - 1 ? 'Next Scene' : 'Finish Chapter'}
            </Button>
          </div>
        )}

        {/* Score Record & Notes */}
        {phase !== 'complete' && (
          <div className="space-y-2">
            <ScoreRecord records={answerRecords} totalScore={score} />
            <NotesJournal
              notes={notes}
              currentSceneTitle={scene?.title || ''}
              currentSceneIndex={sceneIndex}
              onAddNote={(note) => {
                setNotes(prev => [...prev, note]);
                track('note_added', { chapter: chapterId, scene: sceneIndex });
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
