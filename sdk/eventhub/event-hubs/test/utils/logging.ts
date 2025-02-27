// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterAll, beforeAll, inject } from "vitest";
import { setLogLevel } from "@azure/logger";
import { EnvVarKeys } from "./constants.js";

const logLevel = inject(EnvVarKeys.AZURE_LOG_LEVEL);
const localStorage: { debug?: string } = {};

beforeAll(async () => {
  setLogLevel(logLevel);
  localStorage.debug = `azure:*:${logLevel}`;
});

afterAll(async () => {
  delete localStorage.debug;
  setLogLevel();
});
