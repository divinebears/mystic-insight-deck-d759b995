import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { CHAPTERS } from '@/data/chapters';

export default function Menu() {
  const { user, loading, signOut } = useAuth();
  const navigate = useNavigate();
  const [badges, setBadges] = useState<string[]>([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    // Fetch profile
    supabase.from('profiles').select('username').eq('user_id', user.id).maybeSingle().then(({ data }) => {
      if (data?.username) setUsername(data.username);
    });
    // Fetch badges
    supabase.from('game_progress').select('*').eq('user_id', user.id).then(({ data }) => {
      if (data) {
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
  if (!user) return null;

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(180deg, hsl(260,35%,12%), hsl(240,20%,6%))' }}>
      <div className="max-w-md w-full text-center space-y-6">
        <h1 className="text-3xl text-primary glow-text font-['Cinzel'] mb-2">The Lenormand Chronicles</h1>
        <p className="text-muted-foreground italic">Welcome back{username ? `, ${username}` : ''}</p>

        {badges.length > 0 && (
          <div className="p-4 rounded-lg border border-border/50 bg-card/40">
            <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2 font-['Cinzel']">Earned Badges</p>
            <div className="flex flex-wrap justify-center gap-2">
              {badges.map(b => <span key={b} className="px-3 py-1 rounded-full border border-primary/30 text-primary text-sm">{b}</span>)}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Button
            className="w-full h-14 text-lg font-['Cinzel'] glow-gold"
            onClick={() => navigate('/campaign')}
          >
            🗡️ Begin Journey — Story Campaign
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 text-lg font-['Cinzel']"
            onClick={() => navigate('/reader')}
          >
            🔮 Reader Mode — Card Spreads
          </Button>
        </div>

        <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={signOut}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
