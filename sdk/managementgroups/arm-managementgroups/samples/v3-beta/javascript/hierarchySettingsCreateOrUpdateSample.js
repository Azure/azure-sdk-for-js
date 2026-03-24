// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or updates the hierarchy settings defined at the Management Group level.
 *
 * @summary creates or updates the hierarchy settings defined at the Management Group level.
 * x-ms-original-file: 2023-04-01/PutHierarchySettings.json
 */
async function getGroupSettings() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.hierarchySettings.createOrUpdate("root", {
    defaultManagementGroup: "/providers/Microsoft.Management/managementGroups/DefaultGroup",
    requireAuthorizationForGroupCreation: true,
  });
  console.log(result);
}

async function main() {
  await getGroupSettings();
}

main().catch(console.error);
