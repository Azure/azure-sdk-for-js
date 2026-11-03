// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the specified role assignment schedule for a resource scope
 *
 * @summary get the specified role assignment schedule for a resource scope
 * x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentScheduleByName.json
 */
async function getRoleAssignmentScheduleByName() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignmentSchedules.get(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    "c9e264ff-3133-4776-a81a-ebc7c33c8ec6",
  );
  console.log(result);
}

async function main() {
  await getRoleAssignmentScheduleByName();
}

main().catch(console.error);
