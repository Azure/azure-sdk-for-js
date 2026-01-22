// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";
import { type StorageAccount, StorageManagementClient } from "@azure/arm-storage";
import type { CpkInfo } from "@azure/storage-file-datalake";
import { randomBytes, createHash } from "node:crypto";

function createCustomerProvidedKey(): CpkInfo {
  const rawKey = randomBytes(32); // 256-bit
  const encryptionKey = rawKey.toString("base64");
  const encryptionKeySha256 = createHash("sha256").update(rawKey).digest("base64");
  return {
    encryptionKey,
    encryptionKeySha256,
  };
}

declare module "vitest" {
  export interface ProvidedContext extends Record<
    Exclude<EnvVarKeys, EnvVarKeys.CUSTOMER_PROVIDED_KEY>,
    string | undefined
  > {
    [EnvVarKeys.DFS_ACCOUNT_NAME]: string;
    [EnvVarKeys.DFS_ACCOUNT_URL]: string;
    [EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_NAME]: string;
    [EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_URL]: string;
    [EnvVarKeys.ENCRYPTION_SCOPE_1]: string;
    [EnvVarKeys.ENCRYPTION_SCOPE_2]: string;
    [EnvVarKeys.CUSTOMER_PROVIDED_KEY]: CpkInfo;
    [EnvVarKeys.ACL_ID_FOR_TEST]: string;
  }
}

/**
 * Set an environment variable only if it is currently unset (undefined).
 */
export function setEnv(
  name: string | undefined,
  valueOrFactory:
    | string
    | null
    | undefined
    | ((current: string | undefined) => string | null | undefined),
  { overwrite }: { overwrite?: boolean } = {},
): boolean {
  if (!name) {
    return false;
  }
  const alreadyHas =
    Object.prototype.hasOwnProperty.call(process.env, name) && process.env[name] !== undefined;
  if (alreadyHas && !overwrite) {
    return false;
  }
  let next: string | null | undefined;
  if (typeof valueOrFactory === "function") {
    next = valueOrFactory(process.env[name]);
  } else {
    next = valueOrFactory;
  }
  if (next === undefined || next === null || next === "") {
    return false;
  }
  process.env[name] = next;
  return true;
}

function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return !value ? value : value.toLowerCase();
  }
  if (
    [
      EnvVarKeys.DFS_ACCOUNT_NAME,
      EnvVarKeys.DFS_ACCOUNT_URL,
      EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_NAME,
      EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_URL,
    ].includes(key as EnvVarKeys)
  ) {
    if (!value) {
      throw new Error(`Environment variable ${key} is not defined.`);
    }
  }
  // For keys that are test-only constants (not real environment variables),
  // fall back to mock values when not set in environment
  if (value === undefined) {
    const mockValue = (MOCKS as Record<string, unknown>)[key];
    if (typeof mockValue === "string") {
      return mockValue;
    }
  }
  return value;
}

async function ensurePublicAccessEnabled(
  mgmtClient: StorageManagementClient,
  rgName: string,
  accountName: string,
): Promise<void> {
  const props = await mgmtClient.storageAccounts.getProperties(rgName, accountName);
  if (props.allowBlobPublicAccess) {
    return;
  }
  try {
    await mgmtClient.storageAccounts.update(rgName, accountName, {
      allowBlobPublicAccess: true,
    });
  } catch (err: any) {
    console.warn(
      `[setup] ⚠️ Failed to enable allowBlobPublicAccess on "${accountName}": ${err.message}`,
    );
  }
}

async function ensureSharedKeyAndSas(
  mgmtClient: StorageManagementClient,
  rgName: string,
  accountName: string,
  accountUrlEnvVarName: string,
  accountKeyEnvVarName: string,
  accountSasEnvVarName: string,
  connectionStringEnvVarName: string,
  connectionStringEnvVarNameWithSas: string,
  endpointSuffix: string,
): Promise<StorageAccount> {
  const props = await mgmtClient.storageAccounts.getProperties(rgName, accountName);
  const dfsUrl = props.primaryEndpoints?.dfs;
  setEnv(accountUrlEnvVarName, dfsUrl);
  const { allowSharedKeyAccess } = props;
  if (!allowSharedKeyAccess) {
    return props;
  }

  const { keys } = await mgmtClient.storageAccounts.listKeys(rgName, accountName);
  if (!keys || keys.length === 0) {
    throw new Error(`No keys found for storage account ${accountName}.`);
  }
  const accountKey = keys[0].value;
  setEnv(accountKeyEnvVarName, accountKey);
  const connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=${endpointSuffix}`;
  setEnv(connectionStringEnvVarName, connectionString);

  const { accountSasToken } = await mgmtClient.storageAccounts.listAccountSAS(rgName, accountName, {
    permissions: "rwdlacup",
    services: "bfqt",
    resourceTypes: "sco",
    keyToSign: "key2",
    sharedAccessExpiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  });

  if (!accountSasToken) {
    throw new Error(`No account SAS token found for storage account ${accountName}.`);
  }
  setEnv(accountSasEnvVarName, accountSasToken);
  const blobUrl = props.primaryEndpoints?.blob;
  const fileUrl = props.primaryEndpoints?.file;
  const connectionStringWithSas = `BlobEndpoint=${blobUrl};FileEndpoint=${fileUrl};SharedAccessSignature=${accountSasToken}`;
  setEnv(connectionStringEnvVarNameWithSas, connectionStringWithSas);
  return props;
}

export default async function ({ provide }: TestProject): Promise<void> {
  const testMode = process.env[EnvVarKeys.TEST_MODE]?.toLowerCase() ?? "";
  if (["playback", ""].includes(testMode)) {
    for (const key of Object.values(EnvVarKeys)) {
      const val = (MOCKS as Record<string, unknown>)[key as string];
      if (typeof val === "string") {
        provide(key, val);
      }
    }
    provide(EnvVarKeys.CUSTOMER_PROVIDED_KEY, MOCKS.CUSTOMER_PROVIDED_KEY);
    return;
  }
  const subId = assertEnvironmentVariable(EnvVarKeys.SUBSCRIPTION_ID);
  const rgName = assertEnvironmentVariable(EnvVarKeys.RESOURCE_GROUP);
  const dfsAccountName = assertEnvironmentVariable(EnvVarKeys.DFS_ACCOUNT_NAME);
  const dfsSoftDeleteAccountName = assertEnvironmentVariable(
    EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_NAME,
  );

  if (!subId || !rgName) {
    throw new Error("SUBSCRIPTION_ID and RESOURCE_GROUP environment variables are required.");
  }

  const cred = createLiveCredential();
  const mgmtClient = new StorageManagementClient(cred, subId);
  let endpointSuffix = "core.windows.net";
  try {
    const props = await mgmtClient.storageAccounts.getProperties(rgName, dfsAccountName!);
    const dfsEndpoint = props.primaryEndpoints?.dfs;
    if (dfsEndpoint) {
      const host = new URL(dfsEndpoint).hostname;
      const parts = host.split(".");
      if (parts.length > 2) {
        endpointSuffix = parts.slice(2).join(".");
      }
    }
  } catch {
    endpointSuffix = "core.windows.net";
  }

  await Promise.all([
    ensurePublicAccessEnabled(mgmtClient, rgName, dfsAccountName!),
    ensurePublicAccessEnabled(mgmtClient, rgName, dfsSoftDeleteAccountName!),
  ]);

  await Promise.all([
    ensureSharedKeyAndSas(
      mgmtClient,
      rgName,
      dfsAccountName!,
      EnvVarKeys.DFS_ACCOUNT_URL,
      EnvVarKeys.DFS_ACCOUNT_KEY,
      EnvVarKeys.DFS_ACCOUNT_SAS,
      EnvVarKeys.DFS_STORAGE_CONNECTION_STRING,
      EnvVarKeys.DFS_STORAGE_CONNECTION_STRING_WITH_SAS,
      endpointSuffix,
    ),
    ensureSharedKeyAndSas(
      mgmtClient,
      rgName,
      dfsSoftDeleteAccountName!,
      EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_URL,
      EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_KEY,
      EnvVarKeys.DFS_SOFT_DELETE_ACCOUNT_SAS,
      EnvVarKeys.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING,
      EnvVarKeys.DFS_SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS,
      endpointSuffix,
    ),
  ]);

  for (const key of Object.values(EnvVarKeys)) {
    if (key === EnvVarKeys.CUSTOMER_PROVIDED_KEY) {
      continue;
    }
    provide(key, assertEnvironmentVariable(key));
  }
  provide(EnvVarKeys.CUSTOMER_PROVIDED_KEY, createCustomerProvidedKey());
}
