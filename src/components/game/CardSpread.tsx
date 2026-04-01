import { CARD_BACK, type LenormandCard } from '@/data/deck';

interface CardSpreadProps {
  cards: LenormandCard[];
  phase: 'shuffling' | 'revealed';
  showMeanings: boolean;
  cardMeanings?: string[];
  layout?: 'line' | 'box';
}

export default function CardSpread({ cards, phase, showMeanings, cardMeanings, layout = 'line' }: CardSpreadProps) {
  if (phase === 'shuffling') {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="relative w-32 h-44">
          {cards.map((card, i) => (
            <div
              key={card.id}
              className="absolute w-24 h-36 md:w-28 md:h-40 card-shadow rounded-lg overflow-hidden shuffle-stack"
              style={{
                animationDelay: `${i * 0.1}s`,
                zIndex: cards.length - i,
              }}
            >
              <img src={CARD_BACK} alt="Card back" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const isBox = layout === 'box';

  return (
    <div className={isBox ? 'grid grid-cols-3 gap-3 max-w-md mx-auto' : 'flex justify-center gap-3 flex-wrap'}>
      {cards.map((card, i) => (
        <div key={card.id} className="text-center" style={{ animationDelay: `${i * 0.15}s` }}>
          <div className="card-container flipped w-20 h-28 md:w-24 md:h-34 mx-auto">
            <div className="card-inner">
              <div className="card-face card-back"><img src={CARD_BACK} alt="Back" /></div>
              <div className="card-face card-front">
                <img src={card.image} alt={card.name} />
                <div className="card-label"><span>{card.name}</span></div>
              </div>
            </div>
          </div>
          {showMeanings && cardMeanings?.[i] && (
            <p className="text-xs text-accent-foreground mt-1 fade-in">{cardMeanings[i]}</p>
          )}
        </div>
      ))}
    </div>
  );
}
