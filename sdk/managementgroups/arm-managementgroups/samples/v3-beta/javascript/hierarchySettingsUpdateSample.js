// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to updates the hierarchy settings defined at the Management Group level.
 *
 * @summary updates the hierarchy settings defined at the Management Group level.
 * x-ms-original-file: 2023-04-01/PatchHierarchySettings.json
 */
async function getGroupSettings() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.hierarchySettings.update("root", {
    defaultManagementGroup: "/providers/Microsoft.Management/managementGroups/DefaultGroup",
    requireAuthorizationForGroupCreation: true,
  });
  console.log(result);
}

async function main() {
  await getGroupSettings();
}

main().catch(console.error);
