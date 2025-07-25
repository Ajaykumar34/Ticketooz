interface EventSeatPricing {
  seat_category_id: string | null;
  base_price: number;
  convenience_fee?: number;
  commission?: number;
}

export const createSeatPricingHelpers = (eventPricing: EventSeatPricing[]) => {
  const getSeatPrice = (seat: any) => {
    console.log('[SeatPricing] Getting price for seat:', seat?.seat_number, 'category:', seat?.seat_category_id);
    
    // Get event-specific pricing
    const eventSpecificPricing = eventPricing.find(p => p.seat_category_id === seat?.seat_category_id);
    if (eventSpecificPricing && eventSpecificPricing.base_price) {
      console.log('[SeatPricing] Using event-specific price:', eventSpecificPricing.base_price);
      return eventSpecificPricing.base_price;
    }
    
    // General event pricing
    const generalEventPricing = eventPricing.find(p => p.seat_category_id === null);
    if (generalEventPricing && generalEventPricing.base_price) {
      console.log('[SeatPricing] Using general event price:', generalEventPricing.base_price);
      return generalEventPricing.base_price;
    }
    
    // Fallback to venue seat category base price
    const category = seat?.seat_categories;
    const fallbackPrice = category?.base_price || 500;
    console.log('[SeatPricing] Using fallback price:', fallbackPrice);
    return fallbackPrice;
  };

  const getSeatConvenienceFee = (seat: any) => {
    // Get convenience fee from event pricing
    const eventSpecificPricing = eventPricing.find(p => p.seat_category_id === seat?.seat_category_id);
    if (eventSpecificPricing && eventSpecificPricing.convenience_fee !== undefined) {
      return eventSpecificPricing.convenience_fee;
    }
    
    // Check general event pricing
    const generalEventPricing = eventPricing.find(p => p.seat_category_id === null);
    if (generalEventPricing && generalEventPricing.convenience_fee !== undefined) {
      return generalEventPricing.convenience_fee;
    }
    
    // Default convenience fee
    return 50;
  };

  const getSeatTotalPrice = (seat: any) => {
    const basePrice = getSeatPrice(seat);
    const convenienceFee = getSeatConvenienceFee(seat);
    return basePrice + convenienceFee;
  };

  return { getSeatPrice, getSeatConvenienceFee, getSeatTotalPrice };
};