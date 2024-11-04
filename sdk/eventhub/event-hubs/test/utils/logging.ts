// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterAll, beforeAll, inject } from "vitest";
import type { AzureLogLevel } from "@azure/logger";
import { setLogLevel } from "@azure/logger";

const logLevel = inject("AZURE_LOG_LEVEL") as AzureLogLevel;
const localStorage: { debug?: string } = {};

beforeAll(async function () {
  setLogLevel(logLevel);
  localStorage.debug = `azure:*:${logLevel}`;
});

afterAll(async function () {
  delete localStorage.debug;
  setLogLevel();
});
