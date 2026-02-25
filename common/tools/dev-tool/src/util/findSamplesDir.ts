// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License

import { readdirSync, statSync } from "node:fs";
import path from "node:path";

export function findSamplesRelativeDir(samplesDir: string): string {
  const dirs = [];
  for (const file of readdirSync(samplesDir)) {
    const stats = statSync(path.join(samplesDir, file));
    if (stats.isDirectory()) {
      if (file.match(/^v[0-9]*.*$/)) {
        dirs.push(file);
      }
    }
  }
  if (dirs.length === 0) {
    return `samples`;
  } else {
    return `samples/${dirs.sort().slice(-1).pop()}`;
  }
}
