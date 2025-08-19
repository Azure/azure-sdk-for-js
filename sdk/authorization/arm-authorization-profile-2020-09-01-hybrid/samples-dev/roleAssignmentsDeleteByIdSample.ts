// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Deletes a role assignment.
 *
 * @summary Deletes a role assignment.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/DeleteRoleAssignmentById.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function deleteRoleAssignmentById(): Promise<void> {
  const subscriptionId =
    process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const roleAssignmentId = "roleAssignmentId";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const result = await client.roleAssignments.deleteById(roleAssignmentId);
  console.log(result);
}

async function main(): Promise<void> {
  await deleteRoleAssignmentById();
}

main().catch(console.error);
