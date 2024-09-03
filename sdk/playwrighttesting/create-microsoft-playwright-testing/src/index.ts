#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { init } from "./bin/init";

(async () => {
  await init();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
