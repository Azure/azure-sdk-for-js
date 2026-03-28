// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { ApiManagementClient } from "@azure/arm-apimanagement";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to creates or Updates a product.
 *
 * @summary creates or Updates a product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceProduct.json
 */
async function apiManagementCreateWorkspaceProduct(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.workspaceProduct.createOrUpdate(
    "rg1",
    "apimService1",
    "wks1",
    "testproduct",
    { displayName: "Test Template ProductName 4" },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await apiManagementCreateWorkspaceProduct();
}

main().catch(console.error);
