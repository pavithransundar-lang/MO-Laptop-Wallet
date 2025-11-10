// Fix: Explicitly include React's type definitions to solve issues with unrecognized JSX intrinsic elements.
/// <reference types="react" />

import React from 'react';
import { WalletIcon, LaptopIcon, PiggyBankIcon, RM1NoteIcon, RM5NoteIcon, RM10NoteIcon, RM20NoteIcon, RM50NoteIcon } from './Icons';

interface WalletProps {
  balance: number;
  saved: number;
  timeRate: number;
}

const formatCurrency = (amount: number) => `RM${amount.toFixed(2)}`;

// --- Helper component to display banknotes ---
const noteComponents: { [key: number]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  50: RM50NoteIcon,
  20: RM20NoteIcon,
  10: RM10NoteIcon,
  5: RM5NoteIcon,
  1: RM1NoteIcon,
};

const denominations = [50, 20, 10, 5, 1];

const calculateNotes = (amount: number) => {
  let remaining = Math.floor(amount); // Use whole numbers for notes
  const notes = [];
  
  for (const denom of denominations) {
      const count = Math.floor(remaining / denom);
      if (count > 0) {
          for (let i = 0; i < count; i++) {
              notes.push(denom);
          }
          remaining %= denom;
      }
  }
  // Cap at a reasonable number to prevent visual clutter
  return notes.slice(0, 8); 
};

const BanknotesDisplay: React.FC<{ amount: number }> = ({ amount }) => {
    const notes = calculateNotes(amount);

    if (notes.length === 0) {
        return <div className="h-28 flex items-center justify-center text-gray-400 text-lg">Your wallet is empty!</div>
    }

    return (
        <div className="relative h-28 w-full flex items-center justify-center -space-x-16">
            {notes.map((denom, index) => {
                const NoteComponent = noteComponents[denom];
                const rotation = (index - (notes.length - 1) / 2) * 8; // Fan out effect
                return (
                    <NoteComponent
                        key={`${denom}-${index}`}
                        className="w-32 h-16 shadow-lg transform transition-transform duration-300 hover:scale-110 hover:z-20"
                        style={{
                            transform: `rotate(${rotation}deg) translateY(${index*2}px)`,
                            zIndex: index,
                        }}
                    />
                );
            })}
        </div>
    );
};
// ------------------------------------------


export const Wallet: React.FC<WalletProps> = ({ balance, saved, timeRate }) => {
  const availableMinutes = balance * timeRate;

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 w-full transform hover:scale-105 transition-transform duration-300 space-y-4">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <WalletIcon className="w-8 h-8 text-teal-500" />
            <span>My Wallet</span>
        </h2>
        <div className="text-right">
            <p className="text-sm text-gray-500">Current Balance</p>
            <p className="text-4xl font-black text-teal-600 drop-shadow-md tracking-tight">
                {formatCurrency(balance)}
            </p>
        </div>
      </div>
      
      <BanknotesDisplay amount={balance} />

      <div className="flex items-center justify-center gap-2 text-blue-600 font-bold bg-blue-100 rounded-full px-4 py-2">
        <LaptopIcon className="w-6 h-6" />
        <span>{availableMinutes} minutes of laptop time</span>
      </div>

      <div className="border-t-2 border-dashed border-gray-300 pt-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-pink-600">
                <PiggyBankIcon className="w-8 h-8" />
                <p className="font-bold text-lg">Saved Total</p>
            </div>
            <p className="font-extrabold text-2xl text-pink-600">{formatCurrency(saved)}</p>
        </div>
      </div>
    </div>
  );
};