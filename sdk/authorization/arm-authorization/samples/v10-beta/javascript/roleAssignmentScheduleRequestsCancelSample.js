// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to cancels a pending role assignment schedule request.
 *
 * @summary cancels a pending role assignment schedule request.
 * x-ms-original-file: 2024-09-01-preview/CancelRoleAssignmentScheduleRequestByName.json
 */
async function cancelRoleAssignmentScheduleRequestByName() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  await client.roleAssignmentScheduleRequests.cancel(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    "fea7a502-9a96-4806-a26f-eee560e52045",
  );
}

async function main() {
  await cancelRoleAssignmentScheduleRequestByName();
}

main().catch(console.error);
