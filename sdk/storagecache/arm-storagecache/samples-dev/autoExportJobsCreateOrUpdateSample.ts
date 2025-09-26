// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AutoExportJob,
  StorageCacheManagementClient,
} from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Create or update an auto export job.
 *
 * @summary Create or update an auto export job.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/autoExportJobs_CreateOrUpdate.json
 */
async function autoExportJobsCreateOrUpdate(): Promise<void> {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] ||
    "00000000-0000-0000-0000-000000000000";
  const resourceGroupName =
    process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const amlFilesystemName = "fs1";
  const autoExportJobName = "job1";
  const autoExportJob: AutoExportJob = {
    autoExportPrefixes: ["/"],
    location: "eastus",
    tags: { dept: "ContosoAds" },
  };
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.autoExportJobs.beginCreateOrUpdateAndWait(
    resourceGroupName,
    amlFilesystemName,
    autoExportJobName,
    autoExportJob,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await autoExportJobsCreateOrUpdate();
}

main().catch(console.error);
