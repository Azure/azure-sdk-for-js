// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list all role assignments that apply to a subscription.
 *
 * @summary list all role assignments that apply to a subscription.
 * x-ms-original-file: 2022-04-01/RoleAssignments_ListForSubscription.json
 */
async function listRoleAssignmentsForSubscription() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a925f2f7-5c63-4b7b-8799-25a5f97bc3b2";
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.roleAssignments.listForSubscription()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listRoleAssignmentsForSubscription();
}

main().catch(console.error);
