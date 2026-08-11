// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list SSH authorized keys and shared key of the local user.
 *
 * @summary list SSH authorized keys and shared key of the local user.
 * x-ms-original-file: 2026-04-01/LocalUserListKeys.json
 */
async function listLocalUserKeys(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  const result = await client.localUsers.listKeys("res6977", "sto2527", "user1");
  console.log(result);
}

async function main(): Promise<void> {
  await listLocalUserKeys();
}

main().catch(console.error);
