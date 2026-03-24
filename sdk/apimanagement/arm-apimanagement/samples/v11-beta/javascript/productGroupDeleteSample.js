// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to deletes the association between the specified group and product.
 *
 * @summary deletes the association between the specified group and product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementDeleteProductGroup.json
 */
async function apiManagementDeleteProductGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  await client.productGroup.delete("rg1", "apimService1", "testproduct", "templateGroup");
}

async function main() {
  await apiManagementDeleteProductGroup();
}

main().catch(console.error);
