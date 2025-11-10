// Fix: Explicitly include React's type definitions to solve issues with unrecognized JSX intrinsic elements.
/// <reference types="react" />

import React from 'react';

interface ActionButtonProps {
  onClick: () => void;
  label: string;
  color: 'pink' | 'blue' | 'teal';
  icon: React.ReactNode;
}

const colorClasses = {
  pink: 'bg-pink-500 hover:bg-pink-600 text-white ring-pink-300',
  blue: 'bg-blue-500 hover:bg-blue-600 text-white ring-blue-300',
  teal: 'bg-teal-500 hover:bg-teal-600 text-white ring-teal-300',
};

export const ActionButton: React.FC<ActionButtonProps> = ({ onClick, label, color, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-bold shadow-md transform transition-all duration-200 hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-4 ${colorClasses[color]}`}
    >
      {icon}
      {label}
    </button>
  );
};