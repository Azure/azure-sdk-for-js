// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to the operation to update a marketplace gallery image.
 *
 * @summary the operation to update a marketplace gallery image.
 * x-ms-original-file: 2025-06-01-preview/MarketplaceGalleryImages_Update.json
 */

import { AzureStackHCIVMManagementClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

async function updateMarketplaceGalleryImage(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIVMManagementClient(credential, subscriptionId);
  const result = await client.marketplaceGalleryImages.update(
    "test-rg",
    "test-marketplce-gallery-image",
    { tags: { additionalProperties: "sample" } },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await updateMarketplaceGalleryImage();
}

main().catch(console.error);
