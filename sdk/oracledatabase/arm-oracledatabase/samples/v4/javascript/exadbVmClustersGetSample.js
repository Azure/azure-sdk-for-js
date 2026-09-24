// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ExadbVmCluster
 *
 * @summary get a ExadbVmCluster
 * x-ms-original-file: 2026-06-01/ExadbVmClusters_Get_MaximumSet_Gen.json
 */
async function exadbVmClustersGetMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exadbVmClusters.get("rgopenapi", "resource1");
  console.log(result);
}

async function main() {
  await exadbVmClustersGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
