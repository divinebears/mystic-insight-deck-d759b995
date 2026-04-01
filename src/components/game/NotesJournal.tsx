import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface NotesJournalProps {
  notes: { sceneIndex: number; sceneTitle: string; text: string }[];
  currentSceneTitle: string;
  currentSceneIndex: number;
  onAddNote: (note: { sceneIndex: number; sceneTitle: string; text: string }) => void;
}

export default function NotesJournal({ notes, currentSceneTitle, currentSceneIndex, onAddNote }: NotesJournalProps) {
  const [open, setOpen] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [filterScene, setFilterScene] = useState<number | 'all'>('all');

  const addNote = () => {
    if (!noteInput.trim()) return;
    onAddNote({ sceneIndex: currentSceneIndex, sceneTitle: currentSceneTitle, text: noteInput.trim() });
    setNoteInput('');
  };

  const filtered = filterScene === 'all' ? notes : notes.filter(n => n.sceneIndex === filterScene);
  const sceneIndices = [...new Set(notes.map(n => n.sceneIndex))];

  return (
    <div className="mt-4">
      <Button variant="ghost" size="sm" className="text-muted-foreground text-xs" onClick={() => setOpen(!open)}>
        📓 Notes ({notes.length})
      </Button>
      {open && (
        <div className="mt-2 p-3 rounded-lg border border-border/50 bg-card/40 space-y-2 fade-in">
          {sceneIndices.length > 1 && (
            <div className="flex gap-1 flex-wrap">
              <button onClick={() => setFilterScene('all')} className={`text-xs px-2 py-0.5 rounded ${filterScene === 'all' ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground'}`}>All</button>
              {sceneIndices.map(si => (
                <button key={si} onClick={() => setFilterScene(si)} className={`text-xs px-2 py-0.5 rounded ${filterScene === si ? 'bg-primary text-primary-foreground' : 'bg-card text-muted-foreground'}`}>
                  Scene {si + 1}
                </button>
              ))}
            </div>
          )}
          {filtered.map((n, i) => (
            <div key={i} className="text-xs text-foreground">
              <span className="text-primary font-['Cinzel']">Scene {n.sceneIndex + 1}:</span> {n.text}
            </div>
          ))}
          <div className="flex gap-2">
            <input
              value={noteInput}
              onChange={e => setNoteInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addNote()}
              placeholder={`Add note for "${currentSceneTitle}"...`}
              className="flex-1 bg-background/50 border border-border rounded px-2 py-1 text-xs text-foreground"
            />
            <Button size="sm" variant="outline" onClick={addNote}>Add</Button>
          </div>
        </div>
      )}
    </div>
  );
}
