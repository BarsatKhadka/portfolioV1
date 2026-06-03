import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const out = join(root, 'public', 'og.jpg');

const PAPER = '#FAF8F3';
const INK = '#1A1A1A';
const MUTED = '#6E6A63';
const VERMILLION = '#B5341F';

// System fonts only — librsvg can't see web fonts. Georgia/Arial ship on Windows/macOS.
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="${PAPER}"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="rgba(26,26,26,0.12)" stroke-width="1"/>
  <rect x="96" y="96" width="44" height="44" fill="${VERMILLION}" transform="rotate(-4 118 118)"/>
  <text x="100" y="232" font-family="Georgia, 'Times New Roman', serif" font-size="92" font-weight="500" fill="${INK}" letter-spacing="-3">Barsat Khadka</text>
  <text x="103" y="300" font-family="Arial, 'Segoe UI', sans-serif" font-size="26" letter-spacing="6" fill="${MUTED}">COMPUTER ENGINEER &#183; RESEARCHER</text>
  <line x1="103" y1="356" x2="1104" y2="356" stroke="rgba(26,26,26,0.14)" stroke-width="1"/>
  <text x="100" y="430" font-family="Georgia, serif" font-style="italic" font-size="40" fill="${INK}">Computer science research, and philosophy.</text>
  <text x="100" y="540" font-family="Arial, sans-serif" font-size="24" letter-spacing="1" fill="${MUTED}">github.com/BarsatKhadka</text>
  <text x="1104" y="540" text-anchor="end" font-family="Georgia, serif" font-style="italic" font-size="24" fill="${VERMILLION}">Open source &#183; Open science</text>
</svg>`;

await sharp(Buffer.from(svg)).jpeg({ quality: 90 }).toFile(out);
console.log('wrote', out);
