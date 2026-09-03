// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets role management policies for a resource scope.
 *
 * @summary gets role management policies for a resource scope.
 * x-ms-original-file: 2024-09-01-preview/GetRoleManagementPolicyByScope.json
 */
async function getRoleManagementPolicyByRoleDefinitionFilter() {
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

async function main() {
  await getRoleManagementPolicyByRoleDefinitionFilter();
}

main().catch(console.error);
