// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to re-establish a previously deleted replication between 2 volumes that have a common ad-hoc or policy-based snapshots
 *
 * @summary re-establish a previously deleted replication between 2 volumes that have a common ad-hoc or policy-based snapshots
 * x-ms-original-file: 2025-09-01-preview/Volumes_ReestablishReplication.json
 */
async function volumesReestablishReplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.reestablishReplication("myRG", "account1", "pool1", "volume1", {
    sourceVolumeId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/mySourceRG/providers/Microsoft.NetApp/netAppAccounts/sourceAccount1/capacityPools/sourcePool1/volumes/sourceVolume1",
  });
}

async function main(): Promise<void> {
  await volumesReestablishReplication();
}

main().catch(console.error);
