// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to re-Initializes the replication connection on the destination volume
 *
 * @summary re-Initializes the replication connection on the destination volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_ReInitializeReplication.json
 */
async function volumesReInitializeReplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.reInitializeReplication("myRG", "account1", "pool1", "volume1");
}

async function main(): Promise<void> {
  await volumesReInitializeReplication();
}

main().catch(console.error);
