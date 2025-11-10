
import React, { useState, useEffect } from 'react';
import { SparklesIcon } from './Icons';

const messages = [
  "Great job saving for tomorrow!",
  "Every ringgit saved is a step towards your goal!",
  "Smart choices lead to more fun time!",
  "You're a budgeting superstar!",
  "Balance is the key to success and fun!",
  "Planning your time is a superpower!",
  "Keep up the amazing work!",
];

export const MotivationalMessage: React.FC = () => {
  const [message, setMessage] = useState('');

  useEffect(() => {
    setMessage(messages[Math.floor(Math.random() * messages.length)]);
  }, []);

  return (
    <div className="bg-yellow-100 border-2 border-yellow-300 text-yellow-800 rounded-full px-6 py-3 shadow-md flex items-center justify-center gap-3">
        <SparklesIcon className="w-6 h-6 text-yellow-500" />
        <p className="font-bold text-center">{message}</p>
    </div>
  );
};
