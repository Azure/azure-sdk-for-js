// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { afterAll, beforeAll } from "vitest";
import { setLogLevel } from "@azure/logger";

const localStorage: { debug?: string } = {};

beforeAll(async function () {
  setLogLevel("info");
  localStorage.debug = `azure:openai:info`;
});

afterAll(async function () {
  delete localStorage.debug;
  setLogLevel();
});
