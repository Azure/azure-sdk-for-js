// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or update a management group.
 * If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated.
 *
 * @summary create or update a management group.
 * If a management group is already created and a subsequent create request is issued with different properties, the management group properties will be updated.
 * x-ms-original-file: 2023-04-01/PutManagementGroup.json
 */
async function putManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.managementGroups.createOrUpdate("ChildGroup", {
    displayName: "ChildGroup",
    details: { parent: { id: "/providers/Microsoft.Management/managementGroups/RootGroup" } },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await putManagementGroup();
}

main().catch(console.error);
