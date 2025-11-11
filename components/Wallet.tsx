// FIX: Removed triple-slash directive for React types. It can conflict with modern TypeScript/React project configurations and cause type resolution errors.
import React, { useState, useEffect, useRef } from 'react';
import { WalletIcon, LaptopIcon, PiggyBankIcon, RM1NoteIcon, RM5NoteIcon, RM10NoteIcon, RM20NoteIcon, RM50NoteIcon, PencilIcon } from './Icons';

interface WalletProps {
  balance: number;
  saved: number;
  conversionRate: number;
  onEditRequest: (target: 'balance' | 'saved') => void;
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

export const Wallet: React.FC<WalletProps> = ({ balance, saved, conversionRate, onEditRequest }) => {
  const availableMinutes = conversionRate > 0 ? balance / conversionRate : 0;
  const [isSavedAnimating, setIsSavedAnimating] = useState(false);
  const prevSavedRef = useRef<number>();

  useEffect(() => {
    // Only animate on updates, not on initial render
    if (prevSavedRef.current !== undefined && prevSavedRef.current !== saved) {
      setIsSavedAnimating(true);
      const timer = setTimeout(() => setIsSavedAnimating(false), 1000); // Animation duration
      return () => clearTimeout(timer);
    }
    prevSavedRef.current = saved;
  }, [saved]);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 w-full transform hover:scale-105 transition-transform duration-300 space-y-4">
      <style>{`
        @keyframes saved-update-pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); text-shadow: 0 0 10px rgba(250, 204, 21, 0.7); }
          100% { transform: scale(1); }
        }
        .animate-saved-update {
          animation: saved-update-pulse 1s ease-in-out;
        }
      `}</style>
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-bold text-gray-700 flex items-center gap-2">
            <WalletIcon className="w-8 h-8 text-green-500" />
            <span>My Wallet</span>
        </h2>
        <div className="text-right">
            <p className="text-sm text-gray-500">Current Balance</p>
            <div className="flex items-center justify-end gap-2">
                <p className="text-4xl font-black text-green-600 drop-shadow-md tracking-tight">
                    {formatCurrency(balance)}
                </p>
                <button 
                    onClick={() => onEditRequest('balance')} 
                    className="text-gray-400 hover:text-green-600 transition-colors p-1 rounded-full hover:bg-green-100/80"
                    aria-label="Edit balance"
                >
                    <PencilIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
      </div>
      
      <BanknotesDisplay amount={balance} />

      <div className="bg-blue-100 rounded-xl p-4 space-y-2">
        <div className="flex items-center justify-center gap-2 text-blue-600 font-bold">
            <LaptopIcon className="w-6 h-6" />
            <span>{availableMinutes.toFixed(0)} minutes of laptop time</span>
        </div>
        <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>Rate: RM {conversionRate.toFixed(2)} per minute</span>
        </div>
      </div>

      <div className="border-t-2 border-dashed border-gray-300 pt-4">
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-yellow-600">
                <PiggyBankIcon className="w-8 h-8" />
                <p className="font-bold text-lg">Total Saved</p>
            </div>
            <div className="flex items-center gap-2">
                <p className={`font-extrabold text-2xl text-yellow-600 ${isSavedAnimating ? 'animate-saved-update' : ''}`}>{formatCurrency(saved)}</p>
                <button 
                    onClick={() => onEditRequest('saved')} 
                    className="text-gray-400 hover:text-yellow-600 transition-colors p-1 rounded-full hover:bg-yellow-100/80"
                    aria-label="Edit saved amount"
                >
                    <PencilIcon className="w-5 h-5"/>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};