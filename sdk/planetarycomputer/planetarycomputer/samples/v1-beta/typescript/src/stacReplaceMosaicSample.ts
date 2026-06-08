// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to replace a mosaic.
 *
 * @summary replace a mosaic.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const collectionId = process.env.PLANETARYCOMPUTER_COLLECTION_ID || "naip";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.stac.replaceMosaic(collectionId, "my-mosaic", {
    id: "my-mosaic",
    name: "Updated Mosaic",
    cql: {},
  });
  console.log(result);
}

main().catch(console.error);
