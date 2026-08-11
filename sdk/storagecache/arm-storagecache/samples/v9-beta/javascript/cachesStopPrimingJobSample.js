// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { StorageCacheManagementClient } = require("@azure/arm-storagecache");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to schedule a priming job for deletion.
 *
 * @summary schedule a priming job for deletion.
 * x-ms-original-file: 2026-01-01/StopPrimingJob.json
 */
async function stopPrimingJob() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.stopPrimingJob("scgroup", "sc1", {
    primingJobId: { primingJobId: "00000000000_0000000000" },
  });
}

async function main() {
  await stopPrimingJob();
}

main().catch(console.error);
