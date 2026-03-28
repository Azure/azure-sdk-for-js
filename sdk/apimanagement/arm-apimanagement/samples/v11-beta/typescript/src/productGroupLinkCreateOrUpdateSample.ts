// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds a group to the specified product via link.
 *
 * @summary adds a group to the specified product via link.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateProductGroupLink.json
 */
async function apiManagementCreateProductGroupLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.productGroupLink.createOrUpdate(
    "rg1",
    "apimService1",
    "testproduct",
    "link1",
    {
      groupId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/groups/group1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateProductGroupLink();
}

main().catch(console.error);
