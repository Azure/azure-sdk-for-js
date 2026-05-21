// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets role eligibility schedules for a resource scope.
 *
 * @summary gets role eligibility schedules for a resource scope.
 * x-ms-original-file: 2024-09-01-preview/GetRoleEligibilitySchedulesByScope.json
 */
async function getRoleEligibilitySchedulesByScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleEligibilitySchedules.listForScope(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    { filter: "assignedTo('a3bb8764-cb92-4276-9d2a-ca1e895e55ea')" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getRoleEligibilitySchedulesByScope();
}

main().catch(console.error);
