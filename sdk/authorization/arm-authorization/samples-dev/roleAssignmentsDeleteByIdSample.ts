// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a role assignment by ID.
 *
 * @summary Delete a role assignment by ID.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2022-04-01/examples/RoleAssignments_DeleteById.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteRoleAssignmentById(): Promise<void> {
  const roleAssignmentId =
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/providers/Microsoft.Authorization/roleAssignments/b0f43c54-e787-4862-89b1-a653fa9cf747";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignments.deleteById(roleAssignmentId);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteRoleAssignmentById();
}

main().catch(console.error);
