// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches the Cross Region Restore Job
 *
 * @summary fetches the Cross Region Restore Job
 * x-ms-original-file: 2025-07-01/CrossRegionRestore/FetchCrossRegionRestoreJob.json
 */
async function getCrossRegionRestoreJob(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "62b829ee-7936-40c9-a1c9-47a93f9f3965";
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.fetchCrossRegionRestoreJob.get("BugBash1", "west us", {
    jobId: "3c60cb49-63e8-4b21-b9bd-26277b3fdfae",
    sourceBackupVaultId:
      "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourceGroups/BugBash1/providers/Microsoft.DataProtection/backupVaults/BugBashVaultForCCYv11",
    sourceRegion: "east us",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getCrossRegionRestoreJob();
}

main().catch(console.error);
