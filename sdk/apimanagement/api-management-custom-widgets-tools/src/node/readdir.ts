// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import path from "path";

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
