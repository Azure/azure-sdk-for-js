// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets role eligibility schedule requests for a scope.
 *
 * @summary gets role eligibility schedule requests for a scope.
 * x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleRequestByScope.json
 */
async function getRoleEligibilityScheduleRequestByScope(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleEligibilityScheduleRequests.listForScope(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    { filter: "assignedTo('A3BB8764-CB92-4276-9D2A-CA1E895E55EA')" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await getRoleEligibilityScheduleRequestByScope();
}

main().catch(console.error);
