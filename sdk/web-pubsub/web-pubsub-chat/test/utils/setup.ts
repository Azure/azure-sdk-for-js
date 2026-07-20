// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";

function getEnvironmentVariable(key: string): string | undefined {
  return process.env[key];
}

function requireEnvironmentVariable(key: string): string {
  const value = getEnvironmentVariable(key);
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

function getTestMode(): string | undefined {
  return getEnvironmentVariable(EnvVarKeys.TEST_MODE)?.toLowerCase();
}

export default async function ({ provide }: TestProject): Promise<void> {
  const testMode = getTestMode();
  if (![undefined, "playback"].includes(testMode)) {
    provide(EnvVarKeys.ENDPOINT, requireEnvironmentVariable(EnvVarKeys.ENDPOINT));
    provide(EnvVarKeys.CONNECTION_STRING, requireEnvironmentVariable(EnvVarKeys.CONNECTION_STRING));
    provide(EnvVarKeys.API_KEY, requireEnvironmentVariable(EnvVarKeys.API_KEY));
    provide(EnvVarKeys.TEST_MODE, testMode!);
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.CONNECTION_STRING, MOCKS.CONNECTION_STRING);
    provide(EnvVarKeys.API_KEY, MOCKS.API_KEY);
    provide(EnvVarKeys.TEST_MODE, testMode ?? "playback");
  }
}
