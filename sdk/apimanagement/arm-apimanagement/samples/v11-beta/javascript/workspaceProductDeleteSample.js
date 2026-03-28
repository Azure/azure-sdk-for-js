// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to delete product.
 *
 * @summary delete product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteWorkspaceProduct.json
 */
async function apiManagementDeleteWorkspaceProduct() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.workspaceProduct.delete("rg1", "apimService1", "wks1", "testproduct", "*", {
    deleteSubscriptions: true,
  });
}

async function main() {
  await apiManagementDeleteWorkspaceProduct();
}

main().catch(console.error);
