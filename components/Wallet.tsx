
import React from 'react';
import { WalletIcon, LaptopIcon, PiggyBankIcon } from './Icons';

interface WalletProps {
  balance: number;
  saved: number;
  timeRate: number;
}

const formatCurrency = (amount: number) => `RM${amount.toFixed(2)}`;

export const Wallet: React.FC<WalletProps> = ({ balance, saved, timeRate }) => {
  const availableMinutes = balance * timeRate;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 w-full text-center transform hover:scale-105 transition-transform duration-300">
      <WalletIcon className="w-16 h-16 text-teal-500 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-gray-700">My Wallet</h2>
      
      <div className="my-4 text-5xl font-black text-teal-600 drop-shadow-md tracking-tight">
        {formatCurrency(balance)}
      </div>

      <div className="flex items-center justify-center gap-2 text-blue-600 font-bold bg-blue-100 rounded-full px-4 py-2">
        <LaptopIcon className="w-6 h-6" />
        <span>{availableMinutes} minutes of laptop time</span>
      </div>

      <div className="mt-6 border-t-2 border-dashed border-gray-300 pt-4">
        <div className="flex items-center justify-center gap-3 text-pink-600">
            <PiggyBankIcon className="w-8 h-8" />
            <div>
                <p className="font-bold text-lg">Saved</p>
                <p className="font-extrabold text-2xl">{formatCurrency(saved)}</p>
            </div>
        </div>
      </div>
    </div>
  );
};
