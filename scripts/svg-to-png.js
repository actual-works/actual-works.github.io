#!/usr/bin/env node
// Usage: node svg-to-png.js <input.html> <output.png>
const { chromium } = require('/opt/node22/lib/node_modules/playwright');
const path = require('path');
const fs = require('fs');

const [,, inputFile, outputFile] = process.argv;
if (!inputFile || !outputFile) {
  console.error('Usage: node svg-to-png.js <input.html> <output.png>');
  process.exit(1);
}

(async () => {
  const browser = await chromium.launch({
    executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 670 });
  const absolutePath = path.resolve(inputFile);
  await page.goto(`file://${absolutePath}`);
  await page.waitForTimeout(200);
  await page.screenshot({ path: outputFile, fullPage: false });
  await browser.close();
  console.log(`Saved: ${outputFile}`);
})();
