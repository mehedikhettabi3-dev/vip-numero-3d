import { digitsOnly, type VipNumber } from './utils'

function tagsForNumber(n: string) {
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

type SeedEntry = { number: string; category: VipNumber['category']; priceMAD: number }

const SEED: SeedEntry[] = [
  // GOLD — 200 DH
  { number: '06 99 36 66 62', category: 'GOLD', priceMAD: 200 },
  { number: '07 14 44 49 47', category: 'GOLD', priceMAD: 200 },
  { number: '07 20 86 88 88', category: 'GOLD', priceMAD: 200 },
  { number: '07 11 11 93 74', category: 'GOLD', priceMAD: 200 },
  { number: '07 13 33 39 88', category: 'GOLD', priceMAD: 200 },
  { number: '07 03 34 44 40', category: 'GOLD', priceMAD: 200 },
  { number: '06 38 78 88 81', category: 'GOLD', priceMAD: 200 },
  { number: '07 17 22 22 32', category: 'GOLD', priceMAD: 200 },
  { number: '07 12 11 12 28', category: 'GOLD', priceMAD: 200 },
  { number: '07 22 20 20 01', category: 'GOLD', priceMAD: 200 },
  { number: '07 05 66 61 61', category: 'GOLD', priceMAD: 200 },
  { number: '06 00 20 50 12', category: 'GOLD', priceMAD: 200 },

  // INWI — 150 DH
  { number: '06 29 01 11 13', category: 'INWI', priceMAD: 150 },
  { number: '06 29 94 44 41', category: 'INWI', priceMAD: 150 },
  { number: '06 87 77 79 50', category: 'INWI', priceMAD: 150 },
  { number: '07 17 58 88 87', category: 'INWI', priceMAD: 150 },
  { number: '07 24 44 41 97', category: 'INWI', priceMAD: 150 },
  { number: '06 01 11 10 40', category: 'INWI', priceMAD: 150 },
  { number: '06 00 50 20 38', category: 'INWI', priceMAD: 150 },
  { number: '07 07 66 63 69', category: 'INWI', priceMAD: 150 },
  { number: '06 30 33 38 18', category: 'INWI', priceMAD: 150 },
  { number: '06 34 34 67 57', category: 'INWI', priceMAD: 150 },

  // SILVER — 100 DH
  { number: '06 34 38 33 73', category: 'SILVER', priceMAD: 100 },
  { number: '06 09 39 01 07', category: 'SILVER', priceMAD: 100 },
  { number: '07 06 06 36 79', category: 'SILVER', priceMAD: 100 },
  { number: '06 04 03 89 84', category: 'SILVER', priceMAD: 100 },
  { number: '07 05 05 76 81', category: 'SILVER', priceMAD: 100 },
  { number: '07 03 22 06 00', category: 'SILVER', priceMAD: 100 },
  { number: '06 07 03 13 11', category: 'SILVER', priceMAD: 100 },
  { number: '07 24 01 23 01', category: 'SILVER', priceMAD: 100 },
  { number: '07 05 11 19 13', category: 'SILVER', priceMAD: 100 },
  { number: '07 20 05 07 44', category: 'SILVER', priceMAD: 100 },
  { number: '07 05 70 74 08', category: 'SILVER', priceMAD: 100 },
  { number: '06 02 44 01 11', category: 'SILVER', priceMAD: 100 },
  { number: '06 35 38 28 35', category: 'SILVER', priceMAD: 100 },
  { number: '06 99 46 46 49', category: 'SILVER', priceMAD: 100 },
  { number: '07 10 14 44 48', category: 'SILVER', priceMAD: 100 },
  { number: '06 33 37 42 84', category: 'SILVER', priceMAD: 100 },
  { number: '07 03 33 81 35', category: 'SILVER', priceMAD: 100 },
  { number: '07 20 43 20 59', category: 'SILVER', priceMAD: 100 },
  { number: '07 16 34 94 44', category: 'SILVER', priceMAD: 100 },
  { number: '07 25 88 33 03', category: 'SILVER', priceMAD: 100 },
]

export const CATALOG: VipNumber[] = SEED.map((entry, idx) => ({
  id: `vip-${idx}-${digitsOnly(entry.number)}`,
  number: entry.number,
  category: entry.category,
  priceMAD: entry.priceMAD,
  tags: tagsForNumber(entry.number),
}))

export const CONTACT = {
  phone: '+212 6 25 48 91 53',
  whatsapp: '212625489153',
}
