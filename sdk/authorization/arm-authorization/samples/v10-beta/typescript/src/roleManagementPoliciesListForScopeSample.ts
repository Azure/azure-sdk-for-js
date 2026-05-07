// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets role management policies for a resource scope.
 *
 * @summary gets role management policies for a resource scope.
 * x-ms-original-file: 2024-09-01-preview/GetRoleManagementPolicyByScope.json
 */
async function getRoleManagementPolicyByRoleDefinitionFilter(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleManagementPolicies.listForScope(
    "providers/Microsoft.Subscription/subscriptions/129ff972-28f8-46b8-a726-e497be039368",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getRoleManagementPolicyByRoleDefinitionFilter();
}

main().catch(console.error);
