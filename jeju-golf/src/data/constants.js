// ── 디자인 토큰 ──────────────────────────────────────────
export const NAVY = "#0d1b3e";

// ── 아이콘 ───────────────────────────────────────────────
export const ICONS = {
  plane:    "✈️",
  hotel:    "🏨",
  flag:     "⛳",
  calendar: "📅",
  car:      "🚗",
  food:     "🍽️",
  check:    "✅",
  map:      "📍",
  wallet:   "💰",
  link:     "🔗",
  trophy:   "🏆",
  alert:    "⚠️",
  clock:    "⏱️",
  road:     "🛣️",
};

// ── 숙소 플랜 ─────────────────────────────────────────────
export const lodgingPlans = {
  company: {
    title:   "1순위: 회사 숙소",
    subtitle: "제주 한화리조트 또는 소노벨 제주 당첨 시 사용",
    cost:    "3인 기준 약 20~30만원 예상",
    pros:    ["비용 효율 최고", "객실 여유", "동료 3인 숙박에 적합"],
    caution: "당첨 여부가 변수이므로 우주항공호텔을 취소 가능 옵션으로 백업 확보 권장",
  },
  fallback: {
    title:   "2순위: 제주 우주항공호텔",
    subtitle: "회사 숙소 미당첨 시 사용하는 안정형 대안",
    cost:    "3인 기준 약 40만원 예상",
    pros:    ["가성비 안정", "예약 확정성 높음", "서부 골프 동선과 무난하게 연결"],
    caution: "조식 포함 여부와 3인 객실 타입을 예약 전 확인",
  },
  hybrid: {
    title:   "선택 옵션: 골프 리조트 1박 패키지",
    subtitle: "엘리시안 등 숙박+조식+라운딩 패키지 일부 활용",
    cost:    "3인 기준 총액 310~350만원 범위 예상",
    pros:    ["골프 몰입도 상승", "조식·티오프 편의", "Day2 또는 Day3 피로 감소"],
    caution: "패키지는 일정 유연성이 낮아 티타임 확정 후 판단",
  },
};

export function getLodgingPlan(key) {
  return lodgingPlans[key] || lodgingPlans.company;
}

// ── 일정 ─────────────────────────────────────────────────
export const schedule = [
  {
    day: "Day 1", date: "6/2 화", title: "김포 출발 · 제주 도착 · 9홀 몸풀기",
    golf: "캐슬렉스 제주 9홀",
    time: "김포→제주 08:00~09:00대 출발 / 15:00~16:00 9홀 권장",
    dinner: "현지 지인 합류, 간단 술자리",
    point: "첫날은 무리하지 않고 스윙 적응과 관계 형성 중심",
  },
  {
    day: "Day 2", date: "6/3 수", title: "편한 18홀 라운딩",
    golf: "엘리시안 제주 CC",
    time: "08:00~09:00 티오프 권장",
    dinner: "흑돼지 또는 편한 로컬 식당",
    point: "일정의 안정감을 만드는 첫 18홀",
  },
  {
    day: "Day 3", date: "6/4 목", title: "메인 라운딩 · 핵심 만남",
    golf: "롯데스카이힐 제주 CC",
    time: "08:00 전후 티오프 권장",
    dinner: "조용한 대화 중심 저녁",
    point: "가장 좋은 컨디션을 배치하는 피크 데이, 과음 금지",
  },
  {
    day: "Day 4", date: "6/5 금", title: "오전 라운딩 후 귀가",
    golf: "라온 골프클럽",
    time: "07:00 티오프 필수 / 제주→김포 17:30 이후 권장",
    dinner: "공항 이동 전 간단 정리",
    point: "티오프 지연 시 항공 리스크가 커지므로 가장 이른 시간 확보",
  },
];

// ── 지도 ─────────────────────────────────────────────────
export const mapLocations = [
  { name: "제주공항",     type: "공항",     x: "22%", y: "25%", desc: "도착·출발 기준점" },
  { name: "우주항공호텔", type: "숙소",     x: "42%", y: "42%", desc: "회사 숙소 미당첨 시 백업" },
  { name: "한화/소노벨",  type: "회사 숙소", x: "56%", y: "35%", desc: "당첨 시 1순위 사용" },
  { name: "캐슬렉스 제주", type: "Day1",   x: "35%", y: "62%", desc: "첫날 9홀 몸풀기" },
  { name: "엘리시안 제주", type: "Day2",   x: "48%", y: "58%", desc: "편한 18홀" },
  { name: "롯데스카이힐", type: "Day3",    x: "65%", y: "70%", desc: "메인 라운딩" },
  { name: "라온 골프클럽", type: "Day4",   x: "27%", y: "45%", desc: "오전 라운딩 후 공항" },
];

export const mapRoutes = [
  { from: "제주공항",     to: "우주항공호텔",  distance: "약 5km",  time: "15분",  label: "입도 이동",  color: "#64748b" },
  { from: "우주항공호텔", to: "캐슬렉스 제주", distance: "약 30km", time: "40분",  label: "Day 1",     color: "#3b82f6" },
  { from: "우주항공호텔", to: "엘리시안 제주", distance: "약 45km", time: "55분",  label: "Day 2",     color: "#22c55e" },
  { from: "우주항공호텔", to: "롯데스카이힐",  distance: "약 40km", time: "50분",  label: "Day 3",     color: "#f59e0b" },
  { from: "라온 골프클럽", to: "제주공항",    distance: "약 15km", time: "25분",  label: "Day 4 귀환", color: "#ef4444" },
];

// ── 예약 ─────────────────────────────────────────────────
export const golfCourses = [
  {
    name: "캐슬렉스 제주", day: "Day 1", date: "6/2 화", role: "9홀 워밍업",
    teeTime: "15:00~16:00", urgency: "normal",
    caution: "퍼블릭 9홀 가능 여부 및 카트비 사전 확인 필수",
    directHref: "https://www.castlexjj.com/html/reserve/reserve01.asp",
  },
  {
    name: "엘리시안 제주 CC", day: "Day 2", date: "6/3 수", role: "편한 18홀",
    teeTime: "08:00~09:00", urgency: "normal",
    caution: "전화 예약 운영 시간 확인 후 오전 이른 티타임 요청",
    directHref: "https://www.elysian.co.kr/about-jeju/golf",
  },
  {
    name: "롯데스카이힐 제주 CC", day: "Day 3", date: "6/4 목", role: "메인 라운딩",
    teeTime: "08:00 전후", urgency: "high",
    caution: "60일 전 오픈 기준 — 전체 일정 중 가장 먼저 예약 확보",
    directHref: "https://www.lotteskyhill.com/reservation/reservation-guide",
  },
  {
    name: "라온 골프클럽", day: "Day 4", date: "6/5 금", role: "오전 라운딩 후 귀가",
    teeTime: "07:00 (항공 연계 필수)", urgency: "high",
    caution: "티오프 지연 시 항공 리스크 직결 — 07:00대 확보가 절대 우선",
    directHref: "https://map.naver.com/p/search/%EB%9D%BC%EC%98%A8%EA%B3%A8%ED%94%84%ED%81%B4%EB%9F%BD%20%EC%A0%9C%EC%A3%BC",
  },
];

export const bookingPlatforms = [
  { name: "카카오골프",   bg: "bg-yellow-400 hover:bg-yellow-300", text: "text-slate-900", href: "https://www.kakao.golf/" },
  { name: "스마트스코어", bg: "bg-blue-600 hover:bg-blue-500",     text: "text-white",    href: "https://www.smartscore.kr/booking/main" },
  { name: "XGOLF",      bg: "bg-red-600 hover:bg-red-500",       text: "text-white",    href: "https://www.xgolf.com/booking/list" },
  { name: "골팡",        bg: "bg-emerald-600 hover:bg-emerald-500", text: "text-white",  href: "https://www.golfpang.com/" },
];

export const otherLinks = [
  {
    name: "제주 우주항공호텔", role: "숙소 백업", action: "지도 검색",
    href: "https://map.naver.com/p/search/%EC%A0%9C%EC%A3%BC%20%EC%9A%B0%EC%A3%BC%ED%95%AD%EA%B3%B5%ED%98%B8%ED%85%94",
    note: "취소 가능 조건으로 선확보",
  },
  {
    name: "김포 ↔ 제주 항공권", role: "항공", action: "항공 검색",
    href: "https://flight.naver.com/",
    note: "출발 08~09시, 복귀 17:30 이후 권장",
  },
];

export const bookingPriority = [
  "롯데스카이힐 제주 CC: 가장 먼저 예약",
  "엘리시안 제주 CC: Day2 오전 티타임 확보",
  "라온 골프클럽: Day4 07:00대 최우선",
  "캐슬렉스 제주: Day1 9홀 워밍업",
  "항공: 김포 출발 08~09시, 제주 출발 17:30 이후",
  "숙소: 회사 숙소 신청 + 우주항공호텔 취소 가능 예약 병행",
];

export const costs = [
  { label: "항공",    value: "1인 15~22만원",  total: "3인 45~66만원" },
  { label: "골프",    value: "1인 50~60만원",  total: "3인 150~180만원" },
  { label: "숙소",    value: "1인 7~14만원",   total: "3인 20~40만원" },
  { label: "식사/술", value: "1인 15만원 내외", total: "3인 45만원 내외" },
];

export const checklist = [
  "회사 숙소 신청 결과 확인",
  "우주항공호텔 취소 가능 조건으로 백업 예약",
  "롯데스카이힐 티타임 최우선 확보",
  "라온 Day4 07:00대 티타임 확보",
  "김포→제주 08~09시대 항공권 예약",
  "제주→김포 17:30 이후 항공권 예약",
  "지인 차량 이동 가능 시간 사전 확인",
  "Day3 저녁 과음 방지 합의",
];
