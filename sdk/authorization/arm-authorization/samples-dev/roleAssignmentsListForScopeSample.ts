// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to list all role assignments that apply to a scope.
 *
 * @summary list all role assignments that apply to a scope.
 * x-ms-original-file: 2022-04-01/RoleAssignments_ListForScope.json
 */
async function listRoleAssignmentsForScope(): Promise<void> {
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

async function main(): Promise<void> {
  await listRoleAssignmentsForScope();
}

main().catch(console.error);
