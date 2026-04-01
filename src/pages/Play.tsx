import { useAuth } from '@/contexts/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import { CHAPTERS, type Interpretation, type SceneQuestion } from '@/data/chapters';
import { DECK, CARD_BACK, getCardByName } from '@/data/deck';
import { Button } from '@/components/ui/button';
import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAnalytics } from '@/hooks/useAnalytics';
import { toast } from 'sonner';

type Phase = 'narrative' | 'shuffling' | 'revealed' | 'choose' | 'result' | 'final' | 'complete';

export default function Play() {
  const { id } = useParams<{ id: string }>();
  const chapterId = Number(id);
  const chapter = CHAPTERS.find(c => c.id === chapterId);
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { track } = useAnalytics();

  const [sceneIndex, setSceneIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>('narrative');
  const [selectedAnswer, setSelectedAnswer] = useState<Interpretation | null>(null);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [hintVisible, setHintVisible] = useState(false);
  const [notes, setNotes] = useState<string[]>([]);
  const [noteInput, setNoteInput] = useState('');
  const [showNotes, setShowNotes] = useState(false);
  const [finalAttempts, setFinalAttempts] = useState(0);
  const [lastAttemptDate, setLastAttemptDate] = useState<string | null>(null);
  const [progressId, setProgressId] = useState<string | null>(null);
  const [usedCards, setUsedCards] = useState<number[]>([]);
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
          setNotes(Array.isArray(data.notes) ? (data.notes as string[]) : []);
          setUsedCards(Array.isArray(data.used_cards) ? (data.used_cards as number[]) : []);
          if (data.completed) {
            setPhase('complete');
          }
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
      used_cards: usedCards as any,
      ...overrides,
      updated_at: new Date().toISOString(),
    };

    if (progressId) {
      await supabase.from('game_progress').update(payload).eq('id', progressId);
    } else {
      const { data } = await supabase.from('game_progress').insert(payload).select('id').maybeSingle();
      if (data) setProgressId(data.id);
    }
  }, [user, chapterId, sceneIndex, score, hintsLeft, finalAttempts, lastAttemptDate, notes, usedCards, progressId, chapter]);

  // Debounced auto-save on state changes
  useEffect(() => {
    if (!user || !chapter || phase === 'complete') return;
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => saveProgress(), 2000);
    return () => { if (saveTimeout.current) clearTimeout(saveTimeout.current); };
  }, [sceneIndex, score, hintsLeft, notes, usedCards, saveProgress, user, chapter, phase]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><p className="text-primary glow-text font-['Cinzel']">Loading...</p></div>;
  if (!chapter) return <div className="min-h-screen flex items-center justify-center"><p className="text-destructive font-['Cinzel']">Chapter not found</p><Button className="ml-4" onClick={() => navigate('/campaign')}>Back</Button></div>;

  const scene = chapter.scenes[sceneIndex];
  const question: SceneQuestion | undefined = scene?.questions?.[questionIndex];
  const totalScenes = chapter.scenes.length;

  // Get cards for current question — always same cards per question
  const questionCards = question ? question.cardNames.map(name => getCardByName(name)).filter(Boolean) : [];

  // Shuffle animation
  const startShuffle = () => {
    setPhase('shuffling');
    setTimeout(() => setPhase('revealed'), 1800);
  };

  // Choose interpretation
  const handleChoice = (interp: Interpretation) => {
    setSelectedAnswer(interp);
    setScore(prev => prev + interp.points);
    setPhase('result');
    track('answer_chosen', { chapter: chapterId, scene: sceneIndex, question: questionIndex, quality: interp.quality, points: interp.points });
  };

  // Use hint
  const useHint = () => {
    if (hintsLeft <= 0) return;
    setHintsLeft(prev => prev - 1);
    setHintVisible(true);
    track('hint_used', { chapter: chapterId, scene: sceneIndex, question: questionIndex, hintsRemaining: hintsLeft - 1 });
  };

  // Next question or next scene
  const handleNext = () => {
    setSelectedAnswer(null);
    setHintVisible(false);

    if (question && questionIndex < scene.questions.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setPhase('narrative');
    } else if (sceneIndex < totalScenes - 1) {
      const nextScene = sceneIndex + 1;
      setSceneIndex(nextScene);
      setQuestionIndex(0);
      setPhase('narrative');

      // Check if next scene is final
      if (chapter.scenes[nextScene]?.isFinal) {
        const today = new Date().toISOString().slice(0, 10);
        if (lastAttemptDate === today && finalAttempts >= 3) {
          toast.error('You have used all 3 attempts today for the final scene. Come back tomorrow!');
          setPhase('narrative');
        }
      }
    } else {
      // Chapter complete
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
        saveProgress({ final_attempts: newAttempts, last_attempt_date: today });
      } else {
        toast.info(`${3 - newAttempts} attempt(s) remaining today.`);
        saveProgress({ final_attempts: newAttempts, last_attempt_date: today });
      }
    }
  };

  // Add note
  const addNote = () => {
    if (!noteInput.trim()) return;
    const newNotes = [...notes, noteInput.trim()];
    setNotes(newNotes);
    setNoteInput('');
    track('note_added', { chapter: chapterId, scene: sceneIndex });
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
            <Button onClick={() => navigate('/campaign')}>Return to Campaign</Button>
          </div>
        )}

        {/* Phase: Narrative */}
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
              <Button onClick={startShuffle} className="w-full font-['Cinzel']">
                Consult the Cards
              </Button>
            )}
          </div>
        )}

        {/* Phase: Shuffling */}
        {phase === 'shuffling' && (
          <div className="flex justify-center items-center gap-4 py-12">
            {questionCards.map((card, i) => (
              <div key={card!.id} className={`w-24 h-36 md:w-28 md:h-40 card-shadow rounded-lg overflow-hidden ${i % 2 === 0 ? 'shuffle-left' : 'shuffle-right'}`}>
                <img src={CARD_BACK} alt="Card back" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Phase: Revealed */}
        {phase === 'revealed' && question && (
          <div className="space-y-4 fade-in">
            <div className="flex justify-center gap-4">
              {questionCards.map((card, i) => (
                <div key={card!.id} className="card-container flipped w-24 h-36 md:w-28 md:h-40">
                  <div className="card-inner">
                    <div className="card-face card-back"><img src={CARD_BACK} alt="Back" /></div>
                    <div className="card-face card-front"><img src={card!.image} alt={card!.name} /></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                {questionCards.map((c, i) => `${c!.name} (${question.cardMeanings[i]})`).join(' · ')}
              </p>
            </div>
            <div className="p-3 rounded-lg border border-primary/30 bg-card/60 text-center">
              <p className="text-primary font-['Cinzel'] text-sm">{question.question}</p>
            </div>
            <Button onClick={() => setPhase('choose')} className="w-full font-['Cinzel']">Choose Your Interpretation</Button>
          </div>
        )}

        {/* Phase: Choose */}
        {phase === 'choose' && question && (
          <div className="space-y-3 fade-in">
            <div className="flex justify-center gap-3 mb-2">
              {questionCards.map((card) => (
                <div key={card!.id} className="w-16 h-24 rounded overflow-hidden card-shadow">
                  <img src={card!.image} alt={card!.name} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <p className="text-primary font-['Cinzel'] text-sm text-center">{question.question}</p>

            {hintVisible && (
              <div className="p-2 rounded border border-primary/20 bg-card/40 text-xs text-muted-foreground text-center fade-in">
                💡 Look for the interpretation that connects all card meanings together.
              </div>
            )}

            {question.interpretations.map((interp, i) => (
              <button
                key={i}
                onClick={() => handleChoice(interp)}
                className="w-full text-left p-3 rounded-lg border border-border/50 bg-card/40 hover:border-primary/60 transition-all text-foreground text-sm"
              >
                {interp.text}
              </button>
            ))}

            {hintsLeft > 0 && !hintVisible && (
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={useHint}>
                💡 Use Hint ({hintsLeft} left)
              </Button>
            )}
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
              {questionIndex < (scene?.questions?.length || 1) - 1 ? 'Next Clue' : sceneIndex < totalScenes - 1 ? 'Next Scene' : 'Finish Chapter'}
            </Button>
          </div>
        )}

        {/* Notes Journal */}
        {phase !== 'complete' && (
          <div className="mt-6">
            <Button variant="ghost" size="sm" className="text-muted-foreground text-xs" onClick={() => setShowNotes(!showNotes)}>
              📓 Notes ({notes.length})
            </Button>
            {showNotes && (
              <div className="mt-2 p-3 rounded-lg border border-border/50 bg-card/40 space-y-2 fade-in">
                {notes.map((n, i) => <p key={i} className="text-xs text-foreground">• {n}</p>)}
                <div className="flex gap-2">
                  <input
                    value={noteInput}
                    onChange={e => setNoteInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && addNote()}
                    placeholder="Add a note..."
                    className="flex-1 bg-background/50 border border-border rounded px-2 py-1 text-xs text-foreground"
                  />
                  <Button size="sm" variant="outline" onClick={addNote}>Add</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
