// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function getEndpoint(): string {
  return inject(EnvVarKeys.ENDPOINT);
}

export function getKey1(): string | undefined {
  return inject(EnvVarKeys.KEY1);
}

export function getKey2(): string | undefined {
  return inject(EnvVarKeys.KEY2);
}

export function isLiveMode(): boolean {
  return inject(EnvVarKeys.TEST_MODE) === "live";
}
