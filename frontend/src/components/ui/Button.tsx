import React from 'react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md';
  children: React.ReactNode;
}

export function Button({ 
  variant = 'primary', 
  size = 'md', 
  className, 
  children, 
  ...props 
}: ButtonProps) {
  const baseStyles = {
    fontFamily: 'SF Pro',
    fontWeight: 590,
    fontSize: '14px',
    lineHeight: '20px',
    textAlign: 'center' as const,
    borderRadius: '4px',
    padding: '4px 8px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  };

  const variantStyles = variant === 'primary' 
    ? {
        backgroundColor: '#0085FF',
        borderColor: '#0085FF',
        color: '#FFFFFF'
      }
    : {
        backgroundColor: '#EBEEF1',
        borderColor: '#EBEEF1',
        color: '#393B3E'
      };

  return (
    <button
      style={{
        ...baseStyles,
        ...variantStyles
      }}
      className={cn(
        'hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
