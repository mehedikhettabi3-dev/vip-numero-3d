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
  tier: 'Gold' | 'Silver' | 'Bronze'
  score: number
  priceMAD: number
  tags: string[]
}

export function scoreNumber(n: string) {
  const s = digitsOnly(n)
  let score = 0

  const groups = s.match(/(\d)\1+/g) || []
  for (const g of groups) score += Math.min(25, g.length * 6)

  const rev = s.split('').reverse().join('')
  if (s.length >= 6 && (s === rev || s.slice(0, 3) === rev.slice(0, 3))) score += 20

  if (/(00|11|22|33|44|55|66|77|88|99)$/.test(s)) score += 18
  if (/1234|4321|0123|3210/.test(s)) score += 12

  if (/^(\d)\1(\d)\2(\d)\3$/.test(s)) score += 18
  if (/^(\d)(\d)\2\1/.test(s)) score += 10

  score += Math.min(15, Math.floor(s.length / 2))

  return Math.min(100, score)
}

export function tierFromScore(score: number): VipNumber['tier'] {
  if (score >= 75) return 'Gold'
  if (score >= 50) return 'Silver'
  return 'Bronze'
}

export function priceFromScore(score: number) {
  if (score >= 80) return 200
  if (score >= 60) return 150
  return 100
}

export function tagsForNumber(n: string) {
  const s = digitsOnly(n)
  const tags: string[] = []
  if (/(\d)\1\1/.test(s)) tags.push('Triple')
  if (/(\d)\1\1\1/.test(s)) tags.push('Quad')
  if (/^(\d)\1+/.test(s)) tags.push('Strong start')
  if (/(00|11|22|33|44|55|66|77|88|99)$/.test(s)) tags.push('Double end')
  if (/123|234|345|456|567|678|789/.test(s)) tags.push('Sequence')
  if (s === s.split('').reverse().join('')) tags.push('Palindrome')
  if (/^(\d)(\d)\2\1/.test(s)) tags.push('ABBA')
  if (!tags.length) tags.push('Clean')
  return tags
}

export function generateVipCatalog(seedNumbers: string[]) {
  const items: VipNumber[] = seedNumbers.map((number, idx) => {
    const score = scoreNumber(number)
    return {
      id: `vip-${idx}-${digitsOnly(number)}`,
      number,
      score,
      tier: tierFromScore(score),
      priceMAD: priceFromScore(score),
      tags: tagsForNumber(number),
    }
  })
  return items.sort((a, b) => b.score - a.score || a.priceMAD - b.priceMAD)
}
