// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets the specified role assignment schedule instance.
 *
 * @summary gets the specified role assignment schedule instance.
 * x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentScheduleInstanceByName.json
 */
async function getRoleAssignmentScheduleInstanceByName() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const result = await client.roleAssignmentScheduleInstances.get(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    "ed9b8180-cef7-4c77-a63c-b8566ecfc412",
  );
  console.log(result);
}

async function main() {
  await getRoleAssignmentScheduleInstanceByName();
}

main().catch(console.error);
