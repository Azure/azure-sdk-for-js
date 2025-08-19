// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to The operation to purge the replication protection cluster. This operation will force delete the replication protection cluster. Use the remove operation on replication protection cluster to perform a clean disable replication protection cluster.
 *
 * @summary The operation to purge the replication protection cluster. This operation will force delete the replication protection cluster. Use the remove operation on replication protection cluster to perform a clean disable replication protection cluster.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectionClusters_Purge.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function purgeTheReplicationProtectionCluster(): Promise<void> {
  const subscriptionId =
    process.env["RECOVERYSERVICESSITERECOVERY_SUBSCRIPTION_ID"] ||
    "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const resourceGroupName =
    process.env["RECOVERYSERVICESSITERECOVERY_RESOURCE_GROUP"] ||
    "resourceGroupPS1";
  const resourceName = "vault1";
  const fabricName = "eastus";
  const protectionContainerName = "eastus-container";
  const replicationProtectionClusterName = "cluster1";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionClusters.beginPurgeAndWait(
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    replicationProtectionClusterName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await purgeTheReplicationProtectionCluster();
}

main().catch(console.error);
