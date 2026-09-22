// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets deny assignments for a scope.
 *
 * @summary gets deny assignments for a scope.
 * x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentByScope.json
 */
async function listDenyAssignmentsForScope() {
  const credential = new DefaultAzureCredential();
  const client = new AuthorizationManagementClient(credential);
  const resArray = new Array();
  for await (const item of client.denyAssignments.listForScope(
    "subscriptions/a925f2f7-5c63-4b7b-8799-25a5f97bc3b2/resourceGroups/rgname",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDenyAssignmentsForScope();
}

main().catch(console.error);
