// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";

// Use .ts extension when running directly from source, .js when running from compiled dist
const ext = __dirname.replace(/\\/g, "/").includes("/src/") ? ".ts" : ".js";

export const globalPaths = {
  setup: path.join(__dirname, `./global/playwright-service-global-setup${ext}`),
  teardown: path.join(__dirname, `./global/playwright-service-global-teardown${ext}`),
};
