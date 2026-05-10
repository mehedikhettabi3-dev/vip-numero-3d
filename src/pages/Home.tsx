import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CATALOG, CONTACT } from '../lib/data'
import { cn, formatMAD, type VipNumber } from '../lib/utils'

/* ── Floating 3D VIP Card ── */
function FloatingVipCard() {
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 100, damping: 18 })
  const sy = useSpring(y, { stiffness: 100, damping: 18 })

  const rotateX = useTransform(sy, [0, 1], [12, -12])
  const rotateY = useTransform(sx, [0, 1], [-14, 14])

  const glare = useTransform(
    [sx, sy] as const,
    ([px, py]: number[]) =>
      `radial-gradient(circle at ${px * 100}% ${py * 100}%, rgba(230,0,126,0.2), transparent 50%)`
  )

  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const h = () => setReduced(mq.matches)
    mq.addEventListener('change', h)
    return () => mq.removeEventListener('change', h)
  }, [])

  useEffect(() => {
    if (reduced) return
    const onMove = (e: PointerEvent) => {
      x.set(e.clientX / window.innerWidth)
      y.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [reduced, x, y])

  return (
    <motion.div
      className="relative mx-auto w-[320px] sm:w-[380px]"
      style={!reduced ? { rotateX, rotateY, transformPerspective: 1400 } : undefined}
      animate={!reduced ? { y: [0, -8, 0] } : undefined}
      transition={{ y: { duration: 4, repeat: Infinity, ease: 'easeInOut' } }}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-[#E6007E]/20 via-purple-800/10 to-transparent blur-2xl" />
      <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-gradient-to-br from-white/10 via-white/3 to-black/60 p-6 backdrop-blur-2xl"
        style={{ boxShadow: '0 40px 120px rgba(230,0,126,0.08), inset 0 1px 0 rgba(255,255,255,0.06)' }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-12 rounded-md bg-gradient-to-br from-[#E6007E] to-purple-700"
              style={{ boxShadow: '0 0 20px rgba(230,0,126,0.3)' }} />
            <span className="text-[10px] tracking-[0.25em] text-white/40">VIP</span>
          </div>
          <div className="text-right">
            <div className="text-[10px] tracking-[0.2em] text-white/40">PREMIUM</div>
            <div className="text-[10px] font-bold text-[#FF8AC4]">INFINITY</div>
          </div>
        </div>

        <div className="mt-8">
          <div className="font-['Playfair_Display'] text-3xl font-bold tracking-wider text-white sm:text-4xl">06 99 36 66 62</div>
          <div className="mt-2 flex gap-2">
            {['Gold', 'Instant', 'Verified'].map(t => (
              <span key={t} className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] text-white/60">{t}</span>
            ))}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          {['VIP Status', '200 DH'].map(t => (
            <div key={t} className="rounded-xl border border-white/8 bg-black/30 p-3 text-center">
              <div className="text-[10px] text-white/40">{t === '200 DH' ? 'Price' : 'Tier'}</div>
              <div className="mt-0.5 text-sm font-bold text-white">{t}</div>
            </div>
          ))}
        </div>

        <div className="pointer-events-none absolute inset-0 rounded-[2rem]" style={{ background: glare.get() as string }} />
      </div>
    </motion.div>
  )
}

/* ── Black Titanium Credit Card ── */
function TitaniumCard({ item }: { item: VipNumber }) {
  const ref = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, o: 0 })

  return (
    <motion.div
      ref={ref}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onPointerMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        setGlow({
          x: ((e.clientX - r.left) / r.width) * 100,
          y: ((e.clientY - r.top) / r.height) * 100,
          o: 1,
        })
      }}
      onPointerLeave={() => setGlow(g => ({ ...g, o: 0 }))}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/6 bg-gradient-to-br from-[#0D0D11] to-[#08080A] p-5 transition-shadow duration-300"
      style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at ${glow.x}% ${glow.y}%, rgba(230,0,126,0.08), transparent 60%)`,
        }}
      />
      <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/4 group-hover:ring-[#E6007E]/15 transition-all duration-300" />

      <div className="flex items-center justify-between">
        <span className="text-[10px] tracking-[0.2em] text-white/30">VIP</span>
        <div className="flex items-center gap-2">
          <span className="rounded-md border border-white/8 bg-white/5 px-2 py-0.5 text-[11px] font-bold text-[#FF8AC4]">{formatMAD(item.priceMAD)}</span>
        </div>
      </div>

      <div className="mt-4 font-['Playfair_Display'] text-xl font-bold tracking-wider text-white sm:text-2xl">{item.number}</div>

      <div className="mt-3 flex items-center gap-2 text-[11px] text-white/40">
        <span className="rounded-full border border-white/8 bg-white/5 px-2 py-0.5">{item.tier}</span>
        <span className="rounded-full border border-white/8 bg-white/5 px-2 py-0.5">Score {item.score}</span>
      </div>

      <a
        href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent('Salam, bghit had VIP numero: ' + item.number)}`}
        target="_blank"
        rel="noreferrer"
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#E6007E] to-purple-700 px-4 py-3 text-sm font-bold text-white shadow-lg shadow-[#E6007E]/15 hover:shadow-[#E6007E]/25 transition active:scale-[0.97]"
        onClick={(e) => e.stopPropagation()}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
        حجز عبر واتساب
      </a>
    </motion.div>
  )
}

/* ── Sticky Bottom Bar ── */
function StickyBottomBar() {
  const scrollToCatalog = () => {
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/8 bg-black/80 backdrop-blur-3xl">
      <div className="mx-auto flex max-w-lg items-center gap-3 px-4 py-4">
        <button
          onClick={scrollToCatalog}
          className="flex-1 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 text-base font-bold text-white/80 transition hover:bg-white/10 active:scale-[0.97]"
        >
          استعرض الأرقام
        </button>
        <a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#E6007E] to-purple-700 px-5 py-4 text-base font-bold text-white shadow-2xl shadow-[#E6007E]/25 hover:shadow-[#E6007E]/35 transition active:scale-[0.97]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          حجز عبر واتساب
        </a>
      </div>
    </div>
  )
}

/* ── Home Page ── */
export default function HomePage() {
  const [search, setSearch] = useState('')
  const [filterTier, setFilterTier] = useState<string>('all')

  const filtered = useMemo(() => {
    let r = [...CATALOG]
    const q = search.replace(/\D/g, '')
    if (q) r = r.filter(i => i.number.replace(/\D/g, '').includes(q))
    if (filterTier !== 'all') r = r.filter(i => i.tier === filterTier)
    return r.sort((a, b) => b.score - a.score)
  }, [search, filterTier])

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-[#E6007E]/30 overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-[#E6007E]/8 via-purple-800/4 to-transparent blur-[120px] rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-[#FFD700]/5 via-[#E6007E]/6 to-transparent blur-[100px] rounded-full animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(230,0,126,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(230,0,126,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at 50% 40%, black, transparent 70%)',
          }} />
      </div>

      <header className="relative z-10 border-b border-white/5 bg-black/40 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-[#E6007E] to-purple-800 flex items-center justify-center text-xs font-bold shadow-lg shadow-[#E6007E]/20">NR</div>
            <div>
              <div className="text-sm font-bold tracking-tight">Nadiya Ratkalaf</div>
              <div className="text-[9px] tracking-[0.3em] text-white/40">VIP NUMBERS</div>
            </div>
          </div>
          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer"
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-[#E6007E] to-purple-700 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#E6007E]/20 hover:shadow-[#E6007E]/30 transition active:scale-[0.97]">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            واتساب
          </a>
        </div>
      </header>

      <section className="relative z-10 mx-auto flex min-h-[100dvh] max-w-7xl flex-col items-center justify-center px-4 pb-32 pt-12 text-center sm:px-6 sm:pb-36 sm:pt-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E6007E]/20 bg-[#E6007E]/8 px-4 py-1.5 text-[10px] tracking-[0.2em] text-[#FF8AC4]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E6007E] animate-pulse" />
            VIP COLLECTION
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl"
        >
          هويتك الرقمية{' '}
          <span className="bg-gradient-to-r from-[#FF8AC4] via-[#E6007E] to-purple-500 bg-clip-text text-transparent">
            تبدأ برقم استثنائي
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 max-w-lg text-sm leading-relaxed text-white/50 sm:text-base"
        >
          أرقام VIP نادرة تعكس مكانتك المهنية. اختر رقمك المميز من مجموعتنا الحصرية بأسعار تبدأ من 100 درهم.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-5 flex flex-wrap justify-center gap-5"
        >
          {[
            { n: CATALOG.length.toString(), l: 'رقم متاح' },
            { n: '100 DH', l: 'أقل سعر' },
            { n: '✓', l: 'حجز فوري' },
          ].map(s => (
            <div key={s.l} className="text-center">
              <div className="text-lg font-bold text-white">{s.n}</div>
              <div className="text-[10px] text-white/40">{s.l}</div>
            </div>
          ))}
        </motion.div>

        <motion.a
          href={`https://wa.me/${CONTACT.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-6 inline-flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-[#E6007E] to-purple-700 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-[#E6007E]/30 hover:shadow-[#E6007E]/40 transition active:scale-[0.97] w-full max-w-xs mx-auto"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          حجز عبر واتساب
        </motion.a>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="mt-8 w-full max-w-md"
        >
          <FloatingVipCard />
        </motion.div>
      </section>

      <section id="catalog" className="relative z-10 mx-auto max-w-7xl px-4 pb-36 sm:px-6">
        <div className="mb-6">
          <div className="text-[10px] tracking-[0.3em] text-[#FF8AC4]">الأرقام المتاحة</div>
          <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">اختر رقمك المميز</h2>
        </div>

        <div className="mb-6 flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="بحث بالأرقام..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 min-w-[160px] rounded-xl border border-white/8 bg-white/5 px-4 py-2.5 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#E6007E]/30"
          />
          <div className="flex gap-2">
            {['all', 'Gold', 'Silver', 'Bronze'].map(t => (
              <button
                key={t}
                onClick={() => setFilterTier(t)}
                className={cn(
                  'rounded-xl border px-3.5 py-2 text-xs font-medium transition-colors',
                  filterTier === t
                    ? 'border-[#E6007E]/30 bg-[#E6007E]/10 text-[#FF8AC4]'
                    : 'border-white/8 text-white/50 hover:border-white/20 hover:text-white/70'
                )}
              >
                {t === 'all' ? 'الكل' : t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map(item => (
            <TitaniumCard key={item.id} item={item} />
          ))}
        </div>
        {!filtered.length && (
          <div className="py-16 text-center text-sm text-white/30">لا توجد أرقام تطابق بحثك.</div>
        )}
      </section>

      <StickyBottomBar />
    </div>
  )
}
