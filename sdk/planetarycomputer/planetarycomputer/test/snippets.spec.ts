// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { RestError } from "@azure/core-rest-pipeline";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>"; // e.g., "https://your-geocatalog.geocatalogs.azure.com"
    const client = new PlanetaryComputerProClient(catalogUri, credential);
  });

  it("ReadmeSampleListCollections", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const collections = await client.stac.getCollections();
    console.log(`Found ${collections.collections.length} collections`);
    for (const collection of collections.collections) {
      console.log(`- ${collection.id}: ${collection.description}`);
    }
  });

  it("ReadmeSampleSearchItems", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const searchResult = await client.stac.search({
      collections: ["naip"],
      dateTime: "2021-01-01T00:00:00Z/2022-12-31T23:59:59Z",
      limit: 10,
    } as any);
    console.log(`Found ${searchResult.features.length} items`);
    for (const item of searchResult.features) {
      console.log(`Item ID: ${item.id}, Collection: ${item.collection}`);
    }
  });

  it("ReadmeSampleGetItem", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const item = await client.stac.getItem("naip", "ga_m_3308421_se_16_060_20211114");
    console.log(`Item ID: ${item.id}`);
    console.log(`Assets: ${Object.keys(item.assets)}`);
  });

  it("ReadmeSampleCreateCollection", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const poller = await client.stac.createCollection({
      id: "my-collection",
      type: "Collection",
      stacVersion: "1.0.0",
      description: "A collection of geospatial data",
      license: "proprietary",
      extent: {
        spatial: { boundingBox: [[-180, -90, 180, 90]] },
        temporal: { interval: [[null, null]] },
      },
      links: [],
    } as any);
    await poller.pollUntilDone();
    console.log("Collection created");
  });

  it("ReadmeSampleMosaicTiles", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const registration = await client.data.registerMosaicsSearch({
      collections: ["naip"],
      filterLang: "cql2-json" as const,
      filter: { op: "=", args: [{ property: "naip:year" }, "2021"] },
    });
    console.log(`Search ID: ${registration.searchId}`);

    const tileJson = await client.data.getSearchTileJson(registration.searchId, {
      assets: ["image"],
    });
    console.log(`Tile URLs: ${tileJson.tiles}`);
  });

  it("ReadmeSamplePointValues", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const pointData = await client.data.getItemPoint(
      "naip",
      "ga_m_3308421_se_16_060_20211114",
      -84.41,
      33.65,
      { assets: ["image"] },
    );
    console.log(`Coordinates: ${pointData.coordinates}`);
    console.log(`Values: ${pointData.values}`);
  });

  it("ReadmeSampleMapTile", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const tileResponse = await client.data.getTile(
      "naip",
      "ga_m_3308421_se_16_060_20211114",
      "WebMercatorQuad",
      14,
      4322,
      6463,
      { assets: ["image"] },
    );
    console.log(`Tile size: ${tileResponse.length} bytes`);
  });

  it("ReadmeSampleIngestionSource", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const source = await client.ingestion.createSource({
      id: "my-storage-source",
      kind: "BlobManagedIdentity",
      connectionInfo: {
        containerUri: "https://mystorage.blob.core.windows.net/geospatial-data",
        objectId: "00000000-0000-0000-0000-000000000000",
      },
    });
    console.log(`Created source: ${source.id}`);
  });

  it("ReadmeSampleIngestion", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const ingestion = await client.ingestion.create("my-collection", {
      importType: "StaticCatalog",
      displayName: "My data ingestion",
      sourceCatalogUrl: "https://example.com/catalog.json",
      keepOriginalAssets: true,
      skipExistingItems: true,
    });
    console.log(`Created ingestion: ${ingestion.id}`);
  });

  it("ReadmeSampleGetSasToken", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const token = await client.sharedAccessSignature.getToken("naip");
    console.log(`Token expires at: ${token.expiresOn}`);

    // Sign an asset URL for secure download
    const signed = await client.sharedAccessSignature.getUrl(
      "https://storage.blob.core.windows.net/container/asset.tif",
    );
    console.log(`Signed URL: ${signed.href}`);
  });

  it("ReadmeSampleErrorHandling", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);

    try {
      await client.stac.getCollection("non-existent-collection");
    } catch (e) {
      if (e instanceof RestError) {
        console.log(`Status code: ${e.statusCode}`);
        console.log(`Message: ${e.message}`);
      }
    }
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
