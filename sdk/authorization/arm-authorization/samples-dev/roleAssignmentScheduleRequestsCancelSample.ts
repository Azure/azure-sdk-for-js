// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to Cancels a pending role assignment schedule request.
 *
 * @summary Cancels a pending role assignment schedule request.
 * x-ms-original-file: specification/authorization/resource-manager/Microsoft.Authorization/preview/2022-04-01-preview/examples/CancelRoleAssignmentScheduleRequestByName.json
 */

import { AuthorizationManagementClient } from "@azure/arm-authorization";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

async function cancelRoleAssignmentScheduleRequestByName(): Promise<void> {
  const scope =
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f";
  const roleAssignmentScheduleRequestName = "fea7a502-9a96-4806-a26f-eee560e52045";
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignmentScheduleRequests.cancel(
    scope,
    roleAssignmentScheduleRequestName,
  );
  console.log(result);
}

async function main(): Promise<void> {
  await cancelRoleAssignmentScheduleRequestByName();
}

main().catch(console.error);
