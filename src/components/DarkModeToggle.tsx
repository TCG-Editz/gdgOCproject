'use client';
import { useState, useEffect } from 'react';

export default function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(prev => !prev)}
      className="fixed top-4 right-4 z-50 px-3 py-1 rounded bg-muted text-foreground dark:bg-muted-foreground dark:text-background shadow-md transition-colors"
    >
      {isDark ? '💡' : '🌙'}
    </button>
  );
}
