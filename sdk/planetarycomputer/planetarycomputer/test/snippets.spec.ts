// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { PlanetaryComputerProClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
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

  it("ReadmeSampleGetSasToken", async () => {
    const credential = new DefaultAzureCredential();
    const catalogUri = "<your-geocatalog-endpoint>";
    const client = new PlanetaryComputerProClient(catalogUri, credential);
    const token = await client.sharedAccessSignature.getToken("naip");
    console.log(`Token expires at: ${token.expiresOn}`);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
  });
});
