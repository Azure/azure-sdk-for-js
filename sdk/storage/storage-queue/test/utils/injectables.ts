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

export function getAccountQueueUrl(): string {
  return inject(EnvVarKeys.ACCOUNT_QUEUE_URL);
}

export function getAccountKey(): string | undefined {
  return inject(EnvVarKeys.ACCOUNT_KEY);
}

export function getAccountSas(): string | undefined {
  return inject(EnvVarKeys.ACCOUNT_SAS);
}

export function getStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.STORAGE_CONNECTION_STRING);
}

export function getStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getSecondaryAccountName(): string {
  return inject(EnvVarKeys.SECONDARY_ACCOUNT_NAME);
}

export function getSecondaryAccountQueueUrl(): string {
  return inject(EnvVarKeys.SECONDARY_ACCOUNT_QUEUE_URL);
}

export function getSecondaryAccountKey(): string | undefined {
  return inject(EnvVarKeys.SECONDARY_ACCOUNT_KEY);
}
