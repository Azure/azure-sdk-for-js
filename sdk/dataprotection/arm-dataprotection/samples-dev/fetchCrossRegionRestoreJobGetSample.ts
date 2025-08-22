// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Fetches the Cross Region Restore Job
 *
 * @summary Fetches the Cross Region Restore Job
 * x-ms-original-file: specification/dataprotection/resource-manager/Microsoft.DataProtection/stable/2025-07-01/examples/CrossRegionRestore/FetchCrossRegionRestoreJob.json
 */

import type { CrossRegionRestoreJobRequest } from "@azure/arm-dataprotection";
import { DataProtectionClient } from "@azure/arm-dataprotection";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getCrossRegionRestoreJob(): Promise<void> {
  const subscriptionId =
    process.env["DATAPROTECTION_SUBSCRIPTION_ID"] ||
    "62b829ee-7936-40c9-a1c9-47a93f9f3965";
  const resourceGroupName =
    process.env["DATAPROTECTION_RESOURCE_GROUP"] || "BugBash1";
  const location = "west us";
  const parameters: CrossRegionRestoreJobRequest = {
    jobId: "3c60cb49-63e8-4b21-b9bd-26277b3fdfae",
    sourceBackupVaultId:
      "/subscriptions/62b829ee-7936-40c9-a1c9-47a93f9f3965/resourceGroups/BugBash1/providers/Microsoft.DataProtection/backupVaults/BugBashVaultForCCYv11",
    sourceRegion: "east us",
  };
  const credential = new DefaultAzureCredential();
  const client = new DataProtectionClient(credential, subscriptionId);
  const result = await client.fetchCrossRegionRestoreJob.get(
    resourceGroupName,
    location,
    parameters,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getCrossRegionRestoreJob();
}

main().catch(console.error);
