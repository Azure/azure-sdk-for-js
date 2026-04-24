// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetches list of Cross Region Restore job belonging to the vault
 *
 * @summary fetches list of Cross Region Restore job belonging to the vault
 * x-ms-original-file: 2025-07-01/CrossRegionRestore/FetchCrossRegionRestoreJobs.json
 */
async function listCrossRegionRestoreJobs(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "62b829ee-7936-40c9-a1c9-47a93f9f3965";
  const client = new DataProtectionClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.fetchCrossRegionRestoreJobs.list(
    "BugBash1",
    "east us",
    {
      sourceBackupVaultId:
        "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourceGroups/BugBash1/providers/Microsoft.DataProtection/backupVaults/BugBashVaultForCCYv11",
      sourceRegion: "east us",
    },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listCrossRegionRestoreJobs();
}

main().catch(console.error);
