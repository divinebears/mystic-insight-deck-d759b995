import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { DECK, CARD_BACK, drawCards, type LenormandCard } from '@/data/deck';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

type SpreadType = '3-line' | '5-line' | '9-box';
type Phase = 'select' | 'shuffling' | 'revealed' | 'interpret';

// Generate 3 meanings for a card: 1 correct, 2 wrong
function generateMeanings(card: LenormandCard, allCards: LenormandCard[]): { text: string; isCorrect: boolean }[] {
  const correct = { text: `${card.name}: ${card.keywords.join(', ')} — ${card.narrative}`, isCorrect: true };
  const others = allCards.filter(c => c.id !== card.id);
  const shuffled = [...others].sort(() => Math.random() - 0.5);
  const wrong1 = { text: `${card.name}: ${shuffled[0].keywords.join(', ')} — ${shuffled[0].narrative}`, isCorrect: false };
  const wrong2 = { text: `${card.name}: ${shuffled[1].keywords.join(', ')} — ${shuffled[1].narrative}`, isCorrect: false };
  return [correct, wrong1, wrong2].sort(() => Math.random() - 0.5);
}

export default function ReaderMode() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { track } = useAnalytics();

  const [spreadType, setSpreadType] = useState<SpreadType | null>(null);
  const [phase, setPhase] = useState<Phase>('select');
  const [cards, setCards] = useState<LenormandCard[]>([]);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);
  const [meanings, setMeanings] = useState<{ text: string; isCorrect: boolean }[]>([]);
  const [chosen, setChosen] = useState<{ [idx: number]: boolean | null }>({});

  const startSpread = (type: SpreadType) => {
    const count = type === '3-line' ? 3 : type === '5-line' ? 5 : 9;
    setSpreadType(type);
    setPhase('shuffling');
    setChosen({});
    setActiveCardIndex(null);
    const drawn = drawCards(count);
    setCards(drawn);
    track('reader_spread', { type, cardCount: count });
    setTimeout(() => setPhase('revealed'), 1800);
  };

  const interpretCard = (idx: number) => {
    if (chosen[idx] !== undefined) return;
    setActiveCardIndex(idx);
    setMeanings(generateMeanings(cards[idx], DECK));
    setPhase('interpret');
  };

  const chooseMeaning = (isCorrect: boolean) => {
    if (activeCardIndex === null) return;
    setChosen(prev => ({ ...prev, [activeCardIndex]: isCorrect }));
    setActiveCardIndex(null);
    setPhase('revealed');
  };

  const resetSpread = () => {
    setPhase('select');
    setSpreadType(null);
    setCards([]);
    setChosen({});
    setActiveCardIndex(null);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-primary glow-text font-['Cinzel']">Loading...</p></div>;
  if (!user) { navigate('/auth'); return null; }

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'linear-gradient(180deg, hsl(260,35%,12%), hsl(240,20%,6%))' }}>
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-primary glow-text font-['Cinzel']">Reader Mode</h1>
          <Button variant="outline" size="sm" onClick={() => navigate('/menu')}>← Menu</Button>
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
          <div className="flex justify-center items-center gap-3 py-16 flex-wrap">
            {cards.map((card, i) => (
              <div key={card.id} className={`w-20 h-28 md:w-24 md:h-34 card-shadow rounded-lg overflow-hidden ${i % 2 === 0 ? 'shuffle-left' : 'shuffle-right'}`}>
                <img src={CARD_BACK} alt="Card back" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        )}

        {/* Revealed */}
        {(phase === 'revealed' || phase === 'interpret') && (
          <div className="space-y-6 fade-in">
            {/* Cards Layout */}
            {spreadType === '9-box' ? (
              // 3x3 Grid
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                {cards.map((card, i) => (
                  <button
                    key={card.id}
                    onClick={() => interpretCard(i)}
                    className={`card-container flipped ${chosen[i] !== undefined ? 'opacity-60' : 'hover:scale-105'} transition-all`}
                    disabled={chosen[i] !== undefined}
                  >
                    <div className="w-full aspect-[2/3] relative">
                      <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded-lg card-shadow" />
                      <p className="text-xs text-primary font-['Cinzel'] text-center mt-1">{card.name}</p>
                      {chosen[i] !== undefined && (
                        <div className={`absolute inset-0 flex items-center justify-center rounded-lg ${chosen[i] ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
                          <span className="text-2xl">{chosen[i] ? '✓' : '✗'}</span>
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              // Horizontal Line
              <div className="flex justify-center gap-3 flex-wrap">
                {cards.map((card, i) => (
                  <button
                    key={card.id}
                    onClick={() => interpretCard(i)}
                    className={`${chosen[i] !== undefined ? 'opacity-60' : 'hover:scale-105'} transition-all`}
                    disabled={chosen[i] !== undefined}
                  >
                    <div className="w-24 h-36 md:w-28 md:h-40 relative">
                      <img src={card.image} alt={card.name} className="w-full h-full object-cover rounded-lg card-shadow" />
                      {chosen[i] !== undefined && (
                        <div className={`absolute inset-0 flex items-center justify-center rounded-lg ${chosen[i] ? 'bg-green-900/50' : 'bg-red-900/50'}`}>
                          <span className="text-2xl">{chosen[i] ? '✓' : '✗'}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-primary font-['Cinzel'] text-center mt-1">{card.name}</p>
                  </button>
                ))}
              </div>
            )}

            {/* Interpretation panel */}
            {phase === 'interpret' && activeCardIndex !== null && (
              <div className="p-4 rounded-lg border border-primary/30 bg-card/60 space-y-3 fade-in">
                <p className="text-primary font-['Cinzel'] text-center">What does {cards[activeCardIndex].name} mean?</p>
                {meanings.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => chooseMeaning(m.isCorrect)}
                    className="w-full text-left p-3 rounded-lg border border-border/50 bg-card/40 hover:border-primary/60 transition-all text-foreground text-sm"
                  >
                    {m.text}
                  </button>
                ))}
              </div>
            )}

            {/* All cards interpreted */}
            {Object.keys(chosen).length === cards.length && phase === 'revealed' && (
              <div className="text-center space-y-3 fade-in">
                <p className="text-primary font-['Cinzel']">Spread Complete!</p>
                <p className="text-muted-foreground text-sm">
                  {Object.values(chosen).filter(v => v).length}/{cards.length} correct interpretations
                </p>
                <div className="flex justify-center gap-3">
                  <Button onClick={resetSpread}>New Spread</Button>
                  <Button variant="outline" onClick={() => navigate('/menu')}>Back to Menu</Button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
