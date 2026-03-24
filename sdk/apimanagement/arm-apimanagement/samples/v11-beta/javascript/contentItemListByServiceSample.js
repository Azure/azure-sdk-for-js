// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { ApiManagementClient } = require("@azure/arm-apimanagement");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists developer portal's content items specified by the provided content type.
 *
 * @summary lists developer portal's content items specified by the provided content type.
 * x-ms-original-file: 2025-03-01-preview/ApiManagementListContentTypeContentItems.json
 */
async function apiManagementListContentTypeContentItems() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "00000000-0000-0000-0000-000000000000";
  const client = new ApiManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.contentItem.listByService("rg1", "apimService1", "page")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await apiManagementListContentTypeContentItems();
}

main().catch(console.error);
