// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to create or update a management group.
 * If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated.
 *
 * @summary create or update a management group.
 * If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated.
 * x-ms-original-file: 2023-04-01/PutManagementGroup.json
 */
async function putManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.createOrUpdate("ChildGroup", {
    displayName: "ChildGroup",
    details: { parent: { id: "/providers/Microsoft.Management/managementGroups/RootGroup" } },
  });
  console.log(result);
}

async function main() {
  await putManagementGroup();
}

main().catch(console.error);
