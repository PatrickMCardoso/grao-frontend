'use client';

import { CheckCircle, X, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ToastProps {
  readonly message: string;
  readonly type: 'success' | 'error';
  readonly isVisible: boolean;
  readonly onClose: () => void;
  readonly duration?: number;
}

export function Toast({ message, type, isVisible, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    if (isVisible && duration > 0) {
      const timer = setTimeout(onClose, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const typeStyles = {
    success: {
      container: 'bg-green-50 border-green-200 text-green-800',
      icon: 'text-green-500',
      IconComponent: CheckCircle,
    },
    error: {
      container: 'bg-red-50 border-red-200 text-red-800',
      icon: 'text-red-500',
      IconComponent: XCircle,
    },
  };

  const { container, icon, IconComponent } = typeStyles[type];

  return (
    <div className="animate-in slide-in-from-top-2 fixed top-4 right-4 z-50 duration-300">
      <div
        className={`flex items-center gap-3 rounded-lg border p-4 shadow-lg ${container} max-w-md min-w-[300px]`}
      >
        <IconComponent className={`h-5 w-5 shrink-0 self-center ${icon}`} />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="shrink-0 rounded-full p-1 hover:bg-black/10"
          aria-label="Fechar notificação"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

export function useToast() {
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
    isVisible: boolean;
  } | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
  };

  const hideToast = () => {
    setToast((prev) => (prev ? { ...prev, isVisible: false } : null));
  };

  const showSuccess = (message: string) => showToast(message, 'success');
  const showError = (message: string) => showToast(message, 'error');

  return {
    toast,
    showSuccess,
    showError,
    hideToast,
  };
}
