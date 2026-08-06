// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { spawnSync } from "node:child_process";
import { createRequire } from "node:module";

const [task, ...args] = process.argv.slice(2);
if (!task) {
  console.error("A Turborepo test task is required.");
  process.exit(1);
}

const turboCli = createRequire(import.meta.url).resolve("turbo/bin/turbo");
const result = spawnSync(process.execPath, [turboCli, "run", task, ...args], {
  stdio: "inherit",
  env: {
    ...process.env,
    AZURE_SDK_NODE_VERSION: process.versions.node,
  },
});

if (result.error) {
  throw result.error;
}

process.exit(result.status ?? 1);
