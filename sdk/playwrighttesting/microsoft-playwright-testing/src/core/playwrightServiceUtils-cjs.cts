// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";

export const globalSetupPath = path.join(path.join(__dirname, "./global/playwright-service-global-setup.js"));
export const globalTeardownPath = path.join(path.join(__dirname, "./global/playwright-service-global-teardown.js"));
