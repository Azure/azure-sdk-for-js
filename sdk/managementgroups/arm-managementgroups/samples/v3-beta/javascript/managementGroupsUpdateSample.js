// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update a management group.
 *
 * @summary update a management group.
 * x-ms-original-file: 2023-04-01/PatchManagementGroup.json
 */
async function patchManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.update("ChildGroup", {
    displayName: "AlternateDisplayName",
    parentGroupId: "/providers/Microsoft.Management/managementGroups/AlternateRootGroup",
  });
  console.log(result);
}

async function main() {
  await patchManagementGroup();
}

main().catch(console.error);
