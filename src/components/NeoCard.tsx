import { cn } from '../lib/utils';

export interface NeoCardProps extends React.HTMLAttributes<HTMLDivElement> {
  bg?: string; // e.g., 'bg-white', 'bg-secondary'
}

export function NeoCard({ children, className, bg = 'bg-white', ...props }: NeoCardProps) {
  return (
    <div 
      className={cn(
        "rounded-none border-[3px] border-black shadow-neo p-6 md:p-8 transition-transform hover:-translate-y-1 hover:shadow-neo-hover",
        bg,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
