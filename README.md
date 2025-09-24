<div align="center">

# 🔥 불꽃살림단 랜딩 & 신청 페이지 (Fireworks Landing)

불꽃살림단 프로젝트의 행사 소개 및 참가 신청을 위한 **Next.js 15 (App Router)** 기반 단일 페이지 애플리케이션입니다. 
참가자 모집, 출발 장소 선택, 개인정보 수집·이용 동의, Formspree 연동을 통한 신청 접수 기능을 제공합니다.

</div>

## ✨ 주요 기능
- 행사 포스터 반응형 표시 (모바일 contain, 데스크탑 cover)
- 참가 신청 폼
	- 이름 / 성별 / 연락처 / 출발장소 선택
	- 개인정보 수집·이용 동의 (라디오) — 동의해야 제출 가능
	- Formspree 연동 (백엔드 서버 없이 이메일 수신)
- 세그먼트 스타일 토글 버튼 (성별, 출발장소)
- Tailwind CSS 4 (새 PostCSS 플러그인 기반) 사용
- 접근성 고려: 선택 상태 시각적 강조, disabled 제출 힌트

## 🛠 기술 스택
| 영역 | 사용 기술 |
|------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript, React 19 |
| Styling | Tailwind CSS 4, CSS (in `globals.css`) |
| Form 처리 | Formspree (`@formspree/react`) |

## 📂 폴더 구조 (요약)
```
fireworks/
├─ public/              # 정적 자산 (포스터 이미지, 아이콘 등)
├─ src/app/
│  ├─ layout.tsx        # 전역 레이아웃
│  ├─ globals.css       # Tailwind 및 전역 스타일
│  ├─ page.tsx          # 랜딩 (홈)
│  └─ apply/page.tsx    # 신청 폼 페이지
├─ eslint.config.mjs
├─ next.config.ts
├─ package.json
└─ README.md
```

## 🚀 로컬 실행
```bash
npm install
npm run dev
```
브라우저에서 http://localhost:3000 접속.

신청 페이지: http://localhost:3000/apply

## 📝 Formspree 연동
현재 폼 ID: `mgvljyne` (파일: `src/app/apply/page.tsx`)

변경 방법:
1. Formspree 대시보드에서 새 Form 생성
2. 발급된 ID로 아래 코드 교체
```ts
const [state, handleSubmit] = useForm("NEW_FORM_ID");
```
3. 필요 시 숨김 필드(_subject, source 등) 수정

## 🔐 개인정보 동의 섹션
- 스크롤 가능한 약관 영역 + (동의함 / 동의하지 않음) 라디오
- `consent === 'agree'` 조건 충족 시에만 제출 가능
- 숨김 필드 `privacy_consent_value` 로 수집

## 🧩 스타일 가이드 (요약)
- 세그먼트 버튼: 활성화 시 `shadow-[0_0_0_2px_#C32058]` + 테두리 강조
- 라벨 Pill: `.field-label-pill` (Tailwind `@apply` 사용)
- 입력 필드: 통일된 radius / focus ring (`focus:ring-[#E23C71]/20`)

## 🛡 접근성 & UX 아이디어 (추가 적용 가능)
- 키보드 포커스 스타일 추가 (`focus-visible:ring`)
- 라디오 그룹 role 명시 (`role="radiogroup"`)
- 전화번호 입력 자동 하이픈 처리 (onChange 마스킹)

## 🧪 품질 유지 체크리스트
- ESLint: `npm run lint`
- 타입 체크: `tsc --noEmit`
- 성능: 이미지 최적화 (Next Image 사용)

## 📦 빌드 & 배포
Vercel 권장.
```bash
npm run build
npm start   # production 서버 (기본 3000)
```

환경변수(.env) 사용 계획이 생기면 `next.config.ts` 또는 `process.env.*` 참조 추가.

## 🔄 커스터마이징 포인트
| 목적 | 위치 | 메모 |
|------|------|------|
| 포스터 이미지 교체 | `public/run.png` | 동일 파일명 교체 또는 경로 수정 |
| 신청 폼 필드 추가 | `src/app/apply/page.tsx` | `Field` 컴포넌트 재사용 |
| 색상 테마 | `globals.css` + inlined class | Tailwind config 확장도 가능 |
| 개인정보 문구 변경 | `apply/page.tsx` 문자열 | 다국어 분리 고려 시 별도 JSON |

## 🗺 향후 개선 아이디어
- Form 제출 시 로딩 스켈레톤 / 토스트 피드백
- 다국어(i18n) 지원 (예: `next-intl`)
- 신청 내역 관리자 뷰 (별도 보호 라우트)
- ReCAPTCHA 또는 간단한 스팸 방지
- 전화번호 실시간 패턴 마스킹

## 🧾 라이선스
내부/행사 전용 프로젝트 (별도 라이선스 파일 없음). 외부 공개 전 검토 필요.

---
문의나 개선 아이디어는 이슈 또는 PR로 제안해주세요. 🔥
