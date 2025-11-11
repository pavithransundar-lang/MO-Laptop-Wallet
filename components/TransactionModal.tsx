// FIX: Removed triple-slash directive for React types. It can conflict with modern TypeScript/React project configurations and cause type resolution errors.
import React, { useState } from 'react';
import { CoinIcon } from './Icons';

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (amount: number, note: string) => void;
  type: 'earn' | 'spend' | 'save';
  teacher: string;
}

const modalConfig = {
  earn: { title: 'Earn Time', color: 'teal', buttonText: 'Log Earning' },
  spend: { title: 'Spend Time', color: 'pink', buttonText: 'Log Spending' },
  save: { title: 'Save for Later', color: 'blue', buttonText: 'Log Saving' },
};

export const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, onSubmit, type, teacher }) => {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const config = modalConfig[type];

  const handleClose = () => {
    // Reset state for next time
    setAmount('');
    setNote('');
    onClose();
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }
    onSubmit(numericAmount, note);
    handleClose();
  };

  const colorClasses = {
      teal: {
          bg: 'bg-teal-50',
          text: 'text-teal-800',
          border: 'border-teal-300',
          ring: 'focus:ring-teal-500',
          button: 'bg-teal-500 hover:bg-teal-600 ring-teal-300 text-white'
      },
      pink: {
          bg: 'bg-pink-50',
          text: 'text-pink-800',
          border: 'border-pink-300',
          ring: 'focus:ring-pink-500',
          button: 'bg-pink-500 hover:bg-pink-600 ring-pink-300 text-white'
      },
      blue: {
          bg: 'bg-blue-50',
          text: 'text-blue-800',
          border: 'border-blue-300',
          ring: 'focus:ring-blue-500',
          button: 'bg-blue-500 hover:bg-blue-600 ring-blue-300 text-white'
      }
  }

  const currentColors = colorClasses[config.color];


  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={handleClose} role="dialog" aria-modal="true" aria-labelledby="transaction-modal-title">
      <div className={`relative ${currentColors.bg} rounded-3xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-100`} onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl leading-none" aria-label="Close modal">&times;</button>
        <h2 id="transaction-modal-title" className={`text-2xl font-bold ${currentColors.text} mb-4 flex items-center gap-2`}>
            <CoinIcon className="w-8 h-8"/>
            {config.title}
        </h2>
        <p className="text-sm text-gray-500 mb-6">Logging as <span className="font-bold">{teacher}</span>.</p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="amount" className={`block text-sm font-medium ${currentColors.text}`}>Amount (RM)</label>
            <div className="mt-1 relative rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <span className="text-gray-500 sm:text-sm">RM</span>
                </div>
                <input
                type="number"
                name="amount"
                id="amount"
                className={`block w-full rounded-md ${currentColors.border} pl-10 pr-4 py-2 focus:outline-none focus:ring-2 ${currentColors.ring}`}
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                step="0.50"
                min="0"
                autoFocus
                required
                />
            </div>
          </div>
          <div>
            <label htmlFor="note" className={`block text-sm font-medium ${currentColors.text}`}>Note (Optional)</label>
            <input
              type="text"
              name="note"
              id="note"
              className={`mt-1 block w-full rounded-md ${currentColors.border} shadow-sm focus:outline-none focus:ring-2 ${currentColors.ring}`}
              placeholder="e.g., Finished homework early"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-4 pt-4">
              <button type="button" onClick={handleClose} className="px-4 py-2 rounded-lg font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
              <button type="submit" className={`px-6 py-2 rounded-lg font-bold shadow-md transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 ${currentColors.button}`}>
                {config.buttonText}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
};
