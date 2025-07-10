import { useState } from 'react';
import type { Payout } from '../../types';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Filter } from '../ui/Filter';

interface PayoutsTableProps {
  payouts: Payout[];
  currentPage: number;
  totalPages: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  onExport: () => void;
}

export function PayoutsTable({
  payouts,
  currentPage,
  totalPages,
  totalResults,
  onPageChange,
  onExport,
}: PayoutsTableProps) {
  const [filters, setFilters] = useState([
    { id: 'status', label: 'Status', value: 'Paid', isActive: true },
    { id: 'amount', label: 'Amount', value: 'More than X', isActive: false },
    { id: 'method', label: 'Method', value: 'More than X', isActive: false },
    { id: 'date', label: 'Date', value: 'More than X', isActive: false },
  ]);

  const handleRemoveFilter = (filterId: string) => {
    setFilters(filters.map(f => 
      f.id === filterId ? { ...f, isActive: false, value: 'More than X' } : f
    ));
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(amount);
  };

  return (
    <div className="bg-white p-2">
      {/* Actions Row */}
      <div className="flex justify-between items-center gap-3 mb-3">
        {/* Filters */}
        <div className="flex items-center gap-2">
          {filters.map((filter) => (
            <Filter
              key={filter.id}
              label={filter.label}
              value={filter.isActive ? filter.value : undefined}
              isActive={filter.isActive}
              onRemove={() => handleRemoveFilter(filter.id)}
            />
          ))}
        </div>

        {/* Export Button */}
        <div className="flex justify-end">
          <Button variant="secondary" size="sm" onClick={onExport}>
            Export
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="w-full">
        <div className="flex">
          {/* Date Column */}
          <div className="flex-1">
            <div 
              style={{
                fontFamily: 'SF Pro',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '20px',
                color: '#717171',
                borderBottom: '1px solid #E5E7EB',
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Date
            </div>
            {payouts.map((payout) => (
              <div
                key={payout.id}
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#444444',
                  borderBottom: '1px solid #E5E7EB',
                  padding: '12px 0',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {payout.date}
              </div>
            ))}
          </div>

          {/* Status Column */}
          <div className="flex-1">
            <div 
              style={{
                fontFamily: 'SF Pro',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '20px',
                color: '#717171',
                borderBottom: '1px solid #E5E7EB',
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Status
            </div>
            {payouts.map((payout) => (
              <div
                key={payout.id}
                style={{
                  borderBottom: '1px solid #E5E7EB',
                  padding: '12px 2px',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Badge variant="success">
                  Paid
                </Badge>
              </div>
            ))}
          </div>

          {/* Destination Column */}
          <div className="flex-1">
            <div 
              style={{
                fontFamily: 'SF Pro',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '20px',
                color: '#717171',
                borderBottom: '1px solid #E5E7EB',
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              Destination
            </div>
            {payouts.map((payout) => (
              <div
                key={payout.id}
                style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#444444',
                  borderBottom: '1px solid #E5E7EB',
                  padding: '12px 0',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                {payout.destination}
              </div>
            ))}
          </div>

          {/* Amount Column */}
          <div className="flex-1">
            <div 
              style={{
                fontFamily: 'SF Pro',
                fontWeight: 700,
                fontSize: '12px',
                lineHeight: '20px',
                color: '#717171',
                borderBottom: '1px solid #E5E7EB',
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                gap: '4px'
              }}
            >
              Amount
            </div>
            {payouts.map((payout) => (
              <div
                key={payout.id}
                style={{
                  borderBottom: '1px solid #E5E7EB',
                  padding: '12px 0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end'
                }}
              >
                <span style={{
                  fontFamily: 'SF Pro',
                  fontWeight: 590,
                  fontSize: '14px',
                  lineHeight: '20px',
                  color: '#444444'
                }}>
                  {formatCurrency(payout.amount, payout.currency)}
                </span>
                <span style={{
                  fontFamily: 'SF Pro Text',
                  fontWeight: 400,
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '-1.07%',
                  color: '#717171',
                  width: '35px',
                  textAlign: 'right',
                  marginLeft: '4px'
                }}>
                  {payout.currency}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-4 mt-3">
        <span style={{
          fontFamily: 'SF Pro',
          fontWeight: 400,
          fontSize: '14px',
          lineHeight: '20px',
          color: '#444444'
        }}>
          Viewing 1–{Math.min(currentPage * 10, totalResults)} of {totalResults} results
        </span>

        <div className="flex items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            style={{
              opacity: currentPage === 1 ? 0.5 : 1
            }}
          >
            Previous
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
