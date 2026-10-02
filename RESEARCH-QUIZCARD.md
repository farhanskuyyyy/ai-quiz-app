# RESEARCH-QUIZCARD.md — Riset Desain Layar Pertanyaan Quiz

Riset pola desain untuk mempercantik `src/components/QuizCard.jsx` (React + Vite + Tailwind 3.4, theme via CSS variables, primary maroon `#8B1E2D`).

**Batasan yang dipatuhi semua rekomendasi (anti-slop):**
- Warna solid saja — **tanpa** gradient, glow, drop-shadow tebal, blur, blob, conic-gradient.
- **Tanpa** library animasi berat (dilarang framer-motion/gsap) — maksimal CSS transitions/keyframes + Tailwind.
- Durasi micro-interaction dikutip dari riset: **150–250 ms** untuk acknowledgement instan, 280–400 ms untuk transisi/feedback.
- Semua animasi transform/opacity saja (GPU-composited), semuanya punya fallback `prefers-reduced-motion`.

**Konteks kode saat ini** (`QuizCard.jsx`): progress bar tipis `h-1.5` + label persen; kartu soal ber-badge kategori/difficulty; 4 tombol opsi A–D yang setelah diklik langsung berubah warna hijau/merah + centang/silang teks; feedback box penjelasan; tombol "Soal Berikutnya". State hanya `selected` + `isAnswered`.

---

## 1. Ringkasan Pola yang Ditemukan (dengan referensi)

### 1.1 Micro-interaction memilih jawaban (scale, ripple, stagger)

| Pola | Referensi nyata | Inti mekanisme |
|---|---|---|
| Press scale "0.97" | [QuizMaster Pro PRD — Option Tile State Machine](https://github.com/Phynxxx/Quiz-app-flutter/blob/main/QuizMaster_Pro_PRD.md) (Pressed/Hover State), [Zap Code — UI/UX quiz](https://zapcode.dev/learn/quiz-trivia-with-ui-ux-design) | Tile scale ke 0.97 dalam ±80 ms saat ditekan, kembali saat dilepas; durasi micro-interaction ideal 150–250 ms |
| Ripple solid | [CSS-Tricks — Recreate Material ripple](https://css-tricks.com/how-to-recreate-the-ripple-effect-of-material-design-buttons/), [pure CSS ripple tanpa JS (GitHub mladenplavsic)](https://github.com/mladenplavsic/css-ripple-effect) | Overlay lingkaran translusen yang scale 0→1 + fade 1→0, ~400–450 ms; versi anti-slop: isi **solid** `color-mix(in srgb, var(--primary) 12%, transparent)`, bukan gradient |
| Stagger opsi muncul | [CSS-Tricks — Different Approaches for Creating a Staggered Animation](https://css-tricks.com/different-approaches-for-creating-a-staggered-animation/), [LogRocket — Native CSS stagger sibling-index()](https://blog.logrocket.com/native-css-stagger-sibling-index/), [Grizzly Peak — CSS animation techniques](https://www.grizzlypeaksoftware.com/library/css-animation-techniques-with-javascript-triggers-s5kflz0m) | Anak-anak diberi `--i` (index), lalu `animation-delay: calc(var(--i) * 60ms)` + `@keyframes` fade+translateY; QuizMaster PRD memakai **60 ms per tile**, masuk **setelah** kartu selesai masuk (offset +150 ms), bukan berbarengan |
| Animasi replay per soal | [StackOverflow — Re-triggering CSS animations with React](https://stackoverflow.com/questions/70513123/re-triggering-css-animations-with-react), [Reddit r/reactjs — key remount](https://www.reddit.com/r/reactjs/comments/g8wmwi/using_reacts_key_attribute_to_remount_a_component/) | React `key={questionId}` memaksa remount → animasi CSS jalan ulang otomatis; **tanpa** `setTimeout`/`requestAnimationFrame` (QuizMaster PRD melarang rantai timer: race condition, tidak teruji) |

### 1.2 Transisi antar soal (slide/fade direction-aware)

| Pola | Referensi nyata | Inti mekanisme |
|---|---|---|
| Direction-aware slide | [MDN — `:active-view-transition-type()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:active-view-transition-type) (contoh `forwards`/`backwards` → `slide-out-to-left`+`slide-in-from-right` vs kebalikannya), [Slidev — Navigation Direction Variants](https://sli.dev/features/direction-variant) (class `nav-go-forward`/`nav-go-backward`), [bespoke-dir](https://github.com/ryanseddon/bespoke-dir), [open-slide — direction hook `--osd-dir`](https://open-slide.dev/docs/reference/slide-transitions) | Arah navigasi ditandai di wrapper (class **atau** CSS custom property `--dir: 1 | -1`), satu keluarga keyframe "memantul" diri via `calc(var(--dir) * Npx)`. Pola yang sama persis bisa dipakai di React: `data-dir="forward\|backward"` pada wrapper kartu soal |
| Durasi/curve exit vs enter | [QuizMaster Pro PRD — Question Transition Sequence](https://github.com/Phynxxx/Quiz-app-flutter/blob/main/QuizMaster_Pro_PRD.md) §3.3.3 | Exit: slide 80 dp + fade 300 ms `easeInCubic`; enter dari sisi berlawanan 300 ms `easeOutCubic`; opsi stagger **baru** mulai 150 ms setelah kartu masuk |
| Re-trigger via key | (sama seperti §1.1) | `<div key={questionNum} className={dir==='forward' ? 'enter-from-right' : 'enter-from-left'}>` |

### 1.3 Skeleton loading state

| Pola | Referensi nyata | Inti mekanisme |
|---|---|---|
| Skeleton struktural (bukan spinner) | [Animation Machine — Ultimate Guide to CSS Skeleton Loading](https://animation-machine.com/articles/skeleton-loading-animation-css-guide) | Placeholder mengikuti **bentuk & posisi** konten asli (blok judul, baris opsi) supaya tidak ada layout shift; shimmer standar memakai `linear-gradient` — **di sini diganti** opacity-pulse solid agar lolos anti-slop |
| Aksesibilitas skeleton | [Adrian Roselli — More Accessible Skeletons](http://adrianroselli.com/2020/11/more-accessible-skeletons.html), [Supernova — Skeleton Loader Accessibility](https://cornerstone-experience.supernova-docs.io/latest/components/helpers/skeleton-loader/accessibility-FpadaeFF) | Skeleton dekoratif `aria-hidden="true"`; status loading diumumkan via `role="status"`/`aria-busy="true"` + live region; **wajib** gerak skeleton dimatikan saat `prefers-reduced-motion: reduce` (WCAG 2.2.2) |
| Reduced-motion global | [MDN — `prefers-reduced-motion`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion) | Media query global yang menimpa durasi animasi/transisi saat user OS meminta reduce motion |

### 1.4 Progress indicator kreatif (bukan baris datar saja)

| Pola | Referensi nyata | Inti mekanisme |
|---|---|---|
| Dots per soal + countdown bar atas | [VP0 — HQ Trivia pattern guide](https://vp0.com/blogs/live-trivia-game-ui-clone-hq-trivia) (question card + countdown ring + lockout/reveal states), [Sorceress — Trivia browser question loop](https://sorceress.games/blog/quiz-how-to-make-a-trivia-game-browser-question-loop-2026) | Trivia populer memakai progres **per-judul** (dots/step) + indikator waktu, bukan hanya % total; setiap dot punya state: benar/salah/kini/belum |
| SVG progress ring | [CSS-Tricks — Building a Progress Ring, Quickly](https://css-tricks.com/building-progress-ring-quickly/), [StackOverflow — progress circle + `pathLength`](https://stackoverflow.com/questions/66990496/simple-svg-css-progress-circle), [Nikitahl — SVG circle progress](https://nikitahl.com/svg-circle-progress) | Dua `<circle>` bertumpuk; `pathLength="100"` menghapus kalkulus keliling; `stroke-dasharray: 100` + `stroke-dashoffset: 100 - pct`; `transform: rotate(-90deg)` agar mulai jam 12; `transition: stroke-dashoffset .5s` |
| Catatan anti-slop | [FWD Tools — Circular Progress Ring](https://fwdtools.com/ui-snippets/circular-progress/) (Explicit: "calculated from circumference … not clip-path, canvas, or conic-gradient") | Ring **SVG stroke solid** = warna solid `var(--primary)` di atas track `var(--border)` — bukan conic-gradient |

### 1.5 Visual feedback benar/salah (satisfying tapi tidak norak)

| Pola | Referensi nyata | Inti mekanisme |
|---|---|---|
| Checkmark draw-on | [NudaUI — Success Check](https://nudaui.dev/components/success-check), [CodePen whskrElliott — Check Success Animation](https://codepen.io/whskrElliott/pen/vYyRKXg), [Animations.adder.dev — Checkmark draw-on](https://animations.adder.dev/a/checkmark-draw) | SVG path dengan `stroke-dasharray`/`stroke-dashoffset` yang dianimasikan ke 0; **urutan menjual**: lingkaran/garis dulu (~350 ms), tick menyusul (+80–150 ms delay); reduced-motion: `animation: none; stroke-dashoffset: 0` |
| Shake decaying + pop | [QuizMaster Pro PRD §3.3.2](https://github.com/Phynxxx/Quiz-app-flutter/blob/main/QuizMaster_Pro_PRD.md) | Salah: translate `+6,−6,+5,−5,+3,−3,0` dalam 400 ms (~3 siklus meredam); Benar: scale `1.0→1.02→1.0` 250 ms `easeOut` — transform saja, **tanpa** glow/particle |
| Hierarki state (anti-norak) | QuizMaster PRD — Correct vs Revealed vs dim states | **Dipilih & benar** = warna solid penuh + check; **benar tapi terungkap setelah jawaban salah** = warna sama dengan penekanan lebih rendah (bg 60% / opacity lebih rendah) **tanpa** perayaan; opsi lain di-dim ke opacity ~30–40%; user salah pilih = merah + X |
| Durasi & umpan balik | [Zap Code — micro-interaction 150–250 ms](https://zapcode.dev/learn/quiz-trivia-with-ui-ux-design), [Sorceress — hold reveal 1500–2000 ms](https://sorceress.games/blog/quiz-how-to-make-a-trivia-game-browser-question-loop-2026) | Animasi feedback singkat (≤400 ms), lalu hold state hasil **1,5–2 s** sebelum user lanjut; feedback diumumkan ke screen reader (`aria-live="polite"`) |

### 1.6 Timer / streak element (opsional)

| Pola | Referensi nyata | Inti mekanisme |
|---|---|---|
| Countdown ring yang "mengering" | [VP0 — HQ Trivia](https://vp0.com/blogs/live-trivia-game-ui-clone-hq-trivia) (draining ring tied to server deadline), [Sorceress](https://sorceress.games/blog/quiz-how-to-make-a-trivia-game-browser-question-loop-2026) (ring pulsing merah 3 detik terakhir) | Teknik SVG ring yang sama dengan §1.4; 3 detik terakhir: swap **solid** warna ke token danger + pop scale kecil per detik — tanpa glow/gradient |
| Streak flame + pop | [FWD Tools — Habit Streak Tracker](https://fwdtools.com/ui-snippets/streak-tracker) (spring flame pop via remove-class/force-reflow/add-class), [Motion Vault — Streak Counter Flame](https://56juqingba.com/item/streak-counter-flame) (catatan: transform/opacity only; **wajib** reduced-motion fallback) | Ikon flame + angka streak; reward moment = pop `cubic-bezier(0.34, 1.56, 0.64, 1)` ±300 ms yang di-replay. Adaptasi anti-slop: flame **solid** `var(--primary)`, buang glow drop-shadow & isi gradient pada demo asli |
| Angka timer stabil | praktik umum Tailwind | `tabular-nums` pada digit timer supaya layout tidak "melompat" tiap detik |

---

## 2. Rekomendasi FINAL — 7 Implementasi Konkret untuk Stack Ini

> Semua rekomendasi memakai token yang **sudah ada**: `var(--primary)` (#8B1E2D), `var(--surface)`, `var(--border)`, `var(--text)`, `var(--text-secondary)`; warna feedback yang sudah dipakai di `QuizCard.jsx` saat ini (#D1FAE5/#22C55E hijau, #FEE2E2/#EF4444 merah) dipertahankan agar konsisten. Keyframe baru ditaruh di satu file CSS global (mis. `src/index.css`), class Tailwind baru pakai arbitrary values (`animate-[...]`) tanpa mengubah `tailwind.config.js`.

### 1. Option Press Scale + Ripple Solid
- **Pola:** Press acknowledgement ala Material (scale 0.97, ~100 ms) + ripple translusen solid.
- **Implementasi (CSS/React):**
  ```css
  .opt-btn { transition: transform .1s ease, background-color .2s ease, border-color .2s ease; }
  .opt-btn:active:not(:disabled) { transform: scale(.97); }
  @keyframes opt-ripple { from { transform: scale(0); opacity: .9 } to { transform: scale(4); opacity: 0 } }
  .opt-ripple {
    position: absolute; inset: 0; margin: auto; width: 40px; height: 40px; border-radius: 9999px;
    background: color-mix(in srgb, var(--primary) 12%, transparent); pointer-events: none;
    animation: opt-ripple .45s ease-out forwards;
  }
  ```
  Di React: tombol opsi `relative overflow-hidden`; saat `onClick` render `<span key={rippleKey} className="opt-ripple" />` (increment `rippleKey` state) — tanpa library, posisi ripple bisa diset `left/top` dari koordinat klik opsional.
- **Alasan cocok:** acknowledgment instan <150 ms dari riset Zap Code/PRD; ripple solid `color-mix` memakai `var(--primary)` sehingga otomatis ikut dark mode; tanpa gradient/glow — aman anti-slop; transisi transform tidak memicu layout.

### 2. Stagger Entrance Opsi (`--i` + `animation-delay`)
- **Pola:** Opsi muncul bertahap 60 ms per item **setelah** kartu soal masuk.
- **Implementasi (CSS/React):**
  ```css
  @keyframes opt-in { from { opacity: 0; transform: translateY(10px) } to { opacity: 1; transform: none } }
  .opt-item { opacity: 0; animation: opt-in .22s ease-out forwards; animation-delay: calc(var(--i, 0) * 60ms + 120ms); }
  ```
  ```jsx
  <button key={option} className="opt-item" style={{ '--i': index }}>…</button>
  ```
  Wrapper opsi diberi `key={question.id}` agar tiap soal baru animasi jalan ulang otomatis (remount React, bukan timer).
- **Alasan cocok:** pola stagger CSS murni terdokumentasi (CSS-Tricks, LogRocket); interval 60 ms berasal dari spesifikasi pola quiz nyata (QuizMaster PRD); `calc(var(--i)*…)` tanpa JS sama sekali; kombinasi dengan `key` = cara resmi restart animasi per soal.

### 3. Transisi Antar-Soal Direction-Aware (slide + fade)
- **Pola:** Gerak maknawi — maju: kartu keluar ke kiri, kartu baru masuk dari kanan; mundur: kebalikan.
- **Implementasi (CSS/React):**
  ```css
  @keyframes q-enter { from { opacity: 0; transform: translateX(calc(var(--dir, 1) * 24px)) } to { opacity: 1; transform: none } }
  .q-enter { animation: q-enter .28s cubic-bezier(.22, 1, .36, 1) both; }
  ```
  ```jsx
  // di komponen induk: bandingkan questionNum baru vs lama → setDirection('forward'|'backward')
  <div key={question.id} className="q-enter" style={{ '--dir': direction === 'forward' ? 1 : -1 }}>…</div>
  ```
  (Exit animation penuh opsional; entrance-only sudah memberi 80% kesan tanpa perlu dua node sekaligus.)
- **Alasan cocok:** pola "class/CSS-var berisi arah + satu keyframe yang memantul via calc" terbukti di Slidev, bespoke-dir, open-slide (`--osd-dir`), dan contoh MDN view-transition types — tinggal ditiru tanpa View Transitions API; arah membuat navigasi terbaca; hanya `transform/opacity`, ~280 ms sesuai timing riset; zero dependency.

### 4. Skeleton Loading Solid — Pulse, Bukan Shimmer Gradient
- **Pola:** Placeholder struktural berbentuk kartu soal + 4 baris opsi, "bernapas" dengan opacity solid.
- **Implementasi (CSS/React):**
  ```css
  @keyframes skel-pulse { 0%, 100% { opacity: 1 } 50% { opacity: .45 } }
  .skel-block { background: var(--surface); border: 1px solid var(--border); border-radius: .5rem; animation: skel-pulse 1.4s ease-in-out infinite; }
  @media (prefers-reduced-motion: reduce) { .skel-block { animation: none } }
  ```
  ```jsx
  <div role="status" aria-busy="true" className="space-y-4">
    <div className="skel-block h-24" />
    {[0,1,2,3].map(i => <div key={i} className="skel-block h-12" />)}
    <span className="sr-only">Memuat soal…</span>
  </div>
  ```
- **Alasan cocok:** shimmer standar memakai `linear-gradient` → bentrok anti-slop; opacity-pulse solid tetap memberi sinyal "loading" dan hemat kompositor; skeleton mengikuti bentuk layout asli (mencegah layout shift); pola aksesibilitas (aria-busy, sr-only status, reduced-motion off) persis mengikuti Adrian Roselli/Supernova.

### 5. Progres Kreatif: Step-Dots per Soal + SVG Ring `pathLength`
- **Pola:** Dots = kebenaran per soal (bukan hanya %); ring kecil = progres total.
- **Implementasi (CSS/React):**
  ```jsx
  <div className="flex items-center gap-1.5" aria-label={`Soal ${questionNum} dari ${totalQuestions}`}>
    {Array.from({ length: totalQuestions }, (_, i) => (
      <span key={i} className={`h-2 rounded-full transition-all duration-300
        ${i < questionNum - 1 ? (wasCorrect ? 'bg-[#22C55E] w-4' : 'bg-[#EF4444] w-4')
        : i === questionNum - 1 ? 'bg-[var(--primary)] w-6 h-2.5' : 'bg-[var(--border)] w-2'}`} />
    ))}
  </div>
  <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90">
    <circle cx="18" cy="18" r="16" fill="none" stroke="var(--border)" strokeWidth="3" />
    <circle cx="18" cy="18" r="16" fill="none" stroke="var(--primary)" strokeWidth="3"
      strokeLinecap="round" pathLength="100" strokeDasharray="100"
      strokeDashoffset={100 - progress} style={{ transition: 'stroke-dashoffset .5s cubic-bezier(.4,0,.2,1)' }} />
  </svg>
  ```
- **Alasan cocok:** `pathLength="100"` menghapus kalkulus keliling (polos dari StackOverflow/SO pattern); stroke solid `var(--primary)` di atas track `var(--border)` — ring SVG, bukan conic-gradient (larangan anti-slop + anjuran FWD Tools); dots memberi state benar/salah per soal yang baris datar tidak bisa; transisi `stroke-dashoffset` animasi gratis; dark mode otomatis via variables.

### 6. Feedback Benar/Salah: Draw-on Check + Shake Meredam + Hierarki State
- **Pola:** Checkmark "digambar", salah "bergoyang" sebentar, benar "pop" kecil; benar-terungkap ≠ benar-dipilih.
- **Implementasi (CSS/React):**
  ```css
  @keyframes draw { to { stroke-dashoffset: 0 } }
  .check-draw { stroke-dasharray: 32; stroke-dashoffset: 32; animation: draw .35s ease forwards .08s; }
  @keyframes shake { 15%,45% { transform: translateX(-5px) } 30%,60% { transform: translateX(5px) } 75% { transform: translateX(-3px) } 100% { transform: none } }
  .opt-wrong { animation: shake .4s ease-in-out; }
  @keyframes pop { 50% { transform: scale(1.02) } }
  .opt-correct { animation: pop .25s ease-out; }
  ```
  ```jsx
  {/* opsi benar-dipilih: bg hijau solid + <svg viewBox="0 0 24 24"><path className="check-draw" d="M20 6 9 17l-5-5"/></svg> */}
  {/* opsi benar setelah user salah: bg hijau solid tapi dengan opacity wrapper lebih rendah (mis. wrapper opacity-70), tanpa animasi pop */}
  {/* opsi salah dipilih: bg merah + X + class opt-wrong; opsi lain: opacity-40 */}
  {/* feedback box: <p role="status" aria-live="polite">…</p>, tahan state 1.5–2 s sebelum lanjut */}
  ```
- **Alasan cocok:** sequenced draw-on (garis→tick, +80 ms) terbukti memuaskan tanpa norak (NudaUI/adder.dev); shake meredam + pop transform-only dari QuizMaster PRD; hierarki "revealed vs selected" mencegah kesan norak saat user salah (benar tampil lebih tenang); durasi 250–400 ms dalam rentang riset; semua keyframe solid-color, tanpa glow.

### 7. Timer Ring + Streak Chip (opsional, komponen terpisah)
- **Pola:** Countdown ring "mengering" + pop detik terakhir; chip streak flame yang pop saat naik.
- **Implementasi (CSS/React):**
  ```css
  @keyframes tick-pop { 50% { transform: scale(1.12) } }
  .ring-danger { stroke: #EF4444; animation: tick-pop 1s ease-in-out infinite; }
  @keyframes flame-pop { 0% { transform: scale(1) } 45% { transform: scale(1.25) rotate(-6deg) } 100% { transform: none } }
  .flame-pop { animation: flame-pop .3s cubic-bezier(.34,1.56,.64,1); }
  ```
  ```jsx
  {/* timer: SVG ring teknik #5 — strokeDashoffset = 100 - (sisa/durasi*100); update tiap 1 s via useEffect/setInterval di komponen terpisah */}
  {/* <=5 s: className tambahan "ring-danger" (solid swap warna, tanpa glow) */}
  {/* streak: <FlameIcon /> solid var(--primary) + angka, <span key={streak} className="flame-pop"> */}
  <span className="tabular-nums">{seconds}s</span>
  ```
- **Alasan cocok:** countdown ring HQ Trivia (VP0/Sorceress) menambah "stakes" terbaca tanpa visual norak; teknik ring **identik** dengan rekomendasi #5 (satu pola, dua kegunaan); pop via `key` remount/re-add class = pola FWD Tools tanpa library; solid-swap warna + transform/opacity only sesuai anti-slop; `tabular-nums` mencegah jitter layout; sengaja **opsional** — bisa dilepas tanpa merusak alur quiz.

---

## 3. Catatan Implementasi Lintas Rekomendasi

- **Guard reduced-motion global** (ikuti MDN): di `src/index.css`, `@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; } }` — semua pola di atas otomatis aman.
- **Rentang durasi:** press 100–150 ms → masuk opsi 220 ms → feedback 250–400 ms → transisi soal 280 ms → hold hasil 1,5–2 s (sebelum "Soal Berikutnya" aktif/auto).
- **Yang dilarang muncul di implementasi:** `linear-gradient`/`conic-gradient`, `box-shadow`/`drop-shadow` glow, `filter: blur`, emoji confetti besar, partikel canvas, library animasi apa pun.
- **Restart animasi:** hanya via React `key` (remount) atau re-add class + `void el.offsetWidth` — jangan `setTimeout` untuk men-sequence (race condition, sesuai larangan pola PRD).
- **Konsistensi warna:** jangan menambah hex baru; hijau/merah feedback memakai palet yang sudah dipakai `QuizCard.jsx` (#22C55E/#D1FAE5, #EF4444/#FEE2E2); netral memakai `var(--border)`/`var(--surface)`/`var(--text-secondary)` agar dark mode ikut.
- **Aksesibilitas:** opsi tetap `<button disabled>` setelah dijawab; feedback `aria-live="polite"`; skeleton `role="status"`; kontras teks ≥ 4.5:1 (hindari teks putih di atas hijau muda — badge kategori putih di `var(--primary)` sudah aman).
