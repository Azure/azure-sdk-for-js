// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the local user of the storage account by username.
 *
 * @summary get the local user of the storage account by username.
 * x-ms-original-file: 2026-04-01/LocalUserGet.json
 */
async function getLocalUser(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.localUsers.get("res6977", "sto2527", "user1");
  console.log(result);
}

async function main(): Promise<void> {
  await getLocalUser();
}

main().catch(console.error);
