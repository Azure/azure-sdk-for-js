// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a FlexComponent
 *
 * @summary get a FlexComponent
 * x-ms-original-file: 2026-06-01/FlexComponents_Get_MaximumSet_Gen.json
 */
async function flexComponentsGetMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.flexComponents.get("eastus", "resource1");
  console.log(result);
}

async function main() {
  await flexComponentsGetMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
