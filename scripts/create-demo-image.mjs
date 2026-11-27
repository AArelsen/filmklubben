import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'

await mkdir('demo-assets', { recursive: true })

const svg = `
<svg width="960" height="540" xmlns="http://www.w3.org/2000/svg">
  <rect width="960" height="540" fill="#171717"/>
  <rect x="100" y="80" width="760" height="320"
    rx="12" fill="#ffcc66"/>
  <text x="480" y="235" text-anchor="middle"
    font-family="sans-serif" font-size="52" fill="#171717">
    Filmklubben Rulletekst
  </text>
  <text x="480" y="310" text-anchor="middle"
    font-family="sans-serif" font-size="26" fill="#171717">
    Filmen er slutt. Samtalen begynner.
  </text>
</svg>
`

await sharp(Buffer.from(svg))
  .png()
  .toFile('demo-assets/cinema.png')

console.log('Opprettet demo-assets/cinema.png')