export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function formatMAD(amount: number) {
  return new Intl.NumberFormat('fr-MA', {
    style: 'currency',
    currency: 'MAD',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function digitsOnly(s: string) {
  return (s || '').replace(/\D+/g, '')
}

export type VipNumber = {
  id: string
  number: string
  category: 'GOLD' | 'INWI' | 'SILVER'
  priceMAD: number
  tags: string[]
}
