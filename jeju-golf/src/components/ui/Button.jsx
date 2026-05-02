const VARIANTS = {
  default: 'bg-[#0d1b3e] text-white border-[#0d1b3e] hover:bg-[#1a3a6b]',
  outline: 'bg-white text-slate-900 border-slate-300 hover:bg-slate-50',
};

export function Button({ variant = 'outline', className = '', onClick, children }) {
  return (
    <button
      className={`inline-flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer border ${VARIANTS[variant]} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
