// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets role management assignment policies for a resource scope.
 *
 * @summary gets role management assignment policies for a resource scope.
 * x-ms-original-file: 2024-09-01-preview/GetRoleManagementPolicyAssignmentByScope.json
 */
async function getRoleManagementPolicyAssignmentByScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleManagementPolicyAssignments.listForScope(
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getRoleManagementPolicyAssignmentByScope();
}

main().catch(console.error);
