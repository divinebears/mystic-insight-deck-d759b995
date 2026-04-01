import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CHAPTERS } from '@/data/chapters';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function Campaign() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState<any[]>([]);

  useEffect(() => {
    if (!loading && !user) navigate('/auth');
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from('game_progress').select('*').eq('user_id', user.id).then(({ data }) => {
      if (data) setProgress(data);
    });
  }, [user]);

  if (loading || !user) return <div className="min-h-screen flex items-center justify-center"><p className="text-primary glow-text font-['Cinzel']">Loading...</p></div>;

  const completedIds = progress.filter(p => p.completed).map(p => p.chapter_id);

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'linear-gradient(180deg, hsl(260,35%,12%), hsl(240,20%,6%))' }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl text-primary glow-text font-['Cinzel']">Story Campaign</h1>
          <Button variant="outline" size="sm" onClick={() => navigate('/menu')}>← Menu</Button>
        </div>

        <div className="space-y-3">
          {CHAPTERS.map((ch, i) => {
            const isCompleted = completedIds.includes(ch.id);
            const isUnlocked = i === 0 || completedIds.includes(CHAPTERS[i - 1].id);
            const prog = progress.find(p => p.chapter_id === ch.id);
            return (
              <button
                key={ch.id}
                disabled={!isUnlocked}
                onClick={() => isUnlocked && navigate(`/play/${ch.id}`)}
                className={`w-full text-left p-4 rounded-lg border transition-all ${isUnlocked ? 'border-primary/30 bg-card/60 hover:border-primary/60 hover:shadow-lg cursor-pointer' : 'border-border/20 bg-card/20 opacity-50 cursor-not-allowed'}`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-primary font-['Cinzel']">Ch. {ch.id}: {ch.title}</h3>
                    <p className="text-muted-foreground text-sm mt-1">{ch.subtitle}</p>
                    {prog && !isCompleted && <p className="text-xs text-muted-foreground mt-1">Scene {prog.scene_index + 1}/{ch.scenes.length} · Score: {prog.score}</p>}
                  </div>
                  <div className="font-['Cinzel'] text-sm">
                    {isCompleted ? <span className="text-primary">{ch.badgeEmoji} Complete</span> : isUnlocked ? <span className="text-primary/50">▸ Play</span> : <span className="text-muted-foreground/30">🔒</span>}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
