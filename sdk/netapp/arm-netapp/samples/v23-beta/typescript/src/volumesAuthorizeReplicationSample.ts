// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to authorize the replication connection on the source volume
 *
 * @summary authorize the replication connection on the source volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_AuthorizeReplication.json
 */
async function volumesAuthorizeReplication(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  await client.volumes.authorizeReplication("myRG", "account1", "pool1", "volume1", {
    remoteVolumeResourceId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/myRemoteRG/providers/Microsoft.NetApp/netAppAccounts/remoteAccount1/capacityPools/remotePool1/volumes/remoteVolume1",
  });
}

async function main(): Promise<void> {
  await volumesAuthorizeReplication();
}

main().catch(console.error);
