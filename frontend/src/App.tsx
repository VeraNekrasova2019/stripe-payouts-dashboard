import { useState, useEffect } from 'react';
import { BalanceCard } from './components/balance/BalanceCard';
import { PayoutsTable } from './components/payouts/PayoutsTable';
import { apiService } from './services/api';
import type { Balance, Payout } from './types';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [balance, setBalance] = useState<Balance | null>(null);
  const [payouts, setPayouts] = useState<Payout[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const payoutsPerPage = 10;
  const totalPages = Math.ceil(totalResults / payoutsPerPage);

  // Load initial data
  useEffect(() => {
    loadData();
  }, [currentPage]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load balance and payouts in parallel from API
      const [balanceData, payoutsData] = await Promise.all([
        apiService.getBalance(),
        apiService.listPayouts({
          limit: payoutsPerPage,
          starting_after: currentPage > 1 ? `page_${currentPage}` : undefined
        })
      ]);

      setBalance(balanceData);
      setPayouts(payoutsData.payouts);
      setTotalResults(payoutsData.total_count);
    } catch (err) {
      console.error('Error loading data:', err);
      setError('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePayout = async () => {
    try {
      // Create a payout via API
      await apiService.createPayout({
        amount: 100.00,
        currency: 'USD',
        description: 'Manual payout from dashboard'
      });
      
      console.log('Payout created successfully!');
      
      // Reload data to show the new payout
      loadData();
    } catch (err) {
      console.error('Error creating payout:', err);
      setError('Failed to create payout. Please try again.');
    }
  };

  const handleSeeDetails = () => {
    console.log('See balance details');
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleExport = () => {
    console.log('Export data');
  };

  if (loading && !balance) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex justify-center items-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={loadData}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex justify-center">
      {/* Main Container - Exact Figma dimensions */}
      <div className="figma-container flex flex-col">
        {/* Header */}
        <div className="figma-header flex flex-col">
          <div className="flex flex-col gap-3">
            <h1 className="figma-title">
              Payouts
            </h1>
            <p className="figma-subtitle">
              The payouts component simply combines balances and the payouts list.
            </p>
          </div>
          
          <div className="inline-flex">
            <a
              href="https://stripe.com/docs/connect/payouts"
              target="_blank"
              rel="noopener noreferrer"
              className="figma-docs-link text-decoration-none"
            >
              View in Stripe Docs →
            </a>
          </div>
        </div>

        {/* Component Container */}
        <div className="figma-component-container flex">
          <div className="flex flex-col gap-3 w-full">
            {/* Balance Card */}
            {balance && (
              <BalanceCard
                balance={balance}
                onPayout={handlePayout}
                onSeeDetails={handleSeeDetails}
              />
            )}

            {/* Payouts Table */}
            <PayoutsTable
              payouts={payouts}
              currentPage={currentPage}
              totalPages={totalPages}
              totalResults={totalResults}
              onPageChange={handlePageChange}
              onExport={handleExport}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
