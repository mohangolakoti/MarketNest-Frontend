import { cn } from '../../utils/cn';

function Card({ className, children }) {
  return (
    <div className={cn('rounded-2xl border border-white/60 bg-white p-5 shadow-soft', className)}>
      {children}
    </div>
  );
}

export default Card;
