// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a CloudVmCluster
 *
 * @summary get a CloudVmCluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_Get_MaximumSet_Gen.json
 */
async function getVMClusterGeneratedByMaximumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.get("rgopenapi", "cloudvmcluster1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a CloudVmCluster
 *
 * @summary get a CloudVmCluster
 * x-ms-original-file: 2025-09-01/CloudVmClusters_Get_MinimumSet_Gen.json
 */
async function getVMClusterGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.get("rgopenapi", "cloudvmcluster1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a CloudVmCluster
 *
 * @summary get a CloudVmCluster
 * x-ms-original-file: 2025-09-01/vmClusters_get.json
 */
async function cloudVmClustersGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.cloudVmClusters.get("rg000", "cluster1");
  console.log(result);
}

async function main(): Promise<void> {
  await getVMClusterGeneratedByMaximumSetRule();
  await getVMClusterGeneratedByMinimumSetRule();
  await cloudVmClustersGet();
}

main().catch(console.error);
