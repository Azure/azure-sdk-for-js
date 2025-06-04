// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";

export const globalPaths = {
  setup: path.join(__dirname, "./global/playwright-service-global-setup.js"),
  teardown: path.join(__dirname, "./global/playwright-service-global-teardown.js"),
};
