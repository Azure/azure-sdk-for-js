// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a role management policy assignment
 *
 * @summary delete a role management policy assignment
 * x-ms-original-file: 2024-09-01-preview/DeleteRoleManagementPolicyAssignment.json
 */
async function deleteRoleManagementPolicyAssignment(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.roleManagementPolicyAssignments.delete(
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368",
    "b959d571-f0b5-4042-88a7-01be6cb22db9_a1705bd2-3a8f-45a5-8683-466fcfd5cc24",
  );
}

async function main(): Promise<void> {
  await deleteRoleManagementPolicyAssignment();
}

main().catch(console.error);
