// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete product.
 *
 * @summary delete product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteProduct.json
 */
async function apiManagementDeleteProduct() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.product.delete("rg1", "apimService1", "testproduct", "*", {
    deleteSubscriptions: true,
  });
}

async function main() {
  await apiManagementDeleteProduct();
}

main().catch(console.error);
