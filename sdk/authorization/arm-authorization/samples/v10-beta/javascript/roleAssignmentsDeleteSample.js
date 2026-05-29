// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a role assignment by scope and name.
 *
 * @summary delete a role assignment by scope and name.
 * x-ms-original-file: 2022-04-01/RoleAssignments_Delete.json
 */
async function deleteRoleAssignment() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignments.delete(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2",
    "b0f43c54-e787-4862-89b1-a653fa9cf747",
  );
  console.log(result);
}

async function main() {
  await deleteRoleAssignment();
}

main().catch(console.error);
