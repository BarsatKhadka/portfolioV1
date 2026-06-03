import { chromium } from 'playwright';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const shotDir = join(root, '.shots');
const URL = process.env.URL || 'http://localhost:5174/';

const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'wide', width: 1728, height: 1080 },
  { name: 'mobile', width: 390, height: 844 },
];

const browser = await chromium.launch();
for (const vp of viewports) {
  const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height }, deviceScaleFactor: 2 });
  await page.goto(URL, { waitUntil: 'networkidle' });
  // Force every reveal element visible so full-page shots aren't blank
  await page.addStyleTag({ content: '[data-reveal]{opacity:1!important;transform:none!important;}' });
  await page.waitForTimeout(2600); // let fonts + hero entrance settle
  // full page
  await page.screenshot({ path: join(shotDir, `${vp.name}-full.png`), fullPage: true });
  // above-the-fold
  await page.screenshot({ path: join(shotDir, `${vp.name}-fold.png`), fullPage: false });
  await page.close();
}
await browser.close();
console.log('shots written to', shotDir);
