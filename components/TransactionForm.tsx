import React, { useState } from 'react';
import type { Settings } from '../App';
import { PlusCircleIcon, MinusCircleIcon, PiggyBankIcon } from './Icons';

interface TransactionFormProps {
    settings: Settings;
    onTransaction: (minutes: number, reason: string, teacher: string, type: 'add' | 'deduct' | 'save') => void;
    balanceMinutes: number;
}

const CustomSelect: React.FC<React.SelectHTMLAttributes<HTMLSelectElement> & { options: (string|number)[] }> = ({ options, ...props }) => (
     <select {...props} className="w-full px-4 py-3 text-lg bg-white rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 appearance-none bg-no-repeat bg-right-4" style={{backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundSize: '1.5rem'}}>
        {options.map(option => (
            <option key={option} value={option}>{option}</option>
        ))}
    </select>
);

const ActionButton: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement> & { label: string, icon: React.ReactNode, color: string }> = ({ label, icon, color, ...props }) => (
    <button {...props} className={`w-full flex items-center justify-center gap-3 px-4 py-4 rounded-2xl font-bold text-white shadow-lg transform transition-all duration-200 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 ${color}`}>
        {icon}
        <span className="text-lg">{label}</span>
    </button>
);


export const TransactionForm: React.FC<TransactionFormProps> = ({ settings, onTransaction }) => {
    const [time, setTime] = useState<number>(settings.timeOptions[0] || 5);
    const [reason, setReason] = useState<string>(settings.reasonOptions[0] || '');
    const [teacher, setTeacher] = useState<string>(settings.teachers[0] || '');
    
    const handleSubmit = (type: 'add' | 'deduct' | 'save') => {
        if (!time || !reason || !teacher) {
            alert("Please ensure all fields are selected.");
            return;
        }
        onTransaction(Number(time), reason, teacher, type);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Time (minutes)</label>
                <CustomSelect options={settings.timeOptions} value={time} onChange={e => setTime(Number(e.target.value))}/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Reason / Category</label>
                <CustomSelect options={settings.reasonOptions} value={reason} onChange={e => setReason(e.target.value)}/>
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Teacher</label>
                 <CustomSelect options={settings.teachers} value={teacher} onChange={e => setTeacher(e.target.value)}/>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                 <ActionButton 
                    label="Add Time"
                    icon={<PlusCircleIcon className="w-7 h-7"/>}
                    color="bg-gradient-to-br from-green-400 to-emerald-500 ring-green-300"
                    onClick={() => handleSubmit('add')}
                />
                 <ActionButton 
                    label="Deduct Time"
                    icon={<MinusCircleIcon className="w-7 h-7"/>}
                    color="bg-gradient-to-br from-red-400 to-rose-500 ring-red-300"
                    onClick={() => handleSubmit('deduct')}
                />
            </div>
            <div className="pt-2">
                 <ActionButton 
                    label="Save Time"
                    icon={<PiggyBankIcon className="w-7 h-7"/>}
                    color="bg-gradient-to-br from-yellow-400 to-amber-500 ring-yellow-300"
                    onClick={() => handleSubmit('save')}
                />
            </div>
        </div>
    );
};