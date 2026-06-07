import fs from 'fs';
import path from 'path';

const publicDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

const copyMap = [
  ['src/assets/images/riya_portfolio_preview_jpg_1780820601750.png', 'riya_portfolio_preview.png'],
  ['src/assets/images/riya_profile.jpg', 'riya_profile.jpg'],
  ['src/assets/images/aquasave_glimpse.png', 'riya_aquasave_glimpse_1.png'],
  ['src/assets/images/aquasave_glimpse.png', 'riya_aquasave_glimpse.png'],
  ['src/assets/images/aquasave_glimpse_2.jpg', 'riya_aquasave_glimpse_2.jpg'],
  ['src/assets/images/research_glimpse.jpg', 'riya_research_glimpse_1.jpg'],
  ['src/assets/images/research_glimpse_v2.jpg', 'riya_research_glimpse_2.jpg'],
  ['src/assets/images/research_glimpse_v2.jpg', 'riya_research_glimpse.jpg'],
  ['src/logo.png', 'logo.png'],
];

for (const [srcRel, destRel] of copyMap) {
  const srcPath = path.join(process.cwd(), srcRel);
  const destPath = path.join(publicDir, destRel);
  try {
    if (fs.existsSync(srcPath)) {
      fs.copyFileSync(srcPath, destPath);
      console.log(`Copied ${srcRel} -> public/${destRel}`);
    } else {
      console.warn(`Warning: source file not found: ${srcPath}`);
    }
  } catch (err) {
    console.error(`Error copying ${srcRel}:`, err);
  }
}
