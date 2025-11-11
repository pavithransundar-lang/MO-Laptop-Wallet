import React, { useState, useEffect } from 'react';
import type { Settings, Transaction } from '../App';
import { FileDownloadIcon, TrashIcon, SettingsIcon } from './Icons';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: Settings) => void;
  currentSettings: Settings;
  transactions: Transaction[];
  resetAllData: () => void;
}

const SettingsCard: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="bg-white/70 rounded-2xl p-4 md:p-6 shadow-sm">
        <h3 className="text-lg font-bold text-gray-700 mb-4">{title}</h3>
        <div className="space-y-4">
            {children}
        </div>
    </div>
);

const Label: React.FC<{ htmlFor?: string, text: string, description?: string }> = ({ htmlFor, text, description }) => (
    <div>
        <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700">{text}</label>
        {description && <p className="text-xs text-gray-500">{description}</p>}
    </div>
);

const ListItem: React.FC<{ item: string | number, onRemove: () => void, canRemove: boolean }> = ({ item, onRemove, canRemove }) => (
    <li className="flex justify-between items-center bg-gray-50 p-2 rounded-lg">
        <span className="text-gray-700">{item}</span>
        <button onClick={onRemove} className="text-red-400 hover:text-red-600 disabled:text-gray-300 disabled:cursor-not-allowed" disabled={!canRemove}>
            <TrashIcon className="w-5 h-5"/>
        </button>
    </li>
);

const ListManager: React.FC<{
    title: string;
    items: (string | number)[];
    setItems: (items: any[]) => void;
    inputType?: 'text' | 'number';
    placeholder: string;
    unit?: string;
}> = ({ title, items, setItems, inputType = 'text', placeholder, unit }) => {
    const [newItem, setNewItem] = useState('');

    const addItem = (e: React.FormEvent) => {
        e.preventDefault();
        const valueToAdd = inputType === 'number' ? parseFloat(newItem) : newItem.trim();
        if ((typeof valueToAdd === 'string' && valueToAdd) || (typeof valueToAdd === 'number' && !isNaN(valueToAdd) && valueToAdd > 0)) {
            if (!items.includes(valueToAdd)) {
                setItems([...items, valueToAdd].sort((a,b) => (typeof a === 'number' && typeof b === 'number') ? a - b : String(a).localeCompare(String(b))));
                setNewItem('');
            } else {
                alert('This item already exists in the list.');
            }
        }
    };
    
    const removeItem = (index: number) => {
        setItems(items.filter((_, i) => i !== index));
    };

    return (
        <div>
            <Label text={title} />
            <ul className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar pr-2 mt-2">
                {items.map((item, index) => (
                    <ListItem key={index} item={`${item}${unit || ''}`} onRemove={() => removeItem(index)} canRemove={items.length > 1}/>
                ))}
            </ul>
            <form onSubmit={addItem} className="flex gap-2 mt-3">
                <input
                    type={inputType}
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder={placeholder}
                    className="flex-grow w-full px-3 py-2 text-sm bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
                    step={inputType === 'number' ? '1' : undefined}
                    min={inputType === 'number' ? '1' : undefined}
                />
                <button type="submit" className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-md hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors">Add</button>
            </form>
        </div>
    );
};


export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave, currentSettings, transactions, resetAllData }) => {
  const [settings, setSettings] = useState(currentSettings);

  useEffect(() => {
    setSettings(currentSettings);
  }, [currentSettings, isOpen]);
  
  const handleSave = () => {
    onSave(settings);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
     if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setSettings(prev => ({ ...prev, [name]: checked }));
    } else {
        setSettings(prev => ({...prev, [name]: type === 'number' ? parseFloat(value) : value }));
    }
  };
  
  const exportToCSV = () => {
    const headers = "ID,Date,Teacher,Type,Minutes,Reason,Conversion Rate (MYR),Amount (MYR)";
    const rows = transactions.map(tx => {
        let amount = tx.minutes * tx.conversionRate;
        if (tx.type === 'deduct') amount = -amount;
        if (tx.type === 'save') amount = 0; // Saved is a transfer, not a change in total value
        
        return [
            tx.id,
            new Date(tx.date).toLocaleString(),
            `"${tx.teacher.replace(/"/g, '""')}"`,
            tx.type,
            tx.minutes,
            `"${tx.reason.replace(/"/g, '""')}"`,
            tx.conversionRate.toFixed(2),
            amount.toFixed(2)
        ].join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "laptop_wallet_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-slate-50 rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="flex justify-between items-center p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-3"><SettingsIcon className="w-7 h-7"/> Teacher Settings</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-3xl leading-none">&times;</button>
        </header>

        <main className="flex-grow p-6 overflow-y-auto custom-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                <div className="lg:col-span-1 space-y-6">
                    <SettingsCard title="General">
                         <div>
                            <Label htmlFor="studentName" text="Student Name" />
                            <input type="text" id="studentName" name="studentName" value={settings.studentName} onChange={handleChange} placeholder="e.g., Mohamed" className="w-full px-3 py-2 text-sm bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                        </div>
                        <div>
                            <Label htmlFor="conversionRate" text="MYR per Minute" description="Set the value of 1 minute of time."/>
                            <div className="relative mt-1">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">RM</span>
                                <input type="number" id="conversionRate" name="conversionRate" value={settings.conversionRate} onChange={handleChange} step="0.01" min="0" className="w-full pl-10 pr-4 py-2 text-sm bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                            </div>
                        </div>
                         <div>
                            <Label htmlFor="pin" text="Security PIN (Optional)" description="Set a 4-digit PIN to protect settings."/>
                            <input type="password" id="pin" name="pin" value={settings.pin} onChange={handleChange} maxLength={4} placeholder="e.g., 1234" className="w-full px-3 py-2 text-sm bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                        </div>
                    </SettingsCard>
                     <SettingsCard title="Features">
                        <div className="flex items-center justify-between">
                            <Label text="Daily Time Reset" description="Automatically reset time each day."/>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="dailyResetEnabled" checked={settings.dailyResetEnabled} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                            </label>
                        </div>
                        {settings.dailyResetEnabled && (
                            <div>
                                <Label htmlFor="dailyResetMinutes" text="Daily Reset Amount (minutes)"/>
                                <input type="number" id="dailyResetMinutes" name="dailyResetMinutes" value={settings.dailyResetMinutes} onChange={handleChange} min="0" className="w-full px-3 py-2 text-sm bg-white rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"/>
                            </div>
                        )}
                        <div className="flex items-center justify-between">
                            <Label text="Animations" description="Enable fun effects like confetti."/>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" name="animationsEnabled" checked={settings.animationsEnabled} onChange={handleChange} className="sr-only peer" />
                                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-500"></div>
                            </label>
                        </div>
                    </SettingsCard>
                </div>
                
                <div className="lg:col-span-1 space-y-6">
                    <SettingsCard title="Dropdown Options">
                        <ListManager title="Teachers" items={settings.teachers} setItems={(newItems) => setSettings(s => ({...s, teachers: newItems}))} placeholder="Add teacher name..."/>
                        <ListManager title="Time Options" items={settings.timeOptions} setItems={(newItems) => setSettings(s => ({...s, timeOptions: newItems}))} inputType="number" placeholder="Add minutes..." unit=" min"/>
                        <ListManager title="Reasons" items={settings.reasonOptions} setItems={(newItems) => setSettings(s => ({...s, reasonOptions: newItems}))} placeholder="Add reason..."/>
                    </SettingsCard>
                </div>
                
                <div className="lg:col-span-1 space-y-6">
                    <SettingsCard title="Data Management">
                       <button onClick={exportToCSV} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 bg-blue-500 hover:bg-blue-600 text-white ring-blue-300">
                           <FileDownloadIcon className="w-5 h-5"/>
                           Export to CSV
                       </button>
                    </SettingsCard>
                    <SettingsCard title="Danger Zone">
                        <p className="text-sm text-red-700 bg-red-100 p-3 rounded-lg">Proceed with caution. These actions cannot be undone.</p>
                        <button onClick={resetAllData} className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-bold shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 bg-red-600 hover:bg-red-700 text-white ring-red-300">
                           <TrashIcon className="w-5 h-5"/>
                           Reset All Data
                       </button>
                    </SettingsCard>
                </div>
            </div>
        </main>
        
        <footer className="p-6 border-t border-slate-200 bg-slate-100/50 rounded-b-3xl flex justify-end gap-4">
            <button onClick={onClose} className="px-6 py-2 rounded-full font-bold text-gray-600 hover:bg-gray-200 transition-colors">Cancel</button>
            <button onClick={handleSave} className="px-8 py-2 rounded-full font-bold text-white bg-green-500 hover:bg-green-600 shadow-lg hover:shadow-xl transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300">Save Settings</button>
        </footer>
      </div>
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