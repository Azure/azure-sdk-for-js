// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "@azure-rest/planetarycomputer";
import { DefaultAzureCredential } from "@azure/identity";

/**
 * This sample demonstrates how to create or replace a collection in the GeoCatalog instance
 *
 * @summary create or replace a collection in the GeoCatalog instance
 * x-ms-original-file: 2025-04-30-preview/StacCollections_CreateOrReplace.json
 */
async function stacCollectionsCreateOrReplace(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const client = new PlanetaryComputerProClient(credential);
  const result = await client.stac.createOrReplaceCollection(
    "test-collection-lifecycle",
    {
      id: "test-collection-lifecycle",
      type: "Collection",
      links: [
        {
          rel: "items",
          type: "application/geo+json",
          href: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com/stac/collections/test-collection-lifecycle/items",
        },
        {
          rel: "parent",
          type: "application/json",
          href: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com/stac/",
        },
        {
          rel: "root",
          type: "application/json",
          href: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com/stac/",
        },
        {
          rel: "self",
          type: "application/json",
          href: "https://Sanitized.sanitized_label.sanitized_location.geocatalog.spatio.azure.com/stac/collections/test-collection-lifecycle",
        },
      ],
      title: "Test Collection Lifecycle",
      extent: {
        spatial: { boundingBox: [[-180, -90, 180, 90]] },
        temporal: {
          interval: [
            [
              new Date("2020-01-01T00:00:00Z"),
              new Date("2024-12-31T23:59:59Z"),
            ],
          ],
        },
      },
      license: "proprietary",
      description: "Test collection for lifecycle operations - UPDATED",
      stacVersion: "1.0.0",
      createdOn: "2025-10-28T18:47:27.7827791Z",
      updatedOn: "2025-10-28T18:47:27.7827791Z",
    },
  );
  console.log(result);
}

async function main(): Promise<void> {
  await stacCollectionsCreateOrReplace();
}

main().catch(console.error);
