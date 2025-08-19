// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Delete a role management policy assignment
 *
 * @summary Delete a role management policy assignment
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-10-01-preview/examples/DeleteRoleManagementPolicyAssignment.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteRoleManagementPolicyAssignment(): Promise<void> {
  const scope =
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368";
  const roleManagementPolicyAssignmentName =
    "b959d571-f0b5-4042-88a7-01be6cb22db9_a1705bd2-3a8f-45a5-8683-466fcfd5cc24";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleManagementPolicyAssignments.delete(
    scope,
    roleManagementPolicyAssignmentName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await deleteRoleManagementPolicyAssignment();
}

main().catch(console.error);
