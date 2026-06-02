import { type ReactNode } from 'react';

interface FrostedCardProps {
  children: ReactNode;
  className?: string;
  strong?: boolean;
}

export function FrostedCard({ children, className = '', strong = false }: FrostedCardProps) {
  return (
    <div
      className={`rounded-xl ${strong ? 'glass-panel-strong' : 'glass-panel'} ${className}`}
    >
      {children}
    </div>
  );
}
