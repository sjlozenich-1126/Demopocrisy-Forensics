import React, { useState } from 'react';
import { useData } from '../context/DataContext';
import { Lock, ShieldCheck, Key, AlertCircle, X, Check } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const { loginAdmin } = useData();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(password)) {
      setError(false);
      setPassword('');
      onSuccess();
    } else {
      setError(true);
    }
  };

  const handleQuickDemoLogin = () => {
    loginAdmin('admin2026');
    setError(false);
    setPassword('');
    onSuccess();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
      <div 
        className="w-full max-w-md bg-[#f8f7f4] border-2 border-[#111111] shadow-2xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-black cursor-pointer border border-[#111111]/20 hover:border-[#111111]"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-[#111111] text-[#f8f7f4] flex items-center justify-center">
            <Lock className="w-6 h-6 text-[#ff3b00]" />
          </div>
          <div>
            <span className="mono text-[#ff3b00] font-bold block">
              // Editorial Access
            </span>
            <h3 className="font-serif text-2xl font-semibold text-[#111111]">
              CMS Authentication
            </h3>
          </div>
        </div>

        <p className="text-xs text-neutral-600 mb-6 leading-relaxed font-sans border-b border-neutral-200 pb-4">
          Authorized editors can manage case dockets, publish dispatches, update timeline milestones, and moderate public submissions.
        </p>

        {error && (
          <div className="mb-4 p-3 bg-red-50 border-2 border-[#FF3B00] text-xs text-[#FF3B00] font-mono flex items-center gap-2 font-bold">
            <AlertCircle className="w-4 h-4 text-[#FF3B00] shrink-0" />
            <span>Invalid passcode. Preset: <strong className="underline">admin2026</strong>.</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] mono font-bold text-[#111111] uppercase mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#ff3b00]" /> Enter Passcode
            </label>
            <input
              type="password"
              placeholder="Enter passcode (e.g. admin2026)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border border-[#111111]/30 text-sm focus:outline-none focus:border-[#ff3b00] mono"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="px-3.5 py-2 text-xs mono font-bold bg-[#f1efe9] hover:bg-neutral-200 text-[#111111] border border-[#111111]/20 transition cursor-pointer flex items-center gap-1.5 uppercase"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Quick Fill
            </button>

            <button
              type="submit"
              className="cta-btn text-[0.68rem] px-5 py-2"
            >
              <ShieldCheck className="w-4 h-4" /> Enter CMS
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-[#111111]/10 text-center text-[11px] mono text-neutral-500">
          Default Passcode: <span className="font-bold text-[#111111] bg-[#f1efe9] px-2 py-0.5 border border-[#111111]/15">admin2026</span>
        </div>
      </div>
    </div>
  );
};
