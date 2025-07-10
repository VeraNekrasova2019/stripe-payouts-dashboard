import Stripe from 'stripe';
import type { 
  Payout, 
  Balance, 
  PayoutsListResponse, 
  PayoutsFilters,
  CreatePayoutRequest 
} from './types.js';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export class StripeService {
  /**
   * Get account balance
   */
  async getBalance(): Promise<Balance> {
    try {
      const balance = await stripe.balance.retrieve();
      
      // Calculate total available balance (sum of all available balances)
      const totalAvailable = balance.available.reduce((sum, bal) => {
        if (bal.currency === 'usd') {
          return sum + bal.amount;
        }
        return sum;
      }, 0);

      // Calculate total pending (sum of all pending balances)
      const totalPending = balance.pending.reduce((sum, bal) => {
        if (bal.currency === 'usd') {
          return sum + bal.amount;
        }
        return sum;
      }, 0);

      return {
        total: totalAvailable / 100, // Convert from cents to dollars
        currency: 'USD',
        pending: totalPending / 100, // Convert from cents to dollars
        expectedArrival: this.getNextBusinessDay(),
        available: balance.available,
        connect_reserved: balance.connect_reserved,
        livemode: balance.livemode,
        pending_payouts: balance.pending
      };
    } catch (error) {
      console.error('Error fetching balance:', error);
      throw new Error('Failed to fetch balance');
    }
  }

  /**
   * List payouts with optional filters
   */
  async listPayouts(filters: PayoutsFilters = {}): Promise<PayoutsListResponse> {
    try {
      const params: Stripe.PayoutListParams = {
        limit: filters.limit || 100,
        ...(filters.status && { status: filters.status }),
        ...(filters.arrival_date && { arrival_date: filters.arrival_date }),
        ...(filters.created && { created: filters.created }),
        ...(filters.starting_after && { starting_after: filters.starting_after }),
        ...(filters.ending_before && { ending_before: filters.ending_before })
      };

      const stripePayouts = await stripe.payouts.list(params);

      const payouts: Payout[] = stripePayouts.data.map(payout => ({
        id: payout.id,
        date: new Date(payout.created * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        status: payout.status as Payout['status'],
        destination: this.formatDestination(payout.destination as string),
        amount: payout.amount / 100, // Convert from cents to dollars
        currency: payout.currency.toUpperCase(),
        arrival_date: payout.arrival_date,
        description: payout.description || undefined,
        failure_code: payout.failure_code || undefined,
        failure_message: payout.failure_message || undefined,
        method: payout.method,
        source_type: payout.source_type,
        statement_descriptor: payout.statement_descriptor || undefined,
        type: payout.type
      }));

      return {
        payouts,
        has_more: stripePayouts.has_more,
        total_count: stripePayouts.data.length
      };
    } catch (error) {
      console.error('Error fetching payouts:', error);
      throw new Error('Failed to fetch payouts');
    }
  }

  /**
   * Create a new payout
   */
  async createPayout(payoutData: CreatePayoutRequest): Promise<Payout> {
    try {
      const payout = await stripe.payouts.create({
        amount: Math.round(payoutData.amount * 100), // Convert to cents
        currency: payoutData.currency.toLowerCase(),
        method: payoutData.method || 'standard',
        description: payoutData.description,
        statement_descriptor: payoutData.statement_descriptor
      });

      return {
        id: payout.id,
        date: new Date(payout.created * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        status: payout.status as Payout['status'],
        destination: this.formatDestination(payout.destination as string),
        amount: payout.amount / 100,
        currency: payout.currency.toUpperCase(),
        arrival_date: payout.arrival_date,
        description: payout.description || undefined,
        failure_code: payout.failure_code || undefined,
        failure_message: payout.failure_message || undefined,
        method: payout.method,
        source_type: payout.source_type,
        statement_descriptor: payout.statement_descriptor || undefined,
        type: payout.type
      };
    } catch (error) {
      console.error('Error creating payout:', error);
      throw new Error('Failed to create payout');
    }
  }

  /**
   * Get a specific payout by ID
   */
  async getPayout(payoutId: string): Promise<Payout> {
    try {
      const payout = await stripe.payouts.retrieve(payoutId);

      return {
        id: payout.id,
        date: new Date(payout.created * 1000).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
        }),
        status: payout.status as Payout['status'],
        destination: this.formatDestination(payout.destination as string),
        amount: payout.amount / 100,
        currency: payout.currency.toUpperCase(),
        arrival_date: payout.arrival_date,
        description: payout.description || undefined,
        failure_code: payout.failure_code || undefined,
        failure_message: payout.failure_message || undefined,
        method: payout.method,
        source_type: payout.source_type,
        statement_descriptor: payout.statement_descriptor || undefined,
        type: payout.type
      };
    } catch (error) {
      console.error('Error fetching payout:', error);
      throw new Error('Failed to fetch payout');
    }
  }

  /**
   * Format destination for display (mask account details)
   */
  private formatDestination(destination: string): string {
    // If it's a bank account ID, format it as "Bank ••••1234"
    if (destination.startsWith('ba_')) {
      return `Bank ••••${destination.slice(-4)}`;
    }
    // If it's a card ID, format it as "Card ••••1234"
    if (destination.startsWith('card_')) {
      return `Card ••••${destination.slice(-4)}`;
    }
    // Fallback for other types
    return `Account ••••${destination.slice(-4)}`;
  }

  /**
   * Get next business day for expected arrival
   */
  private getNextBusinessDay(): string {
    const today = new Date();
    let nextBusinessDay = new Date(today);
    nextBusinessDay.setDate(today.getDate() + 1);

    // Skip weekends
    while (nextBusinessDay.getDay() === 0 || nextBusinessDay.getDay() === 6) {
      nextBusinessDay.setDate(nextBusinessDay.getDate() + 1);
    }

    return nextBusinessDay.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric'
    });
  }
}
