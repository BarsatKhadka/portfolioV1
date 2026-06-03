import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const shotDir = join(root, '.shots');
const URL = process.env.URL || 'http://localhost:5174/';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
await page.goto(URL, { waitUntil: 'networkidle' });
await page.addStyleTag({ content: '[data-reveal]{opacity:1!important;transform:none!important;}' });
await page.waitForTimeout(1000);

const targets = [
  { sel: 'aside', name: 'crop-leftbar' },
  { sel: '#about', name: 'crop-about' },
  { sel: '#philosophy', name: 'crop-philosophy' },
];
for (const t of targets) {
  const el = page.locator(t.sel).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await el.screenshot({ path: join(shotDir, `${t.name}.png`) });
}
// closing verse = last section in main
const closing = page.locator('main > section').last();
await closing.scrollIntoViewIfNeeded();
await page.waitForTimeout(300);
await closing.screenshot({ path: join(shotDir, 'crop-closing.png') });

await browser.close();
console.log('crops written');
