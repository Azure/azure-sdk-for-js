// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get a ExadbVmCluster
 *
 * @summary get a ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_Get_MaximumSet_Gen.json
 */
async function exadbVmClustersGetMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.get("rgopenapi", "exadbVmClusterName1");
  console.log(result);
}

/**
 * This sample demonstrates how to get a ExadbVmCluster
 *
 * @summary get a ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_Get_MinimumSet_Gen.json
 */
async function exadbVmClustersGetMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.get("rgopenapi", "exadbVmClusterName1*");
  console.log(result);
}

async function main(): Promise<void> {
  await exadbVmClustersGetMaximumSet();
  await exadbVmClustersGetMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
