// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ServiceGroupsManagementClient } from "@azure/arm-servicegroups";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete a ServiceGroup
 *
 * @summary delete a ServiceGroup
 * x-ms-original-file: 2024-02-01-preview/ServiceGroup_Delete.json
 */
async function deleteServiceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new ServiceGroupsManagementClient(credential);
  await client.deleteServiceGroup("20000000-0001-0000-0000-000000000000");
}

async function main(): Promise<void> {
  await deleteServiceGroup();
}

main().catch(console.error);
