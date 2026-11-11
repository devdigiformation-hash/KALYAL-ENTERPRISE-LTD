// Production Regression Test: Ensure no debug overlays or frame counters exist
import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

if (!fs.existsSync(distDir)) {
  console.error('Dist directory does not exist. Run build first.');
  process.exit(1);
}

const forbiddenPatterns = [
  /Frame\s+\d+\s+of/i,
  /\d+%\s+Scrubbed/i,
  /Frame\s+\d+\/\d+/i,
  /Stage\s+0\d/i,
  /CH\s+0\d/i,
];

let hasError = false;

function scanFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanFiles(fullPath);
    } else if (file.endsWith('.js') || file.endsWith('.html')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      for (const pattern of forbiddenPatterns) {
        if (pattern.test(content)) {
          console.error(`REGRESSION ERROR: Found forbidden debug pattern ${pattern} in ${file}`);
          hasError = true;
        }
      }
    }
  }
}

scanFiles(distDir);

if (hasError) {
  console.error('FAILED: User-visible debug overlays detected in production bundle!');
  process.exit(1);
} else {
  console.log('PASSED: Production bundle is 100% clean of all debug overlays and frame counters.');
}
