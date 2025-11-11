import React from 'react';
import { ChevronDownIcon } from './Icons';

interface CollapsibleCardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
  headerActions?: React.ReactNode;
}

export const CollapsibleCard: React.FC<CollapsibleCardProps> = ({
  title,
  icon,
  children,
  isOpen,
  onToggle,
  className = '',
  headerActions,
}) => {
  return (
    <div className={`bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg overflow-hidden ${className}`}>
      <header
        className="flex justify-between items-center p-6 md:p-8 cursor-pointer select-none"
        onClick={onToggle}
        aria-expanded={isOpen}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onToggle(); } }}
      >
        <div className="flex items-center gap-4">
          {icon}
          <h2 className="text-2xl font-bold text-gray-700">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          {headerActions}
          <ChevronDownIcon
            className={`w-6 h-6 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
            aria-hidden="true"
          />
        </div>
      </header>
      <div
        className="transition-all duration-500 ease-in-out grid"
        style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                {children}
            </div>
        </div>
      </div>
    </div>
  );
};