// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified deny assignment.
 *
 * @summary get the specified deny assignment.
 * x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentByNameId.json
 */
async function getDenyAssignmentByName() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.denyAssignments.get(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/rgname",
    "denyAssignmentId",
  );
  console.log(result);
}

async function main() {
  await getDenyAssignmentByName();
}

main().catch(console.error);
