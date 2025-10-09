// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type {
  VectorSearch,
  SearchField,
  SearchIndex,
  HnswParameters,
  LexicalNormalizer,
  CustomLexicalNormalizer,
} from "@azure/search-documents";
import {
  SearchIndexClient,
  AzureKeyCredential,
  SearchIndexerClient,
  SearchClient,
  KnownRankingOrder,
} from "@azure/search-documents";
import { describe, it, expect, afterEach } from "vitest";
import type { PipelinePolicy } from "@azure/core-rest-pipeline";
import { isLiveMode } from "@azure-tools/test-recorder";

const debugPolicy: PipelinePolicy = {
  name: "debugPolicy",
  async sendRequest(request, next) {
    console.log("Request:");
    console.log(JSON.stringify(request, null, 2));
    const response = await next(request);
    console.log("Response:");
    console.log(JSON.stringify(response, null, 2));
    return response;
  },
};

describe.skipIf(!isLiveMode())("1220GA", () => {
  const credential = new AzureKeyCredential(process.env.API_KEY! ?? "api-key");
  const indexClient = new SearchIndexClient(
    process.env.ENDPOINT! ?? "<search-endpoint>",
    credential,
  );
  // Using this file to live test new features locally
  afterEach(async () => {
    for await (const index of indexClient.listIndexes()) {
      await indexClient.deleteIndex(index.name);
    }
  });
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

    await indexClient.createIndex(index);

    const retrievedIndex = await indexClient.getIndex(index.name);

    // Verify compression settings
    const compression = retrievedIndex.vectorSearch?.compressions?.[0];
    expect(compression?.truncationDimension).toBe(512);
    expect(compression?.rescoringOptions?.enableRescoring).toBe(true);
    expect(compression?.rescoringOptions?.defaultOversampling).toBe(10.0);

    // Verify algorithm settings
    const parameters = retrievedIndex.vectorSearch?.algorithms?.[0].parameters as HnswParameters;
    expect(parameters.m).toBe(4);
    expect(parameters.efConstruction).toBe(400);
    expect(parameters.efSearch).toBe(500);
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
  });

  it("Semantic Scoring Profiles", async () => {
    const indexName = `${Date.now()}-semantic`;

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

    console.log("Creating index with semantic configurations...");
    // indexClient["client"].pipeline.addPolicy(debugPolicy);
    await indexClient.createIndex({
      name: indexName,
      fields,
      vectorSearch: {
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
          },
        ],
      },
      semanticSearch: {
        configurations: [
          {
            name: "semantic-config-1",
            prioritizedFields: {
              titleField: { name: "content" },
              contentFields: [{ name: "content" }],
            },
            rankingOrder: KnownRankingOrder.BoostedRerankerScore, // New feature: ranking order
          },
          {
            name: "semantic-config-2",
            prioritizedFields: {
              titleField: { name: "content" },
              contentFields: [{ name: "content" }],
            },
            rankingOrder: KnownRankingOrder.RerankerScore, // Different ranking order
          },
        ],
      },
    });

    const searchClient = new SearchClient(process.env.ENDPOINT!, indexName, credential);

    const testDoc = {
      id: "semantic-doc-1",
      content: "This is a test document for semantic search with Azure Cognitive Search",
      embedding: Array(1024)
        .fill(0)
        .map(() => Math.random()),
    };

    console.log("Uploading document...");
    // searchClient["client"].pipeline.addPolicy(debugPolicy);
    await searchClient.uploadDocuments([testDoc]);

    await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait for indexing

    console.log("Performing semantic search with configuration 'semantic-config-1'...");
    const semanticResults = await searchClient.search("semantic search", {
      semanticSearchOptions: {
        configurationName: "semantic-config-1",
      },
      queryType: "semantic",
    });

    for await (const result of semanticResults.results) {
      console.log(result);
    }
  });

  it("Multi-Vectors", () => {
    const fields: SearchField[] = [
      { name: "id", type: "Edm.String", key: true, searchable: false },
      { name: "content", type: "Edm.String", searchable: true },
      {
        name: "embedding1",
        type: "Collection(Edm.Single)",
        searchable: true,
        vectorSearchDimensions: 1024,
        vectorSearchProfileName: "vector-profile",
      },
      {
        name: "embedding2",
        type: "Collection(Edm.Single)",
        searchable: true,
        vectorSearchDimensions: 512,
        vectorSearchProfileName: "vector-profile",
      },
    ];
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
        },
      ],
    };

    const index: SearchIndex = {
      name: `${Date.now()}-multi-vectors`,
      fields,
      vectorSearch,
    };

    expect(index.fields.length).toBe(4);
  });
  it("Normalizers", async () => {
    const normalizers: LexicalNormalizer[] = [
      {
        name: "custom-normalizer",
        odatatype: "#Microsoft.Azure.Search.CustomNormalizer",
        charFilters: [],
        tokenFilters: ["lowercase", "asciifolding"],
      },
    ];

    const fields: SearchField[] = [
      { name: "id", type: "Edm.String", key: true, searchable: false },
      {
        name: "title",
        type: "Edm.String",
        searchable: true,
        filterable: true, // Required for normalizer
        normalizerName: "lowercase", // Use built-in normalizer
      },
      {
        name: "description",
        type: "Edm.String",
        searchable: true,
        sortable: true, // Required for normalizer
        normalizerName: "custom-normalizer",
      },
    ];

    const normalizerIndex: SearchIndex = {
      name: `${Date.now()}-normalizers`,
      description: "Test index for normalizer functionality",
      fields,
      normalizers,
    };

    console.log("Creating index with normalizers...");
    console.log("Normalizers being sent:", JSON.stringify(normalizers, null, 2));
    console.log(
      "Fields being sent:",
      JSON.stringify(
        fields.map((f) => ({ name: f.name, normalizer: (f as any).normalizerName || null })),
        null,
        2,
      ),
    );
    await indexClient.createIndex(normalizerIndex);

    const retrievedIndex = await indexClient.getIndex(normalizerIndex.name);
    console.log("Retrieved index:", JSON.stringify(retrievedIndex, null, 2));

    // Verify normalizer settings
    const retrievedNormalizers = retrievedIndex.normalizers || [];
    expect(retrievedNormalizers.length).toBe(1);
    expect(retrievedNormalizers[0].name).toBe("custom-normalizer");
    expect(retrievedNormalizers[0].odatatype).toBe("#Microsoft.Azure.Search.CustomNormalizer");
    const tokenFilters = (retrievedNormalizers[0] as CustomLexicalNormalizer).tokenFilters;
    expect(tokenFilters).toContain("lowercase");
    expect(tokenFilters).toContain("asciifolding");

    // Verify field normalizer assignments
    const titleField = retrievedIndex.fields.find((f) => f.name === "title");
    expect((titleField as any).normalizerName).toBe("lowercase");

    const descriptionField = retrievedIndex.fields.find((f) => f.name === "description");
    expect((descriptionField as any).normalizerName).toBe("custom-normalizer");
  });
});
