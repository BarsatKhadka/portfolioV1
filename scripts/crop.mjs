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
await page.waitForTimeout(1500);

const sections = ['about', 'research', 'projects', 'publications', 'philosophy'];
for (const id of sections) {
  const el = page.locator(`#${id}`).first();
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(250);
  await el.screenshot({ path: join(shotDir, `sec-${id}.png`) });
}
await browser.close();
console.log('section crops written');
