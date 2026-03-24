// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ManagementGroupsAPI } = require("@azure/arm-managementgroups");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to get the details of the management group.
 *
 * @summary get the details of the management group.
 * x-ms-original-file: 2023-04-01/GetManagementGroup.json
 */
async function getManagementGroup() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get("20000000-0001-0000-0000-000000000000");
  console.log(result);
}

/**
 * This sample demonstrates how to get the details of the management group.
 *
 * @summary get the details of the management group.
 * x-ms-original-file: 2023-04-01/GetManagementGroupWithAncestors.json
 */
async function getManagementGroupWithAncestors() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get("20000000-0001-0000-0000-00000000000", {
    expand: "ancestors",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get the details of the management group.
 *
 * @summary get the details of the management group.
 * x-ms-original-file: 2023-04-01/GetManagementGroupWithExpand.json
 */
async function getManagementGroupWithExpand() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get("20000000-0001-0000-0000-000000000000", {
    expand: "children",
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get the details of the management group.
 *
 * @summary get the details of the management group.
 * x-ms-original-file: 2023-04-01/GetManagementGroupWithExpandAndRecurse.json
 */
async function getManagementGroupsWithExpandAndRecurse() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get("20000000-0001-0000-0000-000000000000", {
    expand: "children",
    recurse: true,
  });
  console.log(result);
}

/**
 * This sample demonstrates how to get the details of the management group.
 *
 * @summary get the details of the management group.
 * x-ms-original-file: 2023-04-01/GetManagementGroupWithPath.json
 */
async function getManagementGroupWithPath() {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get("20000000-0001-0000-0000-000000000000", {
    expand: "path",
  });
  console.log(result);
}

async function main() {
  await getManagementGroup();
  await getManagementGroupWithAncestors();
  await getManagementGroupWithExpand();
  await getManagementGroupsWithExpandAndRecurse();
  await getManagementGroupWithPath();
}

main().catch(console.error);
