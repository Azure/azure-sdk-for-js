// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a CloudVmCluster
 *
 * @summary delete a CloudVmCluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_Delete_MaximumSet_Gen.json
 */
async function deleteVMClusterGeneratedByMaximumSetRule() {
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
async function deleteVMClusterGeneratedByMinimumSetRule() {
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
async function cloudVmClustersDelete() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.cloudVmClusters.delete("rg000", "cluster1");
}

async function main() {
  await deleteVMClusterGeneratedByMaximumSetRule();
  await deleteVMClusterGeneratedByMinimumSetRule();
  await cloudVmClustersDelete();
}

main().catch(console.error);
