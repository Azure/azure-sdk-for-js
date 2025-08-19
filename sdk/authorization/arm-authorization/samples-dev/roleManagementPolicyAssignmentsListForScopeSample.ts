// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets role management assignment policies for a resource scope.
 *
 * @summary Gets role management assignment policies for a resource scope.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-10-01-preview/examples/GetRoleManagementPolicyAssignmentByScope.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getRoleManagementPolicyAssignmentByScope(): Promise<void> {
  const scope =
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleManagementPolicyAssignments.listForScope(scope)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getRoleManagementPolicyAssignmentByScope();
}

main().catch(console.error);
