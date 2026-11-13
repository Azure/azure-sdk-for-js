// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { OperationOptions } from "@azure-rest/core-client";
import {
  AzureKeyCredential,
  KnowledgeRetrievalClient,
  SearchClient as ConvenienceSearchClient,
} from "../../../src/index.js";
import type { BaseKnowledgeBaseActivityRecord } from "../../../src/index.js";
import { KnowledgeBaseRetrievalClient } from "../../../src/knowledgeBaseRetrieval/index.js";
import { SearchIndexClient } from "../../../src/searchIndex/index.js";
import { SearchIndexerClient } from "../../../src/searchIndexer/index.js";
import { SearchClient } from "../../../src/search/index.js";
import * as indexApi from "../../../src/searchIndex/api/index.js";
import * as indexerApi from "../../../src/searchIndexer/api/index.js";
import * as searchApi from "../../../src/search/api/index.js";
import * as retrievalApi from "../../../src/knowledgeBaseRetrieval/api/index.js";

const endpoint = "https://example.search.windows.net";
const credential = new AzureKeyCredential("key");

function transport(
  responses: unknown[],
  status = 200,
  contentType = "application/json",
): { requests: PipelineRequest[]; httpClient: HttpClient } {
  const requests: PipelineRequest[] = [];
  return {
    requests,
    httpClient: {
      async sendRequest(request: PipelineRequest): Promise<PipelineResponse> {
        const response = responses[Math.min(requests.length, responses.length - 1)];
        requests.push(request);
        return {
          request,
          status,
          headers: createHttpHeaders({ "content-type": contentType }),
          bodyAsText: contentType === "text/plain" ? String(response) : JSON.stringify(response),
        };
      },
    },
  };
}

type UpdateOptions = OperationOptions & { ifMatch?: string; allowIndexDowntime?: boolean };
const index = { name: "body-name", fields: [] };
const synonymMap = { name: "body-name", format: "solr" as const, synonyms: ["a,b"] };
const alias = { name: "body-name", indexes: ["idx"] };
const knowledgeBase = { name: "body-name", knowledgeSources: [] };
const knowledgeSource = {
  name: "body-name",
  kind: "searchIndex" as const,
  searchIndexParameters: { searchIndexName: "idx" },
};
const indexer = { name: "body-name", dataSourceName: "ds", targetIndexName: "idx" };
const skillset = { name: "body-name", skills: [] };
const dataSource = {
  name: "body-name",
  type: "azureblob" as const,
  credentials: { connectionString: "UseDevelopmentStorage=true" },
  container: { name: "docs" },
};

describe("released protocol contracts", () => {
  it.each(["class", "function", "convenience"] as const)(
    "preserves elapsedInMs on retrieval activity records through the %s",
    async (entryPoint) => {
      const t = transport([
        {
          activity: [
            { id: 1, type: "searchIndex", elapsedMs: 0 },
            { id: 2, type: "file", elapsedMs: 17 },
            { id: 3, type: "agenticReasoning" },
          ],
        },
      ]);
      const request = { intents: [{ type: "semantic" as const, search: "status" }] };
      const result =
        entryPoint === "class"
          ? await new KnowledgeBaseRetrievalClient(endpoint, credential, "base", t).retrieve(
              request,
            )
          : entryPoint === "function"
            ? await retrievalApi.retrieve(
                retrievalApi.createKnowledgeBaseRetrieval(endpoint, credential, "base", t),
                request,
              )
            : await new KnowledgeRetrievalClient(endpoint, "base", credential, t).retrieve(request);
      const activity: BaseKnowledgeBaseActivityRecord[] = result.activity ?? [];
      assert.deepEqual(
        activity.map((record) => record.elapsedInMs),
        [0, 17, undefined],
      );
      for (const record of activity) {
        assert.notProperty(record, "elapsedMs");
      }
    },
  );

  const indexCases = [
    {
      name: "createOrUpdateIndex",
      path: "/indexes('url-name')",
      model: index,
      classCall: (client: SearchIndexClient, options?: UpdateOptions) =>
        client.createOrUpdateIndex(index, "url-name", options),
      functionCall: (context: indexApi.SearchIndexContext, options?: UpdateOptions) =>
        indexApi.createOrUpdateIndex(context, index, "url-name", options),
    },
    {
      name: "createOrUpdateSynonymMap",
      path: "/synonymmaps('url-name')",
      model: synonymMap,
      classCall: (client: SearchIndexClient, options?: UpdateOptions) =>
        client.createOrUpdateSynonymMap(synonymMap, "url-name", options),
      functionCall: (context: indexApi.SearchIndexContext, options?: UpdateOptions) =>
        indexApi.createOrUpdateSynonymMap(context, synonymMap, "url-name", options),
    },
    {
      name: "createOrUpdateAlias",
      path: "/aliases('url-name')",
      model: alias,
      classCall: (client: SearchIndexClient, options?: UpdateOptions) =>
        client.createOrUpdateAlias(alias, "url-name", options),
      functionCall: (context: indexApi.SearchIndexContext, options?: UpdateOptions) =>
        indexApi.createOrUpdateAlias(context, alias, "url-name", options),
    },
    {
      name: "createOrUpdateKnowledgeBase",
      path: "/knowledgebases('url-name')",
      model: knowledgeBase,
      classCall: (client: SearchIndexClient, options?: UpdateOptions) =>
        client.createOrUpdateKnowledgeBase(knowledgeBase, "url-name", options),
      functionCall: (context: indexApi.SearchIndexContext, options?: UpdateOptions) =>
        indexApi.createOrUpdateKnowledgeBase(context, knowledgeBase, "url-name", options),
    },
    {
      name: "createOrUpdateKnowledgeSource",
      path: "/knowledgesources('url-name')",
      model: knowledgeSource,
      classCall: (client: SearchIndexClient, options?: UpdateOptions) =>
        client.createOrUpdateKnowledgeSource(knowledgeSource, "url-name", options),
      functionCall: (context: indexApi.SearchIndexContext, options?: UpdateOptions) =>
        indexApi.createOrUpdateKnowledgeSource(context, knowledgeSource, "url-name", options),
    },
  ];
  const indexerCases = [
    {
      name: "createOrUpdateIndexer",
      path: "/indexers('url-name')",
      model: indexer,
      classCall: (client: SearchIndexerClient, options?: UpdateOptions) =>
        client.createOrUpdateIndexer(indexer, "url-name", options),
      functionCall: (context: indexerApi.SearchIndexerContext, options?: UpdateOptions) =>
        indexerApi.createOrUpdateIndexer(context, indexer, "url-name", options),
    },
    {
      name: "createOrUpdateSkillset",
      path: "/skillsets('url-name')",
      model: skillset,
      classCall: (client: SearchIndexerClient, options?: UpdateOptions) =>
        client.createOrUpdateSkillset(skillset, "url-name", options),
      functionCall: (context: indexerApi.SearchIndexerContext, options?: UpdateOptions) =>
        indexerApi.createOrUpdateSkillset(context, skillset, "url-name", options),
    },
    {
      name: "createOrUpdateDataSourceConnection",
      path: "/datasources('url-name')",
      model: dataSource,
      classCall: (client: SearchIndexerClient, options?: UpdateOptions) =>
        client.createOrUpdateDataSourceConnection(dataSource, "url-name", options),
      functionCall: (context: indexerApi.SearchIndexerContext, options?: UpdateOptions) =>
        indexerApi.createOrUpdateDataSourceConnection(context, dataSource, "url-name", options),
    },
  ];

  for (const entryPoint of ["class", "function"] as const) {
    for (const testCase of [...indexCases, ...indexerCases]) {
      it(`preserves body-first ${testCase.name} on the ${entryPoint}`, async () => {
        const response =
          testCase.name === "createOrUpdateSynonymMap"
            ? { ...synonymMap, synonyms: "a,b" }
            : testCase.model;
        const t = transport([response]);
        const controller = new AbortController();
        const options = {
          ifMatch: '"etag"',
          allowIndexDowntime: true,
          abortSignal: controller.signal,
          requestOptions: { headers: { "x-test": "present" } },
        };
        for (const requestOptions of [undefined, options]) {
          if (indexCases.includes(testCase as (typeof indexCases)[number])) {
            const operation = testCase as (typeof indexCases)[number];
            if (entryPoint === "class") {
              await operation.classCall(
                new SearchIndexClient(endpoint, credential, t),
                requestOptions,
              );
            } else {
              await operation.functionCall(
                indexApi.createSearchIndex(endpoint, credential, t),
                requestOptions,
              );
            }
          } else {
            const operation = testCase as (typeof indexerCases)[number];
            if (entryPoint === "class") {
              await operation.classCall(
                new SearchIndexerClient(endpoint, credential, t),
                requestOptions,
              );
            } else {
              await operation.functionCall(
                indexerApi.createSearchIndexer(endpoint, credential, t),
                requestOptions,
              );
            }
          }
          const request = t.requests[t.requests.length - 1];
          assert.equal(new URL(request.url).pathname, testCase.path);
          assert.equal(request.method, "PUT");
          assert.equal(JSON.parse(String(request.body)).name, "body-name");
          assert.equal(request.headers.get("if-match"), requestOptions?.ifMatch);
          assert.equal(request.headers.get("x-test"), requestOptions ? "present" : undefined);
          if (requestOptions) assert.equal(request.abortSignal, controller.signal);
          if (testCase.name === "createOrUpdateIndex") {
            assert.equal(
              new URL(request.url).searchParams.get("allowIndexDowntime"),
              requestOptions ? "true" : null,
            );
          }
        }
      });
    }

    it(`preserves body-first analyzeText on the ${entryPoint}`, async () => {
      const t = transport([{ tokens: [] }]);
      const parameters = { text: "hotel", analyzerName: "standard.lucene" };
      for (const options of [undefined, { requestOptions: { headers: { "x-test": "present" } } }]) {
        const result =
          entryPoint === "class"
            ? await new SearchIndexClient(endpoint, credential, t).analyzeText(
                parameters,
                "idx",
                options,
              )
            : await indexApi.analyzeText(
                indexApi.createSearchIndex(endpoint, credential, t),
                parameters,
                "idx",
                options,
              );
        const request = t.requests[t.requests.length - 1];
        assert.equal(new URL(request.url).pathname, "/indexes('idx')/search.analyze");
        assert.deepEqual(JSON.parse(String(request.body)), {
          text: "hotel",
          analyzer: "standard.lucene",
        });
        assert.equal(request.headers.get("x-test"), options ? "present" : undefined);
        assert.deepEqual(result.tokens, []);
      }
    });

    const listingCases = [
      {
        name: "getIndexers",
        resource: "indexers",
        model: indexer,
        classCall: (t: { httpClient: HttpClient }, options: indexerApi.GetIndexersOptionalParams) =>
          new SearchIndexerClient(endpoint, credential, t).getIndexers(options),
        functionCall: (
          t: { httpClient: HttpClient },
          options: indexerApi.GetIndexersOptionalParams,
        ) =>
          indexerApi.getIndexers(indexerApi.createSearchIndexer(endpoint, credential, t), options),
      },
      {
        name: "getSkillsets",
        resource: "skillsets",
        model: skillset,
        classCall: (
          t: { httpClient: HttpClient },
          options: indexerApi.GetSkillsetsOptionalParams,
        ) => new SearchIndexerClient(endpoint, credential, t).getSkillsets(options),
        functionCall: (
          t: { httpClient: HttpClient },
          options: indexerApi.GetSkillsetsOptionalParams,
        ) =>
          indexerApi.getSkillsets(indexerApi.createSearchIndexer(endpoint, credential, t), options),
      },
      {
        name: "getDataSourceConnections",
        resource: "dataSources",
        model: dataSource,
        classCall: (
          t: { httpClient: HttpClient },
          options: indexerApi.GetDataSourceConnectionsOptionalParams,
        ) => new SearchIndexerClient(endpoint, credential, t).getDataSourceConnections(options),
        functionCall: (
          t: { httpClient: HttpClient },
          options: indexerApi.GetDataSourceConnectionsOptionalParams,
        ) =>
          indexerApi.getDataSourceConnections(
            indexerApi.createSearchIndexer(endpoint, credential, t),
            options,
          ),
      },
      {
        name: "getSynonymMaps",
        resource: "synonymMaps",
        model: { ...synonymMap, synonyms: "a,b" },
        classCall: (
          t: { httpClient: HttpClient },
          options: indexApi.GetSynonymMapsOptionalParams,
        ) => new SearchIndexClient(endpoint, credential, t).getSynonymMaps(options),
        functionCall: (
          t: { httpClient: HttpClient },
          options: indexApi.GetSynonymMapsOptionalParams,
        ) => indexApi.getSynonymMaps(indexApi.createSearchIndex(endpoint, credential, t), options),
      },
    ];
    for (const testCase of listingCases) {
      it(`restores ${testCase.name} with all pages on the ${entryPoint}`, async () => {
        const nextLink = `${endpoint}/resources?api-version=2026-10-01&$skiptoken=page2`;
        const t = transport([
          { value: [{ ...testCase.model, name: "first" }], "@odata.nextLink": nextLink },
          { value: [{ ...testCase.model, name: "second" }] },
        ]);
        const controller = new AbortController();
        const options = {
          abortSignal: controller.signal,
          requestOptions: { headers: { "x-test": "present" } },
          pageSize: 1,
        };
        const result =
          entryPoint === "class"
            ? await testCase.classCall(t, options)
            : await testCase.functionCall(t, options);
        assert.deepEqual(Object.keys(result), [testCase.resource]);
        const resources = Object.values(result)[0] as Array<{ name: string }>;
        assert.deepEqual(
          resources.map((resource) => resource.name),
          ["first", "second"],
        );
        assert.lengthOf(t.requests, 2);
        assert.include(t.requests[1].url, "skiptoken=page2");
        assert.equal(new URL(t.requests[0].url).searchParams.get("pageSize"), "1");
        for (const request of t.requests) {
          assert.equal(request.headers.get("x-test"), "present");
          assert.equal(request.abortSignal, controller.signal);
        }
      });

      it(`returns an empty result wrapper for ${testCase.name} on the ${entryPoint}`, async () => {
        const t = transport([{ value: [] }]);
        const result =
          entryPoint === "class"
            ? await testCase.classCall(t, {})
            : await testCase.functionCall(t, {});
        expect(result).toEqual({ [testCase.resource]: [] });
      });
    }

    for (const contentType of ["application/json", "text/plain"]) {
      it(`returns a primitive document count on the ${entryPoint} for ${contentType}`, async () => {
        const t = transport([42], 200, contentType);
        const count: number =
          entryPoint === "class"
            ? await new SearchClient(endpoint, credential, "idx", t).getDocumentCount()
            : await searchApi.getDocumentCount(
                searchApi.createSearch(endpoint, credential, "idx", t),
              );
        assert.strictEqual(count, 42);
        const convenience = new ConvenienceSearchClient(endpoint, "idx", credential, t);
        assert.strictEqual(await convenience.getDocumentsCount(), 42);
      });
    }

    it(`preserves document-count HTTP errors on the ${entryPoint}`, async () => {
      const t = transport([{ error: { code: "NotFound", message: "Missing index" } }], 404);
      const result =
        entryPoint === "class"
          ? new SearchClient(endpoint, credential, "idx", t).getDocumentCount()
          : searchApi.getDocumentCount(searchApi.createSearch(endpoint, credential, "idx", t));
      try {
        await result;
        assert.fail("Expected a RestError");
      } catch (error) {
        assert.include(error, { name: "RestError", statusCode: 404 });
      }
    });
  }
});
