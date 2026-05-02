import { NAVY } from '@/data/constants';

/** 이모지 아이콘 래퍼 */
export function Icon({ children }) {
  return (
    <span
      className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-base leading-none"
      aria-hidden="true"
    >
      {children}
    </span>
  );
}

/** 히어로 섹션 정보 필 */
export function InfoPill({ icon, label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4 backdrop-blur">
      <div className="mb-2 flex items-center gap-2 text-blue-200">
        <Icon>{icon}</Icon>
        <span className="text-xs">{label}</span>
      </div>
      <p className="font-semibold">{value}</p>
    </div>
  );
}

/** 핵심 전략 카드 */
export function Strategy({ title, desc }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <p className="font-bold" style={{ color: NAVY }}>{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
    </div>
  );
}

/** 일정 카드 내 미니 정보 셀 */
export function Mini({ icon, label, value }) {
  return (
    <div className="rounded-xl border bg-white p-3">
      <div className="mb-1 flex items-center gap-2 text-xs font-semibold text-slate-500">
        <Icon>{icon}</Icon>
        {label}
      </div>
      <p className="text-sm leading-5">{value}</p>
    </div>
  );
}
