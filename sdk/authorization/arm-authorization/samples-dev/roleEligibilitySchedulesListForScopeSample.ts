// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Gets role eligibility schedules for a resource scope.
 *
 * @summary Gets role eligibility schedules for a resource scope.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2020-10-01-preview/examples/GetRoleEligibilitySchedulesByScope.json
 */

import type { RoleEligibilitySchedulesListForScopeOptionalParams } from "@azure/arm-authorization";
import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function getRoleEligibilitySchedulesByScope(): Promise<void> {
  const scope =
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f";
  const filter = "assignedTo('a3bb8764-cb92-4276-9d2a-ca1e895e55ea')";
  const options: RoleEligibilitySchedulesListForScopeOptionalParams = {
    filter,
  };
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleEligibilitySchedules.listForScope(scope, options)) {
    resArray.push(item);
  }
  console.log(resArray);
}

async function main(): Promise<void> {
  await getRoleEligibilitySchedulesByScope();
}

main().catch(console.error);
