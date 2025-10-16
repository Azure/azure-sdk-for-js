// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

/**
 * This sample demonstrates how to Schedule a priming job to be paused.
 *
 * @summary Schedule a priming job to be paused.
 * x-ms-original-file: specification/storagecache/resource-manager/Microsoft.StorageCache/stable/2025-07-01/examples/PausePrimingJob.json
 */
async function pausePrimingJob() {
  const subscriptionId =
    process.env["STORAGECACHE_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const resourceGroupName = process.env["STORAGECACHE_RESOURCE_GROUP"] || "scgroup";
  const cacheName = "sc1";
  const primingJobId = {
    primingJobId: "00000000000_0000000000",
  };
  const options = { primingJobId };
  const credential = new DefaultAzureCredential();
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.caches.beginPausePrimingJobAndWait(
    resourceGroupName,
    cacheName,
    options,
  );
  console.log(result);
}

async function main() {
  await pausePrimingJob();
}

main().catch(console.error);
