import { cn } from '../lib/utils'
import type { VipNumber } from '../lib/utils'

const tierStyles: Record<VipNumber['tier'], { ring: string; bg: string; text: string }> = {
  Gold: { ring: 'ring-amber-300/25', bg: 'bg-amber-300/10', text: 'text-amber-100' },
  Silver: { ring: 'ring-white/15', bg: 'bg-white/6', text: 'text-white/80' },
  Bronze: { ring: 'ring-orange-700/25', bg: 'bg-orange-700/10', text: 'text-orange-200' },
}

export default function VipBadge({ tier, className }: { tier: VipNumber['tier']; className?: string }) {
  const s = tierStyles[tier]
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset',
        s.ring,
        s.bg,
        s.text,
        className,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {tier}
    </span>
  )
}
