import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect, useState } from 'react'
import { cn } from '../lib/utils'

function useRafPointer() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  useEffect(() => {
    let raf = 0
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1
        const ny = (e.clientY / window.innerHeight) * 2 - 1
        x.set(nx)
        y.set(ny)
      })
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
    }
  }, [x, y])

  return { x, y }
}

export default function Scene3D({ className }: { className?: string }) {
  const { x, y } = useRafPointer()
  const sx = useSpring(x, { stiffness: 120, damping: 20, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 120, damping: 20, mass: 0.4 })

  const rotateX = useTransform(sy, [-1, 1], [10, -10])
  const rotateY = useTransform(sx, [-1, 1], [-16, 16])

  const glareX = useTransform(sx, [-1, 1], ['20%', '80%'])
  const glareY = useTransform(sy, [-1, 1], ['20%', '80%'])

  const [reduced, setReduced] = useState(false)
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(m.matches)
    on()
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [])

  return (
    <div
      className={cn(
        'relative isolate h-[320px] w-full overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/0 p-6 sm:h-[380px]',
        className,
      )}
      style={{
        boxShadow: '0 30px 120px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.12)',
      }}
    >
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -inset-24 opacity-70 blur-3xl"
          style={{
            background:
              'radial-gradient(closest-side, rgba(245,158,11,0.40), transparent 70%), radial-gradient(closest-side, rgba(255,255,255,0.12), transparent 65%)',
          }}
        />
      </div>

      <motion.div
        className="relative mx-auto flex h-full max-w-[560px] items-center justify-center [perspective:1200px]"
        style={!reduced ? { rotateX, rotateY } : undefined}
      >
        <div className="relative grid w-full grid-cols-12 gap-4">
          <div className="col-span-12 sm:col-span-7">
            <div className="relative rounded-2xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="text-xs tracking-[0.3em] text-white/60">VIP · NUMERO</div>
                <div className="text-xs text-white/70">3D Premium</div>
              </div>
              <div className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                06 99 36 66 62
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {['GOLD', 'Instant transfer', 'Verified'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <div className="text-xs text-white/60">Category</div>
                  <div className="mt-1 text-lg font-semibold text-white">GOLD</div>
                </div>
                <div className="rounded-xl border border-white/10 bg-black/30 p-3">
                  <div className="text-xs text-white/60">Price</div>
                  <div className="mt-1 text-lg font-semibold text-white">MAD 200</div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 sm:col-span-5">
            <div className="relative h-full rounded-2xl border border-white/10 bg-gradient-to-b from-white/10 to-black/40 p-5">
              <div className="text-xs tracking-[0.3em] text-white/60">EXCLUSIVE</div>
              <div className="mt-2 text-xl font-semibold text-white">VIP Card</div>
              <div className="mt-4 space-y-3">
                {[{ k: 'Network', v: 'All operators' }, { k: 'Delivery', v: 'Same day' }, { k: 'Support', v: '24/7' }].map(
                  (i) => (
                    <div
                      key={i.k}
                      className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-3 py-2"
                    >
                      <span className="text-xs text-white/60">{i.k}</span>
                      <span className="text-xs font-medium text-white">{i.v}</span>
                    </div>
                  ),
                )}
              </div>
              <div className="mt-6 text-xs leading-relaxed text-white/65">
                Transparent process: meeting, SIM transfer, payment receipt.
              </div>
            </div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={
              !reduced
                ? {
                    background:
                      'radial-gradient(circle at var(--gx) var(--gy), rgba(255,255,255,0.22), transparent 38%), radial-gradient(circle at 15% 10%, rgba(245,158,11,0.25), transparent 40%)',
                    ...({ ['--gx' as any]: glareX, ['--gy' as any]: glareY } as any),
                  }
                : undefined
            }
          />
        </div>
      </motion.div>
    </div>
  )
}
