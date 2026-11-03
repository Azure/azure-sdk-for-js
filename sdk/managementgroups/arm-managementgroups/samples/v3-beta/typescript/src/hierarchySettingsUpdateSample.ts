// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to updates the hierarchy settings defined at the Management Group level.
 *
 * @summary updates the hierarchy settings defined at the Management Group level.
 * x-ms-original-file: 2023-04-01/PatchHierarchySettings.json
 */
async function getGroupSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.hierarchySettings.update("root", {
    defaultManagementGroup: "/providers/Microsoft.Management/managementGroups/DefaultGroup",
    requireAuthorizationForGroupCreation: true,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await getGroupSettings();
}

main().catch(console.error);
