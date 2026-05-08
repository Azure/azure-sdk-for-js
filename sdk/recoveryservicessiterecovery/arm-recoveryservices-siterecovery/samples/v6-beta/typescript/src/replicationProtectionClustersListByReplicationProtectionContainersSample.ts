// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the list of ASR replication protected clusters in the protection container.
 *
 * @summary gets the list of ASR replication protected clusters in the protection container.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionClusters_ListByReplicationProtectionContainers.json
 */
async function getsTheListOfReplicationProtectionClustersInFabricContainer(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.replicationProtectionClusters.listByReplicationProtectionContainers(
    "resourceGroupPS1",
    "vault1",
    "eastus",
    "eastus-container",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getsTheListOfReplicationProtectionClustersInFabricContainer();
}

main().catch(console.error);
