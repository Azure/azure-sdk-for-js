// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ExadbVmCluster
 *
 * @summary delete a ExadbVmCluster
 * x-ms-original-file: 2026-06-01/ExadbVmClusters_Delete_MaximumSet_Gen.json
 */
async function exadbVmClustersDeleteMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.exadbVmClusters.delete("rgopenapi", "resource1");
}

async function main() {
  await exadbVmClustersDeleteMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
