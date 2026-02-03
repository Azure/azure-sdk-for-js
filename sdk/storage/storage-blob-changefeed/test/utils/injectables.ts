// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";

export function isLiveMode(): boolean {
  return inject(EnvVarKeys.TEST_MODE) === "live";
}

export function getAccountName(): string {
  return inject(EnvVarKeys.ACCOUNT_NAME);
}

export function getAccountKey(): string | undefined {
  return inject(EnvVarKeys.ACCOUNT_KEY);
}

export function getAccountSas(): string | undefined {
  return inject(EnvVarKeys.ACCOUNT_SAS);
}

export function getAccountBlobUrl(): string {
  return inject(EnvVarKeys.ACCOUNT_BLOB_URL);
}

export function getStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.STORAGE_CONNECTION_STRING);
}

export function getDfsAccountName(): string {
  return inject(EnvVarKeys.DFS_ACCOUNT_NAME);
}

export function getDfsAccountBlobUrl(): string {
  return inject(EnvVarKeys.DFS_ACCOUNT_BLOB_URL);
}
