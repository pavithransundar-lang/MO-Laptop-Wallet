import React from 'react';
import { PlusCircleIcon, MinusCircleIcon, PiggyBankIcon, HistoryIcon } from './Icons';
import type { Transaction } from '../App';

interface TransactionHistoryProps {
  transactions: Transaction[];
}

const TypeDetails = {
    add: { icon: <PlusCircleIcon className="w-6 h-6 text-green-500"/>, color: 'text-green-600', label: 'Added' },
    deduct: { icon: <MinusCircleIcon className="w-6 h-6 text-red-500"/>, color: 'text-red-600', label: 'Deducted' },
    save: { icon: <PiggyBankIcon className="w-6 h-6 text-yellow-600"/>, color: 'text-yellow-600', label: 'Saved' },
}

export const TransactionHistory: React.FC<TransactionHistoryProps> = ({ transactions }) => {
  return (
    <div className="h-[300px] flex flex-col mt-4">
      <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-3">
        <HistoryIcon className="w-6 h-6 text-gray-500" />
        Transaction Log
      </h3>
      {transactions.length === 0 ? (
        <div className="flex-grow flex items-center justify-center text-gray-500 bg-gray-50/50 rounded-2xl">
            No transactions yet.
        </div>
      ) : (
        <ul className="space-y-3 overflow-y-auto pr-2 -mr-2 flex-grow custom-scrollbar">
          {transactions.map((tx) => {
             const details = TypeDetails[tx.type];
             const date = new Date(tx.date);
             const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
             const formattedDate = date.toLocaleDateString([], { day: 'numeric', month: 'short' });
             const rmAmount = tx.minutes * tx.conversionRate;
             const sign = tx.type === 'add' ? '+' : '-';

             return (
                <li key={tx.id} className="flex items-start justify-between p-3 bg-white/50 rounded-lg transition-colors hover:bg-white/80 shadow-sm">
                    <div className="flex items-start gap-3">
                        {details.icon}
                        <div>
                            <p className={`font-bold ${details.color} flex items-center gap-2`}>
                                <span>{tx.type === 'save' ? '' : sign}{`${tx.minutes} min`} {details.label}</span>
                                <span className="text-xs font-normal text-gray-400">({tx.type === 'save' ? '' : sign}{`RM${rmAmount.toFixed(2)}`})</span>
                            </p>
                            <p className="text-sm text-gray-700">{tx.reason}</p>
                            <p className="text-xs text-gray-500 italic mt-1">by {tx.teacher}</p>
                        </div>
                    </div>
                    <div className="text-right text-xs text-gray-400 shrink-0 ml-2">
                        <p>{formattedDate}</p>
                        <p>{formattedTime}</p>
                    </div>
                </li>
             )
          })}
        </ul>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #cbd5e1;
            border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #94a3b8;
        }
      `}</style>
    </div>
  );
};