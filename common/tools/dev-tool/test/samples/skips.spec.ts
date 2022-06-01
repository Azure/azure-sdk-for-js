// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";

import { FileInfo } from "../../src/util/findMatchingFiles";
import { shouldSkip } from "../../src/util/samples/configuration";

import { Stats } from "fs";
import path from "path";

/**
 * Convert a full path to a FileInfo. If `_stat` is not provided, it will be
 * retrieved using `fs.stat`.
 */
export async function toFileInfo(fullPath: string): Promise<FileInfo> {
  return {
    fullPath,
    dir: path.dirname(fullPath),
    name: path.basename(fullPath),
    stat: {} as Stats,
  };
}

describe("Matching logic for sample skip lists", () => {
  const skips = ["a.js", "b.ts", "advanced/proxy.js", "advanced/auth.ts"];

  const expectations: Record<string, boolean> = {
    // affirmative cases
    "a.ts": true,
    "a.js": true,
    "b.js": true,
    "b.ts": true,
    "advanced/proxy.js": true,
    "advanced/proxy.ts": true,
    "advanced/auth.js": true,
    "advanced/auth.ts": true,
    // negative cases
    "ba.ts": false,
    "ba.js": false,
    "ab.ts": false,
    "ab.js": false,
    "notadvanced/proxy.js": false,
    "notadvanced/proxy.ts": false,
    "notadvanced/auth.js": false,
    "notadvanced/auth.ts": false,
    "simple/proxy.js": false,
    "simple/proxy.ts": false,
    "simple/auth.js": false,
    "simple/auth.ts": false,
  };

  for (const [name, expectation] of Object.entries(expectations)) {
    it(name, async () => {
      assert.strictEqual(shouldSkip(await toFileInfo(name), skips), expectation);
    });
  }
});
