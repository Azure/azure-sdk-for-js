// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resumes a paused priming job.
 *
 * @summary resumes a paused priming job.
 * x-ms-original-file: 2026-01-01/ResumePrimingJob.json
 */
async function resumePrimingJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  await client.caches.resumePrimingJob("scgroup", "sc1", {
    primingJobId: { primingJobId: "00000000000_0000000000" },
  });
}

async function main(): Promise<void> {
  await resumePrimingJob();
}

main().catch(console.error);
