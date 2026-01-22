// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { inject } from "vitest";
import { EnvVarKeys } from "./constants.js";
import type { CpkInfo } from "@azure/storage-file-datalake";

export function isLiveMode(): boolean {
  return inject(EnvVarKeys.TEST_MODE) === "live";
}

export function getDfsAccountName(): string {
  return inject(EnvVarKeys.DFS_ACCOUNT_NAME);
}

export function getDfsAccountUrl(): string {
  return inject(EnvVarKeys.DFS_ACCOUNT_URL);
}

export function getDfsAccountKey(): string | undefined {
  return inject(EnvVarKeys.DFS_ACCOUNT_KEY);
}

export function getDfsAccountSas(): string | undefined {
  return inject(EnvVarKeys.DFS_ACCOUNT_SAS);
}

export function getDfsStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.DFS_STORAGE_CONNECTION_STRING);
}

export function getDfsStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.DFS_STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getDfsSoftDeleteAccountName(): string {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_NAME);
}

export function getDfsSoftDeleteAccountUrl(): string {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_URL);
}

export function getDfsSoftDeleteAccountKey(): string | undefined {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_KEY);
}

export function getDfsSoftDeleteAccountSas(): string | undefined {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_SAS);
}

export function getDfsSoftDeleteStorageConnectionString(): string | undefined {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING);
}

export function getDfsSoftDeleteStorageConnectionStringWithSas(): string | undefined {
  return inject(EnvVarKeys.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS);
}

export function getImmutableContainerName(): string | undefined {
  return inject(EnvVarKeys.IMMUTABLE_CONTAINER_NAME);
}

export function getEncryptionScope1(): string {
  return inject(EnvVarKeys.ENCRYPTION_SCOPE_1);
}

export function getEncryptionScope2(): string {
  return inject(EnvVarKeys.ENCRYPTION_SCOPE_2);
}

export function getTestCpkInfo(): CpkInfo {
  return inject(EnvVarKeys.CUSTOMER_PROVIDED_KEY);
}

export function getAclIdForTest(): string {
  return inject(EnvVarKeys.ACL_ID_FOR_TEST);
}

export function isStreamDebug(): boolean {
  return !!inject(EnvVarKeys.STREAM_DEBUG);
}
