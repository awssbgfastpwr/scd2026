import { cn } from '../lib/utils';

export interface NeoInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export function NeoInput({ label, className, ...props }: NeoInputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="font-heading font-semibold text-sm uppercase mb-2 block text-textPrimary">
          {label}
        </label>
      )}
      <input
        className={cn(
          "rounded-none bg-white border-[3px] border-black shadow-neo px-4 py-3.5 font-body text-base w-full outline-none transition-colors",
          "focus:border-tertiary focus:shadow-[6px_6px_0px_0px_#4ECDC4]",
          className
        )}
        {...props}
      />
    </div>
  );
}
