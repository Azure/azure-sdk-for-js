// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a collection of user entities associated with the group.
 *
 * @summary lists a collection of user entities associated with the group.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListGroupUsers.json
 */
async function apiManagementListGroupUsers() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.groupUser.list(
    "rg1",
    "apimService1",
    "57d2ef278aa04f0888cba3f3",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListGroupUsers();
}

main().catch(console.error);
