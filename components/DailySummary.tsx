
import React from 'react';
import { ChartBarIcon } from './Icons';

interface DailySummaryProps {
  spent: number;
  saved: number;
}

const formatCurrency = (amount: number) => `RM${amount.toFixed(2)}`;

export const DailySummary: React.FC<DailySummaryProps> = ({ spent, saved }) => {
  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 w-full">
      <h3 className="text-xl font-bold text-gray-700 mb-3 flex items-center gap-2">
        <ChartBarIcon className="w-6 h-6 text-blue-500"/>
        Today's Summary
      </h3>
      <div className="space-y-2 text-gray-600">
        <p>You have spent <span className="font-bold text-pink-600">{formatCurrency(spent)}</span> today.</p>
        <p>You saved <span className="font-bold text-blue-600">{formatCurrency(saved)}</span> for another day!</p>
      </div>
    </div>
  );
};
