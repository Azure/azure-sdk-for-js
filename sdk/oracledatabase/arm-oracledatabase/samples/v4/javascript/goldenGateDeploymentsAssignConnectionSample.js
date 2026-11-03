// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to assign a GoldenGate connection to a deployment.
 *
 * @summary assign a GoldenGate connection to a deployment.
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_AssignConnection_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsAssignConnectionMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateDeployments.assignConnection("rgopenapi", "resource1", {
    connectionId:
      "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg000/providers/Oracle.Database/resources/resource1",
  });
  console.log(result);
}

async function main() {
  await goldenGateDeploymentsAssignConnectionMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
