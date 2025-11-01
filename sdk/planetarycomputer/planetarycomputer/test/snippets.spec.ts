// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new PlanetaryComputerProClient("<endpoint>", new DefaultAzureCredential());
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new PlanetaryComputerProClient("<endpoint>", credential);
  });

  it("ReadmeSampleCreateClient", async () => {
    // [START ReadmeSampleCreateClient]
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>"; // e.g., "https://your-geocatalog.geocatalogs.azure.com"
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    // [END ReadmeSampleCreateClient]
  });

  it("ReadmeSampleListCollections", async () => {
    // [START ReadmeSampleListCollections]
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);

    const collections = await client.stac.listCollections();
    console.log(`Found ${collections.collections.length} collections`);
    for (const collection of collections.collections) {
      console.log(`- ${collection.id}: ${collection.description}`);
    }
    // [END ReadmeSampleListCollections]
  });

  it("listCollections", async () => {
    // [START listCollections]
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);

    const collections = await client.stac.listCollections();
    console.log(`Found ${collections.collections.length} collections`);
    for (const collection of collections.collections) {
      console.log(`- ${collection.id}: ${collection.description}`);
    }
    // [END listCollections]
  });

  it("ReadmeSampleSearchItems", async () => {
    // [START ReadmeSampleSearchItems]
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);

    const searchResult = await client.stac.search({
      collections: ["naip-atl"],
      filterLang: "cql2-json",
      filter: {
        op: "s_intersects",
        args: [
          { property: "geometry" },
          {
            type: "Polygon",
            coordinates: [
              [
                [-122.5, 47.0],
                [-122.0, 47.0],
                [-122.0, 47.5],
                [-122.5, 47.5],
                [-122.5, 47.0],
              ],
            ],
          },
        ],
      },
      datetime: "2024-01-01T00:00:00Z/2024-12-31T23:59:59Z",
      limit: 10,
    } as any);

    if (searchResult.type === "FeatureCollection") {
      console.log(`Found ${searchResult.features.length} items`);
      for (const item of searchResult.features) {
        console.log(`Item ID: ${item.id}, Collection: ${item.collection}`);
      }
    }
    // [END ReadmeSampleSearchItems]
  });

  it("ReadmeSampleCreateCollection", async () => {
    // [START ReadmeSampleCreateCollection]
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);

    const collectionId = "my-satellite-imagery";
    await client.stac.createCollection({
      id: collectionId,
      type: "Collection",
      stacVersion: "1.0.0",
      description: "My satellite imagery collection",
      license: "proprietary",
      extent: {
        spatial: {
          boundingBox: [[-180, -90, 180, 90]],
        },
        temporal: {
          interval: [[new Date("2024-01-01T00:00:00Z"), null]],
        },
      },
      links: [],
    } as any);

    console.log(`Collection '${collectionId}' created successfully`);
    // [END ReadmeSampleCreateCollection]
  });

  it("ReadmeSampleCreateItem", async () => {
    // [START ReadmeSampleCreateItem]
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);

    const collectionId = "my-satellite-imagery";
    const itemId = "my-item-001";

    await client.stac.createItem(collectionId, {
      id: itemId,
      type: "Feature",
      stacVersion: "1.0.0",
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [-122.5, 47.0],
            [-122.0, 47.0],
            [-122.0, 47.5],
            [-122.5, 47.5],
            [-122.5, 47.0],
          ],
        ],
      },
      properties: {
        datetime: "2024-01-01T00:00:00Z",
      },
      assets: {},
      links: [],
      collection: collectionId,
    } as any);

    console.log(`Item '${itemId}' created successfully in collection '${collectionId}'`);
    // [END ReadmeSampleCreateItem]
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
