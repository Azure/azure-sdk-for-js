// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to unassign a GoldenGate connection from a deployment.
 *
 * @summary unassign a GoldenGate connection from a deployment.
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_UnassignConnection_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsUnassignConnectionMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateDeployments.unassignConnection("rgopenapi", "resource1", {
    connectionId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/resources/resource1",
  });
  console.log(result);
}

async function main() {
  await goldenGateDeploymentsUnassignConnectionMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
