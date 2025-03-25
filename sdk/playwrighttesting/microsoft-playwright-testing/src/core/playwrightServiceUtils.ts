// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { fileURLToPath } from "node:url";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const globalSetupPath = path.join(__dirname, "./global/playwright-service-global-setup.js");
export const globalTeardownPath = path.join(
  __dirname,
  "./global/playwright-service-global-teardown.js",
);
