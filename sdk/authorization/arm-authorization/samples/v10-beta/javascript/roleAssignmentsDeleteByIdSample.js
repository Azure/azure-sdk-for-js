// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete a role assignment by ID.
 *
 * @summary delete a role assignment by ID.
 * x-ms-original-file: 2022-04-01/RoleAssignments_DeleteById.json
 */
async function deleteRoleAssignmentByID() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignments.deleteById(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/providers/Microsoft.Authorization/roleAssignments/b0f43c54-e787-4862-89b1-a653fa9cf747",
  );
  console.log(result);
}

async function main() {
  await deleteRoleAssignmentByID();
}

main().catch(console.error);
