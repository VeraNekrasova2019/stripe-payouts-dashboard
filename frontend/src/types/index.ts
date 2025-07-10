export interface Payout {
  id: string;
  date: string;
  status: 'paid' | 'pending' | 'failed';
  destination: string;
  amount: number;
  currency: string;
}

export interface Balance {
  total: number;
  currency: string;
  pending: number;
  expectedArrival: string;
}

export interface Filter {
  id: string;
  label: string;
  value: string;
  type: 'status' | 'amount' | 'method' | 'date';
  active: boolean;
}
