// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to delete an asset from a given collection.
 *
 * @summary delete an asset from a given collection.
 * x-ms-original-file: 2025-04-30-preview/StacCollectionAssets_Delete.json
 */
async function stacCollectionAssetsDelete(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.deleteCollectionAsset(
    "naip-atl",
    "test-asset",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionAssetsDelete();
}

main().catch(console.error);
