// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to revert a volume to the snapshot specified in the body
 *
 * @summary revert a volume to the snapshot specified in the body
 * x-ms-original-file: 2025-07-01-preview/Volumes_Revert.json
 */
async function volumesRevert(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.revert("myRG", "account1", "pool1", "volume1", {
    snapshotId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRG/providers/Microsoft.NetApp/netAppAccounts/account1/capacityPools/pool1/volumes/volume1/snapshots/snapshot1",
  });
}

async function main(): Promise<void> {
  await volumesRevert();
}

main().catch(console.error);
