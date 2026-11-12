// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a ExadbVmCluster
 *
 * @summary update a ExadbVmCluster
 * x-ms-original-file: 2026-06-01/ExadbVmClusters_Update_MaximumSet_Gen.json
 */
async function exadbVmClustersUpdateMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.update("rgopenapi", "resource1", {
    zones: ["example"],
    tags: { key1801: "example" },
    properties: { nodeCount: 12 },
  });
  console.log(result);
}

async function main() {
  await exadbVmClustersUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
