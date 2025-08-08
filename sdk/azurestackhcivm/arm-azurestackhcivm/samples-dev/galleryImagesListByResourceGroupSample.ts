// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AzureStackHCIClient } from "@azure/arm-azurestackhcivm";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to lists all of the gallery images in the specified resource group. Use the nextLink property in the response to get the next page of gallery images.
 *
 * @summary lists all of the gallery images in the specified resource group. Use the nextLink property in the response to get the next page of gallery images.
 * x-ms-original-file: 2025-06-01-preview/GalleryImages_ListByResourceGroup.json
 */
async function listGalleryImageByResourceGroup(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const subscriptionId = "fd3c3665-1729-4b7b-9a38-238e83b0f98b";
  const client = new AzureStackHCIClient(credential, subscriptionId);
  const resArray = new Array();
  for await (const item of client.galleryImages.listByResourceGroup("test-rg")) {
    resArray.push(item);
  }

  console.log(resArray);
}

async function main(): Promise<void> {
  await listGalleryImageByResourceGroup();
}

main().catch(console.error);
