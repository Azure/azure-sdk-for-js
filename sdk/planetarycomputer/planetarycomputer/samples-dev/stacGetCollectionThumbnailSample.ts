// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to get thumbnail for given collection.
 *
 * @summary get thumbnail for given collection.
 * x-ms-original-file: 2025-04-30-preview/StacCollectionThumbnails_Get.json
 */
async function stacCollectionThumbnailsGet(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getCollectionThumbnail("naip-atl");
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionThumbnailsGet();
}

main().catch(console.error);
