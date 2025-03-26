// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function getEndpoint(): string {
  return inject(EnvVarKeys.ENDPOINT);
}

export function isLocalAuthDisabled(): boolean {
  return inject(EnvVarKeys.DISABLE_LOCAL_AUTH) === "true";
}

export function getKey(): string {
  return inject(EnvVarKeys.KEY);
}

export function isLiveMode(): boolean {
  return inject(EnvVarKeys.TEST_MODE) === "live";
}
