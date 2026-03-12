// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIVMManagementClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to lists all of the marketplace gallery images in the specified resource group. Use the nextLink property in the response to get the next page of marketplace gallery images.
 *
 * @summary lists all of the marketplace gallery images in the specified resource group. Use the nextLink property in the response to get the next page of marketplace gallery images.
 * x-ms-original-file: 2025-06-01-preview/MarketplaceGalleryImages_ListByResourceGroup.json
 */
async function listMarketplaceGalleryImageByResourceGroup() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.marketplaceGalleryImages.listByResourceGroup("test-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main() {
  await listMarketplaceGalleryImageByResourceGroup();
}

main().catch(console.error);
