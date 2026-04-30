#!/usr/bin/env node

// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { init } from "./bin/init.js";
import { writeUnknownError } from "./stdio.js";

(async () => {
  await init();
})().catch((err) => {
  writeUnknownError(err);
  process.exit(1);
});
