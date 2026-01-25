// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { OracleDatabaseManagementClient } = require("@azure/arm-oracledatabase");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a NetworkAnchor
 *
 * @summary delete a NetworkAnchor
 * x-ms-original-file: 2025-09-01/NetworkAnchors_Delete_MaximumSet_Gen.json
 */
async function networkAnchorsDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new OracleDatabaseManagementClient(credential, subscriptionId);
  await client.networkAnchors.delete("rgopenapi", "networkAnchor1");
}

async function main() {
  await networkAnchorsDeleteMaximumSet();
}

main().catch(console.error);
