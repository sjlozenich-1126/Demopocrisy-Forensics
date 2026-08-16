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
        className="w-full max-w-md bg-white border-4 border-black shadow-2xl p-6 sm:p-8 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-black cursor-pointer border border-neutral-200 hover:border-black"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-black text-white flex items-center justify-center border-2 border-black">
            <Lock className="w-6 h-6 text-[#FF3B00]" />
          </div>
          <div>
            <span className="text-[10px] text-[#FF3B00] font-mono font-black uppercase tracking-widest block">
              // Editorial Access
            </span>
            <h3 className="font-serif font-black text-xl text-black">
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
            <label className="block text-[11px] font-mono font-black text-black uppercase mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-[#FF3B00]" /> Enter Passcode
            </label>
            <input
              type="password"
              placeholder="Enter passcode (e.g. admin2026)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2.5 bg-white border-2 border-black text-sm focus:outline-none focus:border-[#FF3B00] font-mono font-bold"
              autoFocus
            />
          </div>

          <div className="flex items-center justify-between gap-3 pt-2">
            <button
              type="button"
              onClick={handleQuickDemoLogin}
              className="px-3.5 py-2 text-xs font-mono font-bold bg-neutral-100 hover:bg-neutral-200 text-black border border-neutral-300 transition cursor-pointer flex items-center gap-1.5 uppercase"
            >
              <Check className="w-3.5 h-3.5 text-emerald-600" /> Quick Fill
            </button>

            <button
              type="submit"
              className="px-5 py-2 text-xs font-mono font-black bg-[#FF3B00] hover:bg-black text-white transition cursor-pointer flex items-center gap-1.5 uppercase tracking-wider border border-black"
            >
              <ShieldCheck className="w-4 h-4" /> Enter CMS
            </button>
          </div>
        </form>

        <div className="mt-6 pt-4 border-t border-neutral-200 text-center text-[11px] font-mono text-neutral-500">
          Default Passcode: <span className="font-bold text-black bg-neutral-100 px-2 py-0.5 border border-neutral-300">admin2026</span>
        </div>
      </div>
    </div>
  );
};
