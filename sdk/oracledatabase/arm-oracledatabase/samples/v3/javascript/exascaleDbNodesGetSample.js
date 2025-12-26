// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ExascaleDbNode
 *
 * @summary get a ExascaleDbNode
 * x-ms-original-file: 2025-09-01/ExascaleDbNodes_Get_MaximumSet_Gen.json
 */
async function exascaleDbNodesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbNodes.get(
    "rgopenapi",
    "exadbvmcluster1",
    "exascaledbnode1",
  );
  console.log(result);
}

/**
 * This sample demonstrates how to get a ExascaleDbNode
 *
 * @summary get a ExascaleDbNode
 * x-ms-original-file: 2025-09-01/ExascaleDbNodes_Get_MinimumSet_Gen.json
 */
async function exascaleDbNodesGetMaximumSetGeneratedByMinimumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbNodes.get("rgopenapi", "vmcluster", "exascaledbnode1");
  console.log(result);
}

async function main() {
  await exascaleDbNodesGetMaximumSet();
  await exascaleDbNodesGetMaximumSetGeneratedByMinimumSetRule();
}

main().catch(console.error);
