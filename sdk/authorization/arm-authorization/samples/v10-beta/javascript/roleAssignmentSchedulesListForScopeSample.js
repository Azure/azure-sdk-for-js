// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets role assignment schedules for a resource scope.
 *
 * @summary gets role assignment schedules for a resource scope.
 * x-ms-original-file: 2024-09-01-preview/GetRoleAssignmentSchedulesByScope.json
 */
async function getRoleAssignmentSchedulesByScope() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleAssignmentSchedules.listForScope(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    { filter: "assignedTo('a3bb8764-cb92-4276-9d2a-ca1e895e55ea')" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getRoleAssignmentSchedulesByScope();
}

main().catch(console.error);
