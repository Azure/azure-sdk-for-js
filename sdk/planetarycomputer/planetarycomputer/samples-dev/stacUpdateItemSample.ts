// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to update a STAC item in a collection
 *
 * @summary update a STAC item in a collection
 * x-ms-original-file: 2025-04-30-preview/StacItems_Update.json
 */
async function stacItemsUpdate(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  await client.stac.updateItem(
    "naip-atl",
    "ga_m_3308421_se_16_060_20211114_test",
    {
      id: "ga_m_3308421_se_16_060_20211114_test",
      boundingBox: [-84.44157, 33.621853, -84.370894, 33.690654],
      type: "Feature",
      links: [
        {
          rel: "collection",
          type: "application/json",
          href: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com/stac/collections/naip-atl",
        },
        {
          rel: "parent",
          type: "application/json",
          href: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com/stac/collections/naip-atl",
        },
        {
          rel: "root",
          type: "application/json",
          href: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com/stac/",
        },
        {
          rel: "self",
          type: "application/geo+json",
          href: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com/stac/collections/naip-atl/items/ga_m_3308421_se_16_060_20211114_test",
        },
      ],
      assets: {
        image: {
          href: "https://SANITIZED.blob.core.windows.net/naip-atl-bde3e846/08a/ga_m_3308421_se_16_060_20211114_test/image.tif",
          type: "image/tiff; application=geotiff; profile=cloud-optimized",
          roles: ["data"],
          title: "RGBIR COG tile",
        },
      },
      timestamp: "2025-10-28T17:52:49.659975Z",
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
      eTag: "73fab31c-2e93-422b-b30a-7d259590992f",
      collection: "naip-atl",
      properties: {
        gsd: 0.6,
        datetime: "2021-11-14T16:00:00Z",
        platform: "Imagery",
        additionalProperties: {
          "naip:year": "2021",
          "proj:bbox": [737334, 3723324, 743706, 3730800],
          "proj:epsg": 26916,
          "naip:state": "ga",
          "proj:shape": [12460, 10620],
          "proj:transform": [0.6, 0, 737334, 0, -0.6, 3730800, 0, 0, 1],
        },
      },
      stac_extensions: [
        "https://stac-extensions.github.io/projection/v1.1.0/schema.json",
      ],
      stac_version: "1.0.0",
    },
  );
}

async function main(): Promise<void> {
  await stacItemsUpdate();
}

main().catch(console.error);
