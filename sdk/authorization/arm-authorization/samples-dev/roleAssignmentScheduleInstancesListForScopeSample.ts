// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { RoleAssignmentScheduleInstancesListForScopeOptionalParams } from "@azure/arm-authorization";
import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

/**
 * This sample demonstrates how to Gets role assignment schedule instances of a role assignment schedule.
 *
 * @summary Gets role assignment schedule instances of a role assignment schedule.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-10-01-preview/examples/GetRoleAssignmentScheduleInstancesByScope.json
 */
async function getRoleAssignmentScheduleInstancesByScope(): Promise<void> {
  const scope =
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f";
  const filter = "assignedTo('a3bb8764-cb92-4276-9d2a-ca1e895e55ea')";
  const options: RoleAssignmentScheduleInstancesListForScopeOptionalParams = {
    filter,
  };
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleAssignmentScheduleInstances.listForScope(scope, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getRoleAssignmentScheduleInstancesByScope();
}

main().catch(console.error);
