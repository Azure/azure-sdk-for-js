// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";
import type { KnownContainers } from "./types.js";

export function getEndpoint(): string {
  return inject(EnvVarKeys.ENDPOINT);
}

export function getBlobEndpoint(): string {
  return inject(EnvVarKeys.BLOB_ENDPOINT);
}

export function isLocalAuthDisabled(): boolean {
  return inject(EnvVarKeys.DISABLE_LOCAL_AUTH);
}

export function getKey(): string {
  return inject(EnvVarKeys.KEY);
}

export function getRegion(): string {
  return inject(EnvVarKeys.REGION);
}

export function getResourceId(): string {
  return inject(EnvVarKeys.RESOURCE_ID);
}

export function getContainers(): KnownContainers {
  return inject(EnvVarKeys.CONTAINERS);
}

export function isLiveMode(): boolean {
  return ["live", "record"].includes(inject(EnvVarKeys.TEST_MODE) ?? "");
}
