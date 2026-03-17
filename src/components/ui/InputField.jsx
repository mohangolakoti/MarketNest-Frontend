import { forwardRef } from 'react';
import { cn } from '../../utils/cn';

const InputField = forwardRef(function InputField(
  {
    id,
    label,
    error,
    className,
    type = 'text',
    ...props
  },
  ref
) {
  return (
    <div className="w-full">
      <div className="relative">
        <input
          id={id}
          ref={ref}
          type={type}
          className={cn(
            'peer w-full rounded-xl border border-slate-300 bg-white px-4 pb-2 pt-6 text-sm text-slate-900 shadow-sm transition focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-200',
            error && 'border-rose-400 focus:border-rose-500 focus:ring-rose-200',
            className
          )}
          placeholder=" "
          {...props}
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 rounded bg-white px-1 text-sm text-slate-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs peer-focus:font-semibold peer-focus:text-brand-600 peer-[&:not(:placeholder-shown)]:top-2 peer-[&:not(:placeholder-shown)]:text-xs"
        >
          {label}
        </label>
      </div>
      {error ? <p className="mt-1 text-xs text-rose-600">{error}</p> : null}
    </div>
  );
});

export default InputField;
