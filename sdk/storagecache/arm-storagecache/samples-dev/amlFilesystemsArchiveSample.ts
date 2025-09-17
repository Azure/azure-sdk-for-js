// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Archive data from the AML file system.
 *
 * @summary Archive data from the AML file system.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2024-03-01/examples/amlFilesystems_Archive.json
 */

import type {
  AmlFilesystemArchiveInfo,
  AmlFilesystemsArchiveOptionalParams,
} from "@azure/arm-storagecache";
import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function amlFilesystemsArchive(): Promise<void> {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "sc";
  const archiveInfo: AmlFilesystemArchiveInfo = { filesystemPath: "/" };
  const options: AmlFilesystemsArchiveOptionalParams = { archiveInfo };
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.amlFilesystems.archive(resourceGroupName, amlFilesystemName, options);
  console.log(result);
}

async function main(): Promise<void> {
  await amlFilesystemsArchive();
}

main().catch(console.error);
