import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export function useAnalytics() {
  const { user } = useAuth();
  const sessionId = typeof window !== 'undefined' ? sessionStorage.getItem('analytics_session') || (() => {
    const id = crypto.randomUUID();
    sessionStorage.setItem('analytics_session', id);
    return id;
  })() : '';

  const track = useCallback(async (eventType: string, eventData: Record<string, unknown> = {}) => {
    if (!user) return;
    try {
      await supabase.from('analytics_events').insert({
        user_id: user.id,
        event_type: eventType,
        event_data: eventData as any,
        session_id: sessionId,
      });
    } catch (e) {
      console.error('Analytics tracking error:', e);
    }
  }, [user, sessionId]);

  return { track };
}
