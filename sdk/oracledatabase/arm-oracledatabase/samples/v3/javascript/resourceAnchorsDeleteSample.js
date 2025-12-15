// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a ResourceAnchor
 *
 * @summary delete a ResourceAnchor
 * x-ms-original-file: 2025-09-01/ResourceAnchors_Delete_MaximumSet_Gen.json
 */
async function resourceAnchorsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.resourceAnchors.delete("rgopenapi", "resourceanchor1");
}

async function main() {
  await resourceAnchorsDeleteMaximumSet();
}

main().catch(console.error);
