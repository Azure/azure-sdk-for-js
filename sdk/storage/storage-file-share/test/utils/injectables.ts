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

export function getAccountFileUrl(): string {
  return inject(EnvVarKeys.ACCOUNT_FILE_URL);
}

export function getStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.STORAGE_CONNECTION_STRING);
}

export function getStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getSoftDeleteAccountName(): string {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_NAME);
}

export function getSoftDeleteAccountFileUrl(): string {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_FILE_URL);
}

export function getSoftDeleteAccountKey(): string | undefined {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_KEY);
}

export function getSoftDeleteAccountSas(): string | undefined {
  return inject(EnvVarKeys.SOFT_DELETE_ACCOUNT_SAS);
}

export function getSoftDeleteStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.SOFT_DELETE_STORAGE_CONNECTION_STRING);
}

export function getSoftDeleteStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getPremiumFileAccountName(): string {
  return inject(EnvVarKeys.PREMIUM_FILE_ACCOUNT_NAME);
}

export function getPremiumFileAccountFileUrl(): string {
  return inject(EnvVarKeys.PREMIUM_FILE_ACCOUNT_FILE_URL);
}

export function getPremiumFileAccountKey(): string | undefined {
  return inject(EnvVarKeys.PREMIUM_FILE_ACCOUNT_KEY);
}

export function getPremiumFileAccountSas(): string | undefined {
  return inject(EnvVarKeys.PREMIUM_FILE_ACCOUNT_SAS);
}

export function getPremiumFileStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.PREMIUM_FILE_STORAGE_CONNECTION_STRING);
}

export function getPremiumFileStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.PREMIUM_FILE_STORAGE_CONNECTION_STRING_WITH_SAS);
}
