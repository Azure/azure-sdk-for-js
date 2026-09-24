// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get assigned deployment by GoldenGate connection.
 *
 * @summary get assigned deployment by GoldenGate connection.
 * x-ms-original-file: 2026-06-01/GoldenGateConnections_GetAssignedDeployment_MaximumSet_Gen.json
 */
async function goldenGateConnectionsGetAssignedDeploymentMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateConnections.getAssignedDeployment(
    "rgopenapi",
    "resource1",
    "assignment1",
  );
  console.log(result);
}

async function main() {
  await goldenGateConnectionsGetAssignedDeploymentMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
