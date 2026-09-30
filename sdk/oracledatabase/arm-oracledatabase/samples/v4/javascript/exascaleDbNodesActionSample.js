// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to vM actions on DbNode of ExadbVmCluster by the provided filter
 *
 * @summary vM actions on DbNode of ExadbVmCluster by the provided filter
 * x-ms-original-file: 2026-06-01/ExascaleDbNodes_Action_MaximumSet_Gen.json
 */
async function exascaleDbNodesActionMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbNodes.action("rgopenapi", "resource1", "resource1", {
    action: "Start",
  });
  console.log(result);
}

async function main() {
  await exascaleDbNodesActionMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
