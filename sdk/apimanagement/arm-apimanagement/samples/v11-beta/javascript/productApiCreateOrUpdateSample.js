// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to adds an API to the specified product.
 *
 * @summary adds an API to the specified product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateProductApi.json
 */
async function apiManagementCreateProductApi() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.productApi.createOrUpdate(
    "rg1",
    "apimService1",
    "testproduct",
    "echo-api",
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateProductApi();
}

main().catch(console.error);
