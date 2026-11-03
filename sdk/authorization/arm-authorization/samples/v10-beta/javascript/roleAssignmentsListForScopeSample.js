// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all role assignments that apply to a scope.
 *
 * @summary list all role assignments that apply to a scope.
 * x-ms-original-file: 2022-04-01/RoleAssignments_ListForScope.json
 */
async function listRoleAssignmentsForScope() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleAssignments.listForScope(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRoleAssignmentsForScope();
}

main().catch(console.error);
