import { createContext, useCallback, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CircleAlert, CircleCheck, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

const iconByType = {
  success: CircleCheck,
  error: CircleAlert,
  info: Info,
};

const styleByType = {
  success: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  error: 'border-rose-200 bg-rose-50 text-rose-800',
  info: 'border-sky-200 bg-sky-50 text-sky-800',
};

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(({ type = 'info', title, message, duration = 3200 }) => {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    window.setTimeout(() => {
      removeToast(id);
    }, duration);
  }, [removeToast]);

  const value = useMemo(() => ({ showToast, removeToast }), [showToast, removeToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed right-4 top-4 z-[70] flex w-[calc(100vw-2rem)] max-w-sm flex-col gap-3">
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon = iconByType[toast.type] || Info;
            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 32 }}
                className={`pointer-events-auto rounded-xl border p-3 shadow-soft ${styleByType[toast.type] || styleByType.info}`}
              >
                <div className="flex items-start gap-2">
                  <Icon className="mt-0.5 h-4 w-4 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{toast.title}</p>
                    {toast.message ? <p className="text-xs opacity-90">{toast.message}</p> : null}
                  </div>
                  <button
                    onClick={() => removeToast(toast.id)}
                    className="rounded p-1 opacity-70 transition hover:opacity-100"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export default ToastContext;
