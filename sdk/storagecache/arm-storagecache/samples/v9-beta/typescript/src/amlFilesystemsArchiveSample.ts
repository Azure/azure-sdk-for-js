// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to archive data from the AML file system.
 *
 * @summary archive data from the AML file system.
 * x-ms-original-file: 2026-01-01/amlFilesystems_Archive.json
 */
async function amlFilesystemsArchive(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.amlFilesystems.archive("scgroup", "sc", { archiveInfo: { filesystemPath: "/" } });
}

async function main(): Promise<void> {
  await amlFilesystemsArchive();
}

main().catch(console.error);
