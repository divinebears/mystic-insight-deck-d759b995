import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DECK, drawCards, type LenormandCard } from '@/data/deck';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';
import CardSpread from '@/components/game/CardSpread';

type SpreadType = '3-line' | '5-line' | '9-box';
type Phase = 'select' | 'shuffling' | 'revealed' | 'interpret' | 'result';

// Generate a whole-spread interpretation question
function generateSpreadInterpretation(cards: LenormandCard[], allCards: LenormandCard[]) {
  const cardNames = cards.map(c => c.name);
  const keywords = cards.map(c => c.keywords[0]);
  const narratives = cards.map(c => c.narrative);

  const correctText = `The combination of ${cardNames.join(', ')} suggests: ${narratives.join(' ')} Together they indicate ${keywords.join(', ')}.`;

  // Wrong interpretations — pick random other cards
  const others = allCards.filter(c => !cards.find(cc => cc.id === c.id));
  const shuffled = [...others].sort(() => Math.random() - 0.5);
  const wrong1Cards = shuffled.slice(0, cards.length);
  const wrong1Text = `This spread reveals: ${wrong1Cards.map(c => c.narrative).join(' ')} The theme is ${wrong1Cards.map(c => c.keywords[0]).join(', ')}.`;
  const wrong2Cards = shuffled.slice(cards.length, cards.length * 2);
  const wrong2Text = `The cards indicate: ${wrong2Cards.map(c => c.narrative).join(' ')} The message centers on ${wrong2Cards.map(c => c.keywords[0]).join(', ')}.`;

  const question = `What is the combined meaning of this ${cardNames.length}-card spread?`;

  const options = [
    { text: correctText, isCorrect: true },
    { text: wrong1Text, isCorrect: false },
    { text: wrong2Text, isCorrect: false },
  ].sort(() => Math.random() - 0.5);

  return { question, options };
}

export default function ReaderMode() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { track } = useAnalytics();

  const [spreadType, setSpreadType] = useState<SpreadType | null>(null);
  const [phase, setPhase] = useState<Phase>('select');
  const [cards, setCards] = useState<LenormandCard[]>([]);
  const [interpretation, setInterpretation] = useState<{ question: string; options: { text: string; isCorrect: boolean }[] } | null>(null);
  const [chosenResult, setChosenResult] = useState<boolean | null>(null);
  const [hintsLeft, setHintsLeft] = useState(3);
  const [hintVisible, setHintVisible] = useState(false);

  const startSpread = (type: SpreadType) => {
    const count = type === '3-line' ? 3 : type === '5-line' ? 5 : 9;
    setSpreadType(type);
    setPhase('shuffling');
    setChosenResult(null);
    setHintVisible(false);
    const drawn = drawCards(count);
    setCards(drawn);
    const interp = generateSpreadInterpretation(drawn, DECK);
    setInterpretation(interp);
    track('reader_spread', { type, cardCount: count });
    setTimeout(() => setPhase('revealed'), 2000);
  };

  const useHint = () => {
    if (hintsLeft <= 0) return;
    setHintsLeft(prev => prev - 1);
    setHintVisible(true);
  };

  const chooseInterpretation = (isCorrect: boolean) => {
    setChosenResult(isCorrect);
    setPhase('result');
  };

  const resetSpread = () => {
    setPhase('select');
    setSpreadType(null);
    setCards([]);
    setInterpretation(null);
    setChosenResult(null);
    setHintVisible(false);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-primary glow-text font-['Cinzel']">Loading...</p></div>;
  if (!user) { navigate('/auth'); return null; }

  const cardMeanings = cards.map(c => `${c.keywords.join(', ')}`);
  const layout = spreadType === '9-box' ? 'box' : 'line';

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'linear-gradient(180deg, hsl(260,35%,12%), hsl(240,20%,6%))' }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-primary glow-text font-['Cinzel']">Reader Mode</h1>
          <div className="flex items-center gap-3">
            {phase !== 'select' && <span className="text-xs text-muted-foreground">Hints: {hintsLeft}</span>}
            <Button variant="outline" size="sm" onClick={() => navigate('/menu')}>← Menu</Button>
          </div>
        </div>

        {/* Select Spread */}
        {phase === 'select' && (
          <div className="space-y-4 text-center fade-in">
            <p className="text-muted-foreground italic">Choose your spread:</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button onClick={() => startSpread('3-line')} className="p-6 rounded-lg border border-primary/30 bg-card/60 hover:border-primary/60 transition-all">
                <p className="text-primary font-['Cinzel'] text-lg">3-Card Line</p>
                <p className="text-muted-foreground text-sm mt-1">Past · Present · Future</p>
                <div className="flex justify-center gap-2 mt-3">
                  {[1,2,3].map(i => <div key={i} className="w-8 h-12 rounded border border-primary/20 bg-card/30" />)}
                </div>
              </button>
              <button onClick={() => startSpread('5-line')} className="p-6 rounded-lg border border-primary/30 bg-card/60 hover:border-primary/60 transition-all">
                <p className="text-primary font-['Cinzel'] text-lg">5-Card Line</p>
                <p className="text-muted-foreground text-sm mt-1">Deeper exploration</p>
                <div className="flex justify-center gap-1 mt-3">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-7 h-10 rounded border border-primary/20 bg-card/30" />)}
                </div>
              </button>
              <button onClick={() => startSpread('9-box')} className="p-6 rounded-lg border border-primary/30 bg-card/60 hover:border-primary/60 transition-all">
                <p className="text-primary font-['Cinzel'] text-lg">9-Card Box</p>
                <p className="text-muted-foreground text-sm mt-1">3×3 Grand Tableau</p>
                <div className="grid grid-cols-3 gap-1 mt-3 justify-items-center">
                  {[1,2,3,4,5,6,7,8,9].map(i => <div key={i} className="w-6 h-8 rounded border border-primary/20 bg-card/30" />)}
                </div>
              </button>
            </div>
          </div>
        )}

        {/* Shuffling */}
        {phase === 'shuffling' && (
          <div className="space-y-4">
            <p className="text-center text-muted-foreground italic text-sm">The cards are being drawn...</p>
            <CardSpread cards={cards} phase="shuffling" showMeanings={false} layout={layout as any} />
          </div>
        )}

        {/* Revealed + Interpret */}
        {(phase === 'revealed' || phase === 'interpret') && interpretation && (
          <div className="space-y-6 fade-in">
            <CardSpread
              cards={cards}
              phase="revealed"
              showMeanings={hintVisible}
              cardMeanings={cardMeanings}
              layout={layout as any}
            />

            {/* Hint button */}
            {!hintVisible && hintsLeft > 0 && (
              <Button variant="ghost" size="sm" className="w-full text-muted-foreground" onClick={useHint}>
                💡 Use Hint to Reveal All Card Meanings ({hintsLeft} left)
              </Button>
            )}

            {/* Question + 3 interpretations */}
            <div className="p-4 rounded-lg border border-primary/30 bg-card/60 space-y-3">
              <p className="text-primary font-['Cinzel'] text-center">{interpretation.question}</p>
              {interpretation.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => chooseInterpretation(opt.isCorrect)}
                  className="w-full text-left p-3 rounded-lg border border-border/50 bg-card/40 hover:border-primary/60 transition-all text-foreground text-sm"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Result */}
        {phase === 'result' && (
          <div className="space-y-4 fade-in text-center">
            <CardSpread
              cards={cards}
              phase="revealed"
              showMeanings={true}
              cardMeanings={cardMeanings}
              layout={layout as any}
            />
            <div className={`p-4 rounded-lg border ${chosenResult ? 'border-green-500/50 bg-green-950/30' : 'border-red-500/50 bg-red-950/30'}`}>
              <p className="font-['Cinzel'] text-lg">{chosenResult ? '✨ Correct Interpretation!' : '❌ Incorrect'}</p>
              <p className="text-sm text-muted-foreground mt-2">
                The cards were: {cards.map(c => `${c.name} (${c.keywords.join(', ')})`).join(' · ')}
              </p>
            </div>
            <div className="flex justify-center gap-3">
              <Button onClick={resetSpread}>New Spread</Button>
              <Button variant="outline" onClick={() => navigate('/menu')}>Back to Menu</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
