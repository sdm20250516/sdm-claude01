import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Icon, InfoPill, Strategy, Mini } from '@/components/shared/Helpers';
import {
  NAVY, ICONS,
  lodgingPlans, getLodgingPlan,
  schedule, mapLocations, mapRoutes,
  golfCourses, bookingPlatforms, otherLinks,
  bookingPriority, costs,
} from '@/data/constants';

/* ══════════════════════════════════════════════════════════
   메인 컴포넌트
══════════════════════════════════════════════════════════ */
export default function JejuGolfTourWebsite() {
  const [lodgingPlan, setLodgingPlan] = useState('company');
  const selected = useMemo(() => getLodgingPlan(lodgingPlan), [lodgingPlan]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <HeroSection />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <StrategySection />
        <LodgingSection selected={selected} lodgingPlan={lodgingPlan} setLodgingPlan={setLodgingPlan} />
        <MapSection />
        <ScheduleSection />
        <ReservationSection />
        <BookingAndCostSection />
      </main>
    </div>
  );
}

/* ── Hero ─────────────────────────────────────────────── */
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-6 py-12 text-white"
      style={{ background: `linear-gradient(135deg,${NAVY} 0%,#1a3a6b 60%,#1e5096 100%)` }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="mb-3 text-sm font-medium tracking-[0.3em] text-blue-200">JEJU GOLF TOUR</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">제주 골프투어 실행 패키지</h1>
          <p className="mt-5 max-w-3xl text-lg text-blue-100">
            6월 2일~5일, 직장 동료 2명 + 제주 현지 지인 1명. 4회 라운딩, 지인 차량 이동, 간단 술자리 중심의 관계형 골프 여행.
          </p>
          <div className="mt-8 grid gap-3 md:grid-cols-4">
            <InfoPill icon={ICONS.calendar} label="3박 4일"  value="2026.06.02~06.05" href="#schedule" />
            <InfoPill icon={ICONS.plane}    label="항공"     value="김포 ↔ 제주"       href="#booking" />
            <InfoPill icon={ICONS.flag}     label="라운딩"   value="9홀 1회 + 18홀 3회" href="#reservation" />
            <InfoPill icon={ICONS.car}      label="이동"     value="지인 차량 찬스"    href="#map" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Strategy ─────────────────────────────────────────── */
function StrategySection() {
  return (
    <section className="mb-10 grid gap-5 md:grid-cols-3">
      <Card className="rounded-2xl shadow-sm ring-1 ring-slate-200 md:col-span-2">
        <CardContent className="p-6">
          <div className="mb-5 flex items-center gap-2">
            <Icon>{ICONS.trophy}</Icon>
            <h2 className="text-2xl font-bold" style={{ color: NAVY }}>핵심 전략</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            <Strategy title="가성비"      desc="회사 숙소 당첨을 최우선, 미당첨 시 우주항공호텔 백업" />
            <Strategy title="편한 라운딩"  desc="동부 이동은 배제하고 서부·중문권 중심으로 압축" />
            <Strategy title="관계 중심"   desc="맛집 투어보다 지인과 편하게 대화하는 저녁 구성" />
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm ring-1 ring-slate-200">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon>{ICONS.wallet}</Icon>
            <h2 className="text-xl font-bold" style={{ color: NAVY }}>총 예산</h2>
          </div>
          <p className="text-3xl font-bold" style={{ color: NAVY }}>약 95~120만원</p>
          <p className="mt-2 text-sm text-slate-600">1인 기준 예상 범위. 골프장·항공·숙소 확정 시 변동 가능.</p>
        </CardContent>
      </Card>
    </section>
  );
}

/* ── Lodging ──────────────────────────────────────────── */
function LodgingSection({ selected, lodgingPlan, setLodgingPlan }) {
  return (
    <section className="mb-10">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold" style={{ color: NAVY }}>숙소 플랜 선택</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'company',  label: '회사 숙소' },
            { key: 'fallback', label: '우주항공호텔' },
            { key: 'hybrid',   label: '리조트 패키지' },
          ].map(({ key, label }) => (
            <Button key={key} variant={lodgingPlan === key ? 'default' : 'outline'} onClick={() => setLodgingPlan(key)}>
              {label}
            </Button>
          ))}
        </div>
      </div>
      <Card className="rounded-2xl shadow-sm ring-1 ring-slate-200">
        <CardContent className="grid gap-6 p-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="mb-3 flex items-center gap-2">
              <Icon>{ICONS.hotel}</Icon>
              <h3 className="text-xl font-bold" style={{ color: NAVY }}>{selected.title}</h3>
            </div>
            <p className="text-slate-700">{selected.subtitle}</p>
            <p className="mt-4 rounded-xl bg-slate-100 p-4 font-semibold">{selected.cost}</p>
            <div className="mt-4 grid gap-2 md:grid-cols-3">
              {selected.pros.map((p) => (
                <div key={p} className="flex items-start gap-2 rounded-xl border bg-white p-3 text-sm">
                  <Icon>{ICONS.check}</Icon><span>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-amber-50 p-5">
            <div className="mb-2 flex items-center gap-2 font-bold text-amber-900">
              <Icon>{ICONS.alert}</Icon>주의 포인트
            </div>
            <p className="text-sm leading-6 text-amber-900">{selected.caution}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ── Map ──────────────────────────────────────────────── */
function MapSection() {
  const getLocation = (name) => mapLocations.find((l) => l.name === name);
  return (
    <section id="map" className="mb-10">
      <Card className="rounded-2xl shadow-sm ring-1 ring-slate-200">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon>{ICONS.map}</Icon>
            <h2 className="text-2xl font-bold" style={{ color: NAVY }}>제주 동선 지도</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
            {/* 지도 캔버스 */}
            <div className="relative min-h-[400px] overflow-visible rounded-3xl border bg-gradient-to-br from-sky-100 via-emerald-50 to-lime-100 p-5">
              <div className="absolute left-[10%] top-[12%] h-[75%] w-[80%] rounded-[48%] border-4 border-emerald-200 bg-white/60 shadow-inner" />
              <div className="absolute left-[16%] top-[18%] h-[62%] w-[68%] rounded-[45%] border border-emerald-300/70" />

              {/* SVG 경로선 */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ overflow: 'visible' }}>
                <defs>
                  <marker id="arrow" markerWidth="7" markerHeight="5" refX="5" refY="2.5" orient="auto">
                    <polygon points="0 0,7 2.5,0 5" fill={NAVY} opacity="0.55" />
                  </marker>
                </defs>
                {mapRoutes.map((route, idx) => {
                  const from = getLocation(route.from);
                  const to   = getLocation(route.to);
                  if (!from || !to) return null;
                  return (
                    <line key={idx}
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke={route.color} strokeWidth="2.5" strokeDasharray="7,5"
                      opacity="0.75" markerEnd="url(#arrow)"
                    />
                  );
                })}
              </svg>

              {/* 장소 마커 */}
              {mapLocations.map((loc) => (
                <div key={loc.name} className="absolute -translate-x-1/2 -translate-y-1/2 z-0 hover:z-[50]" style={{ left: loc.x, top: loc.y }}>
                  <div className="group relative flex flex-col items-center">
                    {/* 툴팁 — 아이콘 위에 팝업 */}
                    <div className="pointer-events-none absolute bottom-full left-1/2 z-[60] mb-3 w-52 -translate-x-1/2
                                    rounded-xl p-3 text-xs leading-5 text-white shadow-xl
                                    opacity-0 -translate-y-1 scale-95
                                    transition-all duration-200 ease-out
                                    group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100"
                         style={{ background: NAVY }}>
                      <p className="font-bold text-sm">{loc.name}</p>
                      <p className="mt-0.5 font-medium text-blue-300">{loc.type}</p>
                      <p className="mt-1 text-slate-300">{loc.desc}</p>
                      {/* 말풍선 화살표 */}
                      <div className="absolute left-1/2 top-full -translate-x-1/2 w-0 h-0"
                           style={{ borderLeft: '6px solid transparent', borderRight: '6px solid transparent', borderTop: `6px solid ${NAVY}` }} />
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-white shadow-lg ring-4 ring-white transition-transform duration-150 group-hover:scale-110" style={{ background: NAVY }}>
                      {loc.type === '공항' ? ICONS.plane : loc.type.includes('숙소') ? ICONS.hotel : ICONS.flag}
                    </div>
                    <div className="mt-1 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[11px] font-bold shadow-sm">{loc.name}</div>
                  </div>
                </div>
              ))}
              <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500">간이 지도: 실제 거리 비율 아님</div>
            </div>

            {/* 경로 목록 */}
            <div className="space-y-3">
              <h3 className="font-bold" style={{ color: NAVY }}>이동 경로 및 소요 시간</h3>
              {mapRoutes.map((route) => (
                <div key={route.from + route.to} className="flex gap-3 rounded-2xl border bg-white p-3 text-sm transition-shadow hover:shadow-sm">
                  <div className="mt-1.5 h-3 w-3 shrink-0 rounded-full" style={{ background: route.color }} />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{route.from} → {route.to}</p>
                    <div className="mt-1 flex gap-4 text-xs text-slate-500">
                      <span>{ICONS.road} {route.distance}</span>
                      <span>{ICONS.clock} {route.time}</span>
                    </div>
                  </div>
                  <span className="shrink-0 self-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">{route.label}</span>
                </div>
              ))}
              <div className="rounded-2xl p-4 text-sm leading-6 text-white" style={{ background: NAVY }}>
                <b className="text-amber-400">운영 원칙:</b> 동부권 이동은 제외하고, 공항·서부·중문권 안에서 라운딩을 묶어 체력 소모를 줄입니다.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ── Schedule ─────────────────────────────────────────── */
function ScheduleSection() {
  return (
    <section id="schedule" className="mb-10">
      <h2 className="mb-5 text-2xl font-bold" style={{ color: NAVY }}>일정 타임라인</h2>
      <div className="grid gap-5">
        {schedule.map((item, index) => (
          <motion.div key={item.day} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, delay: index * 0.07 }}>
            <Card className="rounded-2xl shadow-sm ring-1 ring-slate-200">
              <CardContent className="p-6">
                <div className="grid gap-4 md:grid-cols-[160px_1fr]">
                  <div>
                    <p className="text-sm font-semibold text-slate-500">{item.date}</p>
                    <p className="text-2xl font-bold" style={{ color: NAVY }}>{item.day}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                    <div className="mt-4 grid gap-3 md:grid-cols-3">
                      <Mini icon={ICONS.flag}     label="골프"     value={item.golf} />
                      <Mini icon={ICONS.calendar} label="권장 시간" value={item.time} />
                      <Mini icon={ICONS.food}     label="저녁"     value={item.dinner} />
                    </div>
                    <p className="mt-4 rounded-xl bg-slate-100 p-4 text-sm text-slate-700">{item.point}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── Reservation ──────────────────────────────────────── */
function ReservationSection() {
  return (
    <section id="reservation" className="mb-10">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Icon>{ICONS.link}</Icon>
        <h2 className="text-2xl font-bold" style={{ color: NAVY }}>골프장 예약 비교</h2>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          권장 티오프 시간 기준으로 가격 비교 후 예약
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {golfCourses.map((course) => <GolfCourseCard key={course.name} course={course} />)}
      </div>

      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {otherLinks.map((link) => (
          <a key={link.name} href={link.href} target="_blank" rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
            <div>
              <p className="font-bold text-slate-800">{link.name}</p>
              <p className="text-xs text-slate-500">{link.note}</p>
            </div>
            <span className="shrink-0 rounded-xl px-4 py-2 text-sm font-bold text-white" style={{ background: NAVY }}>
              {link.action}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function GolfCourseCard({ course }) {
  const isHigh = course.urgency === 'high';
  return (
    <Card className={`rounded-2xl shadow-sm ${isHigh ? 'border-2 border-red-200 bg-red-50/20' : 'border ring-1 ring-slate-200'}`}>
      <CardContent className="p-5">
        {/* 헤더 */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span className="rounded-full px-3 py-0.5 text-xs font-bold text-white" style={{ background: NAVY }}>{course.day}</span>
              <span className="text-xs text-slate-500">{course.date}</span>
              {isHigh && <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">최우선</span>}
            </div>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>{course.name}</h3>
            <p className="text-sm text-slate-500">{course.role}</p>
          </div>
          <a href={course.directHref} target="_blank" rel="noreferrer"
            className="shrink-0 rounded-xl border-2 px-3 py-2 text-xs font-bold transition-colors hover:text-white"
            style={{ borderColor: NAVY, color: NAVY }}
            onMouseEnter={(e) => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = ''; e.currentTarget.style.color = NAVY; }}>
            공식 예약
          </a>
        </div>

        {/* 티오프 */}
        <div className={`mb-4 flex items-center gap-2 rounded-xl p-3 text-sm font-semibold ${isHigh ? 'bg-red-100 text-red-800' : 'bg-blue-50 text-blue-800'}`}>
          <Icon>{ICONS.clock}</Icon>
          <span>권장 티오프:</span>
          <span className="font-bold">{course.teeTime}</span>
        </div>

        {/* 주의 */}
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
          <Icon>{ICONS.alert}</Icon><span>{course.caution}</span>
        </div>

        {/* 플랫폼 버튼 */}
        <div>
          <p className="mb-2 text-xs font-semibold text-slate-400">가격 비교 · 예약 채널</p>
          <div className="grid grid-cols-2 gap-2">
            {bookingPlatforms.map((p) => (
              <a key={p.name} href={p.href} target="_blank" rel="noreferrer"
                className={`flex items-center justify-center rounded-xl px-3 py-2 text-xs font-bold transition-transform hover:-translate-y-0.5 ${p.bg} ${p.text}`}>
                {p.name}
              </a>
            ))}
          </div>
          <p className="mt-2 text-center text-[10px] text-slate-400">
            각 채널에서 <b>{course.teeTime}</b> 가능 여부를 반드시 확인하세요
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ── Booking + Cost ───────────────────────────────────── */
function BookingAndCostSection() {
  return (
    <section id="booking" className="mb-10 grid gap-5 md:grid-cols-2">
      <Card className="rounded-2xl shadow-sm ring-1 ring-slate-200">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon>{ICONS.link}</Icon>
            <h2 className="text-2xl font-bold" style={{ color: NAVY }}>예약 우선순위</h2>
          </div>
          <div className="space-y-3">
            {bookingPriority.map((item, idx) => (
              <div key={item} className="flex gap-3 rounded-xl border bg-white p-3">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: NAVY }}>
                  {idx + 1}
                </div>
                <p className="text-sm leading-6">{item}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="rounded-2xl shadow-sm ring-1 ring-slate-200">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon>{ICONS.wallet}</Icon>
            <h2 className="text-2xl font-bold" style={{ color: NAVY }}>비용 구조</h2>
          </div>
          <div className="space-y-3">
            {costs.map((c) => (
              <div key={c.label} className="grid grid-cols-3 gap-3 rounded-xl border bg-white p-3 text-sm">
                <p className="font-bold" style={{ color: NAVY }}>{c.label}</p>
                <p>{c.value}</p>
                <p className="text-right text-slate-600">{c.total}</p>
              </div>
            ))}
          </div>
          <div className="mt-5 rounded-xl p-4 text-white" style={{ background: NAVY }}>
            <p className="text-sm text-blue-200">추천 기준</p>
            <p className="mt-1 font-semibold">회사 숙소 당첨 시 1인 95~105만원, 미당첨 시 105~120만원 범위로 관리</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

