// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to deletes the hierarchy settings defined at the Management Group level.
 *
 * @summary deletes the hierarchy settings defined at the Management Group level.
 * x-ms-original-file: 2023-04-01/DeleteHierarchySettings.json
 */
async function getGroupSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  await client.hierarchySettings.delete("root");
}

async function main(): Promise<void> {
  await getGroupSettings();
}

main().catch(console.error);
