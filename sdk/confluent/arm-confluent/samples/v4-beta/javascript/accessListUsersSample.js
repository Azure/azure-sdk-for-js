// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ConfluentManagementClient } = require("@azure/arm-confluent");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to organization users details
 *
 * @summary organization users details
 * x-ms-original-file: 2024-07-01/Access_UsersList.json
 */
async function accessUsersList() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listUsers("myResourceGroup", "myOrganization", {
    searchFilters: { pageSize: "10", pageToken: "asc4fts4ft" },
  });
  console.log(result);
}

async function main() {
  await accessUsersList();
}

main().catch(console.error);
