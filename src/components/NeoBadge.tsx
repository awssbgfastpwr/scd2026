import { cn } from '../lib/utils';

export interface NeoBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'danger' | 'primary' | 'secondary';
}

export function NeoBadge({ variant = 'primary', children, className, ...props }: NeoBadgeProps) {
  
  const variants = {
    success: 'bg-success text-black',
    warning: 'bg-warning text-black',
    danger: 'bg-danger text-black',
    primary: 'bg-primary text-black',
    secondary: 'bg-secondary text-black',
  };

  return (
    <span 
      className={cn(
        "rounded-none px-3 py-1 border-[3px] border-black font-heading font-semibold text-xs uppercase inline-block",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
