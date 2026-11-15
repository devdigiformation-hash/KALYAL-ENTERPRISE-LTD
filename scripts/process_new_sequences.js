import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const newFolder = path.resolve('New folder');
const publicDir = path.resolve('public');
const sequencesDir = path.join(publicDir, 'sequences');
const postersDir = path.join(publicDir, 'posters');

fs.mkdirSync(sequencesDir, { recursive: true });
fs.mkdirSync(postersDir, { recursive: true });

// Check ffmpeg
const ffmpeg = 'C:\\Users\\user\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.2-full_build\\bin\\ffmpeg.exe';

const clips = [
  {
    id: 'clip-01',
    zipName: 'ezgif-3b3cb712cd23c8d6-jpg.zip',
    frameCount: 38,
    label: 'VIDEO_01 (Hero: Container Loading)'
  },
  {
    id: 'clip-02',
    zipName: 'ezgif-388717e290869119-jpg.zip',
    frameCount: 75,
    roadFrameCount: 28,
    label: 'VIDEO_02 (Zigzag 1: Road Freight Delivery)'
  },
  {
    id: 'clip-03',
    zipName: 'ezgif-32186d86837c0aa5-jpg.zip',
    frameCount: 35,
    label: 'VIDEO_03 (Zigzag 2: Warehouse Unloading)'
  }
];

const tempExtract = path.resolve('temp_raw_frames');
fs.mkdirSync(tempExtract, { recursive: true });

for (const clip of clips) {
  console.log(`Processing ${clip.label}...`);
  const clipDest = path.join(sequencesDir, clip.id);
  fs.mkdirSync(clipDest, { recursive: true });

  const zipPath = path.join(newFolder, clip.zipName);
  const clipRaw = path.join(tempExtract, clip.id);
  fs.mkdirSync(clipRaw, { recursive: true });

  // Extract zip using PowerShell
  console.log(`  Extracting ${clip.zipName} to ${clipRaw}...`);
  const psCmd = `Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::ExtractToDirectory('${zipPath.replace(/'/g, "''")}', '${clipRaw.replace(/'/g, "''")}')`;
  try {
    execSync(`powershell -ExecutionPolicy Bypass -Command "${psCmd}"`, { stdio: 'inherit' });
  } catch (e) {
    console.log(`  Extract note: ${e.message}`);
  }

  // Read extracted files
  const rawFiles = fs.readdirSync(clipRaw).filter(f => f.endsWith('.jpg')).sort();
  console.log(`  Found ${rawFiles.length} frames.`);

  for (let i = 0; i < rawFiles.length; i++) {
    const srcFile = path.join(clipRaw, rawFiles[i]);
    const frameIndexStr = String(i + 1).padStart(3, '0');
    const outJpg = path.join(clipDest, `frame-${frameIndexStr}.jpg`);
    const outWebp = path.join(clipDest, `frame-${frameIndexStr}.webp`);

    // Optimize JPG (1920x1080)
    execSync(`"${ffmpeg}" -v error -y -i "${srcFile}" -vf "scale=1920:1080" -q:v 3 "${outJpg}"`);
    // Optimize WebP (1920x1080)
    execSync(`"${ffmpeg}" -v error -y -i "${srcFile}" -vf "scale=1920:1080" -c:v libwebp -quality 85 "${outWebp}"`);

    // Poster if frame 1
    if (i === 0) {
      const posterJpg = path.join(postersDir, `${clip.id}.jpg`);
      const posterWebp = path.join(postersDir, `${clip.id}.webp`);
      fs.copyFileSync(outJpg, posterJpg);
      fs.copyFileSync(outWebp, posterWebp);
    }
  }

  console.log(`  Completed ${clip.id} -> ${rawFiles.length} frames generated.`);
}

console.log('All 3 video frame sequences processed successfully!');
