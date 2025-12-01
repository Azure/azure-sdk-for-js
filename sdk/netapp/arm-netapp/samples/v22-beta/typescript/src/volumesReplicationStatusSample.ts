// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the status of the replication
 *
 * @summary get the status of the replication
 * x-ms-original-file: 2025-09-01-preview/Volumes_ReplicationStatus.json
 */
async function volumesReplicationStatus(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.replicationStatus("myRG", "account1", "pool1", "volume1");
  console.log(result);
}

async function main(): Promise<void> {
  await volumesReplicationStatus();
}

main().catch(console.error);
