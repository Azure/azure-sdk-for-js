// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ConfluentManagementClient } from "@azure/arm-confluent";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to organization role bindings
 *
 * @summary organization role bindings
 * x-ms-original-file: 2024-07-01/Access_RoleBindingList.json
 */
async function accessRoleBindingList(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ConfluentManagementClient(credential, subscriptionId);
  const result = await client.access.listRoleBindings("myResourceGroup", "myOrganization", {
    searchFilters: { pageSize: "10", pageToken: "asc4fts4ft" },
  });
  console.log(result);
}

async function main(): Promise<void> {
  await accessRoleBindingList();
}

main().catch(console.error);
