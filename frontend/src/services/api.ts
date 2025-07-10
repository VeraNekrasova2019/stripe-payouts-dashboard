import type { Balance, Payout } from '../types';

export interface PayoutsResponse {
  payouts: Payout[];
  has_more: boolean;
  total_count: number;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PayoutsFilters {
  status?: string;
  limit?: number;
  starting_after?: string;
  ending_before?: string;
}

export interface CreatePayoutRequest {
  amount: number;
  currency: string;
  method?: 'standard' | 'instant';
  description?: string;
  statement_descriptor?: string;
}

class APIService {
  private baseURL: string;

  constructor(baseURL = 'http://localhost:3002') {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<APIResponse<T>> {
    try {
      const response = await fetch(`${this.baseURL}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  /**
   * Get account balance
   */
  async getBalance(): Promise<Balance> {
    const response = await this.request<Balance>('/balance');
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch balance');
    }
    return response.data;
  }

  /**
   * List payouts with optional filters
   */
  async listPayouts(filters: PayoutsFilters = {}): Promise<PayoutsResponse> {
    const queryParams = new URLSearchParams();
    
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.limit) queryParams.append('limit', filters.limit.toString());
    if (filters.starting_after) queryParams.append('starting_after', filters.starting_after);
    if (filters.ending_before) queryParams.append('ending_before', filters.ending_before);

    const queryString = queryParams.toString();
    const endpoint = `/payouts${queryString ? `?${queryString}` : ''}`;
    
    const response = await this.request<PayoutsResponse>(endpoint);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch payouts');
    }
    return response.data;
  }

  /**
   * Create a new payout
   */
  async createPayout(payoutData: CreatePayoutRequest): Promise<Payout> {
    const response = await this.request<Payout>('/payouts', {
      method: 'POST',
      body: JSON.stringify(payoutData),
    });
    
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to create payout');
    }
    return response.data;
  }

  /**
   * Get a specific payout by ID
   */
  async getPayout(payoutId: string): Promise<Payout> {
    const response = await this.request<Payout>(`/payouts/${payoutId}`);
    if (!response.success || !response.data) {
      throw new Error(response.error || 'Failed to fetch payout');
    }
    return response.data;
  }
}

// Export a singleton instance
export const apiService = new APIService();

// For testing with different base URLs
export { APIService };
