import React from 'react';
import type { Transaction } from '../App';
import { ChartBarIcon } from './Icons';

interface VisualizationProps {
    transactions: Transaction[];
}

const Bar: React.FC<{ date: string; added: number; deducted: number; maxVal: number }> = ({ date, added, deducted, maxVal }) => {
    const addedHeight = maxVal > 0 ? (added / maxVal) * 100 : 0;
    const deductedHeight = maxVal > 0 ? (deducted / maxVal) * 100 : 0;

    return (
        <div className="flex flex-col items-center gap-2 flex-1">
            <div className="w-full h-32 flex items-end justify-center gap-1">
                <div 
                    className="w-full bg-green-300 rounded-t-md transition-all duration-500 hover:bg-green-400" 
                    style={{ height: `${addedHeight}%`}}
                    title={`Added: ${added} min`}
                ></div>
                <div 
                    className="w-full bg-red-300 rounded-t-md transition-all duration-500 hover:bg-red-400" 
                    style={{ height: `${deductedHeight}%`}}
                    title={`Deducted: ${deducted} min`}
                ></div>
            </div>
            <p className="text-xs text-gray-500">{date}</p>
        </div>
    );
};

export const Visualization: React.FC<VisualizationProps> = ({ transactions }) => {
    const dataByDay = React.useMemo(() => {
        const today = new Date();
        const past7Days: { [key: string]: { added: number; deducted: number } } = {};

        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(today.getDate() - i);
            const key = d.toISOString().split('T')[0];
            const day = d.toLocaleDateString('en-US', { weekday: 'short' });
            past7Days[key] = { added: 0, deducted: 0 };
        }
        
        transactions.forEach(tx => {
            const key = tx.date.split('T')[0];
            if (past7Days[key]) {
                if (tx.type === 'add') {
                    past7Days[key].added += tx.minutes;
                } else {
                    past7Days[key].deducted += tx.minutes;
                }
            }
        });
        
        return Object.entries(past7Days).map(([date, values]) => ({
            date: new Date(date).toLocaleDateString('en-US', { day: 'numeric', month: 'short' }),
            ...values,
        }));

    }, [transactions]);
    
    const maxVal = Math.max(...dataByDay.map(d => Math.max(d.added, d.deducted)), 10); // Ensure a minimum height

    return (
        <div>
            <h3 className="text-lg font-bold text-gray-700 mb-2 flex items-center gap-3">
                <ChartBarIcon className="w-6 h-6 text-gray-500" />
                Daily Activity (Last 7 Days)
            </h3>
            <div className="flex justify-between items-end gap-2 p-4 bg-gray-50/50 rounded-2xl h-48">
                {dataByDay.map(day => (
                    <Bar key={day.date} date={day.date} added={day.added} deducted={day.deducted} maxVal={maxVal} />
                ))}
            </div>
            <div className="flex justify-center items-center gap-6 mt-2 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-300 rounded-sm"></div>
                    <span className="text-gray-600">Minutes Added</span>
                </div>
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-300 rounded-sm"></div>
                    <span className="text-gray-600">Minutes Deducted</span>
                </div>
            </div>
        </div>
    );
};
