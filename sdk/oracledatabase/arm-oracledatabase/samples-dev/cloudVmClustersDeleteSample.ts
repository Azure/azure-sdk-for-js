// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a CloudVmCluster
 *
 * @summary delete a CloudVmCluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_Delete_MaximumSet_Gen.json
 */
async function deleteVMClusterGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.cloudVmClusters.delete("rgopenapi", "cloudvmcluster1");
}

/**
 * This sample demonstrates how to delete a CloudVmCluster
 *
 * @summary delete a CloudVmCluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_Delete_MinimumSet_Gen.json
 */
async function deleteVMClusterGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.cloudVmClusters.delete("rgopenapi", "cloudvmcluster1");
}

/**
 * This sample demonstrates how to delete a CloudVmCluster
 *
 * @summary delete a CloudVmCluster
 * x-ms-original-file: 2025-09-01/vmClusters_delete.json
 */
async function cloudVmClustersDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.cloudVmClusters.delete("rg000", "cluster1");
}

async function main(): Promise<void> {
  await deleteVMClusterGeneratedByMaximumSetRule();
  await deleteVMClusterGeneratedByMinimumSetRule();
  await cloudVmClustersDelete();
}

main().catch(console.error);
