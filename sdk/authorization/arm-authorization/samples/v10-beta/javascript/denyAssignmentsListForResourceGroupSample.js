// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AuthorizationManagementClient } = require("@azure/arm-authorization");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets deny assignments for a resource group.
 *
 * @summary gets deny assignments for a resource group.
 * x-ms-original-file: 2024-07-01-preview/GetDenyAssignmentsForResourceGroup.json
 */
async function listDenyAssignmentsForResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "a925f2f7-5c63-4b7b-8799-25a5f97bc3b2";
  const client = new AuthorizationManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.denyAssignments.listForResourceGroup("rgname")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listDenyAssignmentsForResourceGroup();
}

main().catch(console.error);
