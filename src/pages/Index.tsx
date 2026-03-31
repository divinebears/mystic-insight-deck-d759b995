import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { CHAPTERS } from '@/data/chapters';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export default function Index() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [progress, setProgress] = useState<any[]>([]);
  const [badges, setBadges] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;
    supabase.from('game_progress').select('*').eq('user_id', user.id).then(({ data }) => {
      if (data) {
        setProgress(data);
        const earned = data.filter(p => p.completed).flatMap(p => {
          const ch = CHAPTERS.find(c => c.id === p.chapter_id);
          return ch ? [`${ch.badgeEmoji} ${ch.badge}`] : [];
        });
        setBadges(earned);
      }
    });
    // Update last_login
    supabase.from('profiles').update({ last_login: new Date().toISOString() }).eq('user_id', user.id);
  }, [user]);

  if (loading) return <div className="min-h-screen flex items-center justify-center"><p className="text-primary glow-text font-['Cinzel']">Loading...</p></div>;
  if (!user) { navigate('/auth'); return null; }

  const completedIds = progress.filter(p => p.completed).map(p => p.chapter_id);

  return (
    <div className="min-h-screen p-4 md:p-8" style={{ background: 'linear-gradient(180deg, hsl(260,35%,12%), hsl(240,20%,6%))' }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl text-primary glow-text font-['Cinzel'] mb-2">The Lenormand Chronicles</h1>
          <p className="text-muted-foreground italic">A story-driven mystical adventure</p>
          <div className="mt-4 flex justify-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate('/reader')}>Reader Mode</Button>
            <Button variant="outline" size="sm" onClick={signOut}>Sign Out</Button>
          </div>
        </div>

        {badges.length > 0 && (
          <div className="mb-6 p-4 rounded-lg border border-border/50 bg-card/40 text-center">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-['Cinzel']">Earned Badges</p>
            <div className="flex flex-wrap justify-center gap-2">
              {badges.map(b => <span key={b} className="px-3 py-1 rounded-full border border-primary/30 text-primary text-sm">{b}</span>)}
            </div>
          </div>
        )}

        <h2 className="text-primary font-['Cinzel'] text-lg mb-4">Story Campaign</h2>
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
                    {prog && !isCompleted && <p className="text-xs text-muted-foreground mt-1">Scene {prog.scene_index + 1}/10 · Score: {prog.score}</p>}
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
