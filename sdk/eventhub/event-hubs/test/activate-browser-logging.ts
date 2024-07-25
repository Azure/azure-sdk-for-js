// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { afterAll, beforeAll } from "vitest";
import { AzureLogLevel, setLogLevel } from "@azure/logger";

const logLevel = (process.env.AZURE_LOG_LEVEL as AzureLogLevel) || "verbose";
const localStorage: any = {};

beforeAll(async function () {
  setLogLevel(logLevel);
  localStorage.debug = `azure:*:${logLevel}`;
});

afterAll(async function () {
  delete localStorage.debug;
  setLogLevel();
});
