// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or replace a STAC item in a collection
 *
 * @summary create or replace a STAC item in a collection
 * x-ms-original-file: 2025-04-30-preview/StacItems_CreateOrReplace.json
 */
async function stacItemsCreateOrReplace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.createOrReplaceItem(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114_replace_test",
    {
      stac_version: "1.0.0",
      type: "Feature",
      id: "ga_m_3308421_se_16_060_20211114_replace_test",
      collection: "naip-atl",
      boundingBox: [-84.44157, 33.621853, -84.370894, 33.690654],
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-84.372943, 33.621853],
            [-84.370894, 33.689211],
            [-84.439575, 33.690654],
            [-84.44157, 33.623293],
            [-84.372943, 33.621853],
          ],
        ],
      },
      properties: {
        gsd: 0.6,
        datetime: "2021-11-14T16:00:00Z",
        platform: "Imagery Updated",
        additionalProperties: {
          "naip:year": "2021",
          "proj:bbox": [737334, 3723324, 743706, 3730800],
          "proj:epsg": 26916,
          "naip:state": "ga",
          "proj:shape": [12460, 10620],
          "proj:transform": [0.6, 0, 737334, 0, -0.6, 3730800, 0, 0, 1],
          processing_level: "L2",
        },
      },
      links: [
        {
          rel: "collection",
          type: "application/json",
          href: "https://planetarycomputer.microsoft.com/api/stac/v1/collections/naip-atl",
        },
      ],
      assets: {
        image: {
          href: "https://SANITIZED.blob.core.windows.net/naip/v002/ga/2021/ga_060cm_2021/33084/m_3308421_se_16_060_20211114.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
          title: "RGBIR COG tile",
        },
      },
      stac_extensions: [
        "https://stac-extensions.github.io/projection/v1.0.0/schema.json",
      ],
    },
  );
}

async function main(): Promise<void> {
  await stacItemsCreateOrReplace();
}

main().catch(console.error);
