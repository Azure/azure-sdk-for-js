// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to vM actions on DbNode of ExadbVmCluster by the provided filter
 *
 * @summary vM actions on DbNode of ExadbVmCluster by the provided filter
 * x-ms-original-file: 2025-09-01/ExascaleDbNodes_Action_MaximumSet_Gen.json
 */
async function exascaleDbNodesActionMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbNodes.action(
    "rgopenapi",
    "exadbvmcluster1",
    "exascaledbnode1",
    { action: "Start" },
  );
  console.log(result);
}

/**
 * This sample demonstrates how to vM actions on DbNode of ExadbVmCluster by the provided filter
 *
 * @summary vM actions on DbNode of ExadbVmCluster by the provided filter
 * x-ms-original-file: 2025-09-01/ExascaleDbNodes_Action_MinimumSet_Gen.json
 */
async function exascaleDbNodesActionMinimumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.exascaleDbNodes.action(
    "rgopenapi",
    "exadbvmcluster1",
    "exascaledbnode1",
    { action: "Start" },
  );
  console.log(result);
}

async function main() {
  await exascaleDbNodesActionMaximumSet();
  await exascaleDbNodesActionMinimumSet();
}

main().catch(console.error);
