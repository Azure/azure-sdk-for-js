// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

const { AzureStackHCIClient } = require("@azure/arm-azurestackhcivm");
const { DefaultAzureCredential } = require("@azure/identity");

/**
 * This sample demonstrates how to the operation to update a marketplace gallery image.
 *
 * @summary the operation to update a marketplace gallery image.
 * x-ms-original-file: 2025-06-01-preview/MarketplaceGalleryImages_Update.json
 */
async function updateMarketplaceGalleryImage() {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const result = await client.marketplaceGalleryImages.update(
    "test-rg",
    "test-marketplce-gallery-image",
    { tags: { additionalProperties: "sample" } },
  );
  console.log(result);
}

async function main() {
  await updateMarketplaceGalleryImage();
}

main().catch(console.error);
