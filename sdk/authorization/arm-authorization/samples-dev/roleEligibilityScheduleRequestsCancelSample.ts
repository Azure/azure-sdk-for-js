// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to cancels a pending role eligibility schedule request.
 *
 * @summary cancels a pending role eligibility schedule request.
 * x-ms-original-file: 2024-09-01-preview/CancelRoleEligibilityScheduleRequestByName.json
 */
async function cancelRoleEligibilityScheduleRequestByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.roleEligibilityScheduleRequests.cancel(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    "64caffb6-55c0-4deb-a585-68e948ea1ad6",
  );
}

async function main(): Promise<void> {
  await cancelRoleEligibilityScheduleRequestByName();
}

main().catch(console.error);
