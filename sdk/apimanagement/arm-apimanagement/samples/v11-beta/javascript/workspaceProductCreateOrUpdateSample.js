// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to creates or Updates a product.
 *
 * @summary creates or Updates a product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateWorkspaceProduct.json
 */
async function apiManagementCreateWorkspaceProduct() {
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

async function main() {
  await apiManagementCreateWorkspaceProduct();
}

main().catch(console.error);
