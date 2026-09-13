import { cn } from '../lib/utils';

export interface NeoButtonProps {
  variant?: 'primary' | 'secondary' | 'teal' | 'ghost' | 'danger';
  href?: string;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
}

export function NeoButton({ 
  variant = 'primary', 
  children, 
  className,
  disabled,
  href,
  onClick,
  type = 'button',
  target,
  rel
}: NeoButtonProps) {
  
  const baseStyles = "inline-flex items-center justify-center rounded-none border-[3px] border-black font-heading font-semibold uppercase text-sm tracking-wide px-6 py-3 transition-all";
  
  const variants = {
    primary: "bg-primary text-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-sm",
    secondary: "bg-secondary text-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-sm",
    teal: "bg-tertiary text-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-sm",
    ghost: "bg-white text-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] active:translate-x-[2px] active:translate-y-[2px]",
    danger: "bg-danger text-black shadow-neo hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-neo-sm active:translate-x-[2px] active:translate-y-[2px] active:shadow-neo-sm"
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed hover:translate-x-0 hover:translate-y-0 hover:shadow-neo" : "";

  const classes = cn(
    baseStyles,
    variants[variant],
    disabledStyles,
    className
  );

  if (href && !disabled) {
    return (
      <a href={href} className={classes} onClick={onClick} target={target} rel={rel}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} disabled={disabled} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
