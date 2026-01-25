// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ExadbVmCluster
 *
 * @summary delete a ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_Delete_MaximumSet_Gen.json
 */
async function exadbVmClustersDeleteMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.exadbVmClusters.delete("rgopenapi", "exadaVmClusterName1");
}

/**
 * This sample demonstrates how to delete a ExadbVmCluster
 *
 * @summary delete a ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_Delete_MinimumSet_Gen.json
 */
async function exadbVmClustersDeleteMinimumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.exadbVmClusters.delete("rgopenapi", "exadaVmClusterName1");
}

async function main(): Promise<void> {
  await exadbVmClustersDeleteMaximumSet();
  await exadbVmClustersDeleteMinimumSet();
}

main().catch(console.error);
