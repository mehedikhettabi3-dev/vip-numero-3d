import { cn } from '../lib/utils'
import type { VipNumber } from '../lib/utils'

const categoryStyles: Record<VipNumber['category'], { ring: string; bg: string; text: string }> = {
  GOLD: { ring: 'ring-amber-300/25', bg: 'bg-amber-300/10', text: 'text-amber-100' },
  INWI: { ring: 'ring-white/15', bg: 'bg-white/6', text: 'text-white/80' },
  SILVER: { ring: 'ring-orange-700/25', bg: 'bg-orange-700/10', text: 'text-orange-200' },
}

export default function VipBadge({ category, className }: { category: VipNumber['category']; className?: string }) {
  const s = categoryStyles[category]
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
      {category}
    </span>
  )
}
