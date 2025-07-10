interface FilterProps {
  label: string;
  value?: string;
  isActive?: boolean;
  onRemove?: () => void;
}

export function Filter({ label, value, isActive = false, onRemove }: FilterProps) {
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
    gap: '6px',
    border: '1px solid',
    cursor: 'pointer'
  };

  const activeStyles = {
    backgroundColor: '#ffffff',
    borderColor: '#0085FF',
    color: '#717171'
  };

  const inactiveStyles = {
    backgroundColor: '#ffffff',
    borderColor: '#E5E7EB',
    color: '#717171'
  };

  const valueStyles = {
    color: isActive ? '#0085FF' : '#717171'
  };

  return (
    <div
      style={{
        ...baseStyles,
        ...(isActive ? activeStyles : inactiveStyles)
      }}
    >
      <span>{label}</span>
      {isActive && value && (
        <>
          <div style={{
            width: '0px',
            height: '12px',
            border: '0.5px solid #E5E7EB'
          }} />
          <span style={valueStyles}>{value}</span>
          {onRemove && (
            <button 
              onClick={onRemove}
              style={{
                width: '12px',
                height: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0
              }}
            >
              <img 
                src="/images/cancel-icon.svg" 
                alt="Remove filter"
                style={{
                  width: '10px',
                  height: '10px'
                }}
              />
            </button>
          )}
        </>
      )}
    </div>
  );
}
