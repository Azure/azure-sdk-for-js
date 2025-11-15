// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new asset in the Collection metadata and write the associated
 * file to managed storage.
 *
 * @summary create a new asset in the Collection metadata and write the associated
 * file to managed storage.
 * x-ms-original-file: 2025-04-30-preview/StacCollectionAssets_Create.json
 */
async function stacCollectionAssetsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.createCollectionAsset("naip-atl");
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionAssetsCreate();
}

main().catch(console.error);
