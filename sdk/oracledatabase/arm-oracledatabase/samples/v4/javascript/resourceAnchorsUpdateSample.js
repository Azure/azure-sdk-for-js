// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a ResourceAnchor
 *
 * @summary update a ResourceAnchor
 * x-ms-original-file: 2026-06-01/ResourceAnchors_Update_MaximumSet_Gen.json
 */
async function resourceAnchorsUpdateMaximumSetGenGeneratedByMaximumSetRule() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  const result = await client.resourceAnchors.update("rgopenapi", "resource1", {
    tags: { key7593: "example" },
  });
  console.log(result);
}

async function main() {
  await resourceAnchorsUpdateMaximumSetGenGeneratedByMaximumSetRule();
}

main().catch(console.error);
