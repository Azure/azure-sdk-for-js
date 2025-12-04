// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { NetAppManagementClient } from "@azure/arm-netapp";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to starts peering the external cluster for this migration volume
 *
 * @summary starts peering the external cluster for this migration volume
 * x-ms-original-file: 2025-09-01-preview/Volumes_PeerExternalCluster.json
 */
async function volumesPeerExternalCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new NetAppManagementClient(credential, subscriptionId);
  const result = await client.volumes.peerExternalCluster("myRG", "account1", "pool1", "volume1", {
    peerIpAddresses: ["0.0.0.1", "0.0.0.2", "0.0.0.3", "0.0.0.4", "0.0.0.5", "0.0.0.6"],
  });
  console.log(result);
}

async function main(): Promise<void> {
  await volumesPeerExternalCluster();
}

main().catch(console.error);
