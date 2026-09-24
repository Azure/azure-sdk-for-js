// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a ResourceAnchor
 *
 * @summary get a ResourceAnchor
 * x-ms-original-file: 2026-06-01/ResourceAnchors_Get_MaximumSet_Gen.json
 */
async function resourceAnchorsGetMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.resourceAnchors.get("rgopenapi", "resource1");
  console.log(result);
}

async function main() {
  await resourceAnchorsGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
