# SDM Coaching Dashboard — AGENTS.md

## 프로젝트 개요

SDM 프로그램 21명 회원의 면담 기록 및 성장 단계를 관리하는 **카드형 코칭 대시보드**.  
순수 HTML/CSS/JavaScript 단일 파일(`index.html`)로 구성되며, 외부 라이브러리 없이 GitHub Pages에서 즉시 배포 가능하다.

---

## 파일 구조

```
index.html   ← 전체 앱 (HTML + CSS + JS 단일 파일)
AGENTS.md    ← 이 문서
```

코드는 `index.html` 내부에서 세 영역으로 구분된다.

| 영역 | 위치 | 역할 |
|------|------|------|
| `<style>` | `<head>` 내부 | 디자인 토큰, 컴포넌트 스타일 |
| HTML 마크업 | `<body>` | 헤더, 카드 그리드, 모달 shell |
| `<script>` | `</body>` 직전 | 데이터 로직, 렌더링, 이벤트 |

---

## 데이터 구조

### 회원 객체 (`blank()` 반환값 기준)

```js
{
  id: string,                      // crypto.randomUUID()
  name: string,
  interviewStatus: 'completed' | 'scheduled' | 'pending',
  interviewFormat: '대면' | '온라인' | '전화' | '',
  interviewDate: string,           // 'YYYY-MM-DD'
  brandSheet: {
    coreExperiences: string[],
    values: string[]
  },
  designPerspective: string,
  intensiveProjectTheme: string,
  strengths: string[],
  improvements: string[],
  tutorFeedback: string,
  operatorInterpretation: string,
  growthStage: {
    stageIndex: 0–4,               // 탐색기=0 … 성숙기=4
    customPercent: number | null   // null이면 STAGE_PCT[stageIndex] 사용
  },
  nextTask: string,
  futureSchedule: string[],
  interviews: [                    // 면담 이력 배열
    { id: string, title: string, date: string, content: string }
  ]
}
```

### 성장 단계 상수

```js
const STAGES   = ['탐색기','발견기','성장기','발전기','성숙기'];
const STAGE_PCT = [20, 40, 60, 80, 100];
```

### localStorage

- 키: `sdm_v3`
- 값: 회원 배열 JSON 직렬화
- `save()` / `load()` 함수로 관리
- `normalise(m)` 함수가 누락 필드를 `blank()` 기본값으로 채워 하위 호환성 유지

---

## 주요 JS 함수

### 상태 변수

```js
let db      = [];        // 전체 회원 배열
let filt    = 'all';     // 현재 필터: 'all' | 'completed' | 'scheduled' | 'pending'
let curId   = null;      // 현재 열린 모달의 회원 id
let curMode = 'detail';  // 'detail' | 'edit'
let curTab  = 'info';    // 'info' | 'interviews'
```

### 렌더링 흐름

```
render()
  └─ filtered() → 카드 그리드 HTML 생성

openDetail(id) / openEdit(id)
  └─ openModal(m)
       ├─ setModalHead(m)
       ├─ renderTabBar(m)
       ├─ renderBody(m)
       │    ├─ infoDetailHTML(m) 또는 infoEditHTML(m)   → #pane-info
       │    └─ ivDetailHTML(m)  또는 ivEditHTML(m)      → #pane-interviews
       └─ renderFooter(m)
```

### 면담 이력 DOM 조작 (편집 모드)

| 함수 | 역할 |
|------|------|
| `addInterviewEntry()` | `#iv-list`에 새 항목 삽입, 자동 차수 계산 |
| `removeInterviewEntry(btn)` | 가장 가까운 `.iv-entry` 제거 후 재인덱싱 |
| `reindexEntries()` | 삭제 후 차수 배지(`.iv-num`) 번호 재정렬 |
| `updateInterviewBadge()` | 탭 바의 건수 배지 갱신 |

### 저장 로직 (`saveEdit()`)

1. `#pane-info` DOM에서 기본 정보 필드 수집 (`document.getElementById('e-*')`)
2. `#iv-list` DOM에서 `.iv-entry` 순회 → `interviews[]` 배열 재구성
3. `save()` → localStorage 갱신
4. `render()` → 카드 그리드 갱신
5. `closeModal()` + `toast()` 호출

---

## CSS 구조

### 디자인 토큰 (CSS 변수)

```css
--bg / --surface / --border / --border-2   /* 배경·테두리 */
--txt-1 / --txt-2 / --txt-3                /* 텍스트 계층 */
--accent / --accent-hover / --accent-light / --accent-mid  /* 강조색 */
--green-bg/tx  --blue-bg/tx  --yellow-bg/tx  /* 상태 태그 색상 */
--r-sm/md/lg/full   /* border-radius */
--sh-sm/md/lg       /* box-shadow */
```

### 모달 레이아웃

모달은 `display: flex; flex-direction: column`으로 고정 높이 내에서 구역을 분리한다.

```
.modal  (flex column, max-height: 92vh, overflow: hidden)
  ├─ .m-head       (flex-shrink: 0) — 아바타, 이름, 닫기 버튼
  ├─ .m-tab-bar    (flex-shrink: 0) — 탭 버튼 (underline indicator)
  ├─ .m-body       (flex: 1, overflow-y: auto) — 스크롤 영역
  │    ├─ .tab-pane[data-pane="info"]         (.hidden으로 토글)
  │    └─ .tab-pane[data-pane="interviews"]   (.hidden으로 토글)
  └─ .m-foot       (flex-shrink: 0) — 저장/취소/삭제 버튼
```

### 탭 전환 애니메이션

```css
@keyframes paneIn {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}
.tab-pane { animation: paneIn .18s ease; }
.tab-pane.hidden { display: none !important; }
```

`switchTab(tab)` 호출 시 `.hidden` 토글 + `offsetHeight` 강제 reflow로 애니메이션 재생.

---

## 기능 규칙 / 제약

- **외부 라이브러리 금지** — React, Vue, jQuery, lodash 등 불가. Vanilla JS만 사용.
- **단일 파일 원칙** — CSS·JS를 별도 파일로 분리하지 않는다.
- **GitHub Pages 호환** — `file://` 및 정적 호스팅에서 동작해야 하므로 서버 요청 불가.
- **배열 필드 입력** — 쉼표로 구분된 문자열 → `arrInput(id)` 헬퍼로 파싱.
- **HTML 이스케이프** — 사용자 입력을 DOM에 삽입할 때 반드시 `esc(s)` 헬퍼 사용.
- **데이터 마이그레이션** — JSON 가져오기 및 localStorage 로드 시 `normalise(m)`으로 스키마 보정.

---

## 기능 추가 시 체크리스트

1. **새 데이터 필드 추가** → `blank()` 반환 객체에 추가 → `normalise()` 에도 기본값 추가
2. **카드에 표시** → `render()` 내부 카드 HTML 수정
3. **상세 보기** → `infoDetailHTML()` 또는 `ivDetailHTML()` 수정
4. **편집 폼** → `infoEditHTML()` 또는 `ivEditHTML()` 수정
5. **저장 로직** → `saveEdit()` 에서 해당 필드 수집 추가
6. **JSON 호환** → `normalise()` 에서 기본값 처리 확인

---

## 배포

```bash
# GitHub Pages
# 저장소 Settings → Pages → Branch: main / root → Save
# https://sdm20250516.github.io/sdm-claude01/
```
