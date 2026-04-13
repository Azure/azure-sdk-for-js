// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified role eligibility schedule for a resource scope
 *
 * @summary get the specified role eligibility schedule for a resource scope
 * x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleByName.json
 */
async function getRoleEligibilityScheduleByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleEligibilitySchedules.get(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    "b1477448-2cc6-4ceb-93b4-54a202a89413",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleEligibilityScheduleByName();
}

main().catch(console.error);
