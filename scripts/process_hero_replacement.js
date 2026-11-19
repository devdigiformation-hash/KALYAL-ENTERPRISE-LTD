import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const SOURCE_DIR = 'C:/Users/user/.gemini/antigravity/brain/e9e590ee-4390-4d56-aa9d-cf35ea966c6e/scratch/new_hero_zip';
const TARGET_DIR = path.resolve('public/sequences/clip-01');
const POSTERS_DIR = path.resolve('public/posters');

if (!fs.existsSync(TARGET_DIR)) {
  fs.mkdirSync(TARGET_DIR, { recursive: true });
}

// 1. Wipe old active clip-01 files (they are safely backed up in public/sequences/clip-01-backup-prior)
const oldFiles = fs.readdirSync(TARGET_DIR);
for (const file of oldFiles) {
  fs.unlinkSync(path.join(TARGET_DIR, file));
}
console.log(`Cleaned ${oldFiles.length} prior files from ${TARGET_DIR}`);

const totalFrames = 40;
console.log(`Processing ${totalFrames} frames from 4K UHD source to 1920x1080 WebP + JPG...`);

for (let i = 1; i <= totalFrames; i++) {
  const numPad = String(i).padStart(3, '0');
  const srcFile = path.join(SOURCE_DIR, `ezgif-frame-${numPad}.jpg`);
  const destJpg = path.join(TARGET_DIR, `frame-${numPad}.jpg`);
  const destWebp = path.join(TARGET_DIR, `frame-${numPad}.webp`);

  if (!fs.existsSync(srcFile)) {
    throw new Error(`Missing source frame: ${srcFile}`);
  }

  // Generate 1920x1080 JPG with high fidelity Lanczos scaling
  const resJpg = spawnSync('ffmpeg', [
    '-y',
    '-i', srcFile,
    '-vf', 'scale=1920:1080:flags=lanczos',
    '-q:v', '2',
    destJpg
  ]);
  if (resJpg.status !== 0) {
    throw new Error(`Failed to encode JPG for frame ${numPad}: ${resJpg.stderr.toString()}`);
  }

  // Generate 1920x1080 WebP
  const resWebp = spawnSync('ffmpeg', [
    '-y',
    '-i', srcFile,
    '-vf', 'scale=1920:1080:flags=lanczos',
    '-c:v', 'libwebp',
    '-quality', '85',
    '-preset', 'photo',
    destWebp
  ]);
  if (resWebp.status !== 0) {
    throw new Error(`Failed to encode WebP for frame ${numPad}: ${resWebp.stderr.toString()}`);
  }

  process.stdout.write(`\rProcessed frame ${numPad}/${totalFrames}`);
}
console.log('\nAll 40 frames generated in WebP and JPG format.');

// 2. Generate updated posters from frame-001
const posterSrc = path.join(SOURCE_DIR, 'ezgif-frame-001.jpg');
const posterJpg = path.join(POSTERS_DIR, 'clip-01.jpg');
const posterWebp = path.join(POSTERS_DIR, 'clip-01.webp');

spawnSync('ffmpeg', [
  '-y',
  '-i', posterSrc,
  '-vf', 'scale=1920:1080:flags=lanczos',
  '-q:v', '2',
  posterJpg
]);

spawnSync('ffmpeg', [
  '-y',
  '-i', posterSrc,
  '-vf', 'scale=1920:1080:flags=lanczos',
  '-c:v', 'libwebp',
  '-quality', '85',
  '-preset', 'photo',
  posterWebp
]);

console.log('Updated posters for clip-01 successfully.');
