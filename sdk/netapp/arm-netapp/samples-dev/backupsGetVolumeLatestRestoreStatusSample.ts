// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the latest status of the restore for a volume
 *
 * @summary get the latest status of the restore for a volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_LatestRestoreStatus.json
 */
async function volumesRestoreStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.backups.getVolumeLatestRestoreStatus(
    "myRG",
    "account1",
    "pool1",
    "volume1",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await volumesRestoreStatus();
}

main().catch(console.error);
