import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy, MessageCircle, PhoneCall, Shield } from 'lucide-react'
import { useMemo, useState } from 'react'
import { CONTACT } from '../lib/data'
import type { VipNumber } from '../lib/utils'
import { cn, digitsOnly } from '../lib/utils'

function copyToClipboard(text: string) {
  return navigator.clipboard.writeText(text)
}

function waLink(phone: string, message: string) {
  const p = digitsOnly(phone)
  const url = new URL('https://wa.me/' + p)
  url.searchParams.set('text', message)
  return url.toString()
}

export default function RequestModal({
  open,
  onClose,
  item,
}: {
  open: boolean
  onClose: () => void
  item: VipNumber | null
}) {
  const [name, setName] = useState('')
  const [city, setCity] = useState('')
  const [copied, setCopied] = useState(false)

  const message = useMemo(() => {
    if (!item) return ''
    return `Salam, bghit n9lb 3la VIP numero: ${item.number}. Smiyti: ${name || '___'}. Mdina: ${city || '___'}.`
  }, [item, name, city])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <motion.div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 22, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 22, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
            className="relative w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#07070B]"
            style={{
              boxShadow: '0 40px 140px rgba(0,0,0,0.75), inset 0 1px 0 rgba(255,255,255,0.08)',
            }}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-xs tracking-[0.3em] text-white/55">REQUEST</div>
                  <div className="mt-1 text-2xl font-semibold text-white">Reserve this VIP number</div>
                  <div className="mt-2 text-sm text-white/65">We confirm availability, then we arrange transfer & payment.</div>
                </div>
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/80 hover:bg-white/8"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="text-xs text-white/60">Selected number</div>
                <div className="mt-1 text-xl font-semibold text-white">{item?.number}</div>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <label className="block">
                  <span className="text-xs text-white/60">Name</span>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-white outline-none placeholder:text-white/25 focus:border-amber-300/35"
                    placeholder="Your name"
                  />
                </label>
                <label className="block">
                  <span className="text-xs text-white/60">City</span>
                  <input
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-white/10 bg-black/35 px-3 py-2 text-sm text-white outline-none placeholder:text-white/25 focus:border-amber-300/35"
                    placeholder="Casablanca, Rabat..."
                  />
                </label>
              </div>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                <div className="flex items-center gap-2 text-sm font-medium text-white">
                  <Shield className="h-4 w-4 text-amber-200" />
                  Safe process
                </div>
                <ul className="mt-2 space-y-1 text-sm text-white/70">
                  {[
                    'We verify the SIM & ownership before any payment.',
                    'Transfer in agency / meeting point.',
                    'Receipt + written agreement if you want.',
                  ].map((t) => (
                    <li key={t} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300/70" />
                      <span>{t}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-amber-300 px-4 py-3 text-sm font-semibold text-black hover:bg-amber-200"
                  href={waLink(CONTACT.whatsapp, message)}
                  target="_blank"
                  rel="noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  WhatsApp
                </a>
                <a
                  className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/12 bg-white/6 px-4 py-3 text-sm font-semibold text-white hover:bg-white/8"
                  href={`tel:${CONTACT.phone}`}
                >
                  <PhoneCall className="h-5 w-5" />
                  Call
                </a>

                <button
                  type="button"
                  onClick={async () => {
                    await copyToClipboard(message)
                    setCopied(true)
                    window.setTimeout(() => setCopied(false), 1200)
                  }}
                  className={cn(
                    'sm:col-span-2 inline-flex items-center justify-center gap-2 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors',
                    copied ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100' : 'border-white/12 bg-black/30 text-white hover:bg-black/40',
                  )}
                >
                  {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
                  {copied ? 'Copied' : 'Copy message'}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
