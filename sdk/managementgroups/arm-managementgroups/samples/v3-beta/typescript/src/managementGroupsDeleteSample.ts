// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ManagementGroupsAPI } from "@azure/arm-managementgroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete management group.
 * If a management group contains child resources, the request will fail.
 *
 * @summary delete management group.
 * If a management group contains child resources, the request will fail.
 * x-ms-original-file: 2023-04-01/DeleteManagementGroup.json
 */
async function deleteManagementGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ManagementGroupsAPI(credential);
  await client.managementGroups.delete("GroupToDelete");
}

async function main(): Promise<void> {
  await deleteManagementGroup();
}

main().catch(console.error);
