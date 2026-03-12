// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Track the results of an asynchronous operation on the replication protection cluster.
 *
 * @summary Track the results of an asynchronous operation on the replication protection cluster.
 * x-ms-original-file: specification/recoveryservicessiterecovery/resource-manager/Microsoft.RecoveryServices/stable/2025-01-01/examples/ReplicationProtectionClusters_GetOperationResults.json
 */

import { SiteRecoveryManagementClient } from "@azure/arm-recoveryservices-siterecovery";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function tracksTheReplicationProtectionClusterAsyncOperation(): Promise<void> {
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
  const jobId = "ea63a935-59d5-4b12-aff2-98773f63c116";
  const credential = new DefaultAzureCredential();
  const client = new SiteRecoveryManagementClient(credential, subscriptionId);
  const result = await client.replicationProtectionClusters.getOperationResults(
    resourceGroupName,
    resourceName,
    fabricName,
    protectionContainerName,
    replicationProtectionClusterName,
    jobId,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await tracksTheReplicationProtectionClusterAsyncOperation();
}

main().catch(console.error);
