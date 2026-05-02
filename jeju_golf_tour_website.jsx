import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const NAVY = "#0d1b3e";

const ICONS = {
  plane: "✈️",
  hotel: "🏨",
  flag: "⛳",
  calendar: "📅",
  car: "🚗",
  food: "🍽️",
  check: "✅",
  map: "📍",
  wallet: "💰",
  link: "🔗",
  trophy: "🏆",
  alert: "⚠️",
  clock: "⏱️",
  road: "🛣️",
};

const lodgingPlans = {
  company: {
    title: "1순위: 회사 숙소",
    subtitle: "제주 한화리조트 또는 소노벨 제주 당첨 시 사용",
    cost: "3인 기준 약 20~30만원 예상",
    pros: ["비용 효율 최고", "객실 여유", "동료 3인 숙박에 적합"],
    caution: "당첨 여부가 변수이므로 우주항공호텔을 취소 가능 옵션으로 백업 확보 권장",
  },
  fallback: {
    title: "2순위: 제주 우주항공호텔",
    subtitle: "회사 숙소 미당첨 시 사용하는 안정형 대안",
    cost: "3인 기준 약 40만원 예상",
    pros: ["가성비 안정", "예약 확정성 높음", "서부 골프 동선과 무난하게 연결"],
    caution: "조식 포함 여부와 3인 객실 타입을 예약 전 확인",
  },
  hybrid: {
    title: "선택 옵션: 골프 리조트 1박 패키지",
    subtitle: "엘리시안 등 숙박+조식+라운딩 패키지 일부 활용",
    cost: "3인 기준 총액 310~350만원 범위 예상",
    pros: ["골프 몰입도 상승", "조식·티오프 편의", "Day2 또는 Day3 피로 감소"],
    caution: "패키지는 일정 유연성이 낮아 티타임 확정 후 판단",
  },
};

const schedule = [
  {
    day: "Day 1",
    date: "6/2 화",
    title: "김포 출발 · 제주 도착 · 9홀 몸풀기",
    golf: "캐슬렉스 제주 9홀",
    time: "김포→제주 08:00~09:00대 출발 / 15:00~16:00 9홀 권장",
    dinner: "현지 지인 합류, 간단 술자리",
    point: "첫날은 무리하지 않고 스윙 적응과 관계 형성 중심",
  },
  {
    day: "Day 2",
    date: "6/3 수",
    title: "편한 18홀 라운딩",
    golf: "엘리시안 제주 CC",
    time: "08:00~09:00 티오프 권장",
    dinner: "흑돼지 또는 편한 로컬 식당",
    point: "일정의 안정감을 만드는 첫 18홀",
  },
  {
    day: "Day 3",
    date: "6/4 목",
    title: "메인 라운딩 · 핵심 만남",
    golf: "롯데스카이힐 제주 CC",
    time: "08:00 전후 티오프 권장",
    dinner: "조용한 대화 중심 저녁",
    point: "가장 좋은 컨디션을 배치하는 피크 데이, 과음 금지",
  },
  {
    day: "Day 4",
    date: "6/5 금",
    title: "오전 라운딩 후 귀가",
    golf: "라온 골프클럽",
    time: "07:00 티오프 필수 / 제주→김포 17:30 이후 권장",
    dinner: "공항 이동 전 간단 정리",
    point: "티오프 지연 시 항공 리스크가 커지므로 가장 이른 시간 확보",
  },
];

/* ── 지도 위치 ── */
const mapLocations = [
  { name: "제주공항",    type: "공항",      x: "22%", y: "25%", desc: "도착·출발 기준점" },
  { name: "우주항공호텔", type: "숙소",      x: "42%", y: "42%", desc: "회사 숙소 미당첨 시 백업" },
  { name: "한화/소노벨", type: "회사 숙소",  x: "56%", y: "35%", desc: "당첨 시 1순위 사용" },
  { name: "캐슬렉스 제주", type: "Day1",    x: "35%", y: "62%", desc: "첫날 9홀 몸풀기" },
  { name: "엘리시안 제주", type: "Day2",    x: "48%", y: "58%", desc: "편한 18홀" },
  { name: "롯데스카이힐", type: "Day3",     x: "65%", y: "70%", desc: "메인 라운딩" },
  { name: "라온 골프클럽", type: "Day4",    x: "27%", y: "45%", desc: "오전 라운딩 후 공항" },
];

/* ── 이동 경로 (SVG 선 + 거리/시간 표시용) ── */
const mapRoutes = [
  { from: "제주공항",    to: "우주항공호텔",  distance: "약 5km",  time: "15분",  label: "입도 이동",  color: "#64748b" },
  { from: "우주항공호텔", to: "캐슬렉스 제주", distance: "약 30km", time: "40분",  label: "Day 1",     color: "#3b82f6" },
  { from: "우주항공호텔", to: "엘리시안 제주", distance: "약 45km", time: "55분",  label: "Day 2",     color: "#22c55e" },
  { from: "우주항공호텔", to: "롯데스카이힐",  distance: "약 40km", time: "50분",  label: "Day 3",     color: "#f59e0b" },
  { from: "라온 골프클럽", to: "제주공항",    distance: "약 15km", time: "25분",  label: "Day 4 귀환", color: "#ef4444" },
];

/* ── 골프장별 예약 데이터 ── */
const golfCourses = [
  {
    name: "캐슬렉스 제주",
    day: "Day 1", date: "6/2 화",
    role: "9홀 워밍업",
    teeTime: "15:00~16:00",
    urgency: "normal",
    caution: "퍼블릭 9홀 가능 여부 및 카트비 사전 확인 필수",
    directHref: "https://www.castlexjj.com/html/reserve/reserve01.asp",
  },
  {
    name: "엘리시안 제주 CC",
    day: "Day 2", date: "6/3 수",
    role: "편한 18홀",
    teeTime: "08:00~09:00",
    urgency: "normal",
    caution: "전화 예약 운영 시간 확인 후 오전 이른 티타임 요청",
    directHref: "https://www.elysian.co.kr/about-jeju/golf",
  },
  {
    name: "롯데스카이힐 제주 CC",
    day: "Day 3", date: "6/4 목",
    role: "메인 라운딩",
    teeTime: "08:00 전후",
    urgency: "high",
    caution: "60일 전 오픈 기준 — 전체 일정 중 가장 먼저 예약 확보",
    directHref: "https://www.lotteskyhill.com/reservation/reservation-guide",
  },
  {
    name: "라온 골프클럽",
    day: "Day 4", date: "6/5 금",
    role: "오전 라운딩 후 귀가",
    teeTime: "07:00 (항공 연계 필수)",
    urgency: "high",
    caution: "티오프 지연 시 항공 리스크 직결 — 07:00대 확보가 절대 우선",
    directHref: "https://map.naver.com/p/search/%EB%9D%BC%EC%98%A8%EA%B3%A8%ED%94%84%ED%81%B4%EB%9F%BD%20%EC%A0%9C%EC%A3%BC",
  },
];

/* ── 예약 비교 플랫폼 ── */
const bookingPlatforms = [
  { name: "카카오골프",   bg: "bg-yellow-400 hover:bg-yellow-300", text: "text-slate-900", href: "https://golf.kakao.com/" },
  { name: "스마트스코어", bg: "bg-blue-600 hover:bg-blue-500",     text: "text-white",    href: "https://www.smartscore.co.kr/" },
  { name: "SBS골프",     bg: "bg-red-600 hover:bg-red-500",       text: "text-white",    href: "https://sbsgolf.com/" },
  { name: "골팡",        bg: "bg-emerald-600 hover:bg-emerald-500", text: "text-white",   href: "https://www.golpang.com/" },
];

/* ── 기타 예약 링크 (숙소·항공) ── */
const otherLinks = [
  {
    name: "제주 우주항공호텔",
    role: "숙소 백업",
    action: "지도 검색",
    href: "https://map.naver.com/p/search/%EC%A0%9C%EC%A3%BC%20%EC%9A%B0%EC%A3%BC%ED%95%AD%EA%B3%B5%ED%98%B8%ED%85%94",
    note: "취소 가능 조건으로 선확보",
  },
  {
    name: "김포 ↔ 제주 항공권",
    role: "항공",
    action: "항공 검색",
    href: "https://flight.naver.com/",
    note: "출발 08~09시, 복귀 17:30 이후 권장",
  },
];

const bookingPriority = [
  "롯데스카이힐 제주 CC: 가장 먼저 예약",
  "엘리시안 제주 CC: Day2 오전 티타임 확보",
  "라온 골프클럽: Day4 07:00대 최우선",
  "캐슬렉스 제주: Day1 9홀 워밍업",
  "항공: 김포 출발 08~09시, 제주 출발 17:30 이후",
  "숙소: 회사 숙소 신청 + 우주항공호텔 취소 가능 예약 병행",
];

const costs = [
  { label: "항공",   value: "1인 15~22만원", total: "3인 45~66만원" },
  { label: "골프",   value: "1인 50~60만원", total: "3인 150~180만원" },
  { label: "숙소",   value: "1인 7~14만원",  total: "3인 20~40만원" },
  { label: "식사/술", value: "1인 15만원 내외", total: "3인 45만원 내외" },
];

const checklist = [
  "회사 숙소 신청 결과 확인",
  "우주항공호텔 취소 가능 조건으로 백업 예약",
  "롯데스카이힐 티타임 최우선 확보",
  "라온 Day4 07:00대 티타임 확보",
  "김포→제주 08~09시대 항공권 예약",
  "제주→김포 17:30 이후 항공권 예약",
  "지인 차량 이동 가능 시간 사전 확인",
  "Day3 저녁 과음 방지 합의",
];

/* ── self-tests ── */
function getLodgingPlan(planKey) {
  return lodgingPlans[planKey] || lodgingPlans.company;
}

function runSelfTests() {
  console.assert(getLodgingPlan("company").title.includes("회사 숙소"),  "company 숙소 플랜이 정상이어야 합니다.");
  console.assert(getLodgingPlan("fallback").title.includes("우주항공호텔"), "fallback 숙소 플랜이 정상이어야 합니다.");
  console.assert(getLodgingPlan("hybrid").title.includes("골프 리조트"),  "hybrid 숙소 플랜이 정상이어야 합니다.");
  console.assert(getLodgingPlan("unknown").title.includes("회사 숙소"),  "알 수 없는 플랜은 company로 대체되어야 합니다.");
  console.assert(schedule.length === 4,           "일정은 4일이어야 합니다.");
  console.assert(checklist.length >= 6,           "체크리스트는 최소 6개 이상이어야 합니다.");
  console.assert(golfCourses.length >= 4,         "골프장 카드는 최소 4개 이상이어야 합니다.");
  console.assert(bookingPlatforms.length >= 4,    "예약 플랫폼은 최소 4개 이상이어야 합니다.");
  console.assert(mapRoutes.length >= 4,           "이동 경로는 최소 4개 이상이어야 합니다.");
  console.assert(mapLocations.some((l) => l.name.includes("제주공항")), "지도에 제주공항이 포함되어야 합니다.");
  console.assert(costs.every((c) => c.label && c.value && c.total),     "비용 항목은 label, value, total을 모두 가져야 합니다.");
}

if (typeof window !== "undefined") runSelfTests();

/* ════════════════════════════════════════════════
   메인 컴포넌트
════════════════════════════════════════════════ */
export default function JejuGolfTourWebsite() {
  const [lodgingPlan, setLodgingPlan] = useState("company");
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
        <ChecklistSection />
      </main>
    </div>
  );
}

/* ── Hero ── */
function HeroSection() {
  return (
    <section
      className="relative overflow-hidden px-6 py-12 text-white"
      style={{ background: `linear-gradient(135deg, ${NAVY} 0%, #1a3a6b 60%, #1e5096 100%)` }}
    >
      {/* subtle grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-10"
        style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.15) 1px,transparent 1px)",
          backgroundSize: "40px 40px",
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
            <InfoPill icon={ICONS.calendar} label="3박 4일"  value="2026.06.02~06.05" />
            <InfoPill icon={ICONS.plane}    label="항공"     value="김포 ↔ 제주" />
            <InfoPill icon={ICONS.flag}     label="라운딩"   value="9홀 1회 + 18홀 3회" />
            <InfoPill icon={ICONS.car}      label="이동"     value="지인 차량 찬스" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Strategy ── */
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
            <Strategy title="가성비"     desc="회사 숙소 당첨을 최우선, 미당첨 시 우주항공호텔 백업" />
            <Strategy title="편한 라운딩" desc="동부 이동은 배제하고 서부·중문권 중심으로 압축" />
            <Strategy title="관계 중심"  desc="맛집 투어보다 지인과 편하게 대화하는 저녁 구성" />
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

/* ── Lodging ── */
function LodgingSection({ selected, lodgingPlan, setLodgingPlan }) {
  return (
    <section className="mb-10">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h2 className="text-2xl font-bold" style={{ color: NAVY }}>숙소 플랜 선택</h2>
        <div className="flex flex-wrap gap-2">
          {[
            { key: "company",  label: "회사 숙소" },
            { key: "fallback", label: "우주항공호텔" },
            { key: "hybrid",   label: "리조트 패키지" },
          ].map(({ key, label }) => (
            <Button
              key={key}
              variant={lodgingPlan === key ? "default" : "outline"}
              className={lodgingPlan === key ? "bg-[#0d1b3e] text-white hover:bg-[#1a3a6b]" : ""}
              onClick={() => setLodgingPlan(key)}
            >
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
                  <Icon>{ICONS.check}</Icon>
                  <span>{p}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-amber-50 p-5">
            <div className="mb-2 flex items-center gap-2 font-bold text-amber-900">
              <Icon>{ICONS.alert}</Icon>
              주의 포인트
            </div>
            <p className="text-sm leading-6 text-amber-900">{selected.caution}</p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ── Map (updated: SVG route lines + distance/time) ── */
function MapSection() {
  const getLocation = (name) => mapLocations.find((l) => l.name === name);

  return (
    <section className="mb-10">
      <Card className="rounded-2xl shadow-sm ring-1 ring-slate-200">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon>{ICONS.map}</Icon>
            <h2 className="text-2xl font-bold" style={{ color: NAVY }}>제주 동선 지도</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">

            {/* ── 지도 캔버스 ── */}
            <div className="relative min-h-[400px] overflow-visible rounded-3xl border bg-gradient-to-br from-sky-100 via-emerald-50 to-lime-100 p-5">
              {/* 섬 실루엣 */}
              <div className="absolute left-[10%] top-[12%] h-[75%] w-[80%] rounded-[48%] border-4 border-emerald-200 bg-white/60 shadow-inner" />
              <div className="absolute left-[16%] top-[18%] h-[62%] w-[68%] rounded-[45%] border border-emerald-300/70" />

              {/* SVG 경로선 */}
              <svg
                className="pointer-events-none absolute inset-0 h-full w-full"
                style={{ overflow: "visible" }}
              >
                <defs>
                  <marker id="arrow" markerWidth="7" markerHeight="5" refX="5" refY="2.5" orient="auto">
                    <polygon points="0 0, 7 2.5, 0 5" fill={NAVY} opacity="0.55" />
                  </marker>
                </defs>
                {mapRoutes.map((route, idx) => {
                  const from = getLocation(route.from);
                  const to   = getLocation(route.to);
                  if (!from || !to) return null;
                  return (
                    <line
                      key={idx}
                      x1={from.x} y1={from.y}
                      x2={to.x}   y2={to.y}
                      stroke={route.color}
                      strokeWidth="2.5"
                      strokeDasharray="7,5"
                      opacity="0.75"
                      markerEnd="url(#arrow)"
                    />
                  );
                })}
              </svg>

              {/* 장소 마커 */}
              {mapLocations.map((loc) => (
                <div
                  key={loc.name}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ left: loc.x, top: loc.y }}
                >
                  <div className="group relative flex flex-col items-center">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-full text-lg text-white shadow-lg ring-4 ring-white"
                      style={{ background: NAVY }}
                    >
                      {loc.type === "공항"
                        ? ICONS.plane
                        : loc.type.includes("숙소")
                        ? ICONS.hotel
                        : ICONS.flag}
                    </div>
                    <div className="mt-1 whitespace-nowrap rounded-full bg-white px-2 py-1 text-[11px] font-bold shadow-sm">
                      {loc.name}
                    </div>
                    {/* hover tooltip */}
                    <div
                      className="pointer-events-none absolute top-14 z-10 hidden w-52 rounded-xl p-3 text-xs leading-5 text-white shadow-xl group-hover:block"
                      style={{ background: NAVY }}
                    >
                      <p className="font-bold">{loc.type}</p>
                      <p className="text-blue-200">{loc.desc}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="absolute bottom-4 left-4 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-slate-500">
                간이 지도: 실제 거리 비율 아님
              </div>
            </div>

            {/* ── 경로 목록 ── */}
            <div className="space-y-3">
              <h3 className="font-bold" style={{ color: NAVY }}>이동 경로 및 소요 시간</h3>
              {mapRoutes.map((route) => (
                <div
                  key={route.from + route.to}
                  className="flex gap-3 rounded-2xl border bg-white p-3 text-sm transition-shadow hover:shadow-sm"
                >
                  <div
                    className="mt-1.5 h-3 w-3 shrink-0 rounded-full"
                    style={{ background: route.color }}
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">
                      {route.from} → {route.to}
                    </p>
                    <div className="mt-1 flex gap-4 text-xs text-slate-500">
                      <span>{ICONS.road} {route.distance}</span>
                      <span>{ICONS.clock} {route.time}</span>
                    </div>
                  </div>
                  <span className="shrink-0 self-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                    {route.label}
                  </span>
                </div>
              ))}
              <div
                className="rounded-2xl p-4 text-sm leading-6 text-white"
                style={{ background: NAVY }}
              >
                <b className="text-amber-400">운영 원칙:</b> 동부권 이동은 제외하고, 공항·서부·중문권 안에서 라운딩을 묶어 체력 소모를 줄입니다.
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ── Schedule ── */
function ScheduleSection() {
  return (
    <section className="mb-10">
      <h2 className="mb-5 text-2xl font-bold" style={{ color: NAVY }}>일정 타임라인</h2>
      <div className="grid gap-5">
        {schedule.map((item, index) => (
          <motion.div
            key={item.day}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
          >
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

/* ── Reservation (개편: 플랫폼 비교 카드) ── */
function ReservationSection() {
  return (
    <section className="mb-10">
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <Icon>{ICONS.link}</Icon>
        <h2 className="text-2xl font-bold" style={{ color: NAVY }}>골프장 예약 비교</h2>
        <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800">
          권장 티오프 시간 기준으로 가격 비교 후 예약
        </span>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        {golfCourses.map((course) => (
          <GolfCourseCard key={course.name} course={course} />
        ))}
      </div>

      {/* 숙소·항공 부가 링크 */}
      <div className="mt-5 grid gap-3 md:grid-cols-2">
        {otherLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 rounded-2xl border bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div>
              <p className="font-bold text-slate-800">{link.name}</p>
              <p className="text-xs text-slate-500">{link.note}</p>
            </div>
            <span
              className="shrink-0 rounded-xl px-4 py-2 text-sm font-bold text-white"
              style={{ background: NAVY }}
            >
              {link.action}
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}

function GolfCourseCard({ course }) {
  const isHigh = course.urgency === "high";
  return (
    <Card
      className={`rounded-2xl shadow-sm ${
        isHigh ? "border-2 border-red-200 bg-red-50/20" : "border ring-1 ring-slate-200"
      }`}
    >
      <CardContent className="p-5">
        {/* 헤더 */}
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <div className="mb-1 flex items-center gap-2">
              <span
                className="rounded-full px-3 py-0.5 text-xs font-bold text-white"
                style={{ background: NAVY }}
              >
                {course.day}
              </span>
              <span className="text-xs text-slate-500">{course.date}</span>
              {isHigh && (
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white">
                  최우선
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold" style={{ color: NAVY }}>{course.name}</h3>
            <p className="text-sm text-slate-500">{course.role}</p>
          </div>
          <a
            href={course.directHref}
            target="_blank"
            rel="noreferrer"
            className="shrink-0 rounded-xl border-2 px-3 py-2 text-xs font-bold transition-colors hover:text-white"
            style={{ borderColor: NAVY, color: NAVY }}
            onMouseEnter={(e) => { e.currentTarget.style.background = NAVY; e.currentTarget.style.color = "#fff"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = ""; e.currentTarget.style.color = NAVY; }}
          >
            공식 예약
          </a>
        </div>

        {/* 권장 티오프 */}
        <div
          className={`mb-4 flex items-center gap-2 rounded-xl p-3 text-sm font-semibold ${
            isHigh ? "bg-red-100 text-red-800" : "bg-blue-50 text-blue-800"
          }`}
        >
          <Icon>{ICONS.clock}</Icon>
          <span>권장 티오프:</span>
          <span className="font-bold">{course.teeTime}</span>
        </div>

        {/* 주의사항 */}
        <div className="mb-4 flex items-start gap-2 rounded-xl bg-amber-50 p-3 text-xs leading-5 text-amber-900">
          <Icon>{ICONS.alert}</Icon>
          <span>{course.caution}</span>
        </div>

        {/* 플랫폼 버튼 */}
        <div>
          <p className="mb-2 text-xs font-semibold text-slate-400">가격 비교 · 예약 채널</p>
          <div className="grid grid-cols-2 gap-2">
            {bookingPlatforms.map((p) => (
              <a
                key={p.name}
                href={p.href}
                target="_blank"
                rel="noreferrer"
                className={`flex items-center justify-center rounded-xl px-3 py-2 text-xs font-bold transition-transform hover:-translate-y-0.5 ${p.bg} ${p.text}`}
              >
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

/* ── Booking Priority + Cost ── */
function BookingAndCostSection() {
  return (
    <section className="mb-10 grid gap-5 md:grid-cols-2">
      <Card className="rounded-2xl shadow-sm ring-1 ring-slate-200">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <Icon>{ICONS.link}</Icon>
            <h2 className="text-2xl font-bold" style={{ color: NAVY }}>예약 우선순위</h2>
          </div>
          <div className="space-y-3">
            {bookingPriority.map((item, idx) => (
              <div key={item} className="flex gap-3 rounded-xl border bg-white p-3">
                <div
                  className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ background: NAVY }}
                >
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
            <p className="mt-1 font-semibold">
              회사 숙소 당첨 시 1인 95~105만원, 미당첨 시 105~120만원 범위로 관리
            </p>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ── Checklist ── */
function ChecklistSection() {
  return (
    <section>
      <Card className="rounded-2xl text-white shadow-sm" style={{ background: NAVY }}>
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold">최종 실행 체크리스트</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {checklist.map((item) => (
              <div key={item} className="flex items-start gap-2 rounded-xl bg-white/10 p-3 text-sm">
                <Icon>{ICONS.check}</Icon>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

/* ════════════════════════════════════════════════
   공통 UI 헬퍼 컴포넌트
════════════════════════════════════════════════ */
function Icon({ children }) {
  return (
    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center text-base leading-none" aria-hidden="true">
      {children}
    </span>
  );
}

function InfoPill({ icon, label, value }) {
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

function Strategy({ title, desc }) {
  return (
    <div className="rounded-2xl border bg-white p-4">
      <p className="font-bold" style={{ color: NAVY }}>{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{desc}</p>
    </div>
  );
}

function Mini({ icon, label, value }) {
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
