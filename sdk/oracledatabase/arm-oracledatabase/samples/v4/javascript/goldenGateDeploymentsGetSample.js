// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a GoldenGateDeployment
 *
 * @summary get a GoldenGateDeployment
 * x-ms-original-file: 2026-06-01/GoldenGateDeployments_Get_MaximumSet_Gen.json
 */
async function goldenGateDeploymentsGetMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.goldenGateDeployments.get("rgopenapi", "resource1");
  console.log(result);
}

async function main() {
  await goldenGateDeploymentsGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
