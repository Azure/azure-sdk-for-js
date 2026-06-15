// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified role eligibility schedule request.
 *
 * @summary get the specified role eligibility schedule request.
 * x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleRequestByName.json
 */
async function getRoleEligibilityScheduleRequestByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleEligibilityScheduleRequests.get(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    "64caffb6-55c0-4deb-a585-68e948ea1ad6",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleEligibilityScheduleRequestByName();
}

main().catch(console.error);
