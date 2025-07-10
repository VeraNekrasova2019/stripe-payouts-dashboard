// Types for the Stripe Payouts API responses
export interface Payout {
  id: string;
  date: string;
  status: 'paid' | 'pending' | 'failed' | 'in_transit' | 'canceled';
  destination: string;
  amount: number;
  currency: string;
  arrival_date?: number;
  description?: string;
  failure_code?: string;
  failure_message?: string;
  method: 'standard' | 'instant';
  source_type: 'card' | 'bank_account';
  statement_descriptor?: string;
  type: 'bank_account' | 'card';
}

export interface Balance {
  total: number;
  currency: string;
  pending: number;
  expectedArrival: string;
  available: {
    amount: number;
    currency: string;
  }[];
  connect_reserved?: {
    amount: number;
    currency: string;
  }[];
  livemode: boolean;
  pending_payouts: {
    amount: number;
    currency: string;
  }[];
}

export interface PayoutsListResponse {
  payouts: Payout[];
  has_more: boolean;
  total_count: number;
}

export interface PayoutsFilters {
  status?: 'paid' | 'pending' | 'failed' | 'in_transit' | 'canceled';
  arrival_date?: {
    gte?: number;
    lte?: number;
  };
  created?: {
    gte?: number;
    lte?: number;
  };
  destination?: string;
  limit?: number;
  starting_after?: string;
  ending_before?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface CreatePayoutRequest {
  amount: number;
  currency: string;
  method?: 'standard' | 'instant';
  description?: string;
  statement_descriptor?: string;
}
