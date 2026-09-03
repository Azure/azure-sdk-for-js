// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to repair replication protection cluster.
 *
 * @summary the operation to repair replication protection cluster.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionClusters_RepairReplication.json
 */
async function resynchronizeOrRepairReplicationOfProtectionCluster(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionClusters.repairReplication(
    "resourceGroupPS1",
    "vault1",
    "eastus",
    "eastus-container",
    "cluster12",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await resynchronizeOrRepairReplicationOfProtectionCluster();
}

main().catch(console.error);
