// app/page.tsx
"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const ASSETS = {
  logo: "/logo-bulggot.png",
  insta: "/icon-instagram.png",
  crew: "/c_all.png",
  poster: "/event-poster.png",
};

export default function Home() {
  // 스크롤 시 "내려보기" 힌트 페이드아웃
  useEffect(() => {
    const el = document.getElementById("scrollHint");
    const onScroll = () => el && (el.style.opacity = window.scrollY > 40 ? "0" : "1");
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main className="mx-auto min-h-screen w-full max-w-[420px] bg-black text-white">
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-[78vh] overflow-hidden bg-[#FFA800]">
        {/* 인스타 아이콘 */}
        <Link
          href="https://www.instagram.com/fireworks_seoul"
          aria-label="인스타그램"
          className="absolute right-4 top-4 z-10"
        >
          <Image src={ASSETS.insta} alt="" width={22} height={22} priority />
        </Link>

        <div className="px-6 pt-12 text-black">
          {/* 로고 PNG */}
          <div className="relative h-[54px] w-[220px]">
            <Image
              src={ASSETS.logo}
              alt="불꽃살림단"
              fill
              sizes="220px"
              className="object-contain"
              priority
            />
          </div>

          <p className="mt-5 text-[18px] font-extrabold">
            우리는 쇠맛 대신 <span className="underline decoration-black">불맛이다!</span>
          </p>
          <p className="mt-1 text-[12px] opacity-80">불꽃은 9월에 피지만, 변화는 지금입니다.</p>

          {/* CTA 버튼 (입체감) */}
          <div className="relative mt-5 inline-block">
            <span className="pointer-events-none absolute inset-0 translate-y-[6px] rounded-xl bg-black/40" />
            <Link
              href="#contents"
              className="relative inline-flex items-center justify-center rounded-xl bg-black px-4 py-3 text-[13px] font-semibold text-white"
            >
              불꽃살림단 스토리 보러가기 →
            </Link>
          </div>
        </div>

        {/* 캐릭터 PNG + 하단 그라데이션 */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[50%]">
          <Image
            src={ASSETS.crew}
            alt=""
            fill
            sizes="(max-width: 420px) 100vw, 420px"
            priority
            className="object-contain object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        </div>

        {/* 내려보기 */}
        <div
          id="scrollHint"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 text-center text-black/80 transition-opacity"
        >
          <div className="text-[13px]">내려보기</div>
          <div className="mt-1 animate-bounce">⌄</div>
        </div>
      </section>

      {/* ---------- EVENT ---------- */}
      <section id="event" className="px-5 pb-8 pt-8">
        <div className="text-[11px] text-white/50">| 불꽃살림단 플로깅 프로젝트</div>
        <h2 className="mt-2 text-[22px] font-extrabold">
          불꽃달림단 <span className="font-medium">남산편 단원을 모집합니다!</span>
        </h2>

        <EventCard />
      </section>

      {/* ---------- CONTENT HUB ---------- */}
      <section id="contents">
      <section className="px-5 pb-24 pt-2">
        <div className="text-[11px] text-white/50">| 불꽃살림단 콘텐츠 확인하기</div>
        <h3 className="mt-2 text-[22px] font-extrabold">
          불꽃살림단 <span className="font-medium">콘텐츠를 확인해보세요!</span>
        </h3>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <HubCard title="인스타 바로가기" href="https://www.instagram.com/fireworks_seoul" />
          <HubCard title="유튜브 바로가기" href="https://www.youtube.com/@fireworks_seoul" />
          <HubCard title="카톡채널 바로가기" href="https://pf.kakao.com/_xoTEDn" />
          <EmptyCard />
        </div>
</section>
        {/* 푸터 */}
        <div className="mt-14 rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center text-[11px] text-white/70">
          <div className="font-extrabold tracking-widest">불꽃살림단</div>
          <div className="mt-2">불꽃은 9월에 피지만, 변화는 지금입니다.</div>
        </div>
      </section>
    </main>
  );
}

/* ==================== Components ==================== */

function EventCard() {
  const meta = {
    date: "2025년 9월 20일 (토) 오전 10시",
    course: "후암동 · 중무릎 · 녹사평 출발 → 남산타워 도착",
    quota: "남자 30명 / 여자 30명",
  };

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_8px_0_#1d1d1d]">
      {/* 포스터 */}
      <div className="relative aspect-[16/10] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${ASSETS.poster})` }}
        />
        <div className="absolute inset-0 bg-black/40" />

        {/* 좌상단 라벨 박스 */}
        <div className="absolute left-3 top-3 rounded-lg bg-black/65 px-2 py-1 text-[10px] leading-tight">

        </div>

      </div>

      {/* 세부 정보 */}
      <div className="space-y-3 px-4 py-4">
        <InfoRow label="일시" value={meta.date} />
        <InfoRow label="코스" value={meta.course} />
        <InfoRow label="모집인원" value={meta.quota} desc="(선발 후 개별 안내)" />

        <p className="pt-1 text-[11px] text-white/60">
          ※ 불참/지각/안전 수칙 위반 시 선발 취소될 수 있습니다.
        </p>

    {/* 참가 입력 폼 */}
      </div>
    </div>
  );
}


function InfoRow({
  label,
  value,
  desc,
}: {
  label: string;
  value: string;
  desc?: string;
}) {
  return (
    <div className="flex items-start gap-2 text-[13px]">
      <span className="mt-0.5 inline-flex min-w-[42px] shrink-0 items-center justify-center rounded-full bg-white/10 px-2 py-1 text-[11px] text-white/80">
        {label}
      </span>
      <div className="leading-snug">
        <div className="font-semibold">{value}</div>
        {desc && <div className="mt-0.5 text-[11px] text-white/60">{desc}</div>}
      </div>
    </div>
  );
}

function HubCard({ title, href }: { title: string; href: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 text-center transition hover:border-white/25 hover:bg-white/10"
    >
      <div className="mx-auto h-12 w-12 rounded-xl bg-white/10" />
      <div className="mt-3 text-sm font-semibold">{title}</div>
      <div className="text-[11px] text-white/50">바로가기</div>

      {/* 입체 하단 그림자 */}
      <span className="pointer-events-none absolute inset-0 translate-y-[8px] rounded-2xl bg-black/40" />
    </Link>
  );
}

function EmptyCard() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-white/5 p-5 text-center text-white/50">
      준비 중
      <span className="pointer-events-none absolute inset-0 translate-y-[8px] rounded-2xl bg-black/30" />
    </div>
  );
}
