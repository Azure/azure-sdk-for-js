// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { StorageCacheManagementClient } from "@azure/arm-storagecache";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an expansion job instance.
 *
 * @summary update an expansion job instance.
 * x-ms-original-file: 2026-01-01/expansionJobs_Update.json
 */
async function expansionJobsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new StorageCacheManagementClient(credential, subscriptionId);
  const result = await client.expansionJobs.update("scgroup", "fs1", "expansionjob1", {
    tags: { Dept: "ContosoFinance" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await expansionJobsUpdate();
}

main().catch(console.error);
