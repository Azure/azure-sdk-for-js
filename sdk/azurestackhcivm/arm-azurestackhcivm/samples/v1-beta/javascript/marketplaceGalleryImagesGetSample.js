// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to gets a marketplace gallery image
 *
 * @summary gets a marketplace gallery image
 * x-ms-original-file: 2025-06-01-preview/MarketplaceGalleryImages_Get.json
 */
async function getMarketplaceGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.marketplaceGalleryImages.get(
    "test-rg",
    "test-marketplace-gallery-image",
  );
  console.log(result);
}

async function main() {
  await getMarketplaceGalleryImage();
}

main().catch(console.error);
