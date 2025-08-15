// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization-profile-2020-09-01-hybrid";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Get the specified role assignment.
 *
 * @summary Get the specified role assignment.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/stable/2015-07-01/examples/GetRoleAssignmentByName.json
 */
async function getRoleAssignmentByName(): Promise<void> {
  const subscriptionId =
    process.env["AUTHORIZATION_SUBSCRIPTION_ID"] || "00000000-0000-0000-0000-000000000000";
  const scope = "scope";
  const roleAssignmentName = "roleAssignmentName";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const result = await client.roleAssignments.get(scope, roleAssignmentName);
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleAssignmentByName();
}

main().catch(console.error);
