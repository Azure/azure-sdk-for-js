// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new collection in the GeoCatalog instance
 *
 * @summary create a new collection in the GeoCatalog instance
 * x-ms-original-file: 2025-04-30-preview/StacCollections_Create.json
 */
async function stacCollectionsCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.createCollection({
    id: "test-partition-type-collection",
    description: "Temporary collection for partition type testing",
    extent: {
      spatial: { boundingBox: [[-180, -90, 180, 90]] },
      temporal: {
        interval: [
          [new Date("2020-01-01T00:00:00Z"), new Date("2099-12-31T23:59:59Z")],
        ],
      },
    },
    license: "proprietary",
    links: [],
    stacVersion: "1.0.0",
    title: "Test Partition Type Collection",
    type: "Collection",
  });
}

async function main(): Promise<void> {
  await stacCollectionsCreate();
}

main().catch(console.error);
