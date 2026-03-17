// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to track the results of an asynchronous operation on the replication protection cluster.
 *
 * @summary track the results of an asynchronous operation on the replication protection cluster.
 * x-ms-original-file: 2025-08-01/ReplicationProtectionClusters_GetOperationResults.json
 */
async function tracksTheReplicationProtectionClusterAsyncOperation(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "c183865e-6077-46f2-a3b1-deb0f4f4650a";
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionClusters.getOperationResults(
    "resourceGroupPS1",
    "vault1",
    "eastus",
    "eastus-container",
    "cluster1",
    "ea63a935-59d5-4b12-aff2-98773f63c116",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tracksTheReplicationProtectionClusterAsyncOperation();
}

main().catch(console.error);
