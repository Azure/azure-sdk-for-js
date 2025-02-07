// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterAll, beforeAll, inject } from "vitest";
import { type AzureLogLevel, setLogLevel } from "@azure/logger";
import { EnvironmentVariableNamesAzureCommon } from "./envVars.js";

const logLevel = inject(EnvironmentVariableNamesAzureCommon.AZURE_LOG_LEVEL) as AzureLogLevel;
const localStorage: { debug?: string } = {};

beforeAll(async function () {
  setLogLevel(logLevel);
  localStorage.debug = `azure:*:${logLevel}`;
});

afterAll(async function () {
  delete localStorage.debug;
  setLogLevel();
});
