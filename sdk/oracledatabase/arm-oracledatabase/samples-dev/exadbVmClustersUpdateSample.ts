// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { OracleDatabaseManagementClient } from "@azure/arm-oracledatabase";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a ExadbVmCluster
 *
 * @summary update a ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_Update_MaximumSet_Gen.json
 */
async function exadbVmClustersUpdateMaximumSet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.update("rgopenapi", "exadbvmcluster1", {
    zones: ["yd"],
    tags: { key4195: "bhfxtsousuywcolaictwfdd" },
    properties: { nodeCount: 17 },
  });
  console.log(result);
}

/**
 * This sample demonstrates how to update a ExadbVmCluster
 *
 * @summary update a ExadbVmCluster
 * x-ms-original-file: 2025-09-01/ExadbVmClusters_Update_MinimumSet_Gen.json
 */
async function exadbVmClustersUpdateMaximumSetGeneratedByMinimumSetRule(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.update("rgopenapi", "exadbvmclusterq", {});
  console.log(result);
}

async function main(): Promise<void> {
  await exadbVmClustersUpdateMaximumSet();
  await exadbVmClustersUpdateMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
