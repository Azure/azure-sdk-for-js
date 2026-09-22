// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get mosaic assets for a point.
 *
 * @summary get mosaic assets for a point.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const result = await client.data.getSearchPointWithAssets(
    "ba13fc7947b9b585690d84ee61aaa653",
    -84.432,
    33.6396,
    {
      scanLimit: 100,
      itemsLimit: 100,
      timeLimit: 30,
      exitWhenFull: true,
      skipCovered: true,
      coordinateReferenceSystem: "EPSG:4326",
    },
  );
  console.log(result);
}

main().catch(console.error);
