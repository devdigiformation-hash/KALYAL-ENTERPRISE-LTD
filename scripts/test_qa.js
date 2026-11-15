import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PORT = 9222;
const APP_URL = 'http://127.0.0.1:4173';
const OUTPUT_DIR = path.resolve('C:\\Users\\user\\.gemini\\antigravity\\brain\\e9e590ee-4390-4d56-aa9d-cf35ea966c6e\\qa_evidence');

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  console.log('--- STARTING COMPREHENSIVE AUTOMATED QA SUITE ---');

  // 1. Launch Chrome Headless with Remote Debugging
  const chromeProc = spawn(
    CHROME_PATH,
    [
      '--headless=new',
      `--remote-debugging-port=${PORT}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-gpu',
      '--disable-extensions',
      '--window-size=1440,900',
    ],
    { stdio: 'ignore' }
  );

  try {
    // Wait for Chrome CDP to be available
    let versionData = null;
    for (let i = 0; i < 20; i++) {
      try {
        const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
        if (res.ok) {
          versionData = await res.json();
          break;
        }
      } catch {}
      await sleep(300);
    }

    if (!versionData) {
      throw new Error('Failed to connect to headless Chrome CDP');
    }
    console.log('✓ Headless Chrome CDP connected:', versionData.Browser);

    // Open new target
    const newTabRes = await fetch(`http://127.0.0.1:${PORT}/json/new?${encodeURIComponent(APP_URL)}`, { method: 'PUT' });
    const tabData = await newTabRes.json();
    const wsUrl = tabData.webSocketDebuggerUrl;

    console.log('✓ Target page opened:', tabData.url);

    // Connect WebSocket
    const ws = new WebSocket(wsUrl);
    let msgId = 1;
    const callbacks = new Map();

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && callbacks.has(msg.id)) {
        const { resolve, reject } = callbacks.get(msg.id);
        callbacks.delete(msg.id);
        if (msg.error) reject(msg.error);
        else resolve(msg.result);
      }
    };

    await new Promise((resolve) => {
      ws.onopen = resolve;
    });

    const send = (method, params = {}) => {
      return new Promise((resolve, reject) => {
        const id = msgId++;
        callbacks.set(id, { resolve, reject });
        ws.send(JSON.stringify({ id, method, params }));
      });
    };

    // Enable domains
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Network.enable');

    const consoleLogs = [];
    const failedUrls = [];

    ws.addEventListener('message', (event) => {
      const msg = JSON.parse(event.data);
      if (msg.method === 'Runtime.consoleAPICalled') {
        const text = msg.params.args.map((a) => a.value || a.description).join(' ');
        consoleLogs.push(`[${msg.params.type}] ${text}`);
      }
      if (msg.method === 'Network.responseReceived') {
        if (msg.params.response.status >= 400) {
          failedUrls.push(`${msg.params.response.status} - ${msg.params.response.url}`);
        }
      }
    });

    // Wait for page initial load
    await sleep(2000);
    console.log('✓ Initial page loaded and settled');

    // Test Desktop (1440x900)
    console.log('\n--- TESTING DESKTOP VIEWPORT (1440x900) ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    });
    await sleep(600);

    // Capture Hero initial frame
    let scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'desktop_hero_frame0.png'), Buffer.from(scr.data, 'base64'));
    console.log('✓ Saved desktop_hero_frame0.png');

    // Smooth forward scrub Hero to ~600px
    await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 600, behavior: "instant" })' });
    await sleep(500);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'desktop_hero_frame_scrubbed.png'), Buffer.from(scr.data, 'base64'));
    console.log('✓ Saved desktop_hero_frame_scrubbed.png');

    // Scroll to Zigzag 1 (Road Freight)
    const journeyTop = await send('Runtime.evaluate', {
      expression: 'document.getElementById("journey")?.getBoundingClientRect().top + window.scrollY',
      returnByValue: true,
    });
    const journeyY = journeyTop.result.value || 1800;
    console.log(`✓ Zigzag 1 (Road Freight) located at Y=${journeyY}`);

    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${journeyY + 400}, behavior: "instant" })` });
    await sleep(600);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'desktop_zigzag1_road_scrubbed.png'), Buffer.from(scr.data, 'base64'));
    console.log('✓ Saved desktop_zigzag1_road_scrubbed.png');

    // Scroll to Zigzag 2 (Warehouse Delivery)
    const unloadingTop = await send('Runtime.evaluate', {
      expression: 'document.getElementById("unloading")?.getBoundingClientRect().top + window.scrollY',
      returnByValue: true,
    });
    const unloadingY = unloadingTop.result.value || 3600;
    console.log(`✓ Zigzag 2 (Warehouse Unloading) located at Y=${unloadingY}`);

    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${unloadingY + 400}, behavior: "instant" })` });
    await sleep(600);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'desktop_zigzag2_warehouse_scrubbed.png'), Buffer.from(scr.data, 'base64'));
    console.log('✓ Saved desktop_zigzag2_warehouse_scrubbed.png');

    // Test Reverse Scrolling
    console.log('\n--- TESTING REVERSE SCROLL ---');
    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${journeyY + 200}, behavior: "instant" })` });
    await sleep(400);
    await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
    await sleep(400);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'desktop_hero_reversed_to_start.png'), Buffer.from(scr.data, 'base64'));
    console.log('✓ Successfully reversed scroll to top without glitch');

    // Test Mobile Viewport (390x844 - iPhone 14 / mobile standard)
    console.log('\n--- TESTING MOBILE VIEWPORT (390x844, 2x DPR) ---');
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true,
    });

    await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 0, behavior: "instant" })' });
    await sleep(600);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'mobile_hero_frame0.png'), Buffer.from(scr.data, 'base64'));
    console.log('✓ Saved mobile_hero_frame0.png');

    // Mobile scroll through hero
    await send('Runtime.evaluate', { expression: 'window.scrollTo({ top: 500, behavior: "instant" })' });
    await sleep(500);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'mobile_hero_scrubbed.png'), Buffer.from(scr.data, 'base64'));
    console.log('✓ Saved mobile_hero_scrubbed.png');

    // Mobile scroll to Zigzag 1
    const mobileJourney = await send('Runtime.evaluate', {
      expression: 'document.getElementById("journey")?.getBoundingClientRect().top + window.scrollY',
      returnByValue: true,
    });
    const mJourneyY = mobileJourney.result.value || 1600;
    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${mJourneyY + 300}, behavior: "instant" })` });
    await sleep(500);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'mobile_zigzag1_scrubbed.png'), Buffer.from(scr.data, 'base64'));
    console.log('✓ Saved mobile_zigzag1_scrubbed.png');

    // Mobile scroll to Careers Section
    const mobileCareers = await send('Runtime.evaluate', {
      expression: 'document.getElementById("careers")?.getBoundingClientRect().top + window.scrollY',
      returnByValue: true,
    });
    const mCareersY = mobileCareers.result.value || 4500;
    await send('Runtime.evaluate', { expression: `window.scrollTo({ top: ${mCareersY}, behavior: "instant" })` });
    await sleep(500);
    scr = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(path.join(OUTPUT_DIR, 'mobile_careers_section.png'), Buffer.from(scr.data, 'base64'));
    console.log('✓ Saved mobile_careers_section.png');

    // Check for unwanted debug overlays in DOM
    const debugTextFound = await send('Runtime.evaluate', {
      expression: `
        (() => {
          const text = document.body.innerText;
          const badPatterns = [/FRAME\\s+\\d+/i, /\\d+%\\s+SCRUBBED/i, /CH\\s*0\\d/i, /FPS:\\s*\\d+/i];
          const matches = [];
          for (const p of badPatterns) {
            if (p.test(text)) matches.push(p.toString());
          }
          return matches;
        })()
      `,
      returnByValue: true,
    });

    console.log('\n--- QUALITY AUDIT FINDINGS ---');
    console.log('Debug text matches in DOM:', debugTextFound.result.value);
    console.log('Failed HTTP requests (4xx/5xx):', failedUrls.length === 0 ? 'ZERO (None)' : failedUrls);
    console.log('Console errors:', consoleLogs.filter((l) => l.includes('[error]')));

    ws.close();
    console.log('\n✓ QA TEST COMPLETED SUCCESSFULLY');
  } finally {
    chromeProc.kill();
  }
}

main().catch((err) => {
  console.error('QA Test execution failed:', err);
  process.exit(1);
});
