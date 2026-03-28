// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified API from the specified product.
 *
 * @summary deletes the specified API from the specified product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteProductApi.json
 */
async function apiManagementDeleteProductApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.productApi.delete("rg1", "apimService1", "testproduct", "echo-api");
}

async function main() {
  await apiManagementDeleteProductApi();
}

main().catch(console.error);
