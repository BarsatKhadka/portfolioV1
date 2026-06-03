import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dir = join(root, 'src', 'components');

// Sidebar paper-prints render at ~256px; 640px keeps them crisp on retina.
const jobs = [
  { in: 'image.png', out: 'image.webp', width: 640 },
  { in: 'image2.png', out: 'image2.webp', width: 640 },
];

for (const job of jobs) {
  const src = join(dir, job.in);
  const dest = join(dir, job.out);
  const meta = await sharp(src).metadata();
  await sharp(src)
    .resize({ width: Math.min(job.width, meta.width), withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(dest);
  const before = (meta.size / 1024).toFixed(0);
  const after = ((await sharp(dest).metadata()).size / 1024).toFixed(0);
  console.log(`${job.in} (${before} KB, ${meta.width}px) -> ${job.out} (${after} KB)`);
}
