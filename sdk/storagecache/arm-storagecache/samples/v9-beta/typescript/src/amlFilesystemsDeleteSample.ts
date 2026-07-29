// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to schedules an AML file system for deletion.
 *
 * @summary schedules an AML file system for deletion.
 * x-ms-original-file: 2026-01-01/amlFilesystems_Delete.json
 */
async function amlFilesystemsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.amlFilesystems.delete("scgroup", "fs1");
}

async function main(): Promise<void> {
  await amlFilesystemsDelete();
}

main().catch(console.error);
