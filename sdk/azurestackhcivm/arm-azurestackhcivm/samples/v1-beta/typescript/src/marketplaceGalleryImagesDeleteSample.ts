// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to the operation to delete a marketplace gallery image.
 *
 * @summary the operation to delete a marketplace gallery image.
 * x-ms-original-file: 2025-06-01-preview/MarketplaceGalleryImages_Delete.json
 */
async function deleteMarketplaceGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  await client.marketplaceGalleryImages.delete("test-rg", "test-marketplace-gallery-image");
}

async function main(): Promise<void> {
  await deleteMarketplaceGalleryImage();
}

main().catch(console.error);
