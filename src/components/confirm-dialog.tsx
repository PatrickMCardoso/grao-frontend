'use client';

import { AlertTriangle, X } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from './ui/button';

interface ConfirmDialogProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onConfirm: () => void;
  readonly title: string;
  readonly description: string;
  readonly confirmText?: string;
  readonly cancelText?: string;
  readonly variant?: 'danger' | 'warning' | 'default';
}

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'default',
}: ConfirmDialogProps) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const variantStyles = {
    danger: 'bg-red-50 text-red-700 border-red-200',
    warning: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    default: 'bg-neutral-50 text-neutral-700 border-neutral-200',
  };

  const iconColor = {
    danger: 'text-red-500',
    warning: 'text-yellow-500',
    default: 'text-neutral-500',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <button
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar modal"
      />

      <div className="relative mx-4 w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-600"
        >
          <X className="h-4 w-4" />
        </button>

        <div
          className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full border ${variantStyles[variant]}`}
        >
          <AlertTriangle className={`h-6 w-6 ${iconColor[variant]}`} />
        </div>

        <div className="mb-6">
          <h3 className="mb-2 text-lg font-semibold text-neutral-900">{title}</h3>
          <p className="text-sm text-neutral-600">{description}</p>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" onClick={onClose} className="flex-1">
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            className={`flex-1 ${
              variant === 'danger' ? 'bg-red-600 text-white hover:bg-red-700' : ''
            }`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
}
