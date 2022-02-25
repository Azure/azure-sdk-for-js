// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license

import fs from "fs-extra";
import path from "path";

export function findSamplesRelativeDir(samplesDir: string): string {
  const dirs = [];
  for (const file of fs.readdirSync(samplesDir)) {
    const stats = fs.statSync(path.join(samplesDir, file));
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
