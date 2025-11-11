import React, { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Confetti } from './components/Confetti';
import { TransactionHistory } from './components/TransactionHistory';
import { SettingsIcon, ResetIcon, PlusCircleIcon, HistoryIcon } from './components/Icons';
import { SettingsModal } from './components/SettingsModal';
import { SummaryCard } from './components/SummaryCard';
import { TransactionForm } from './components/TransactionForm';
import { Visualization } from './components/Visualization';
import { CollapsibleCard } from './components/CollapsibleCard';
import { Wallet } from './components/Wallet';
import { DailySummary } from './components/DailySummary';
import { EditValueModal } from './components/EditValueModal';


// Interfaces
export interface Transaction {
  id: string;
  date: string;
  teacher: string;
  type: 'add' | 'deduct' | 'save';
  minutes: number;
  reason: string;
  conversionRate: number; // Store the rate at the time of transaction
}

export interface Settings {
  conversionRate: number;
  dailyResetMinutes: number;
  dailyResetEnabled: boolean;
  animationsEnabled: boolean;
  teachers: string[];
  timeOptions: number[];
  reasonOptions: string[];
  pin: string;
  studentName: string;
}

interface AppState {
  balanceMinutes: number;
  savedMinutes: number;
  transactions: Transaction[];
  lastResetDate: string;
}

// Initial States
const initialSettings: Settings = {
  conversionRate: 0.50, // RM0.50 per minute
  dailyResetMinutes: 60,
  dailyResetEnabled: false,
  animationsEnabled: true,
  teachers: ['Germaine Tay', 'Barbara Lim', 'Fazliza Zulkifli', 'Hazima'],
  timeOptions: [5, 10, 15, 20, 30, 45, 60],
  reasonOptions: ['Focus reward', 'Completed task', 'Emotional regulation', 'Break time'],
  pin: '', // No PIN by default
  studentName: 'Mohamed',
};

const initialAppState: AppState = {
  balanceMinutes: 60,
  savedMinutes: 0,
  transactions: [],
  lastResetDate: new Date().toISOString().split('T')[0],
};

const App: React.FC = () => {
  const [appState, setAppState] = useLocalStorage<AppState>('laptopWalletState_v3', initialAppState);
  const [settings, setSettings] = useLocalStorage<Settings>('laptopWalletSettings_v3', initialSettings);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showConfetti, setShowConfetti] = useState<'add' | 'deduct' | 'save' | null>(null);
  const [isFormVisible, setIsFormVisible] = useState(true);
  const [isHistoryVisible, setIsHistoryVisible] = useState(true);
  const [editingTarget, setEditingTarget] = useState<'balance' | 'saved' | null>(null);


  const handleDailyReset = useCallback(() => {
    const today = new Date().toISOString().split('T')[0];
    if (settings.dailyResetEnabled && today !== appState.lastResetDate) {
      setAppState(prevState => ({
        ...prevState,
        balanceMinutes: settings.dailyResetMinutes,
        lastResetDate: today,
      }));
    }
  }, [appState.lastResetDate, setAppState, settings.dailyResetEnabled, settings.dailyResetMinutes]);
  
  useEffect(() => {
    handleDailyReset();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTransaction = (minutes: number, reason: string, teacher: string, type: 'add' | 'deduct' | 'save') => {
    if ((type === 'deduct' || type === 'save') && appState.balanceMinutes < minutes) {
      alert("Oops! Not enough minutes available for this transaction.");
      return;
    }

    const newTransaction: Transaction = {
      id: new Date().toISOString() + Math.random(),
      date: new Date().toISOString(),
      teacher,
      type,
      minutes,
      reason,
      conversionRate: settings.conversionRate,
    };

    setAppState(prevState => {
      let newBalance = prevState.balanceMinutes;
      let newSaved = prevState.savedMinutes;

      if (type === 'add') {
        newBalance += minutes;
      } else if (type === 'deduct') {
        newBalance -= minutes;
      } else if (type === 'save') {
        newBalance -= minutes;
        newSaved += minutes;
      }
      
      return {
        ...prevState,
        balanceMinutes: newBalance,
        savedMinutes: newSaved,
        transactions: [newTransaction, ...prevState.transactions],
      };
    });
    
    if (settings.animationsEnabled && (type === 'add' || type === 'save')) {
      setShowConfetti(type);
    }
  };
  
  const handleManualReset = () => {
    if (window.confirm(`Are you sure you want to reset the day's time to ${settings.dailyResetMinutes} minutes? This will not affect saved time.`)) {
       setAppState(prevState => ({
        ...prevState,
        balanceMinutes: settings.dailyResetMinutes,
        lastResetDate: new Date().toISOString().split('T')[0],
      }));
    }
  };

  const handleSaveSettings = (newSettings: Settings) => {
    setSettings(newSettings);
    setIsSettingsOpen(false);
  };
  
  const openSettings = () => {
    if (settings.pin) {
      const enteredPin = prompt('Please enter your 4-digit PIN to access settings:');
      if (enteredPin === settings.pin) {
        setIsSettingsOpen(true);
      } else if (enteredPin !== null) {
        alert('Incorrect PIN.');
      }
    } else {
      setIsSettingsOpen(true);
    }
  };

  const openEditModal = (target: 'balance' | 'saved') => {
    setEditingTarget(target);
  };

  const closeEditModal = () => {
      setEditingTarget(null);
  };

  const handleValueUpdate = (newMinutes: number, enteredPin: string) => {
      if (settings.pin && settings.pin !== enteredPin) {
          alert('Incorrect PIN.');
          return;
      }

      if (editingTarget === null) return;

      const currentValue = editingTarget === 'balance' ? appState.balanceMinutes : appState.savedMinutes;
      const difference = newMinutes - currentValue;

      if (difference === 0) {
          closeEditModal();
          return;
      }

      const transactionType = difference > 0 ? 'add' : 'deduct';
      
      const newTransaction: Transaction = {
        id: new Date().toISOString() + Math.random(),
        date: new Date().toISOString(),
        teacher: 'Admin',
        type: transactionType,
        minutes: Math.abs(difference),
        reason: `Manual ${editingTarget} Adjustment`,
        conversionRate: settings.conversionRate,
      };

      setAppState(prevState => {
          const newTransactions = [newTransaction, ...prevState.transactions];
          if (editingTarget === 'balance') {
              return {
                  ...prevState,
                  balanceMinutes: newMinutes,
                  transactions: newTransactions,
              };
          } else { 
              return {
                  ...prevState,
                  savedMinutes: newMinutes,
                  transactions: newTransactions,
              };
          }
      });
      
      closeEditModal();
  };


  return (
    <div className="min-h-screen text-gray-800 flex flex-col items-center p-4 selection:bg-purple-200">
      {settings.animationsEnabled && <>
          <Confetti trigger={showConfetti === 'add' || showConfetti === 'save'} onComplete={() => setShowConfetti(null)} colors={['#A7F3D0', '#BAE6FD', '#FBCFE8']} />
      </>}
      
      <header className="text-center mb-6 md:mb-8 w-full max-w-6xl">
        <div className="relative inline-block">
            <h1 className="text-4xl md:text-6xl font-black text-gray-700 drop-shadow-md">Laptop Time Wallet</h1>
            <p className="text-lg md:text-xl text-gray-500 mt-2">Dashboard for {settings.studentName}</p>
            <button onClick={openSettings} className="absolute -right-12 top-1/2 -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors" aria-label="Open Settings">
                <SettingsIcon className="w-8 h-8"/>
            </button>
        </div>
      </header>
      
      <main className="w-full max-w-6xl mx-auto flex flex-col gap-6 md:gap-8">
        <SummaryCard 
            balanceMinutes={appState.balanceMinutes}
            savedMinutes={appState.savedMinutes}
            dailyAllowance={settings.dailyResetEnabled ? settings.dailyResetMinutes : undefined}
            conversionRate={settings.conversionRate}
        />
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
            <div className="lg:col-span-2">
                 <Wallet 
                    balance={appState.balanceMinutes * settings.conversionRate}
                    saved={appState.savedMinutes * settings.conversionRate}
                    conversionRate={settings.conversionRate}
                    onEditRequest={openEditModal}
                />
            </div>
            <div className="lg:col-span-3">
                <DailySummary 
                    transactions={appState.transactions}
                    dailyAllowance={settings.dailyResetMinutes}
                />
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 md:gap-8">
            <CollapsibleCard
              className="lg:col-span-2"
              title="Log New Entry"
              icon={<PlusCircleIcon className="w-8 h-8 text-purple-500"/>}
              isOpen={isFormVisible}
              onToggle={() => setIsFormVisible(v => !v)}
            >
              <TransactionForm settings={settings} onTransaction={handleTransaction} balanceMinutes={appState.balanceMinutes} />
            </CollapsibleCard>

            <CollapsibleCard
              className="lg:col-span-3"
              title="History & Activity"
              icon={<HistoryIcon className="w-8 h-8 text-purple-500"/>}
              isOpen={isHistoryVisible}
              onToggle={() => setIsHistoryVisible(v => !v)}
              headerActions={
                <button onClick={(e) => { e.stopPropagation(); handleManualReset(); }} className="flex items-center gap-2 px-4 py-2 rounded-full font-bold shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 bg-gray-200 hover:bg-gray-300 text-gray-600 ring-gray-300" title="Reset day's time">
                    <ResetIcon className="w-5 h-5"/>
                    <span className="hidden sm:inline">Reset Day</span>
                </button>
              }
            >
              <div className="flex flex-col">
                  <Visualization transactions={appState.transactions} />
                  <TransactionHistory transactions={appState.transactions} />
              </div>
            </CollapsibleCard>
        </div>
      </main>

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
        currentSettings={settings}
        transactions={appState.transactions}
        resetAllData={() => {
            if (window.confirm('DANGER ZONE: This will delete all transactions and reset the wallet. Are you absolutely sure?')) {
                setAppState(initialAppState);
            }
        }}
      />
      <EditValueModal
        isOpen={editingTarget !== null}
        onClose={closeEditModal}
        onSave={handleValueUpdate}
        target={editingTarget}
        currentMinutes={
            editingTarget === 'balance' ? appState.balanceMinutes :
            editingTarget === 'saved' ? appState.savedMinutes : 0
        }
        hasPin={!!settings.pin}
      />
    </div>
  );
};

export default App;