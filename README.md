# Datarize Frontend 과제 전형

쇼핑몰 구매 데이터 대시보드 애플리케이션

## 📋 프로젝트 개요

이 프로젝트는 고객 정보를 관리하고 구매 패턴을 분석할 수 있는 웹 대시보드입니다. 고객 목록 조회, 구매 내역 추적, 구매 빈도 분석 등의 기능을 제공합니다.

### 주요 라이브러리

- **@tanstack/react-query** - 서버 상태 관리
- **@tanstack/react-table** - 테이블 컴포넌트, 데이터 처리
- **TailwindCSS**
- **Recharts**
- **vite-plugin-svgr** - SVG 아이콘 처리

## 📦 설치 및 실행

### 개발 환경

- Node v20.11.0
- yarn 1.22.22

### Command Lines

```bash
cd apps
yarn install
yarn start-server
yarn start-client
```

## 🏛️ 프로젝트 구조

```
src/
├── api/                    # API 통신 관련
│   └── index.ts           # API 함수 및 React Query 설정
├── components/            # 재사용 컴포넌트
│   ├── CustomersTable/    # 고객 테이블 컴포넌트
│   ├── CustomerPurchasesTable/ # 구매 내역 테이블
│   ├── PurchaseFrequencyChart/ # 구매 빈도 차트
│   ├── TableStates/       # 테이블 상태 컴포넌트 (로딩, 에러, 빈 상태)
│   ├── Header.tsx         # 공통 헤더
│   ├── TabNavigation.tsx  # 탭 네비게이션
│   └── PurchasesTab.tsx   # 구매 탭 컨테이너
├── hooks/                 # 커스텀 훅
│   └── useApi.ts         # API 관련 훅
├── types/                 # TypeScript 타입 정의
│   ├── api.ts            # API 관련 타입
│   └── tabs.ts           # 탭 관련 타입
├── assets/               # 정적 자원
│   └── icons/           # SVG 아이콘
├── App.tsx              # 메인 애플리케이션 컴포넌트
└── main.tsx            # 애플리케이션 진입점
```

## 🔧 구현 참고 사항

### UX

- **직관적 UI**: 탭 기반 네비게이션으로 쉬운 탐색
- **실시간 피드백**: 로딩, 에러 상태 표시
- **시각적 효과**: 그라데이션, 애니메이션 효과

### API 엔드포인트

- `GET /api/customers` - 고객 목록 조회
- `GET /api/customers/:id/purchases` - 고객별 구매 내역
- `GET /api/purchase-frequency` - 구매 빈도 데이터

### /api/customers 쿼리 파라미터

- **고객 구매 금액 기준 정렬**: `sortBy=asc|desc`
- **고객 검색**: `name=검색어`
- **날짜 필터**: `from=시작일&to=종료일`

### VSCode Extensions

- Tailwind CSS IntelliSense
