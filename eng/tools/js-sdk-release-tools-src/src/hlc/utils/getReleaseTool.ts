import { readFileSync } from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { logger } from '../../utils/logger.js';

export function getReleaseTool() {
  // Use two ways to get the dirname to avoid failures caused by node version issues
  const __dirname = import.meta.dirname || path.dirname(fileURLToPath(import.meta.url));
  const packageJson = JSON.parse(readFileSync(path.resolve(__dirname, '..', '..', '..', 'package.json'), 'utf-8'));
  const { name, version } = packageJson;

  return `${name}@${version}`;
}
