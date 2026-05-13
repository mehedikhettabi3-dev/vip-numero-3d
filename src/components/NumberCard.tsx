import { motion } from 'framer-motion'
import { Crown, ShieldCheck, Sparkles, Star } from 'lucide-react'
import VipBadge from './VipBadge'
import type { VipNumber } from '../lib/utils'
import { cn, formatMAD } from '../lib/utils'

const categoryIcon: Record<VipNumber['category'], React.ReactNode> = {
  GOLD: <Crown className="h-4 w-4" />,
  INWI: <Star className="h-4 w-4" />,
  SILVER: <Sparkles className="h-4 w-4" />,
}

export default function NumberCard({
  item,
  selected,
  onSelect,
}: {
  item: VipNumber
  selected: boolean
  onSelect: (id: string) => void
}) {
  return (
    <motion.button
      type="button"
      onClick={() => onSelect(item.id)}
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.99 }}
      className={cn(
        'group relative w-full rounded-2xl border p-4 text-left transition-colors',
        selected ? 'border-amber-300/40 bg-amber-300/8' : 'border-white/10 bg-white/4 hover:border-white/16 hover:bg-white/6',
      )}
      style={{
        boxShadow: selected ? '0 18px 60px rgba(245,158,11,0.18)' : '0 16px 50px rgba(0,0,0,0.35)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs tracking-[0.28em] text-white/55">VIP NUMBER</div>
          <div className="mt-2 text-2xl font-semibold tracking-tight text-white">{item.number}</div>
        </div>
        <VipBadge category={item.category} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        {item.tags.slice(0, 3).map((t) => (
          <span key={t} className="rounded-full border border-white/10 bg-black/25 px-2.5 py-1 text-[11px] text-white/70">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-xl border border-white/10 bg-black/25 p-2">
          <div className="flex items-center gap-2 text-xs text-white/60">
            {categoryIcon[item.category]} Category
          </div>
          <div className="mt-1 text-sm font-semibold text-white">{item.category}</div>
        </div>
        <div className="rounded-xl border border-white/10 bg-black/25 p-2">
          <div className="flex items-center gap-2 text-xs text-white/60">
            <ShieldCheck className="h-4 w-4" /> Verified
          </div>
          <div className="mt-1 text-sm font-semibold text-white">Yes</div>
        </div>
      </div>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <div className="text-xs text-white/55">Price</div>
          <div className="mt-1 text-lg font-semibold text-white">{formatMAD(item.priceMAD)}</div>
        </div>
        <div className="text-xs text-white/55">Tap for details</div>
      </div>

      <div className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              'radial-gradient(circle at 20% 10%, rgba(245,158,11,0.18), transparent 40%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.06), transparent 38%)',
          }}
        />
      </div>
    </motion.button>
  )
}
