// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to schedule a priming job to be paused.
 *
 * @summary schedule a priming job to be paused.
 * x-ms-original-file: 2026-01-01/PausePrimingJob.json
 */
async function pausePrimingJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.pausePrimingJob("scgroup", "sc1", {
    primingJobId: { primingJobId: "00000000000_0000000000" },
  });
}

async function main() {
  await pausePrimingJob();
}

main().catch(console.error);
