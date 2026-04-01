import { Button } from '@/components/ui/button';
import { useState } from 'react';

export interface AnswerRecord {
  sceneIndex: number;
  sceneTitle: string;
  question: string;
  cardNames: string[];
  chosenAnswer: string;
  quality: 'correct' | 'partial' | 'wrong';
  points: number;
}

interface ScoreRecordProps {
  records: AnswerRecord[];
  totalScore: number;
}

export default function ScoreRecord({ records, totalScore }: ScoreRecordProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4">
      <Button variant="ghost" size="sm" className="text-muted-foreground text-xs" onClick={() => setOpen(!open)}>
        📊 Score Record ({records.length} answers · {totalScore} pts)
      </Button>
      {open && (
        <div className="mt-2 p-3 rounded-lg border border-border/50 bg-card/40 space-y-3 fade-in max-h-64 overflow-y-auto">
          {records.length === 0 && <p className="text-xs text-muted-foreground">No answers yet.</p>}
          {records.map((r, i) => (
            <div key={i} className={`p-2 rounded border text-xs ${
              r.quality === 'correct' ? 'border-green-500/30 bg-green-950/20' :
              r.quality === 'partial' ? 'border-yellow-500/30 bg-yellow-950/20' :
              'border-red-500/30 bg-red-950/20'
            }`}>
              <p className="text-primary font-['Cinzel'] text-xs">{r.sceneTitle}</p>
              <p className="text-foreground">{r.question}</p>
              <p className="text-muted-foreground">Cards: {r.cardNames.join(', ')}</p>
              <p className="text-foreground">Answer: {r.chosenAnswer}</p>
              <p className={r.quality === 'correct' ? 'text-green-400' : r.quality === 'partial' ? 'text-yellow-400' : 'text-red-400'}>
                {r.quality === 'correct' ? '✨ Accurate' : r.quality === 'partial' ? '🔶 Partial' : '❌ Wrong'} · +{r.points} pts
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
