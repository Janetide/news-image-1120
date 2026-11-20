// news-image-20261120: a one-image newspaper front page for Friday, 20 November 2026.
// Node 22, standard library only. The image is entry.png beside this file; the program
// copies it to the output directory the grader provides, so the run needs no network.
// Local check: mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, mkdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
mkdirSync(outDir, { recursive: true });
const src = new URL('./entry.png', import.meta.url);
const dst = join(outDir, 'entry.png');
// Say so plainly if the image is missing instead of copying nothing.
const srcSize = statSync(src).size;
if (srcSize === 0) {
  console.error('entry.png beside main.ts is empty');
  process.exit(1);
}
copyFileSync(src, dst);
// Fail loudly instead of handing the grader an empty image.
const size = statSync(dst).size;
if (size === 0) {
  console.error('entry.png copied but is empty');
  process.exit(1);
}
console.log(`wrote ${dst} (${size} bytes)`);
