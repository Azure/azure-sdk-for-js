// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageManagementClient } from "@azure/arm-storage";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a Context Cache.
 *
 * @summary delete a Context Cache.
 * x-ms-original-file: 2026-06-01/StorageContextCacheCRUD/ContextCaches_Delete.json
 */
async function deleteAContextCache(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageManagementClient(credential, subscriptionId);
  await client.contextCaches.delete("testrg", "testaccount");
}

async function main(): Promise<void> {
  await deleteAContextCache();
}

main().catch(console.error);
