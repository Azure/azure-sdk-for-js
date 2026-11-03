// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets role eligibility schedule instances of a role eligibility schedule.
 *
 * @summary gets role eligibility schedule instances of a role eligibility schedule.
 * x-ms-original-file: 2024-09-01-preview/GetRoleEligibilityScheduleInstancesByScope.json
 */
async function getRoleEligibilityScheduleInstancesByScope() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.roleEligibilityScheduleInstances.listForScope(
    "providers/Microsoft.Subscription/subscriptions/dfa2a084-766f-4003-8ae1-c4aeb893a99f",
    { filter: "assignedTo('a3bb8764-cb92-4276-9d2a-ca1e895e55ea')" },
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await getRoleEligibilityScheduleInstancesByScope();
}

main().catch(console.error);
