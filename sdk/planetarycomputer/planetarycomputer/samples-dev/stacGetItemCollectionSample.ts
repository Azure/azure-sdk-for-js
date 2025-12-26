// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to fetch features of the feature collection with id `collectionId`.
 *
 * Every feature in a dataset belongs to a collection. A dataset may
 * consist of multiple feature collections. A feature collection is often a
 * collection of features of a similar type, based on a common schema.
 *
 * @summary fetch features of the feature collection with id `collectionId`.
 *
 * Every feature in a dataset belongs to a collection. A dataset may
 * consist of multiple feature collections. A feature collection is often a
 * collection of features of a similar type, based on a common schema.
 * x-ms-original-file: 2025-04-30-preview/StacItems_GetFeatures.json
 */
async function stacItemsGetFeatures(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.getItemCollection("naip-atl", { limit: 10 });
  console.log(result);
}

async function main(): Promise<void> {
  await stacItemsGetFeatures();
}

main().catch(console.error);
