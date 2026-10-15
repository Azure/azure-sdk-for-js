// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ESM only output
const currentDir = dirname(fileURLToPath(import.meta.url));
export function getGlobalPaths(directory: string): { setup: string; teardown: string } {
  // Only the package's own src/core directory runs TypeScript directly. An installed
  // package can be nested under a consumer directory named "src", so do not inspect
  // arbitrary path segments.
  const ext = directory.replace(/\\/g, "/").endsWith("/src/core") ? ".ts" : ".js";

  return {
    setup: path.join(directory, `./global/playwright-service-global-setup${ext}`),
    teardown: path.join(directory, `./global/playwright-service-global-teardown${ext}`),
  };
}

export const globalPaths = getGlobalPaths(currentDir);
