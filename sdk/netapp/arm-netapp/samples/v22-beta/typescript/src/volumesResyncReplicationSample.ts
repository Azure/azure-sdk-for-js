// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to resync the connection on the destination volume. If the operation is ran on the source volume it will reverse-resync the connection and sync from destination to source.
 *
 * @summary resync the connection on the destination volume. If the operation is ran on the source volume it will reverse-resync the connection and sync from destination to source.
 * x-ms-original-file: 2025-09-01-preview/Volumes_ResyncReplication.json
 */
async function volumesResyncReplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.resyncReplication("myRG", "account1", "pool1", "volume1");
}

async function main(): Promise<void> {
  await volumesResyncReplication();
}

main().catch(console.error);
