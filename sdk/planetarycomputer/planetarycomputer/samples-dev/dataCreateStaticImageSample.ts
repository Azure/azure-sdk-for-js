// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create a new image export.
 *
 * @summary create a new image export.
 * x-ms-original-file: 2025-04-30-preview/TilerStaticImages_Create.json
 */
async function tilerStaticImagesCreate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.data.createStaticImage("naip-atl", {
    cql: {
      op: "and",
      args: [
        { op: "=", args: [{ property: "collection" }, "naip-atl"] },
        {
          op: "anyinteracts",
          args: [
            { property: "datetime" },
            { interval: ["2023-01-01T00:00:00Z", "2023-12-31T00:00:00Z"] },
          ],
        },
      ],
    },
    zoom: 13,
    geometry: {
      coordinates: [
        [
          [-84.45378097481053, 33.6567321707079],
          [-84.39805886744838, 33.6567321707079],
          [-84.39805886744838, 33.61945681366625],
          [-84.45378097481053, 33.61945681366625],
          [-84.45378097481053, 33.6567321707079],
        ],
      ],
      type: "Polygon",
    },
    renderParameters: "assets=image&asset_bidx=image|1,2,3&collection=naip-atl",
    columns: 1080,
    rows: 1080,
    imageSize: "1080x1080",
    showBranding: false,
  });
  console.log(result);
}

async function main(): Promise<void> {
  await tilerStaticImagesCreate();
}

main().catch(console.error);
