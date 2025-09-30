// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AutoImportJobUpdate,
  StorageCacheManagementClient,
} from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Update an auto import job instance.
 *
 * @summary Update an auto import job instance.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/autoImportJobs_Update.json
 */
async function autoImportJobsUpdate(): Promise<void> {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "fs1";
  const autoImportJobName = "autojob1";
  const autoImportJob: AutoImportJobUpdate = { adminStatus: "Disable" };
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.autoImportJobs.beginUpdateAndWait(
    resourceGroupName,
    amlFilesystemName,
    autoImportJobName,
    autoImportJob,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await autoImportJobsUpdate();
}

main().catch(console.error);
