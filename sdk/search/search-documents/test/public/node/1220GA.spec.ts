// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  VectorSearch,
  SearchField,
  SearchIndex,
  IndexDocumentsClient,
  SearchClient,
  SearchIndexClient,
  AzureKeyCredential,
  SearchIndexerClient,
} from "@azure/search-documents";
import { describe, beforeEach, it, expect } from "vitest";
import config from "dotenv/config";
import { afterEach } from "node:test";

// Test index names (prefixed to avoid conflicts)

const credential = new AzureKeyCredential(process.env.API_KEY!);
const indexClient = new SearchIndexClient(process.env.ENDPOINT!, credential);
const indexerClient = new SearchIndexerClient(process.env.ENDPOINT!, credential);

describe("1220GA", () => {
  it("Vector Search HNSW storage optimization", async () => {
    const vectorSearch: VectorSearch = {
      algorithms: [
        {
          name: "hnsw-config",
          kind: "hnsw",
          parameters: {
            metric: "cosine",
            m: 4,
            efConstruction: 400,
            efSearch: 500,
          },
        },
      ],
      profiles: [
        {
          name: "vector-profile",
          algorithmConfigurationName: "hnsw-config",
          compressionName: "compression-config",
        },
      ],
      compressions: [
        {
          compressionName: "compression-config",
          kind: "scalarQuantization",
          parameters: {
            quantizedDataType: "int8",
          },
          rescoringOptions: {
            enableRescoring: true,
            defaultOversampling: 10.0,
          },
          truncationDimension: 512, // New feature: dimension truncation
        },
      ],
    };

    const fields: SearchField[] = [
      { name: "id", type: "Edm.String", key: true, searchable: false },
      { name: "content", type: "Edm.String", searchable: true },
      {
        name: "embedding",
        type: "Collection(Edm.Single)",
        searchable: true,
        vectorSearchDimensions: 1024,
        vectorSearchProfileName: "vector-profile",
      },
    ];

    const index: SearchIndex = {
      name: `${Date.now()}-hnsw-compression`,
      fields,
      vectorSearch,
    };

    console.log("Creating index with vector compression...");
    await indexClient.createIndex(index);

    console.log("Retrieving index to verify compression settings...");
    const retrievedIndex = await indexClient.getIndex(index.name);

    // Verify compression settings
    const compression = retrievedIndex.vectorSearch?.compressions?.[0];
    expect(compression?.truncationDimension).toBe(512);
    expect(compression?.rescoringOptions?.enableRescoring).toBe(true);
    expect(compression?.rescoringOptions?.defaultOversampling).toBe(10.0);

    await indexClient.deleteIndex(index.name);
  });

  it("Search Index description", async () => {
    const indexName = `${Date.now()}-description`;
    await indexClient.createIndex({
      name: indexName,
      fields: [
        {
          name: "id",
          type: "Edm.String",
          key: true,
          searchable: false,
        },
      ],
      description: "Test index with description",
    });
    const retrievedIndex = await indexClient.getIndex(indexName);
    expect(retrievedIndex.description).toBe("Test index with description");
    await indexClient.deleteIndex(indexName);
  });
});
