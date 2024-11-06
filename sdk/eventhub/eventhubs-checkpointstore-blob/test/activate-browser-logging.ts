// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterAll, beforeAll } from "vitest";
import type { AzureLogLevel } from "@azure/logger";
import { setLogLevel } from "@azure/logger";

const logLevel = (process.env.AZURE_LOG_LEVEL as AzureLogLevel) || "info";
const localStorage: { debug?: string } = {};

beforeAll(async function () {
  setLogLevel(logLevel);
  localStorage.debug = `azure:*:${logLevel}`;
});

afterAll(async function () {
  delete localStorage.debug;
  setLogLevel();
});
