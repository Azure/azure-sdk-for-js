// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a new STAC collection.
 *
 * @summary create a new STAC collection.
 */
import { DefaultAzureCredential } from "@azure/identity";
import { PlanetaryComputerProClient } from "@azure/planetarycomputer";

async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const endpoint = process.env.PLANETARYCOMPUTER_ENDPOINT || "<your-geocatalog-endpoint>";
  const client = new PlanetaryComputerProClient(endpoint, credential);

  const poller = client.stac.createCollection({
    id: "my-collection",
    type: "Collection",
    stacVersion: "1.0.0",
    description: "My collection",
    license: "proprietary",
    extent: {
      spatial: { boundingBox: [[-180, -90, 180, 90]] },
      temporal: { interval: [["2020-01-01T00:00:00Z", null]] },
    },
    links: [],
  } as any);
  await poller.pollUntilDone();
  console.log("Collection created.");
}

main().catch(console.error);
