// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists a collection of the group links associated with a product.
 *
 * @summary lists a collection of the group links associated with a product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListProductGroupLinks.json
 */
async function apiManagementListProductGroupLinks() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.productGroupLink.listByProduct(
    "rg1",
    "apimService1",
    "product1",
  )) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListProductGroupLinks();
}

main().catch(console.error);
