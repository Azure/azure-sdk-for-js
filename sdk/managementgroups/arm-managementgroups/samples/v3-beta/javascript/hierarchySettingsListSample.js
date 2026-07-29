// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy.
 *
 * @summary gets all the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy.
 * x-ms-original-file: 2023-04-01/ListHierarchySettings.json
 */
async function listGroupSettings() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.hierarchySettings.list("root");
  console.log(result);
}

async function main() {
  await listGroupSettings();
}

main().catch(console.error);
