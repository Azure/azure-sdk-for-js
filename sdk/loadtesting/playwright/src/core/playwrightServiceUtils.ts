// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import url from "node:url";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const globalPaths = {
  setup: path.join(__dirname, "./global/playwright-service-global-setup.js"),
  teardown: path.join(__dirname, "./global/playwright-service-global-teardown.js"),
};