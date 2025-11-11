import React from 'react';
import { LaptopIcon, PiggyBankIcon, CalendarIcon } from './Icons';

interface SummaryCardProps {
    balanceMinutes: number;
    savedMinutes: number;
    conversionRate: number;
    dailyAllowance?: number;
}

const formatCurrency = (amount: number) => `RM${amount.toFixed(2)}`;

const Stat: React.FC<{ icon: React.ReactNode, label: string, value: string | number, valueColor: string }> = ({ icon, label, value, valueColor }) => (
    <div className="flex-1 bg-white/50 p-4 rounded-2xl flex items-center gap-4 transition-all duration-300 hover:shadow-md hover:bg-white/80">
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-sm text-gray-500">{label}</p>
            <p className={`text-3xl font-black ${valueColor} drop-shadow-sm`}>{value}</p>
        </div>
    </div>
);

export const SummaryCard: React.FC<SummaryCardProps> = ({ balanceMinutes, savedMinutes, conversionRate, dailyAllowance }) => {
    const savedRMValue = savedMinutes * conversionRate;

    return (
        <div className="w-full bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg p-6 md:p-8 transform transition-transform duration-500 hover:scale-[1.02]">
            <div className="flex flex-col md:flex-row gap-4 md:gap-6">
                 {dailyAllowance !== undefined && (
                     <Stat 
                        icon={<CalendarIcon className="text-purple-500" />}
                        label="Daily Allowance"
                        value={`${dailyAllowance} min`}
                        valueColor="text-purple-600"
                    />
                 )}
                <Stat 
                    icon={<LaptopIcon className="text-blue-500" />}
                    label="Time Left Today"
                    value={`${balanceMinutes} min`}
                    valueColor="text-blue-600"
                />
                 <Stat 
                    icon={<PiggyBankIcon className="text-yellow-600" />}
                    label="Total Saved"
                    value={formatCurrency(savedRMValue)}
                    valueColor="text-yellow-600"
                />
            </div>
        </div>
    );
};