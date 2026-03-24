// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to assign tag to the Product.
 *
 * @summary assign tag to the Product.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementCreateProductTag.json
 */
async function apiManagementCreateProductTag() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const result = await client.tag.assignToProduct(
    "rg1",
    "apimService1",
    "5931a75ae4bbd512a88c680b",
    "tagId1",
  );
  console.log(result);
}

async function main() {
  await apiManagementCreateProductTag();
}

main().catch(console.error);
