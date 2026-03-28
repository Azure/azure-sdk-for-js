// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the specified group from the specified product.
 *
 * @summary deletes the specified group from the specified product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteProductGroupLink.json
 */
async function apiManagementDeleteProductGroupLink() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.productGroupLink.delete("rg1", "apimService1", "testproduct", "link1");
}

async function main() {
  await apiManagementDeleteProductGroupLink();
}

main().catch(console.error);
