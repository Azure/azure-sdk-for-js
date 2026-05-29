// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to replace a render option.
 *
 * @summary replace a render option.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.stac.replaceRenderOption(collectionId, "my-render-option", {
    id: "my-render-option",
    name: "Updated Render Option",
    type: "raster",
    options: "assets=image&asset_bidx=image|1,2,3",
  } as any);
  console.log(result);
}

main().catch(console.error);
