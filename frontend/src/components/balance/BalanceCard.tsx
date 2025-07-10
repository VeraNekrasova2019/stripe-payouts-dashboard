import type { Balance } from '../../types';
import { Button } from '../ui/Button';

interface BalanceCardProps {
  balance: Balance;
  onPayout: () => void;
  onSeeDetails: () => void;
}

export function BalanceCard({ balance, onPayout, onSeeDetails }: BalanceCardProps) {
  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  return (
    <div className="bg-white p-2">
      {/* Top Row - Balance and Buttons */}
      <div className="flex items-center gap-4 mb-4">
        {/* Balance Section */}
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <span style={{ 
              fontFamily: 'SF Pro', 
              fontWeight: 590, 
              fontSize: '16px', 
              lineHeight: '24px',
              color: '#898989' 
            }}>
              Total balance
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span style={{
              fontFamily: 'SF Pro',
              fontWeight: 700,
              fontSize: '24px',
              lineHeight: '32px',
              letterSpacing: '1.5%',
              color: '#444444'
            }}>
              {formatCurrency(balance.total, balance.currency)}
            </span>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="flex items-center gap-2">
          <Button variant="primary" size="sm" onClick={onPayout}>
            Pay out
          </Button>
          <Button variant="secondary" size="sm" onClick={onSeeDetails}>
            See details
          </Button>
        </div>
      </div>

      {/* Bottom Row - Pending Payout Info */}
      <div className="flex gap-10">
        {/* Left: Pending Amount */}
        <div className="flex flex-col">
          <span style={{
            fontFamily: 'SF Pro',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: '#898989'
          }}>
            On the way to your bank
          </span>
          <div className="flex items-baseline gap-1">
            <span style={{
              fontFamily: 'SF Pro',
              fontWeight: 590,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#444444'
            }}>
              {formatCurrency(balance.pending, balance.currency)}
            </span>
          </div>
        </div>

        {/* Right: Expected Arrival */}
        <div className="flex justify-between items-center flex-1">
          <div className="flex flex-col">
            <span style={{
              fontFamily: 'SF Pro',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: '20px',
              color: '#898989'
            }}>
              Expected to arrive
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span style={{
              fontFamily: 'SF Pro',
              fontWeight: 590,
              fontSize: '16px',
              lineHeight: '24px',
              color: '#444444'
            }}>
              {balance.expectedArrival}
            </span>
            <button 
              style={{
                fontFamily: 'SF Pro',
                fontWeight: 590,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#0085FF'
              }}
              className="hover:underline"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
