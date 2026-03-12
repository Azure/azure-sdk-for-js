// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import { StorageManagementClient } from "@azure/arm-storage";
import * as MOCKS from "./constants.js";

declare module "vitest" {
  type MyEnvVarKeys = {
    [K in (typeof EnvVarKeys)[keyof typeof EnvVarKeys]]: K extends (typeof EnvVarKeys)["ALLOW_SHARED_KEY_ACCESS"]
      ? boolean
      : K extends (typeof EnvVarKeys)["TEST_MODE"]
        ? string | undefined
        : string;
  };
  export interface ProvidedContext extends MyEnvVarKeys {}
}

function assertEnvironmentVariable<
  T extends (typeof EnvVarKeys)[keyof Pick<typeof EnvVarKeys, "TEST_MODE">],
>(key: T): string | undefined;
function assertEnvironmentVariable(key: string): string;
function assertEnvironmentVariable(key: string): string | undefined {
  const value = process.env[key];
  if (key === EnvVarKeys.TEST_MODE) {
    return value?.toLowerCase();
  }
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined.`);
  }
  return value;
}

export default async function ({ provide }: TestProject): Promise<void> {
  const testMode = assertEnvironmentVariable(EnvVarKeys.TEST_MODE);
  if (["live", "record"].includes(testMode ?? "")) {
    const subId = assertEnvironmentVariable(EnvVarKeys.SUBSCRIPTION_ID);
    const rgName = assertEnvironmentVariable(EnvVarKeys.RESOURCE_GROUP);
    const resourceName = assertEnvironmentVariable(EnvVarKeys.ACCOUNT_NAME);
    const endpoint = assertEnvironmentVariable(EnvVarKeys.ENDPOINT);
    const cred = createLiveCredential();
    const mgmtClient = new StorageManagementClient(cred, subId);
    const account = await mgmtClient.storageAccounts.getProperties(rgName, resourceName);
    if (!account) {
      throw new Error("Storage account is not defined.");
    }
    const allowSharedKeyAccess = account.allowSharedKeyAccess ?? false;
    const { keys } = await mgmtClient.storageAccounts.listKeys(rgName, resourceName);
    const key = keys?.[0]?.value;
    if (!key) {
      throw new Error("Key is not defined.");
    }
    const blobEndpoint = account.primaryEndpoints?.blob;
    if (!blobEndpoint) {
      throw new Error("Blob endpoint not defined.");
    }
    const url = new URL(blobEndpoint);
    const hostParts = url.hostname.split(".");
    if (hostParts.length < 2) {
      throw new Error("Unexpected blob endpoint format.");
    }
    const endpointSuffix = hostParts.slice(2).join("."); // drop <account.name>.blob.
    const accountConnectionString = `DefaultEndpointsProtocol=https;AccountName=${account.name};AccountKey=${key};EndpointSuffix=${endpointSuffix}`;
    const { accountSasToken } = await mgmtClient.storageAccounts.listAccountSAS(
      rgName,
      resourceName,
      {
        permissions: "rwdlacup",
        resourceTypes: "sco",
        services: "bfqt",
        keyToSign: "key2",
        sharedAccessExpiryTime: new Date(Date.now() + 3600 * 1000),
      },
    );
    if (!accountSasToken) {
      throw new Error("Account SAS token is not defined.");
    }
    const SASConnectionString = `TableEndpoint=https://${account.name}.table.${endpointSuffix}/;SharedAccessSignature=${accountSasToken}`;
    provide(EnvVarKeys.ENDPOINT, endpoint);
    provide(EnvVarKeys.ALLOW_SHARED_KEY_ACCESS, allowSharedKeyAccess);
    provide(EnvVarKeys.KEY, key);
    provide(EnvVarKeys.ACCOUNT_NAME, resourceName);
    provide(EnvVarKeys.TEST_MODE, testMode);
    provide(EnvVarKeys.CONNECTION_STRING, accountConnectionString);
    provide(EnvVarKeys.SAS_CONNECTION_STRING, SASConnectionString);
    provide(EnvVarKeys.SAS_TOKEN, accountSasToken);
  } else {
    provide(EnvVarKeys.ENDPOINT, MOCKS.ENDPOINT);
    provide(EnvVarKeys.ALLOW_SHARED_KEY_ACCESS, MOCKS.ALLOW_SHARED_KEY_ACCESS);
    provide(EnvVarKeys.KEY, MOCKS.KEY);
    provide(EnvVarKeys.ACCOUNT_NAME, MOCKS.ACCOUNT_NAME);
    provide(EnvVarKeys.CONNECTION_STRING, MOCKS.CONNECTION_STRING);
    provide(EnvVarKeys.SAS_CONNECTION_STRING, MOCKS.SAS_CONNECTION_STRING);
    provide(EnvVarKeys.SAS_TOKEN, MOCKS.SAS_TOKEN);
  }
}
