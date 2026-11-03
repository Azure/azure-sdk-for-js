// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a deny assignment by ID.
 *
 * @summary gets a deny assignment by ID.
 * x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentById.json
 */
async function getDenyAssignmentByID() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.denyAssignments.getById(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/rgname/providers/Microsoft.Authorization/denyAssignments/denyAssignmentId",
  );
  console.log(result);
}

async function main() {
  await getDenyAssignmentByID();
}

main().catch(console.error);
