// Fix: Explicitly include React's type definitions to solve issues with unrecognized JSX intrinsic elements.
/// <reference types="react" />

import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Wallet } from './components/Wallet';
import { ActionButton } from './components/ActionButton';
import { DailySummary } from './components/DailySummary';
import { MotivationalMessage } from './components/MotivationalMessage';
import { Confetti } from './components/Confetti';
import { CoinIcon, MinusCircleIcon, PlusCircleIcon, SaveIcon } from './components/Icons';

// Constants
const DAILY_ALLOWANCE = 30;
const RM_TO_MINUTES = 5;

const App: React.FC = () => {
  const [balance, setBalance] = useLocalStorage<number>('walletBalance', DAILY_ALLOWANCE);
  const [saved, setSaved] = useLocalStorage<number>('walletSaved', 0);
  const [spentToday, setSpentToday] = useLocalStorage<number>('walletSpentToday', 0);
  const [savedToday, setSavedToday] = useLocalStorage<number>('walletSavedToday', 0);
  const [lastLoginDate, setLastLoginDate] = useLocalStorage<string>('walletLastLogin', '');

  const [showConfetti, setShowConfetti] = useState(false);
  const [showEarnConfetti, setShowEarnConfetti] = useState(false);

  const handleDailyAllowance = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    if (today !== lastLoginDate) {
      setBalance(prevBalance => prevBalance + DAILY_ALLOWANCE);
      setSpentToday(0);
      setSavedToday(0);
      setLastLoginDate(today);
      setShowEarnConfetti(true);
    }
  }, [lastLoginDate, setBalance, setLastLoginDate, setSavedToday, setSpentToday]);

  useEffect(() => {
    handleDailyAllowance();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleAction = (type: 'spend' | 'save' | 'earn', amount: number) => {
    if ((type === 'spend' || type === 'save') && balance < amount) {
      alert("Oops! Not enough RM in your wallet.");
      return;
    }

    switch (type) {
      case 'spend':
        setBalance(balance - amount);
        setSpentToday(spentToday + amount);
        break;
      case 'save':
        setBalance(balance - amount);
        setSaved(saved + amount);
        setSavedToday(savedToday + amount);
        setShowConfetti(true);
        break;
      case 'earn':
        setBalance(balance + amount);
        setShowEarnConfetti(true);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-100 to-pink-100 text-gray-800 flex flex-col items-center justify-center p-4">
      <Confetti trigger={showConfetti} onComplete={() => setShowConfetti(false)} />
      <Confetti trigger={showEarnConfetti} onComplete={() => setShowEarnConfetti(false)} colors={['#FBBF24', '#F59E0B', '#D97706']} />
      
      <header className="text-center mb-6 md:mb-8">
        <h1 className="text-4xl md:text-6xl font-black text-teal-600 drop-shadow-md">Laptop Wallet</h1>
        <p className="text-lg md:text-xl text-blue-500 mt-2">Your key to balanced screen time!</p>
      </header>
      
      <main className="w-full max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-8 order-2 lg:order-1">
          <h2 className="text-2xl font-bold text-teal-700 mb-6 flex items-center gap-3">
            <CoinIcon className="w-8 h-8 text-yellow-500" />
            Take Action
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-pink-100 p-4 rounded-xl">
                <h3 className="font-bold text-pink-800 mb-2 text-lg">Spend Time</h3>
                <div className="flex flex-wrap gap-2">
                    <ActionButton onClick={() => handleAction('spend', 1)} label="Spend RM1" color="pink" icon={<MinusCircleIcon />} />
                    <ActionButton onClick={() => handleAction('spend', 5)} label="Spend RM5" color="pink" icon={<MinusCircleIcon />} />
                </div>
            </div>
            <div className="bg-blue-100 p-4 rounded-xl">
                <h3 className="font-bold text-blue-800 mb-2 text-lg">Save for Later</h3>
                <div className="flex flex-wrap gap-2">
                    <ActionButton onClick={() => handleAction('save', 1)} label="Save RM1" color="blue" icon={<SaveIcon />} />
                    <ActionButton onClick={() => handleAction('save', 5)} label="Save RM5" color="blue" icon={<SaveIcon />} />
                </div>
            </div>
            <div className="bg-teal-100 p-4 rounded-xl md:col-span-2">
                 <h3 className="font-bold text-teal-800 mb-2 text-lg">Earn More Time</h3>
                 <div className="flex flex-wrap gap-2">
                    <ActionButton onClick={() => handleAction('earn', 5)} label="Earn RM5" color="teal" icon={<PlusCircleIcon />} />
                    <ActionButton onClick={() => handleAction('earn', 10)} label="Earn RM10" color="teal" icon={<PlusCircleIcon />} />
                 </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-6 md:gap-8 order-1 lg:order-2">
            <Wallet balance={balance} saved={saved} timeRate={RM_TO_MINUTES} />
            <DailySummary spent={spentToday} saved={savedToday} />
        </div>
      </main>

      <footer className="mt-8">
        <MotivationalMessage />
      </footer>
    </div>
  );
};

export default App;