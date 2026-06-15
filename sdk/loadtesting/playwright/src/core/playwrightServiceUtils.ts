// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore ESM only output
const currentDir = dirname(fileURLToPath(import.meta.url));
// Use .ts extension when running directly from source, .js when running from compiled dist
const ext = currentDir.replace(/\\/g, "/").includes("/src/") ? ".ts" : ".js";

export const globalPaths = {
  setup: path.join(currentDir, `./global/playwright-service-global-setup${ext}`),
  teardown: path.join(currentDir, `./global/playwright-service-global-teardown${ext}`),
};
