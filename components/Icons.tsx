// Fix: Explicitly include React's type definitions to solve issues with unrecognized JSX intrinsic elements.
/// <reference types="react" />

import React from 'react';

export const WalletIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0-2.25-4.5M3 12l2.25-4.5M12 15v.01" />
  </svg>
);

export const LaptopIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-1.621-.87a3 3 0 0 1-.879-2.122v-1.007M15 15.75a3 3 0 0 0-3-3m0 0a3 3 0 0 0-3 3m3-3V11.25m3 4.5v-1.372c0-.98-.787-1.773-1.75-1.773h-3.5c-.963 0-1.75.793-1.75 1.773v1.372m5.25 0v-4.5a2.25 2.25 0 0 0-2.25-2.25H9a2.25 2.25 0 0 0-2.25 2.25v4.5m5.25 0h-5.25" />
  </svg>
);

export const PiggyBankIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
     <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18Z" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 13.5a2.25 2.25 0 1 1 3 0m-3 0V15m3-1.5V15m-3-4.5a2.25 2.25 0 1 0 3 0m-3 0V12m3-1.5V12" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5c-.777.23-1.5.553-2.162.962" />
     <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 7.5c.777.23 1.5.553 2.162.962" />
  </svg>
);

export const CoinIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125h-.375m1.5-3.375v3.375m-18 0h1.5m14.25-3.375h1.5m-1.5 3.375h1.5M3.75 16.5h1.5m14.25 0h1.5M12 8.25v7.5" />
  </svg>
);

export const PlusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const MinusCircleIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const SaveIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props} className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375" />
  </svg>
);

export const ChartBarIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
    </svg>
);

export const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);


// Banknote Icons
const NoteBase: React.FC<React.SVGProps<SVGSVGElement> & { children: React.ReactNode, gradientId: string }> = ({ children, gradientId, ...props }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 50" {...props}>
        <rect width="100" height="50" rx="4" fill={`url(#${gradientId})`} />
        {children}
        <rect x="2" y="2" width="96" height="46" rx="2" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
    </svg>
);

const noteTextStyle = { fontFamily: "'Nunito', sans-serif", fill: "white", fontWeight: "900", textShadow: "1px 1px 2px rgba(0,0,0,0.3)" };

export const RM50NoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <NoteBase gradientId="grad50" {...props}>
        <defs>
            <linearGradient id="grad50" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#2dd4bf' }} />
                <stop offset="100%" style={{ stopColor: '#38bdf8' }} />
            </linearGradient>
        </defs>
        <text x="8" y="16" fontSize="12" style={noteTextStyle}>50</text>
        <text x="92" y="42" fontSize="10" textAnchor="end" style={noteTextStyle}>RM</text>
    </NoteBase>
);

export const RM20NoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <NoteBase gradientId="grad20" {...props}>
        <defs>
            <linearGradient id="grad20" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#fb923c' }} />
                <stop offset="100%" style={{ stopColor: '#facc15' }} />
            </linearGradient>
        </defs>
        <text x="8" y="16" fontSize="12" style={noteTextStyle}>20</text>
        <text x="92" y="42" fontSize="10" textAnchor="end" style={noteTextStyle}>RM</text>
    </NoteBase>
);

export const RM10NoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <NoteBase gradientId="grad10" {...props}>
        <defs>
            <linearGradient id="grad10" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f43f5e' }} />
                <stop offset="100%" style={{ stopColor: '#fb7185' }} />
            </linearGradient>
        </defs>
        <text x="8" y="16" fontSize="12" style={noteTextStyle}>10</text>
        <text x="92" y="42" fontSize="10" textAnchor="end" style={noteTextStyle}>RM</text>
    </NoteBase>
);

export const RM5NoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <NoteBase gradientId="grad5" {...props}>
        <defs>
            <linearGradient id="grad5" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#4ade80' }} />
                <stop offset="100%" style={{ stopColor: '#86efac' }} />
            </linearGradient>
        </defs>
        <text x="8" y="16" fontSize="12" style={noteTextStyle}>5</text>
        <text x="92" y="42" fontSize="10" textAnchor="end" style={noteTextStyle}>RM</text>
    </NoteBase>
);

export const RM1NoteIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <NoteBase gradientId="grad1" {...props}>
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#60a5fa' }} />
                <stop offset="100%" style={{ stopColor: '#93c5fd' }} />
            </linearGradient>
        </defs>
        <text x="8" y="16" fontSize="12" style={noteTextStyle}>1</text>
        <text x="92" y="42" fontSize="10" textAnchor="end" style={noteTextStyle}>RM</text>
    </NoteBase>
);