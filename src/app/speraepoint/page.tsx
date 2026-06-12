"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  Zap,
  BarChart2,
  Clock,
  Shield,
  Users,
  Cloud,
  Download,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  CheckCircle,
  Star,
  ArrowRight,
  Smartphone,
  LogIn,
  Play,
  Activity,
} from "lucide-react";

// ─── TYPES ──────────────────────────────────────────────────────────────────
interface FAQItem {
  q: string;
  a: string;
}

interface FeatureCard {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

interface StatItem {
  value: number;
  suffix: string;
  label: string;
}

interface ScreenshotItem {
  title: string;
  subtitle: string;
  desc: string;
  color: string;
  image: string;
}

// ─── DATA ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  "Beranda",
  "Tentang",
  "Fitur",
  "Screenshot",
  "Cara Kerja",
  "Download",
  "Kontak",
];

const FEATURES: FeatureCard[] = [
  {
    icon: <Zap size={22} />,
    title: "Transaksi Cepat",
    desc: "Proses setiap transaksi dalam hitungan detik dengan antarmuka yang intuitif dan responsif.",
  },
  {
    icon: <BarChart2 size={22} />,
    title: "Monitoring Real-time",
    desc: "Pantau aktivitas dan performa secara langsung dengan dashboard yang komprehensif.",
  },
  {
    icon: <Clock size={22} />,
    title: "Riwayat Aktivitas",
    desc: "Akses rekam jejak lengkap semua transaksi dan aktivitas kapan saja, di mana saja.",
  },
  {
    icon: <Shield size={22} />,
    title: "Keamanan Data",
    desc: "Enkripsi tingkat enterprise memastikan setiap data pengguna terlindungi sepenuhnya.",
  },
  {
    icon: <Users size={22} />,
    title: "Multi User",
    desc: "Kelola banyak pengguna dan hak akses dalam satu platform yang terintegrasi.",
  },
  {
    icon: <Cloud size={22} />,
    title: "Sinkronisasi Cloud",
    desc: "Data tersinkronisasi otomatis ke cloud — akses dari perangkat mana pun, tanpa hambatan.",
  },
];

const STATS: StatItem[] = [
  { value: 100, suffix: "+", label: "Pengguna Aktif" },
  { value: 500, suffix: "+", label: "Total Transaksi" },
  { value: 98, suffix: "%", label: "Tingkat Kepuasan" },
  { value: 99, suffix: "%", label: "Uptime Sistem" },
];

const STEPS = [
  {
    icon: <Download size={20} />,
    title: "Download Aplikasi",
    desc: "Unduh file APK dan install di perangkat Android Anda dengan mudah.",
  },
  {
    icon: <LogIn size={20} />,
    title: "Login Akun",
    desc: "Masuk dengan kredensial yang telah diberikan oleh administrator.",
  },
  {
    icon: <Play size={20} />,
    title: "Gunakan Fitur",
    desc: "Eksplorasi dan manfaatkan seluruh fitur unggulan yang tersedia.",
  },
  {
    icon: <Activity size={20} />,
    title: "Pantau Real-time",
    desc: "Monitor semua aktivitas dan transaksi secara langsung dari dashboard.",
  },
];

const SCREENSHOTS: ScreenshotItem[] = [
  {
    title: "Halaman Admin",
    subtitle: "Kelola sistem secara menyeluruh",
    desc: "Panel admin lengkap untuk manajemen pelanggaran, kelas, user, dan rekap data — semua dalam satu tampilan yang terstruktur.",
    color: "from-indigo-600 to-violet-700",
    image: "/images/baner/Halaman_admin.jpg",
  },
  {
    title: "Halaman Guru",
    subtitle: "Pelaporan pelanggaran siswa",
    desc: "Guru dapat dengan mudah melaporkan pelanggaran, memilih siswa, memilih jenis pelanggaran, dan melihat riwayat laporan dalam beberapa langkah sederhana.",
    color: "from-blue-600 to-cyan-600",
    image: "/images/baner/Halaman_guru.png",
  },
  {
    title: "Halaman Siswa",
    subtitle: "Pantau poin & status pelanggaran",
    desc: "Siswa dapat memantau akumulasi poin pelanggaran, melihat daftar pelanggaran, informasi status, dan profil akun secara mandiri.",
    color: "from-teal-600 to-emerald-600",
    image: "/images/baner/Halaman_siswa.png",
  },
];

const FAQS: FAQItem[] = [
  {
    q: "Bagaimana cara download aplikasi?",
    a: "Klik tombol 'Download APK' di halaman ini, kemudian install file APK yang telah diunduh di perangkat Android Anda. Pastikan opsi 'Install dari sumber tidak dikenal' telah diaktifkan di pengaturan perangkat.",
  },
  {
    q: "Apakah aplikasi ini gratis?",
    a: "Aplikasi Spera E-Point tersedia secara gratis untuk diunduh dan digunakan. Hubungi tim kami untuk informasi lebih lanjut mengenai paket dan lisensi enterprise.",
  },
  {
    q: "Bagaimana cara login ke aplikasi?",
    a: "Gunakan akun yang telah diberikan oleh administrator sistem Anda. Jika belum memiliki akun, silakan hubungi tim support kami untuk mendapatkan akses.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Keamanan data adalah prioritas utama kami. Seluruh data dienkripsi menggunakan standar AES-256 dan disimpan di server yang tersertifikasi. Kami juga menerapkan autentikasi dua faktor untuk keamanan tambahan.",
  },
];

// ─── HOOKS ──────────────────────────────────────────────────────────────────
function useCountUp(target: number, duration = 2000, started = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!started) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration, started]);
  return count;
}

// ─── SUB-COMPONENTS ─────────────────────────────────────────────────────────

function StatCard({ value, suffix, label, started }: StatItem & { started: boolean }) {
  const count = useCountUp(value, 2000, started);
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-all duration-300 hover:-translate-y-1">
      <div className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
        {count.toLocaleString("id-ID")}
        {suffix}
      </div>
      <div className="text-slate-400 mt-1 text-sm font-medium">{label}</div>
    </div>
  );
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden"
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-5 py-4 text-left font-medium text-slate-800 dark:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            <span>{item.q}</span>
            {open === i ? (
              <ChevronUp size={18} className="text-indigo-500 flex-shrink-0" />
            ) : (
              <ChevronDown
                size={18}
                className="text-slate-400 flex-shrink-0"
              />
            )}
          </button>
          {open === i && (
            <div className="px-5 pb-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed border-t border-slate-100 dark:border-slate-700 pt-3">
              {item.a}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PhoneMockup() {
  return (
    <div className="relative flex items-center justify-center">
      {/* Glow rings */}
      <div className="absolute w-72 h-72 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="absolute w-56 h-56 rounded-full bg-cyan-500/15 blur-2xl" />

      {/* Phone frame */}
      <div className="relative z-10 w-56 h-[460px] bg-slate-900 rounded-[2.5rem] border-4 border-slate-700 shadow-2xl overflow-hidden">
        {/* Notch */}
        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-20 h-5 bg-slate-800 rounded-full z-20" />

        {/* Screen content – stylised UI */}
        <div className="w-full h-full bg-gradient-to-b from-slate-900 via-indigo-950 to-slate-900 pt-10 px-3 pb-3 flex flex-col gap-2">
          {/* Header bar */}
          <div className="flex items-center justify-between mb-1">
            <div className="text-white text-xs font-semibold">Spera E-Point</div>
            <div className="w-5 h-5 rounded-full bg-indigo-500/60" />
          </div>
          {/* Balance card */}
          <div className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 p-3">
            <div className="text-indigo-200 text-[9px] mb-0.5">Total Poin</div>
            <div className="text-white font-bold text-lg">12.840</div>
            <div className="text-indigo-300 text-[8px] mt-0.5">+240 hari ini</div>
          </div>
          {/* Quick action grid */}
          <div className="grid grid-cols-3 gap-1.5 mt-1">
            {["Kirim", "Terima", "Tukar"].map((label) => (
              <div
                key={label}
                className="bg-slate-800 rounded-lg p-2 flex flex-col items-center gap-1"
              >
                <div className="w-6 h-6 rounded-md bg-indigo-500/40" />
                <span className="text-slate-300 text-[8px]">{label}</span>
              </div>
            ))}
          </div>
          {/* Transaction list */}
          <div className="mt-1 space-y-1.5 flex-1">
            <div className="text-slate-400 text-[8px] font-medium">Riwayat</div>
            {[
              { name: "Transfer Poin", val: "+500", clr: "text-emerald-400" },
              { name: "Penukaran", val: "-200", clr: "text-red-400" },
              { name: "Bonus Harian", val: "+50", clr: "text-emerald-400" },
              { name: "Referral", val: "+150", clr: "text-emerald-400" },
            ].map((t) => (
              <div
                key={t.name}
                className="flex items-center justify-between bg-slate-800/60 rounded-lg px-2 py-1.5"
              >
                <div className="flex items-center gap-1.5">
                  <div className="w-4 h-4 rounded bg-slate-700" />
                  <span className="text-slate-300 text-[8px]">{t.name}</span>
                </div>
                <span className={`text-[8px] font-semibold ${t.clr}`}>
                  {t.val}
                </span>
              </div>
            ))}
          </div>
          {/* Bottom nav */}
          <div className="flex items-center justify-around bg-slate-800 rounded-2xl py-2">
            {["●", "○", "○", "○"].map((d, i) => (
              <div
                key={i}
                className={`text-[10px] ${
                  d === "●" ? "text-indigo-400" : "text-slate-600"
                }`}
              >
                {d}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating badge */}
      <div className="absolute -right-4 top-16 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2 z-20">
        <CheckCircle size={14} className="text-emerald-500" />
        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
          Transaksi berhasil
        </span>
      </div>
      <div className="absolute -left-6 bottom-24 bg-white dark:bg-slate-800 rounded-xl px-3 py-2 shadow-xl border border-slate-100 dark:border-slate-700 flex items-center gap-2 z-20">
        <Star size={14} className="text-amber-400 fill-amber-400" />
        <span className="text-xs font-medium text-slate-700 dark:text-slate-200">
          98% kepuasan
        </span>
      </div>
    </div>
  );
}

// ─── MAIN PAGE ───────────────────────────────────────────────────────────────
export default function SperaEPointPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);

  // Navbar scroll effect
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    const timer = setInterval(
      () => setActiveSlide((p) => (p + 1) % SCREENSHOTS.length),
      3500
    );
    return () => clearInterval(timer);
  }, []);

  // Stats intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStatsVisible(true);
      },
      { threshold: 0.3 }
    );
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const sectionIds: Record<string, string> = {
    Beranda: "hero",
    Tentang: "tentang",
    Fitur: "fitur",
    Screenshot: "screenshot",
    "Cara Kerja": "cara-kerja",
    Download: "download",
    Kontak: "kontak",
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 overflow-x-hidden">
      {/* ── NAVBAR ──────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm border-b border-slate-200/60 dark:border-slate-800/60"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-2 font-bold text-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-black">
              SE
            </div>
            <span className="hidden sm:block bg-gradient-to-r from-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Spera E-Point
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(sectionIds[link])}
                className="px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-950/50 transition-all"
              >
                {link}
              </button>
            ))}
          </nav>

          {/* CTA + Mobile Menu */}
          <div className="flex items-center gap-3">
            <a
              href="/apps/speraepoint.apk"
              download
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
            >
              <Download size={14} />
              Download APK
            </a>
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 px-4 pb-4 pt-2 space-y-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(sectionIds[link])}
                className="block w-full text-left px-4 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 hover:text-indigo-600 rounded-lg transition-colors"
              >
                {link}
              </button>
            ))}
            <div className="pt-2">
              <a
                href="/apps/speraepoint.apk"
                download
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-semibold px-4 py-3 rounded-xl"
              >
                <Download size={14} />
                Download APK
              </a>
            </div>
          </div>
        )}
      </header>

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center pt-16 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-cyan-500/15 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-0 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                Versi Terbaru Tersedia
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight tracking-tight mb-5">
                Sistem Poin{" "}
                <span className="bg-gradient-to-r from-indigo-400 to-cyan-400 bg-clip-text text-transparent">
                  Pelanggaran Siswa
                </span>{" "}
                Digital
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
                Spera E-Point memudahkan sekolah dalam mencatat, memantau, dan
                mengelola poin pelanggaran siswa secara real-time — transparan
                untuk guru, siswa, dan admin.
              </p>
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                <a
                  href="/apps/speraepoint.apk"
                  download
                  className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold px-6 py-3.5 rounded-xl transition-all shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 hover:-translate-y-0.5"
                >
                  <Download size={18} />
                  Download APK
                </a>
                <button
                  onClick={() => scrollTo("tentang")}
                  className="flex items-center gap-2 border border-slate-600 hover:border-indigo-400 text-slate-300 hover:text-indigo-300 font-semibold px-6 py-3.5 rounded-xl transition-all hover:bg-indigo-500/5"
                >
                  Pelajari Lebih Lanjut
                  <ArrowRight size={16} />
                </button>
              </div>
              <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-500" />
                  Gratis diunduh
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-500" />
                  Android 6.0+
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-500" />
                  Tanpa iklan
                </div>
              </div>
            </div>

            {/* Right – Phone Mockup */}
            <div className="flex justify-center lg:justify-end">
              <PhoneMockup />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-slate-500 text-xs">Scroll</span>
          <ChevronDown size={16} className="text-slate-500" />
        </div>
      </section>

      {/* ── SCREENSHOTS ─────────────────────────────────────────────── */}
      <section id="screenshot" className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-widest">
              Tampilan Aplikasi
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3">
              Dirancang untuk Kemudahan
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Antarmuka yang bersih dan intuitif memastikan pengalaman pengguna
              yang menyenangkan di setiap layar.
            </p>
          </div>

          {/* Carousel */}
          <div className="relative overflow-hidden rounded-3xl">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {SCREENSHOTS.map((ss, i) => (
                <div key={i} className="min-w-full">
                  <div
                    className={`relative bg-gradient-to-r ${ss.color} rounded-3xl overflow-hidden`}
                  >
                    <div className="flex flex-col lg:flex-row items-center gap-6 p-6 md:p-10">
                      {/* Text */}
                      <div className="flex-shrink-0 lg:w-64 text-white text-center lg:text-left">
                        <div className="inline-flex items-center gap-1.5 bg-white/20 text-white/90 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                          Tampilan {i + 1} dari {SCREENSHOTS.length}
                        </div>
                        <h3 className="text-2xl sm:text-3xl font-bold mb-1">
                          {ss.title}
                        </h3>
                        <p className="text-white/70 text-sm font-medium mb-3">
                          {ss.subtitle}
                        </p>
                        <p className="text-white/80 text-sm leading-relaxed">
                          {ss.desc}
                        </p>
                      </div>
                      {/* Real banner image */}
                      <div className="flex-1 w-full">
                        <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                          style={{ aspectRatio: "16/7" }}>
                          <Image
                            src={ss.image}
                            alt={ss.title}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 768px) 100vw, 70vw"
                            priority={i === 0}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-5">
            {SCREENSHOTS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`transition-all duration-300 rounded-full ${
                  activeSlide === i
                    ? "w-8 h-2.5 bg-indigo-600"
                    : "w-2.5 h-2.5 bg-slate-300 dark:bg-slate-600 hover:bg-indigo-400"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── TENTANG ─────────────────────────────────────────────────── */}
      <section id="tentang" className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-widest">
                Tentang Aplikasi
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-5">
                Platform E-Point yang Andal &amp; Terpercaya
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                Spera E-Point adalah aplikasi manajemen poin pelanggaran siswa
                berbasis Android yang dirancang khusus untuk lingkungan sekolah.
                Sistem ini menghubungkan admin, guru, dan siswa dalam satu
                platform yang terintegrasi.
              </p>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                Guru dapat melaporkan pelanggaran secara langsung dari
                smartphone. Siswa dapat memantau akumulasi poin dan status
                kedisiplinan mereka. Admin mengelola seluruh data dan menghasilkan
                rekap secara otomatis.
              </p>
              <div className="space-y-3">
                {[
                  "Antarmuka modern, bersih, dan mudah digunakan",
                  "Laporan dan analitik yang komprehensif",
                  "Dukungan teknis yang responsif",
                  "Pembaruan rutin dan peningkatan fitur berkala",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle
                      size={18}
                      className="text-indigo-500 flex-shrink-0 mt-0.5"
                    />
                    <span className="text-slate-700 dark:text-slate-300 text-sm">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info cards */}
            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  icon: "🎯",
                  title: "Misi Kami",
                  desc: "Menyederhanakan pengelolaan poin digital agar lebih transparan dan efisien.",
                },
                {
                  icon: "🚀",
                  title: "Teknologi",
                  desc: "Dibangun dengan teknologi modern yang cepat, aman, dan skalabel.",
                },
                {
                  icon: "🔒",
                  title: "Privasi",
                  desc: "Data Anda dilindungi dengan enkripsi standar industri.",
                },
                {
                  icon: "💡",
                  title: "Inovasi",
                  desc: "Terus berkembang dengan fitur-fitur baru berdasarkan masukan pengguna.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 hover:border-indigo-300 dark:hover:border-indigo-700 hover:-translate-y-1 transition-all duration-200"
                >
                  <div className="text-2xl mb-3">{card.icon}</div>
                  <div className="font-semibold text-sm mb-1">{card.title}</div>
                  <div className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                    {card.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FITUR ───────────────────────────────────────────────────── */}
      <section
        id="fitur"
        className="py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-950"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-widest">
              Fitur Unggulan
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3">
              Semua yang Anda Butuhkan
            </h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
              Dirancang dengan mempertimbangkan kebutuhan nyata pengguna —
              powerful namun tetap sederhana.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-lg hover:shadow-indigo-500/5 hover:-translate-y-1 transition-all duration-200"
              >
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-4 group-hover:bg-indigo-100 dark:group-hover:bg-indigo-900 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CARA KERJA ──────────────────────────────────────────────── */}
      <section id="cara-kerja" className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-widest">
              Cara Kerja
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3">
              Mulai Hanya dalam 4 Langkah
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Proses onboarding yang cepat dan mudah, tanpa konfigurasi rumit.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <div key={i} className="relative text-center">
                {i < STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-gradient-to-r from-indigo-300 to-transparent dark:from-indigo-700" />
                )}
                <div className="relative z-10 inline-flex w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 items-center justify-center text-white shadow-lg shadow-indigo-500/25 mb-4">
                  {step.icon}
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white dark:bg-slate-950 border-2 border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="font-semibold mb-2 text-sm">{step.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATISTIK ───────────────────────────────────────────────── */}
      <section
        ref={statsRef}
        className="py-20 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900"
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-indigo-400 text-sm font-semibold uppercase tracking-widest">
              Dalam Angka
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 text-white">
              Dipercaya Ribuan Pengguna
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s, i) => (
              <StatCard key={i} {...s} started={statsVisible} />
            ))}
          </div>
        </div>
      </section>

      {/* ── DOWNLOAD ────────────────────────────────────────────────── */}
      <section id="download" className="py-20 bg-white dark:bg-slate-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 rounded-3xl p-10 sm:p-16 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full" />
              <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/5 rounded-full" />
            </div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-4 py-1.5 rounded-full mb-6">
                <Smartphone size={12} />
                Tersedia untuk Android
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Siap Untuk Memulai?
              </h2>
              <p className="text-indigo-200 text-base mb-8 max-w-md mx-auto">
                Download Spera E-Point sekarang dan rasakan kemudahan mengelola
                poin dan transaksi di genggaman Anda.
              </p>
              <a
                href="/apps/speraepoint.apk"
                download
                className="inline-flex items-center gap-3 bg-white hover:bg-slate-50 text-indigo-700 font-bold px-8 py-4 rounded-2xl transition-all shadow-xl hover:shadow-2xl hover:-translate-y-0.5 text-base"
              >
                <Download size={20} />
                Download APK Sekarang
              </a>
              <div className="mt-5 text-indigo-300 text-sm">
                v1.0.0 · Android 6.0+ · Gratis
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────── */}
      <section
        id="faq"
        className="py-20 bg-slate-50 dark:bg-slate-900"
      >
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-indigo-600 dark:text-indigo-400 text-sm font-semibold uppercase tracking-widest">
              FAQ
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold mt-2 mb-3">
              Pertanyaan Umum
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Tidak menemukan jawaban yang Anda cari? Hubungi tim kami.
            </p>
          </div>
          <FAQAccordion items={FAQS} />
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
      <footer
        id="kontak"
        className="bg-slate-950 border-t border-slate-800 pt-14 pb-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-10 mb-10">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-500 flex items-center justify-center text-white text-sm font-black">
                  SE
                </div>
                <span className="font-bold text-white text-lg">
                  Spera E-Point
                </span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                Platform manajemen poin digital yang andal, cepat, dan aman
                untuk kebutuhan transaksi modern Anda.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">
                Navigasi
              </div>
              <div className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollTo(sectionIds[link])}
                    className="block text-slate-500 hover:text-indigo-400 text-sm transition-colors"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <div className="font-semibold text-white text-sm mb-4">
                Kontak
              </div>
              <div className="space-y-2 text-slate-500 text-sm">
                <div>support@spera.id</div>
                <div>+62 xxx-xxxx-xxxx</div>
                <div className="pt-3">
                  <a
                    href="/apps/speraepoint.apk"
                    download
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
                  >
                    <Download size={13} />
                    Download APK
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-slate-600 text-xs">
            <span>© {new Date().getFullYear()} Spera E-Point. Hak cipta dilindungi.</span>
            <span>Dibuat dengan ❤️ untuk pengguna Indonesia</span>
          </div>
        </div>
      </footer>
    </div>
  );
}