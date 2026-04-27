// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { SiteRecoveryManagementClient } = require("@azure/arm-recoveryservices-siterecovery");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to purge the replication protection cluster. This operation will force delete the replication protection cluster. Use the remove operation on replication protection cluster to perform a clean disable replication protection cluster.
 *
 * @summary the operation to purge the replication protection cluster. This operation will force delete the replication protection cluster. Use the remove operation on replication protection cluster to perform a clean disable replication protection cluster.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionClusters_Purge.json
 */
async function purgeTheReplicationProtectionCluster() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  await client.replicationProtectionClusters.purge(
    "resourceGroupPS1",
    "vault1",
    "eastus",
    "eastus-container",
    "cluster1",
  );
}

async function main() {
  await purgeTheReplicationProtectionCluster();
}

main().catch(console.error);
