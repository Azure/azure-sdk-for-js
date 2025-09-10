// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { PostgresClient } = require("@azure/arm-neonpostgres");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a NeonRole
 *
 * @summary delete a NeonRole
 * x-ms-original-file: 2025-06-23-preview/NeonRoles_Delete_MaximumSet_Gen.json
 */
async function neonRolesDeleteMaximumSet() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "DFF26289-4E9C-46D0-890E-F8BE27BDA8C2";
  const client = new PostgresClient(credential, subscriptionId);
  await client.neonRoles.delete(
    "rgneon",
    "myOrganization",
    "myProject",
    "feature",
    "read_only_role",
  );
}

async function main() {
  await neonRolesDeleteMaximumSet();
}

main().catch(console.error);
