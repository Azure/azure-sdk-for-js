// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the specified role assignment schedule request.
 *
 * @summary get the specified role assignment schedule request.
 * x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentScheduleRequestByName.json
 */
async function getRoleAssignmentScheduleRequestByName(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignmentScheduleRequests.get(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    "fea7a502-9a96-4806-a26f-eee560e52045",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await getRoleAssignmentScheduleRequestByName();
}

main().catch(console.error);
