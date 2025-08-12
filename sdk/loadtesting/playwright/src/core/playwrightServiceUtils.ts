// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { dirname } from "path";
import { fileURLToPath } from "url";

const currentDir = dirname(fileURLToPath(import.meta.url));

export const globalPaths = {
  setup: path.join(currentDir, "./global/playwright-service-global-setup.js"),
  teardown: path.join(currentDir, "./global/playwright-service-global-teardown.js"),
};
