// app/apply/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm, ValidationError } from "@formspree/react";
import { useMemo, useState } from "react";

export default function ApplyPage() {
  const [state, handleSubmit] = useForm("mgvljyne"); // ← Formspree 폼 ID 교체 가능
  const [gender, setGender] = useState<"남자" | "여자" | "">("");
  const [start, setStart] = useState<"후암동" | "충무로" | "녹사평" | "">("후암동");
  const [consent, setConsent] = useState<"agree" | "disagree" | "">("");

  const canSubmit = useMemo(
    () => !!gender && !!start && consent === "agree" && !state.submitting,
    [gender, start, consent, state.submitting]
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-black text-white">
      {/* 상단 바 */}
      <header className="sticky top-0 z-20 bg-black/60 backdrop-blur">
        <div className="mx-auto flex max-w-[420px] items-center justify-between px-4 py-3">
          <Link href="/" className="text-sm text-white/80">← 돌아가기</Link>
          <span className="rounded-full bg-[#E23C71] px-3 py-1 text-[12px] font-bold">신청서 작성하기</span>
          <span className="opacity-0">sp</span>
        </div>
      </header>

      {/* 포스터 카드 */}
      <section className="px-4 pt-3">
        <div className="overflow-hidden rounded-[22px] border border-white/10 bg-gradient-to-b from-neutral-900 to-black p-3 shadow-[0_10px_0_#1b1b1b]">
          {/* 스크린샷처럼 포스터 한 장 꽉 차게 */}
          <div className="relative aspect-[3/5] min-h-[880px] w-full overflow-hidden rounded-2xl">
            <Image src="/run.png" alt="불꽃달림단 행사 안내" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      {/* 신청 폼 카드 */}
      <section className="px-4 py-8">
        <div className="card-form relative overflow-hidden rounded-[34px] border border-white/20 p-6 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.55)] ring-1 ring-white/10 backdrop-blur-md">
          <h3 className="relative mb-6 inline-flex items-center justify-center rounded-full bg-[#E50063] px-6 py-2 text-[15px] font-bold tracking-tight text-white shadow-[0_2px_6px_rgba(229,0,99,0.4)]">
            신청서 작성하기
          </h3>

          {state.succeeded ? (
            <div className="rounded-xl border border-emerald-400/30 bg-emerald-500/10 p-4 text-sm text-emerald-200">
              접수 완료! 확정 안내를 문자/이메일로 보내드릴게요. 🙌{" "}
              <Link href="/" className="ml-2 underline">홈으로</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-7">
              {/* 이름 */}
             <Field label="이름" required>
  <input
    name="name"
    required
    placeholder="홍길동"
    className={[
      "w-full rounded-[14px] bg-white text-[#222] placeholder:text-[#9BA0A6]",
      "border border-[#E6E8EC] shadow-[0_2px_6px_rgba(16,24,40,0.06)]",
      "px-4 py-3 text-[16px]",
      "focus:outline-none focus:ring-2 focus:ring-[#E23C71]/20 focus:border-[#E23C71]",
    ].join(" ")}
  />
</Field>
              {/* 성별 */}
              <Field label="성별" required>
                <div className="grid grid-cols-2 gap-3">
                  {(["남자", "여자"] as const).map((g) => {
                    const active = gender === g;
                    return (
                      <button
                        key={g}
                        type="button"
                        onClick={() => setGender(g)}
                        aria-pressed={active}
                        className={`seg-gender group relative flex items-center justify-between gap-2 rounded-3xl px-5 py-3.5 text-[13px] font-bold tracking-tight transition
                          ${active ? 'bg-[#F6E8ED] text-[#C32058] shadow-[0_0_0_2px_#C32058] border border-[#C32058]' : 'bg-[#F6E8ED]/60 text-[#8A5F6F] border border-transparent hover:bg-[#F6E8ED]/70'}`}
                      >
                        <span>{g}</span>
                        <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-white transition
                          ${active ? 'bg-[#C32058]' : 'bg-[#8A5F6F]/40'}
                        `}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="gender" value={gender} />
              </Field>

              {/* 연락처 */}
              <Field label="연락처(휴대폰)" required>
                <input
                  name="phone"
                  inputMode="numeric"
                  pattern="[0-9\-]{9,}"
                  placeholder="010-1234-5678"
                  required
                  className={[
                    "w-full rounded-[14px] bg-white text-[#222] placeholder:text-[#9BA0A6]",
                    "border border-[#E6E8EC] shadow-[0_2px_6px_rgba(16,24,40,0.06)]",
                    "px-4 py-3 text-[16px]",
                    "focus:outline-none focus:ring-2 focus:ring-[#E23C71]/20 focus:border-[#E23C71]",
                  ].join(" ")}
                />
              </Field>

              {/* 출발장소 */}
              <Field label="출발장소" required>
                <div className="grid grid-cols-3 gap-3">
                  {(["후암동", "충무로", "녹사평"] as const).map((p) => {
                    const active = start === p;
                    return (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setStart(p)}
                        aria-pressed={active}
                        className={`seg-start relative flex items-center justify-between gap-2 rounded-3xl px-4 py-3 text-[15px] font-bold tracking-tight transition
                          ${active ? 'bg-[#F6E8ED] text-[#C32058] shadow-[0_0_0_2px_#C32058] border border-[#C32058]' : 'bg-[#F6E8ED]/60 text-[#8A5F6F] border border-transparent hover:bg-[#F6E8ED]/70'}`}
                      >
                        <span>{p}</span>
                        <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full text-white transition
                          ${active ? 'bg-[#C32058]' : 'bg-[#8A5F6F]/40'}
                        `}>
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                            <path d="M5 13l4 4L19 7" />
                          </svg>
                        </span>
                      </button>
                    );
                  })}
                </div>
                <input type="hidden" name="start" value={start} />
              </Field>

              {/* 개인정보 수집·이용 동의 */}
              <Field label="개인정보 수집·이용 동의" required full>
                <div className="rounded-2xl border border-white/15 bg-white/5 p-4 text-[12.5px] leading-relaxed text-white/80 max-h-52 overflow-y-auto whitespace-pre-line">
{`[개인정보 수집·이용 동의]\n불꽃달림단 남산편 참가 신청과 운영을 위해 아래와 같이 개인정보를 수집·이용합니다.\n\n수집 항목 : 성명, 성별, 연락처(휴대전화)\n\n수집 목적 : 참가자 모집·관리, 행사 진행 안내, 보험 가입 및 안전관리, 추후 활동 안내\n\n보유 및 이용기간 : 행사 종료 후 3개월 이내 파기 (단, 법령에 따라 보존할 필요가 있는 경우 해당 기간까지 보관)\n\n동의 거부권 및 불이익 : 개인정보 수집·이용에 동의하지 않을 수 있으며, 이 경우 참가 신청이 제한될 수 있습니다.\n\n위 내용을 충분히 이해하였으며, 개인정보 수집·이용에 동의합니다.`}
                </div>
                <div className="mt-4 flex flex-col gap-2 text-[13px] font-medium text-white/90">
                  <label className={`flex items-center gap-2 rounded-xl border px-4 py-2 transition cursor-pointer text-[13px] font-bold tracking-tight
                    ${consent === 'agree' ? 'border-[#E23C71] bg-[#E23C71]/15 text-white' : 'border-white/20 hover:border-[#E23C71]/60'}`}
                  >
                    <input
                      type="radio"
                      name="privacy_consent"
                      value="agree"
                      checked={consent === 'agree'}
                      onChange={() => setConsent('agree')}
                      className="h-4 w-4 accent-[#E23C71]"
                      required
                    />
                    <span>(동의함)</span>
                  </label>
                  <label className={`flex items-center gap-2 rounded-xl border px-4 py-2 transition cursor-pointer text-[13px] font-bold tracking-tight
                    ${consent === 'disagree' ? 'border-red-500/70 bg-red-500/10 text-red-200' : 'border-white/20 hover:border-red-400/60'}`}
                  >
                    <input
                      type="radio"
                      name="privacy_consent"
                      value="disagree"
                      checked={consent === 'disagree'}
                      onChange={() => setConsent('disagree')}
                      className="h-4 w-4 accent-red-500"
                    />
                    <span>(동의하지 않음)</span>
                  </label>
                  <input type="hidden" name="privacy_consent_value" value={consent} />
                  {consent !== 'agree' && (
                    <p className="mt-1 text-[11px] text-red-300">※ 제출하려면 (동의함)을 선택해야 합니다.</p>
                  )}
                </div>
              </Field>

              {/* 제출 */}
              <div className="relative pt-2">
                <button
                  type="submit"
                  disabled={!canSubmit}
                  className="relative flex w-full items-center justify-center gap-2 rounded-xl bg-[#E23C71] py-3 text-center text-[18px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-60 shadow-[0_2px_8px_0_rgba(226,60,113,0.08)]"
                  style={{ boxShadow: '0 2px 8px 0 rgba(226,60,113,0.08)' }}
                >
                  {state.submitting ? "제출 중..." : "불꽃달림단 신청하기"}
                  <span className="text-[20px]">&rarr;</span>
                </button>
              </div>

              {/* Formspree 에러 표시 */}
              <ValidationError prefix="Form" field="form" errors={state.errors} />

              {/* meta */}
              <input type="hidden" name="_subject" value="[불꽃달림단] 신규 신청" />
              <input type="hidden" name="event_date" value="2025-09-20 10:00" />
              <input type="hidden" name="source" value="/apply" />
            </form>
          )}
        </div>
      </section>

      <footer className="px-4 pb-10 text-center text-[11px] text-white/60">
        <div className="font-extrabold tracking-widest">불꽃살림단</div>
        <div className="mt-2">불꽃은 9월에 피지만, 변화는 지금입니다.</div>
      </footer>

      {/* 스타일 유틸 */}
      <style jsx global>{`
        .card-form {background:linear-gradient(135deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02));}
        .field-label-pill { @apply inline-flex rounded-full bg-[#E50063] px-4 py-1 text-[13px] font-semibold tracking-tight text-white shadow-[0_2px_4px_rgba(229,0,99,0.35)]; }
        .seg, .seg-on, .seg-off { @apply hidden; }
        .seg-gender, .seg-start { font-family: inherit; }
        .input { @apply w-full rounded-xl px-4 py-3 text-[15px] font-medium tracking-wide outline-none transition placeholder:font-normal; }
      `}</style>
    </main>
  );
}

/* ---------- 작은 공용 컴포넌트 ---------- */
function Field({
  label,
  children,
  required,
  full,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  full?: boolean;
}) {
  return (
    <div className={`${full ? "col-span-2" : ""} flex flex-col gap-2`}>
      <span className="field-label-pill select-none">
        {label} {required && <em className="not-italic text-white">*</em>}
      </span>
      {children}
    </div>
  );
}
