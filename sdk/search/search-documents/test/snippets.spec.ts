// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import {
  AzureKeyCredential,
  KnowledgeRetrievalClient,
  odata,
  SearchClient,
  SearchFieldArray,
  SearchIndexClient,
  SearchIndexerClient,
} from "../src/index.js";
import { DefaultAzureCredential, InteractiveBrowserCredential } from "@azure/identity";
import { setLogLevel } from "@azure/logger";
import { describe, it } from "vitest";

describe("snippets", () => {
  it("ReadmeSampleCreateClient_Node", async () => {
    const client = new KnowledgeRetrievalClient("<endpoint>", new DefaultAzureCredential());
  });

  it("ReadmeSampleCreateClient_Browser", async () => {
    const credential = new InteractiveBrowserCredential({
      tenantId: "<YOUR_TENANT_ID>",
      clientId: "<YOUR_CLIENT_ID>",
    });
    const client = new KnowledgeRetrievalClient("<endpoint>", credential);
  });

  it("SetLogLevel", async () => {
    setLogLevel("info");
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
      field2?: {
        anotherField?: string | null;
      } | null;
    };

    const searchClient = new SearchClient<TModel>(
      "<endpoint>",
      "<indexName>",
      new AzureKeyCredential("<apiKey>"),
    );
  });

  it("ReadmeSampleAutocomplete", async () => {
    type TModel = {
      key: string;
      azure?: {
        sdk: string | null;
      } | null;
    };

    const client = new SearchClient<TModel>(
      "endpoint.azure",
      "indexName",
      new AzureKeyCredential("key"),
    );

    const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];

    const autocompleteResult = await client.autocomplete("searchText", "suggesterName", {
      searchFields,
    });
  });

  it("ReadmeSampleSearchTModel", async () => {
    type TModel = {
      key: string;
      azure?: {
        sdk: string | null;
      } | null;
    };

    const client = new SearchClient<TModel>(
      "endpoint.azure",
      "indexName",
      new AzureKeyCredential("key"),
    );

    const select = ["azure/sdk"] as const;
    const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];

    const searchResult = await client.search("searchText", {
      select,
      searchFields,
    });
  });

  it("ReadmeSampleSuggest", async () => {
    type TModel = {
      key: string;
      azure?: {
        sdk: string | null;
      } | null;
    };

    const client = new SearchClient<TModel>(
      "endpoint.azure",
      "indexName",
      new AzureKeyCredential("key"),
    );

    const select = ["azure/sdk"] as const;
    const searchFields: SearchFieldArray<TModel> = ["azure/sdk"];

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
      "<knowledgeBaseName>",
      new AzureKeyCredential("<apiKey>"),
    );
  });

  it("ReadmeSampleOdataUsage", async () => {
    const baseRateMax = 200;
    const ratingMin = 4;
    const filter = odata`Rooms/any(room: room/BaseRate lt ${baseRateMax}) and Rating ge ${ratingMin}`;
  });
});
