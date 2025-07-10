import { StripeService } from './stripe';
import type { APIResponse, PayoutsFilters, CreatePayoutRequest } from './types';

// Simplified types for development without AWS Lambda dependencies
interface APIGatewayProxyEvent {
  httpMethod: string;
  path: string;
  queryStringParameters?: Record<string, string> | null;
  body?: string | null;
  headers?: Record<string, string>;
}

interface APIGatewayProxyResult {
  statusCode: number;
  headers?: Record<string, string>;
  body: string;
}

const stripeService = new StripeService();

// Mock data for development/testing
const mockBalance = {
  total: 12738.45,
  currency: 'USD',
  pending: 800.00,
  expectedArrival: 'April 5',
  available: [{ amount: 1273845, currency: 'usd' }],
  livemode: false,
  pending_payouts: [{ amount: 80000, currency: 'usd' }]
};

const mockPayouts = [
  {
    id: '1',
    date: 'Apr 6, 2022',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 10.50,
    currency: 'USD',
    arrival_date: 1649203200,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  },
  {
    id: '2',
    date: 'Aug 30, 2022',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 60.50,
    currency: 'USD',
    arrival_date: 1661817600,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  },
  {
    id: '3',
    date: 'Feb 1, 2023',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 57.43,
    currency: 'USD',
    arrival_date: 1675209600,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  },
  {
    id: '4',
    date: 'Aug 10, 2022',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 33.91,
    currency: 'USD',
    arrival_date: 1660089600,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  },
  {
    id: '5',
    date: 'Jun 23, 2022',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 9.50,
    currency: 'USD',
    arrival_date: 1655942400,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  },
  {
    id: '6',
    date: 'May 1, 2022',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 510.39,
    currency: 'USD',
    arrival_date: 1651363200,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  },
  {
    id: '7',
    date: 'Dec 27, 2022',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 49.50,
    currency: 'USD',
    arrival_date: 1672099200,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  },
  {
    id: '8',
    date: 'Mar 29, 2023',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 21.50,
    currency: 'USD',
    arrival_date: 1680048000,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  },
  {
    id: '9',
    date: 'Jun 21, 2022',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 60.50,
    currency: 'USD',
    arrival_date: 1655769600,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  },
  {
    id: '10',
    date: 'Sep 19, 2022',
    status: 'paid' as const,
    destination: 'Bank ••••1234',
    amount: 12.34,
    currency: 'USD',
    arrival_date: 1663545600,
    method: 'standard' as const,
    source_type: 'card' as const,
    type: 'bank_account' as const
  }
];

/**
 * Helper function to create API response
 */
function createResponse<T>(
  statusCode: number,
  body: APIResponse<T>,
  headers: Record<string, string> = {}
): APIGatewayProxyResult {
  return {
    statusCode,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type,Authorization',
      'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
      ...headers
    },
    body: JSON.stringify(body)
  };
}

/**
 * Parse query parameters for filtering
 */
function parseFilters(queryParams: Record<string, string> | null): PayoutsFilters {
  if (!queryParams) return {};

  const filters: PayoutsFilters = {};

  if (queryParams.status) {
    filters.status = queryParams.status as any;
  }

  if (queryParams.limit) {
    filters.limit = parseInt(queryParams.limit, 10);
  }

  if (queryParams.starting_after) {
    filters.starting_after = queryParams.starting_after;
  }

  if (queryParams.ending_before) {
    filters.ending_before = queryParams.ending_before;
  }

  return filters;
}

/**
 * Main Lambda handler
 */
export const handler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { httpMethod, path, queryStringParameters, body } = event;

    // Handle CORS preflight
    if (httpMethod === 'OPTIONS') {
      return createResponse(200, { success: true });
    }

    // Route based on path and method
    switch (true) {
      // GET /balance - Get account balance
      case httpMethod === 'GET' && path === '/balance':
        try {
          // Use mock data for now - replace with actual Stripe call when ready
          // const balance = await stripeService.getBalance();
          return createResponse(200, {
            success: true,
            data: mockBalance
          });
        } catch (error) {
          return createResponse(500, {
            success: false,
            error: 'Failed to fetch balance'
          });
        }

      // GET /payouts - List payouts
      case httpMethod === 'GET' && path === '/payouts':
        try {
          const filters = parseFilters(queryStringParameters || null);
          
          // Use mock data for now - replace with actual Stripe call when ready
          // const payoutsResponse = await stripeService.listPayouts(filters);
          
          // Apply basic filtering to mock data
          let filteredPayouts = [...mockPayouts];
          
          if (filters.status) {
            filteredPayouts = filteredPayouts.filter(p => p.status === filters.status);
          }
          
          const limit = filters.limit || 10;
          const startIndex = filters.starting_after 
            ? filteredPayouts.findIndex(p => p.id === filters.starting_after) + 1
            : 0;
          
          const paginatedPayouts = filteredPayouts.slice(startIndex, startIndex + limit);
          
          return createResponse(200, {
            success: true,
            data: {
              payouts: paginatedPayouts,
              has_more: startIndex + limit < filteredPayouts.length,
              total_count: filteredPayouts.length
            }
          });
        } catch (error) {
          return createResponse(500, {
            success: false,
            error: 'Failed to fetch payouts'
          });
        }

      // POST /payouts - Create new payout
      case httpMethod === 'POST' && path === '/payouts':
        try {
          if (!body) {
            return createResponse(400, {
              success: false,
              error: 'Request body is required'
            });
          }

          const payoutData: CreatePayoutRequest = JSON.parse(body);
          
          // Validate required fields
          if (!payoutData.amount || !payoutData.currency) {
            return createResponse(400, {
              success: false,
              error: 'Amount and currency are required'
            });
          }

          // Use mock response for now - replace with actual Stripe call when ready
          // const payout = await stripeService.createPayout(payoutData);
          
          const mockPayout = {
            id: `po_mock_${Date.now()}`,
            date: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            }),
            status: 'pending' as const,
            destination: 'Bank ••••1234',
            amount: payoutData.amount,
            currency: payoutData.currency.toUpperCase(),
            arrival_date: Math.floor(Date.now() / 1000) + (2 * 24 * 60 * 60), // 2 days from now
            method: payoutData.method || 'standard' as const,
            source_type: 'card' as const,
            type: 'bank_account' as const,
            description: payoutData.description
          };

          return createResponse(201, {
            success: true,
            data: mockPayout,
            message: 'Payout created successfully'
          });
        } catch (error) {
          return createResponse(500, {
            success: false,
            error: 'Failed to create payout'
          });
        }

      // GET /payouts/{id} - Get specific payout
      case httpMethod === 'GET' && path.startsWith('/payouts/'):
        try {
          const payoutId = path.split('/')[2];
          
          if (!payoutId) {
            return createResponse(400, {
              success: false,
              error: 'Payout ID is required'
            });
          }

          // Use mock data for now - replace with actual Stripe call when ready
          // const payout = await stripeService.getPayout(payoutId);
          
          const payout = mockPayouts.find(p => p.id === payoutId);
          
          if (!payout) {
            return createResponse(404, {
              success: false,
              error: 'Payout not found'
            });
          }

          return createResponse(200, {
            success: true,
            data: payout
          });
        } catch (error) {
          return createResponse(500, {
            success: false,
            error: 'Failed to fetch payout'
          });
        }

      // Handle unknown routes
      default:
        return createResponse(404, {
          success: false,
          error: 'Route not found'
        });
    }
  } catch (error) {
    console.error('Lambda handler error:', error);
    return createResponse(500, {
      success: false,
      error: 'Internal server error'
    });
  }
};
