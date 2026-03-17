// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import path from "node:path";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const tryGetCommonJSDirname = (): string | undefined => {
  return eval("typeof __dirname !== 'undefined' ? __dirname : undefined") as string | undefined;
};

const getCurrentDir = (): string => {
  const currentDir = tryGetCommonJSDirname();
  if (currentDir) {
    return currentDir;
  }

  return dirname(fileURLToPath(import.meta.url));
};

export const globalPaths = {
  setup: path.join(getCurrentDir(), "./global/playwright-service-global-setup.js"),
  teardown: path.join(getCurrentDir(), "./global/playwright-service-global-teardown.js"),
};
