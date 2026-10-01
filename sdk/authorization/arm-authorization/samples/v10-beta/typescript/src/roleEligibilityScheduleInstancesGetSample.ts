// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the specified role eligibility schedule instance.
 *
 * @summary gets the specified role eligibility schedule instance.
 * x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleInstanceByName.json
 */
async function getRoleEligibilityScheduleInstanceByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleEligibilityScheduleInstances.get(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    "21e4b59a-0499-4fe0-a3c3-43a3055b773a",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleEligibilityScheduleInstanceByName();
}

main().catch(console.error);
