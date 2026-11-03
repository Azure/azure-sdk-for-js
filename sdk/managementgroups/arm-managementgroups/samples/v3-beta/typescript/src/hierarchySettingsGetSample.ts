// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to gets the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy.
 *
 * @summary gets the hierarchy settings defined at the Management Group level. Settings can only be set on the root Management Group of the hierarchy.
 * x-ms-original-file: 2023-04-01/GetHierarchySettings.json
 */
async function getGroupSettings(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  const result = await client.hierarchySettings.get("root");
  console.log(result);
}

async function main(): Promise<void> {
  await getGroupSettings();
}

main().catch(console.error);
