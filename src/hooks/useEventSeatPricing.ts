
import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useEventSeatPricing = (eventId: string) => {
  const [pricing, setPricing] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  useEffect(() => {
    const fetchEventPricing = async () => {
      if (!eventId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Check if new columns exist
        const { data: testData, error: testError } = await supabase
          .from('event_seat_pricing')
          .select('convenience_fee_type')
          .limit(1);

        let selectQuery = `
          *,
          seat_categories (
            id,
            name,
            color,
            base_price
          )
        `;

        // Fetch existing pricing data with seat categories
        const { data, error: pricingError } = await supabase
          .from('event_seat_pricing')
          .select(selectQuery)
          .eq('event_id', eventId)
          .eq('is_active', true);

        if (pricingError) {
          console.error('[useEventSeatPricing] Error fetching pricing:', pricingError);
          throw pricingError;
        }

        console.log('[useEventSeatPricing] Pricing data:', data);
        setPricing(data || []);

      } catch (err: any) {
        console.error('[useEventSeatPricing] Error:', err);
        setError(err.message || 'Failed to load event pricing');
        setPricing([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEventPricing();
  }, [eventId, refreshTrigger]);

  const refetch = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return { pricing, loading, error, refetch };
};
