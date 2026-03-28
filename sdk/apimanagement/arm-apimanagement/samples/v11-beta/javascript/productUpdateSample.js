// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to update existing product details.
 *
 * @summary update existing product details.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementUpdateProduct.json
 */
async function apiManagementUpdateProduct() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.product.update("rg1", "apimService1", "testproduct", "*", {
    displayName: "Test Template ProductName 4",
  });
  console.log(result);
}

async function main() {
  await apiManagementUpdateProduct();
}

main().catch(console.error);
