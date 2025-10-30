// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update an existing asset in a given collection.
 *
 * @summary update an existing asset in a given collection.
 * x-ms-original-file: 2025-04-30-preview/StacCollectionAssets_Replace.json
 */
async function stacCollectionAssetsReplace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.replaceCollectionAsset(
    "naip-atl",
    "test-asset",
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionAssetsReplace();
}

main().catch(console.error);
