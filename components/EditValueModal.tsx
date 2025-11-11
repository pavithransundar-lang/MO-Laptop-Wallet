import React, { useState, useEffect } from 'react';
import { LaptopIcon, PiggyBankIcon } from './Icons';

interface EditValueModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (newMinutes: number, pin: string) => void;
  target: 'balance' | 'saved' | null;
  currentMinutes: number;
  hasPin: boolean;
}

const targetConfig = {
    balance: {
        title: "Edit Time Left Today",
        icon: <LaptopIcon className="w-7 h-7 text-blue-500"/>,
        description: "Directly set the number of available minutes for today. A transaction will be logged to reflect this manual change.",
    },
    saved: {
        title: "Edit Total Saved",
        icon: <PiggyBankIcon className="w-7 h-7 text-yellow-600"/>,
        description: "Directly set the total number of saved minutes. A transaction will be logged to reflect this manual change.",
    }
}

export const EditValueModal: React.FC<EditValueModalProps> = ({ isOpen, onClose, onSave, target, currentMinutes, hasPin }) => {
    const [newMinutes, setNewMinutes] = useState(currentMinutes);
    const [pin, setPin] = useState('');

    useEffect(() => {
        if (isOpen) {
            setNewMinutes(currentMinutes);
            setPin('');
        }
    }, [isOpen, currentMinutes]);
    
    const handleSave = () => {
        if (hasPin && !pin) {
            alert('Please enter the PIN to confirm.');
            return;
        }
        if (isNaN(newMinutes) || newMinutes < 0) {
            alert('Please enter a valid number of minutes.');
            return;
        }
        onSave(newMinutes, pin);
    };

    if (!isOpen || !target) return null;
    
    const config = targetConfig[target];

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose} role="dialog" aria-modal="true">
            <div className="bg-slate-50 rounded-3xl shadow-2xl w-full max-w-lg flex flex-col" onClick={e => e.stopPropagation()}>
                <header className="flex justify-between items-center p-6 border-b border-slate-200">
                    <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                        {config.icon}
                        {config.title}
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
                </header>

                <main className="p-6 space-y-6">
                    <p className="text-sm text-gray-600">{config.description}</p>
                    <div>
                        <label htmlFor="new-minutes" className="block text-sm font-medium text-gray-700">New Amount (in minutes)</label>
                        <input 
                            type="number" 
                            id="new-minutes" 
                            value={newMinutes} 
                            onChange={(e) => setNewMinutes(Number(e.target.value))}
                            min="0"
                            className="mt-1 w-full px-4 py-2 text-lg bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            autoFocus
                        />
                    </div>
                     {hasPin && (
                        <div>
                            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">Confirm with PIN</label>
                            <input 
                                type="password" 
                                id="pin" 
                                value={pin} 
                                onChange={(e) => setPin(e.target.value)}
                                maxLength={4}
                                placeholder="Enter 4-digit PIN"
                                className="mt-1 w-full px-4 py-2 text-lg bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                            />
                        </div>
                    )}
                </main>

                <footer className="p-6 border-t border-slate-200 bg-slate-100/50 rounded-b-3xl flex justify-end gap-4">
                    <button onClick={onClose} className="px-6 py-2 rounded-full font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
                    <button onClick={handleSave} className="px-8 py-2 rounded-full font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">Update Value</button>
                </footer>
            </div>
        </div>
    );
};