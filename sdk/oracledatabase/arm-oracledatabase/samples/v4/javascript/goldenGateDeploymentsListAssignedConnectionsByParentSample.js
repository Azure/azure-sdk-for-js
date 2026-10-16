// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list assigned connections by GoldenGate deployment.
 *
 * @summary list assigned connections by GoldenGate deployment.
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_ListAssignedConnectionsByParent_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsListAssignedConnectionsByParentMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.goldenGateDeployments.listAssignedConnectionsByParent(
    "rgopenapi",
    "resource1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await goldenGateDeploymentsListAssignedConnectionsByParentMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
