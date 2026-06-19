// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to delete a mosaic.
 *
 * @summary delete a mosaic.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  await client.stac.deleteMosaic(collectionId, "my-mosaic");
  console.log("Mosaic deleted.");
}

main().catch(console.error);
