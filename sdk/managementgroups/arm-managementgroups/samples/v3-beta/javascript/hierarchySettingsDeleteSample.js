// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the hierarchy settings defined at the Management Group level.
 *
 * @summary deletes the hierarchy settings defined at the Management Group level.
 * x-ms-original-file: 2023-04-01/DeleteHierarchySettings.json
 */
async function getGroupSettings() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  await client.hierarchySettings.delete("root");
}

async function main() {
  await getGroupSettings();
}

main().catch(console.error);
