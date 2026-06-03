import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { writeFile } from 'fs/promises';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'assets', 'gallery');
const UA = 'BarsatPortfolio/1.0 (https://barsatkhadka.com; khadkabarsat598@gmail.com)';

// key -> Commons search query. Famous pre-1900 works (or NASA) → public domain.
const wants = [
  { key: 'wanderer', q: 'Caspar David Friedrich Wanderer above the Sea of Fog' },
  { key: 'starrynight', q: 'Vincent van Gogh The Starry Night 1889' },
  { key: 'spinoza', q: 'Baruch de Spinoza portrait 1665' },
  { key: 'sengai', q: 'Sengai Gibon circle triangle square universe' },
  { key: 'redfuji', q: 'Hokusai Fine Wind Clear Morning South Wind Clear Sky' },
  { key: 'nebula', q: 'Pillars of Creation Eagle Nebula Hubble 1995' },
];

async function api(params) {
  const url = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams(params);
  const r = await fetch(url, { headers: { 'User-Agent': UA } });
  return r.json();
}

for (const w of wants) {
  try {
    const j = await api({
      action: 'query', format: 'json', generator: 'search',
      gsrsearch: w.q, gsrnamespace: '6', gsrlimit: '1',
      prop: 'imageinfo', iiprop: 'url|extmetadata', iiurlwidth: '900',
    });
    const pages = j.query?.pages || {};
    const page = Object.values(pages)[0];
    const ii = page?.imageinfo?.[0];
    if (!ii) { console.log(`${w.key}: NO RESULT`); continue; }
    const src = ii.thumburl || ii.url;
    const title = (page.title || '').replace('File:', '');
    const buf = Buffer.from(await (await fetch(src, { headers: { 'User-Agent': UA } })).arrayBuffer());
    const tmp = join(dir, `_${w.key}.bin`);
    await writeFile(tmp, buf);
    await sharp(tmp).resize({ height: 620, withoutEnlargement: true }).webp({ quality: 82 }).toFile(join(dir, `${w.key}.webp`));
    const meta = await sharp(join(dir, `${w.key}.webp`)).metadata();
    console.log(`${w.key}: ${title}  ->  ${meta.width}x${meta.height}`);
  } catch (e) {
    console.log(`${w.key}: ERROR ${e.message}`);
  }
}
