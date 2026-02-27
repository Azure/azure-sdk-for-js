// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";
import { type StorageAccount, StorageManagementClient } from "@azure/arm-storage";

declare module "vitest" {
  export interface ProvidedContext extends Record<EnvVarKeys, string | undefined> {
    [EnvVarKeys.ACCOUNT_NAME]: string;
    [EnvVarKeys.ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.SOFT_DELETE_ACCOUNT_NAME]: string;
    [EnvVarKeys.SOFT_DELETE_ACCOUNT_FILE_URL]: string;
    [EnvVarKeys.PREMIUM_FILE_ACCOUNT_NAME]: string;
    [EnvVarKeys.PREMIUM_FILE_ACCOUNT_FILE_URL]: string;
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
      EnvVarKeys.ACCOUNT_NAME,
      EnvVarKeys.ACCOUNT_FILE_URL,
      EnvVarKeys.SOFT_DELETE_ACCOUNT_NAME,
      EnvVarKeys.SOFT_DELETE_ACCOUNT_FILE_URL,
      EnvVarKeys.PREMIUM_FILE_ACCOUNT_NAME,
      EnvVarKeys.PREMIUM_FILE_ACCOUNT_FILE_URL,
    ].includes(key as EnvVarKeys)
  ) {
    if (!value) {
      throw new Error(`Environment variable ${key} is not defined.`);
    }
  }
  return value;
}

async function ensureSharedKeyAndSas(
  mgmtClient: StorageManagementClient,
  rgName: string,
  accountName: string,
  accountFileUrlEnvVarName: string,
  accountKeyEnvVarName: string,
  accountSasEnvVarName: string,
  connectionStringEnvVarName: string,
  connectionStringEnvVarNameWithSas: string,
  endpointSuffix: string,
): Promise<StorageAccount> {
  const props = await mgmtClient.storageAccounts.getProperties(rgName, accountName);
  const fileUrl = props.primaryEndpoints?.file;
  setEnv(accountFileUrlEnvVarName, fileUrl);
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
  const connectionStringWithSas = `FileEndpoint=${fileUrl};SharedAccessSignature=${accountSasToken}`;
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
    return;
  }
  const subId = assertEnvironmentVariable(EnvVarKeys.SUBSCRIPTION_ID);
  const rgName = assertEnvironmentVariable(EnvVarKeys.RESOURCE_GROUP);
  const accountName = assertEnvironmentVariable(EnvVarKeys.ACCOUNT_NAME);
  const softDeleteAccountName = assertEnvironmentVariable(EnvVarKeys.SOFT_DELETE_ACCOUNT_NAME);
  const premiumFileAccountName = assertEnvironmentVariable(EnvVarKeys.PREMIUM_FILE_ACCOUNT_NAME);

  if (!subId || !rgName) {
    throw new Error("SUBSCRIPTION_ID and RESOURCE_GROUP environment variables are required.");
  }

  const cred = createLiveCredential();
  const mgmtClient = new StorageManagementClient(cred, subId);
  let endpointSuffix = "core.windows.net";
  try {
    const props = await mgmtClient.storageAccounts.getProperties(rgName, accountName!);
    const fileEndpoint = props.primaryEndpoints?.file;
    if (fileEndpoint) {
      const host = new URL(fileEndpoint).hostname;
      const parts = host.split(".");
      if (parts.length > 2) {
        endpointSuffix = parts.slice(2).join(".");
      }
    }
  } catch {
    endpointSuffix = "core.windows.net";
  }

  await Promise.all([
    ensureSharedKeyAndSas(
      mgmtClient,
      rgName,
      accountName!,
      EnvVarKeys.ACCOUNT_FILE_URL,
      EnvVarKeys.ACCOUNT_KEY,
      EnvVarKeys.ACCOUNT_SAS,
      EnvVarKeys.STORAGE_CONNECTION_STRING,
      EnvVarKeys.STORAGE_CONNECTION_STRING_WITH_SAS,
      endpointSuffix,
    ),
    ensureSharedKeyAndSas(
      mgmtClient,
      rgName,
      softDeleteAccountName!,
      EnvVarKeys.SOFT_DELETE_ACCOUNT_FILE_URL,
      EnvVarKeys.SOFT_DELETE_ACCOUNT_KEY,
      EnvVarKeys.SOFT_DELETE_ACCOUNT_SAS,
      EnvVarKeys.SOFT_DELETE_STORAGE_CONNECTION_STRING,
      EnvVarKeys.SOFT_DELETE_STORAGE_CONNECTION_STRING_WITH_SAS,
      endpointSuffix,
    ),
    ensureSharedKeyAndSas(
      mgmtClient,
      rgName,
      premiumFileAccountName!,
      EnvVarKeys.PREMIUM_FILE_ACCOUNT_FILE_URL,
      EnvVarKeys.PREMIUM_FILE_ACCOUNT_KEY,
      EnvVarKeys.PREMIUM_FILE_ACCOUNT_SAS,
      EnvVarKeys.PREMIUM_FILE_STORAGE_CONNECTION_STRING,
      EnvVarKeys.PREMIUM_FILE_STORAGE_CONNECTION_STRING_WITH_SAS,
      endpointSuffix,
    ),
  ]);

  for (const key of Object.values(EnvVarKeys)) {
    provide(key, assertEnvironmentVariable(key));
  }
}
