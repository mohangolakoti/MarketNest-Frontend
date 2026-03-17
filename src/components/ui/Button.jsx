import { LoaderCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

const variantClasses = {
  primary:
    'bg-brand-500 text-white hover:bg-brand-600 focus-visible:ring-brand-500',
  secondary:
    'bg-white text-slate-700 border border-slate-300 hover:bg-slate-100 focus-visible:ring-slate-400',
  ghost:
    'bg-transparent text-slate-700 hover:bg-slate-100 focus-visible:ring-slate-300',
};

function Button({
  children,
  className,
  variant = 'primary',
  loading = false,
  disabled = false,
  ...props
}) {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60',
        variantClasses[variant],
        className
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoaderCircle className="h-4 w-4 animate-spin" /> : null}
      {children}
    </button>
  );
}

export default Button;
