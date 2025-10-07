// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";
import {
  AzureKeyCredential,
  KnowledgeRetrievalClient,
  KnownSearchAudience,
  odata,
  SearchClient,
  SearchFieldArray,
  SearchIndexClient,
  SearchIndexerClient,
  SelectFields,
} from "../src/index.js";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_APIKey", async () => {
    // To query and manipulate documents
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
    // @ts-preserve-whitespace
    // To manage indexes and synonymmaps
    const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
    // @ts-preserve-whitespace
    // To manage indexers, datasources and skillsets
    const indexerClient = new SearchIndexerClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
  });

  it("ReadmeSampleCreateClient_NationalCloud", async () => {
    // To query and manipulate documents
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
      {
        audience: KnownSearchAudience.AzureChina,
      },
    );
    // @ts-preserve-whitespace
    // To manage indexes and synonymmaps
    const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"), {
      audience: KnownSearchAudience.AzureChina,
    });
    // @ts-preserve-whitespace
    // To manage indexers, datasources and skillsets
    const indexerClient = new SearchIndexerClient(
      "<endpoint>",
      new AzureKeyCredential("<apiKey>"),
      {
        audience: KnownSearchAudience.AzureChina,
      },
    );
  });

  it("ReadmeSampleCreateIndex", async () => {
    const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
    // @ts-preserve-whitespace
    const result = await indexClient.createIndex({
      name: "example-index",
      fields: [
        {
          type: "Edm.String",
          name: "id",
          key: true,
        },
        {
          type: "Edm.Double",
          name: "awesomenessLevel",
          sortable: true,
          filterable: true,
          facetable: true,
        },
        {
          type: "Edm.String",
          name: "description",
          searchable: true,
        },
        {
          type: "Edm.ComplexType",
          name: "details",
          fields: [
            {
              type: "Collection(Edm.String)",
              name: "tags",
              searchable: true,
            },
          ],
        },
        {
          type: "Edm.Int32",
          name: "hiddenWeight",
          hidden: true,
        },
      ],
    });
    // @ts-preserve-whitespace
    console.log(`Index created with name ${result.name}`);
  });

  it("ReadmeSampleGetDocument", async () => {
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
    // @ts-preserve-whitespace
    const result = await searchClient.getDocument("1234");
  });

  it("ReadmeSampleUploadDocuments", async () => {
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
    // @ts-preserve-whitespace
    const uploadResult = await searchClient.uploadDocuments([
      // JSON objects matching the shape of the client's index
      {},
      {},
      {},
    ]);
    for (const result of uploadResult.results) {
      console.log(`Uploaded ${result.key}; succeeded? ${result.succeeded}`);
    }
  });

  it("ReadmeSampleSearch", async () => {
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
    // @ts-preserve-whitespace
    const searchResults = await searchClient.search("wifi -luxury");
    for await (const result of searchResults.results) {
      console.log(result);
    }
  });

  it("ReadmeSampleSearchLucene", async () => {
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
    // @ts-preserve-whitespace
    const searchResults = await searchClient.search('Category:budget AND "recently renovated"^3', {
      queryType: "full",
      searchMode: "all",
    });
    for await (const result of searchResults.results) {
      console.log(result);
    }
  });

  it("ReadmeSampleSearchWithTypes", async () => {
    // An example schema for documents in the index
    interface Hotel {
      hotelId?: string;
      hotelName?: string | null;
      description?: string | null;
      descriptionVector?: Array<number>;
      parkingIncluded?: boolean | null;
      lastRenovationDate?: Date | null;
      rating?: number | null;
      rooms?: Array<{
        beds?: number | null;
        description?: string | null;
      }>;
    }
    // @ts-preserve-whitespace
    const searchClient = new SearchClient<Hotel>(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
    // @ts-preserve-whitespace
    const searchResults = await searchClient.search("wifi -luxury", {
      // Only fields in Hotel can be added to this array.
      // TS will complain if one is misspelled.
      select: ["hotelId", "hotelName", "rooms/beds"],
    });
    // @ts-preserve-whitespace
    // These are other ways to declare the correct type for `select`.
    const select = ["hotelId", "hotelName", "rooms/beds"] as const;
    // This declaration lets you opt out of narrowing the TypeScript type of your documents,
    // though the AI Search service will still only return these fields.
    const selectWide: SelectFields<Hotel>[] = ["hotelId", "hotelName", "rooms/beds"];
    // This is an invalid declaration. Passing this to `select` will result in a compiler error
    // unless you opt out of including the model in the client constructor.
    const selectInvalid = ["hotelId", "hotelName", "rooms/beds"];
    // @ts-preserve-whitespace
    for await (const result of searchResults.results) {
      // result.document has hotelId, hotelName, and rating.
      // Trying to access result.document.description would emit a TS error.
      console.log(result.document.hotelName);
    }
  });

  it("ReadmeSampleSearchWithOData", async () => {
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
    // @ts-preserve-whitespace
    const baseRateMax = 200;
    const ratingMin = 4;
    const searchResults = await searchClient.search("WiFi", {
      filter: odata`Rooms/any(room: room/BaseRate lt ${baseRateMax}) and Rating ge ${ratingMin}`,
      orderBy: ["Rating desc"],
      select: ["hotelId", "hotelName", "Rating"],
    });
    for await (const result of searchResults.results) {
      // Each result will have "HotelId", "HotelName", and "Rating"
      // in addition to the standard search result property "score"
      console.log(result);
    }
  });

  it("ReadmeSampleSearchWithVector", async () => {
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
    // @ts-preserve-whitespace
    const queryVector: number[] = [
      // Embedding of the query "What are the most luxurious hotels?"
    ];
    const searchResults = await searchClient.search("*", {
      vectorSearchOptions: {
        queries: [
          {
            kind: "vector",
            vector: queryVector,
            fields: ["descriptionVector"],
            kNearestNeighborsCount: 3,
          },
        ],
      },
    });
    for await (const result of searchResults.results) {
      // These results are the nearest neighbors to the query vector
      console.log(result);
    }
  });

  it("ReadmeSampleSearchWithFacets", async () => {
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
    // @ts-preserve-whitespace
    const searchResults = await searchClient.search("WiFi", {
      facets: ["category,count:3,sort:count", "rooms/baseRate,interval:100"],
    });
    console.log(searchResults.facets);
    // Output will look like:
    // {
    //   'rooms/baseRate': [
    //     { count: 16, value: 0 },
    //     { count: 17, value: 100 },
    //     { count: 17, value: 200 }
    //   ],
    //   category: [
    //     { count: 5, value: 'Budget' },
    //     { count: 5, value: 'Luxury' },
    //     { count: 5, value: 'Resort and Spa' }
    //   ]
    // }
  });

  it("ReadmeSampleOdataUsage", async () => {
    const baseRateMax = 200;
    const ratingMin = 4;
    const filter = odata`Rooms/any(room: room/BaseRate lt ${baseRateMax}) and Rating ge ${ratingMin}`;
  });

  it("ReadmeSampleSearchClient", async () => {
    const searchClient = new SearchClient(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
  });

  it("ReadmeSampleSearchClientWithModel", async () => {
    type TModel = {
      keyName: string;
      field1?: string | null;
      field2?: { anotherField?: string | null } | null;
    };
    // @ts-preserve-whitespace
    const searchClient = new SearchClient<TModel>(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
  });

  it("ReadmeSampleAutocomplete", async () => {
    type TModel = {
      key: string;
      azure?: { sdk: string | null } | null;
    };
    // @ts-preserve-whitespace
    const client = new SearchClient<TModel>(
      "endpoint.azure",
      "indexName",
      new AzureKeyCredential("key"),
    );
    // @ts-preserve-whitespace
    const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];
    // @ts-preserve-whitespace
    const autocompleteResult = await client.autocomplete("searchText", "suggesterName", {
      searchFields,
    });
  });

  it("ReadmeSampleSearchTModel", async () => {
    type TModel = {
      key: string;
      azure?: { sdk: string | null } | null;
    };
    // @ts-preserve-whitespace
    const client = new SearchClient<TModel>(
      "endpoint.azure",
      "indexName",
      new AzureKeyCredential("key"),
    );
    // @ts-preserve-whitespace
    const select = ["azure/sdk"] as const;
    const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];
    // @ts-preserve-whitespace
    const searchResult = await client.search("searchText", {
      select,
      searchFields,
    });
  });

  it("ReadmeSampleSuggest", async () => {
    type TModel = {
      key: string;
      azure?: { sdk: string | null } | null;
    };
    // @ts-preserve-whitespace
    const client = new SearchClient<TModel>(
      "endpoint.azure",
      "indexName",
      new AzureKeyCredential("key"),
    );
    // @ts-preserve-whitespace
    const select = ["azure/sdk"] as const;
    const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];
    // @ts-preserve-whitespace
    const suggestResult = await client.suggest("searchText", "suggesterName", {
      select,
      searchFields,
    });
  });

  it("ReadmeSampleSearchIndexClient", async () => {
    const indexClient = new SearchIndexClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
  });

  it("ReadmeSampleSearchIndexerClient", async () => {
    const indexerClient = new SearchIndexerClient("<endpoint>", new AzureKeyCredential("<apiKey>"));
  });
  it("ReadmeSampleKnowledgeRetrievalClient", async () => {
    const knowledgeRetrievalClient = new KnowledgeRetrievalClient(
      "<endpoint>",
      "<agentName>",
      new AzureKeyCredential("<apiKey>"),
    );
  });

  it("SetLogLevel", () => {
    setLogLevel("info");
  });
});
