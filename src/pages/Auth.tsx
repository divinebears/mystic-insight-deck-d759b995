import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { lovable } from '@/integrations/lovable';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'signup' | 'reset'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === 'reset') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success('Check your email for the reset link');
        setMode('login');
      } else if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { data: { username }, emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast.success('Check your email to confirm your account');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate('/');
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: 'google' | 'apple') => {
    setLoading(true);
    try {
      const result = await lovable.auth.signInWithOAuth(provider, {
        redirect_uri: window.location.origin,
      });
      if (result && 'error' in result && result.error) {
        toast.error(String(result.error));
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'linear-gradient(180deg, hsl(260,35%,12%), hsl(240,20%,6%))' }}>
      <Card className="w-full max-w-md border-border/50 bg-card/80 backdrop-blur">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary glow-text font-['Cinzel']">The Lenormand Chronicles</CardTitle>
          <CardDescription className="text-muted-foreground">
            {mode === 'login' ? 'Sign in to continue your journey' : mode === 'signup' ? 'Create your investigator account' : 'Reset your password'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div><Label htmlFor="username">Username</Label><Input id="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Diviner" required /></div>
            )}
            <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="diviner@example.com" required /></div>
            {mode !== 'reset' && (
              <div><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required minLength={6} /></div>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
            </Button>
          </form>

          {mode !== 'reset' && (
            <>
              <div className="relative my-4"><div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-2 text-muted-foreground">Or</span></div></div>
              <div className="space-y-2">
                <Button variant="outline" className="w-full" onClick={() => handleOAuth('google')} disabled={loading}>Sign in with Google</Button>
                <Button variant="outline" className="w-full" onClick={() => handleOAuth('apple')} disabled={loading}>Sign in with Apple</Button>
              </div>
            </>
          )}

          <div className="mt-4 text-center text-sm text-muted-foreground space-y-1">
            {mode === 'login' && (<><button className="text-primary hover:underline" onClick={() => setMode('signup')}>Create an account</button><span className="mx-2">·</span><button className="text-primary hover:underline" onClick={() => setMode('reset')}>Forgot password?</button></>)}
            {mode !== 'login' && (<button className="text-primary hover:underline" onClick={() => setMode('login')}>Back to sign in</button>)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
