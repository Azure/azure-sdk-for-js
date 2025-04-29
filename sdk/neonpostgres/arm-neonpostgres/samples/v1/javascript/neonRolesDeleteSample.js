// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a NeonRole
 *
 * @summary delete a NeonRole
 * x-ms-original-file: 2025-03-01/NeonRoles_Delete_MaximumSet_Gen.json
 */
async function neonRolesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  await client.neonRoles.delete("rgneon", "test-org", "entity-name", "entity-name", "entity-name");
}

async function main() {
  await neonRolesDeleteMaximumSet();
}

main().catch(console.error);
