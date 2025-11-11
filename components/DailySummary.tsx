import React, { useMemo } from 'react';
import { ChartBarIcon, SparklesIcon, PlusCircleIcon, MinusCircleIcon, PiggyBankIcon } from './Icons';
import type { Transaction } from '../App';

interface DailySummaryProps {
  transactions: Transaction[];
  dailyAllowance: number;
}

const formatMinutes = (minutes: number) => `${Math.abs(minutes)} min`;

const staticMessages = [
  "Great job managing your time today!",
  "Every minute saved is a step towards your goal!",
  "Smart choices lead to more fun time!",
  "You're a time management superstar!",
  "Well done on your choices today!",
  "Keep up the amazing work!",
];

export const DailySummary: React.FC<DailySummaryProps> = ({ transactions }) => {
  const motivationalMessage = useMemo(() => {
    return staticMessages[Math.floor(Math.random() * staticMessages.length)];
  }, [transactions]);


  const summary = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todaysTransactions = transactions.filter(tx => tx.date.startsWith(today));

    const addedToday = todaysTransactions
      .filter(tx => tx.type === 'add')
      .reduce((sum, tx) => sum + tx.minutes, 0);

    const deductedToday = todaysTransactions
      .filter(tx => tx.type === 'deduct')
      .reduce((sum, tx) => sum + tx.minutes, 0);

    const savedToday = todaysTransactions
      .filter(tx => tx.type === 'save')
      .reduce((sum, tx) => sum + tx.minutes, 0);

    return { addedToday, deductedToday, savedToday };
  }, [transactions]);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 w-full h-full flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-gray-700 mb-4 flex items-center gap-2">
            <ChartBarIcon className="w-6 h-6 text-blue-500"/>
            Daily Reflection
        </h3>
        <div className="space-y-3 text-gray-600 text-lg">
            <div className="flex items-center gap-3">
                <PlusCircleIcon className="w-6 h-6 text-green-500 shrink-0"/>
                <span>Time Added Today:</span>
                <span className="font-bold text-green-600">{formatMinutes(summary.addedToday)}</span>
            </div>
             <div className="flex items-center gap-3">
                <MinusCircleIcon className="w-6 h-6 text-red-500 shrink-0"/>
                <span>Time Used Today:</span>
                <span className="font-bold text-red-600">{formatMinutes(summary.deductedToday)}</span>
            </div>
             <div className="flex items-center gap-3">
                <PiggyBankIcon className="w-6 h-6 text-yellow-600 shrink-0"/>
                <span>Time Saved Today:</span>
                <span className="font-bold text-yellow-600">{formatMinutes(summary.savedToday)}</span>
            </div>
        </div>
      </div>
      <div className="bg-yellow-100 border-2 border-yellow-300 text-yellow-800 rounded-xl px-4 py-3 shadow-inner flex items-center gap-3 mt-4 min-h-[64px]">
        <SparklesIcon className="w-6 h-6 text-yellow-500 shrink-0" />
        <p className="font-bold text-sm text-center w-full">
          {motivationalMessage}
        </p>
      </div>
    </div>
  );
};