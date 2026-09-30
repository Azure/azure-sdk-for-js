// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unassign a GoldenGate deployment from a connection.
 *
 * @summary unassign a GoldenGate deployment from a connection.
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_UnassignDeployment_MaximumSet_Gen.json
 */
async function goldenGateConnectionsUnassignDeploymentMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateConnections.unassignDeployment("rgopenapi", "resource1", {
    deploymentId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/resources/resource1",
  });
  console.log(result);
}

async function main() {
  await goldenGateConnectionsUnassignDeploymentMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
