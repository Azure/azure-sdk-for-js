// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to adds a product to the specified tag via link.
 *
 * @summary adds a product to the specified tag via link.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateTagProductLink.json
 */
async function apiManagementCreateTagProductLink(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tagProductLink.createOrUpdate(
    "rg1",
    "apimService1",
    "tag1",
    "link1",
    {
      productId:
        "/subscriptions/00000000-0000-0000-0000-000000000000/resourceGroups/rg1/providers/Microsoft.ApiManagement/service/apimService1/products/product1",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateTagProductLink();
}

main().catch(console.error);
