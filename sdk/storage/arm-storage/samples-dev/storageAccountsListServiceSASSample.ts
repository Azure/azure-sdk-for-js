// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list service SAS credentials of a specific resource.
 *
 * @summary list service SAS credentials of a specific resource.
 * x-ms-original-file: 2026-04-01/StorageAccountListServiceSAS.json
 */
async function storageAccountListServiceSAS(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.storageAccounts.listServiceSAS("res7439", "sto1299", {
    canonicalizedResource: "/blob/sto1299/music",
    sharedAccessExpiryTime: new Date("2017-05-24T11:32:48.8457197Z"),
    permissions: "l",
    resource: "c",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await storageAccountListServiceSAS();
}

main().catch(console.error);
