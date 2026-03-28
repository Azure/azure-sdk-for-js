// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to list management groups for the authenticated user.
 *
 * @summary list management groups for the authenticated user.
 * x-ms-original-file: 2023-04-01/ListManagementGroups.json
 */
async function listManagementGroups() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const resArray = new Array();
  for await (const item of client.managementGroups.list()) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listManagementGroups();
}

main().catch(console.error);
