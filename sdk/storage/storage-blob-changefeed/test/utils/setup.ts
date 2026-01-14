// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createLiveCredential } from "@azure-tools/test-credential";
import type { TestProject } from "vitest/node";
import { EnvVarKeys } from "./constants.js";
import * as MOCKS from "./constants.js";
import { StorageManagementClient } from "@azure/arm-storage";

declare module "vitest" {
  export interface ProvidedContext extends Record<EnvVarKeys, string | undefined> {
    [EnvVarKeys.ACCOUNT_NAME]: string;
    [EnvVarKeys.ACCOUNT_BLOB_URL]: string;
    [EnvVarKeys.DFS_ACCOUNT_NAME]: string;
    [EnvVarKeys.DFS_ACCOUNT_BLOB_URL]: string;
  }
}

export default async function ({ provide }: TestProject): Promise<void> {
  const testMode = process.env[EnvVarKeys.TEST_MODE]?.toLowerCase() ?? "";

  // Playback mode: provide mock values
  if (["playback", ""].includes(testMode)) {
    for (const key of Object.values(EnvVarKeys)) {
      const val = (MOCKS as Record<string, unknown>)[key as string];
      if (typeof val === "string") {
        provide(key, val);
      }
    }
    return;
  }

  // Live/Record mode: fetch real values
  const subId = process.env[EnvVarKeys.SUBSCRIPTION_ID];
  const rgName = process.env[EnvVarKeys.RESOURCE_GROUP];
  const accountName = process.env[EnvVarKeys.ACCOUNT_NAME];
  const dfsAccountName = process.env[EnvVarKeys.DFS_ACCOUNT_NAME];

  if (!subId || !rgName || !accountName || !dfsAccountName) {
    throw new Error(
      "SUBSCRIPTION_ID, RESOURCE_GROUP, ACCOUNT_NAME, and DFS_ACCOUNT_NAME environment variables are required for live/record mode.",
    );
  }

  const cred = createLiveCredential();
  const mgmtClient = new StorageManagementClient(cred, subId);

  // Get storage account properties
  const props = await mgmtClient.storageAccounts.getProperties(rgName, accountName);
  const blobUrl = props.primaryEndpoints?.blob;
  if (!blobUrl) {
    throw new Error(`No blob endpoint found for storage account ${accountName}.`);
  }

  // Get endpoint suffix for connection string
  const host = new URL(blobUrl).hostname;
  const parts = host.split(".");
  const endpointSuffix = parts.length > 2 ? parts.slice(2).join(".") : "core.windows.net";

  // Get account key and generate SAS
  let accountKey: string | undefined;
  let accountSas: string | undefined;
  let connectionString: string | undefined;

  if (props.allowSharedKeyAccess) {
    const { keys } = await mgmtClient.storageAccounts.listKeys(rgName, accountName);
    if (keys && keys.length > 0) {
      accountKey = keys[0].value;
      connectionString = `DefaultEndpointsProtocol=https;AccountName=${accountName};AccountKey=${accountKey};EndpointSuffix=${endpointSuffix}`;

      const { accountSasToken } = await mgmtClient.storageAccounts.listAccountSAS(
        rgName,
        accountName,
        {
          permissions: "rwdlacup",
          services: "bfqt",
          resourceTypes: "sco",
          keyToSign: "key2",
          sharedAccessExpiryTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
        },
      );
      accountSas = accountSasToken;
    }
  }

  // Get DFS account blob URL (for testing change feed not configured)
  const dfsProps = await mgmtClient.storageAccounts.getProperties(rgName, dfsAccountName);
  const dfsBlobUrl = dfsProps.primaryEndpoints?.blob;
  if (!dfsBlobUrl) {
    throw new Error(`No blob endpoint found for storage account ${dfsAccountName}.`);
  }

  // Provide all values
  provide(EnvVarKeys.TEST_MODE, testMode);
  provide(EnvVarKeys.SUBSCRIPTION_ID, subId);
  provide(EnvVarKeys.RESOURCE_GROUP, rgName);
  provide(EnvVarKeys.ACCOUNT_NAME, accountName);
  provide(EnvVarKeys.ACCOUNT_BLOB_URL, blobUrl);
  provide(EnvVarKeys.ACCOUNT_KEY, accountKey);
  provide(EnvVarKeys.ACCOUNT_SAS, accountSas);
  provide(EnvVarKeys.STORAGE_CONNECTION_STRING, connectionString);
  provide(EnvVarKeys.DFS_ACCOUNT_NAME, dfsAccountName);
  provide(EnvVarKeys.DFS_ACCOUNT_BLOB_URL, dfsBlobUrl);
}
