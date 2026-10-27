// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list assigned deployments by GoldenGate connection.
 *
 * @summary list assigned deployments by GoldenGate connection.
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_ListAssignedDeploymentsByParent_MaximumSet_Gen.json
 */
async function goldenGateConnectionsListAssignedDeploymentsByParentMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.goldenGateConnections.listAssignedDeploymentsByParent(
    "rgopenapi",
    "resource1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await goldenGateConnectionsListAssignedDeploymentsByParentMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
