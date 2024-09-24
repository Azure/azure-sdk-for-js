// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import path from "node:path";

function readdir(dir: string, root: string): string[] {
  const results: string[] = [];

  fs.readdirSync(root + dir).forEach((file) => {
    const stat = fs.statSync(root + dir + path.sep + file);
    if (stat && stat.isDirectory()) {
      results.push(...readdir(dir + file + path.sep, root));
    } else {
      results.push(dir + file);
    }
  });

  return results;
}

export default readdir;
