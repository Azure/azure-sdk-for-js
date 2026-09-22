// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get the details of the management group.
 *
 * @summary get the details of the management group.
 * x-ms-original-file: 2023-04-01/GetManagementGroup.json
 */
async function getManagementGroup(): Promise<void> {
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
async function getManagementGroupWithAncestors(): Promise<void> {
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
async function getManagementGroupWithExpand(): Promise<void> {
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
async function getManagementGroupsWithExpandAndRecurse(): Promise<void> {
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
async function getManagementGroupWithPath(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.get("20000000-0001-0000-0000-000000000000", {
    expand: "path",
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getManagementGroup();
  await getManagementGroupWithAncestors();
  await getManagementGroupWithExpand();
  await getManagementGroupsWithExpandAndRecurse();
  await getManagementGroupWithPath();
}

main().catch(console.error);
