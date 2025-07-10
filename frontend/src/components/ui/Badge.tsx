import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  variant?: 'success' | 'warning' | 'danger';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'success', children, className }: BadgeProps) {
  const baseStyles = {
    fontFamily: 'SF Pro',
    fontWeight: 590,
    fontSize: '12px',
    lineHeight: '16px',
    textAlign: 'center' as const,
    borderRadius: '4px',
    padding: '1px 6px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid'
  };

  const variantStyles = variant === 'success' 
    ? {
        backgroundColor: '#CEF6BB',
        borderColor: '#B4E1A2',
        color: '#05690D'
      }
    : variant === 'warning'
    ? {
        backgroundColor: '#FEF3C7',
        borderColor: '#FCD34D',
        color: '#92400E'
      }
    : {
        backgroundColor: '#FEE2E2',
        borderColor: '#FECACA',
        color: '#DC2626'
      };

  return (
    <span
      style={{
        ...baseStyles,
        ...variantStyles
      }}
      className={cn(className)}
    >
      {children}
    </span>
  );
}
