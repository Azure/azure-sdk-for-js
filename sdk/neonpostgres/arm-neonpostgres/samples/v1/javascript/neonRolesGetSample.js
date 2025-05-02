// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get a NeonRole
 *
 * @summary get a NeonRole
 * x-ms-original-file: 2025-03-01/NeonRoles_Get_MaximumSet_Gen.json
 */
async function neonRolesGetMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "9B8E3300-C5FA-442B-A259-3F6F614D5BD4";
  const client = new PostgresClient(credential, subscriptionId);
  const result = await client.neonRoles.get(
    "rgneon",
    "test-org",
    "entity-name",
    "entity-name",
    "entity-name",
  );
  console.log(result);
}

async function main() {
  await neonRolesGetMaximumSet();
}

main().catch(console.error);
