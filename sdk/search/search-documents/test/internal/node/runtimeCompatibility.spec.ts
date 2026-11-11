// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, expectTypeOf, it } from "vitest";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { HttpClient, PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import {
  AzureKeyCredential,
  SearchClient,
  SearchIndexClient,
  SearchIndexerClient,
} from "../../../src/index.js";
import { SearchIndexClient as ProtocolSearchIndexClient } from "../../../src/searchIndex/index.js";
import { SearchClient as ProtocolSearchClient } from "../../../src/search/index.js";
import { createSearch, getDocumentCount } from "../../../src/search/api/index.js";
import type {
  AzureOpenAIParameters,
  BaseScoringFunction,
  KnowledgeBase,
  KnowledgeBaseInput,
  KnowledgeBaseModel,
  KnowledgeBaseModelInput,
  KnowledgeSource,
  KnowledgeSourceVectorizer,
  ScoringFunction,
  ScoringFunctionBase,
  SearchOptions,
  VectorQuery,
  VectorSearchVectorizer,
} from "../../../src/index.js";

const endpoint = "https://example.search.windows.net";
const credential = new AzureKeyCredential("key");
const index = { name: "idx", fields: [] };

function transport(
  bodies: unknown[],
  status = 200,
): { requests: PipelineRequest[]; httpClient: HttpClient } {
  const requests: PipelineRequest[] = [];
  return {
    requests,
    httpClient: {
      async sendRequest(request): Promise<PipelineResponse> {
        requests.push(request);
        return {
          request,
          status: request.method === "DELETE" ? 204 : status,
          headers: createHttpHeaders({ "content-type": "application/json" }),
          bodyAsText: JSON.stringify(bodies[Math.min(requests.length - 1, bodies.length - 1)]),
        };
      },
    },
  };
}

const body = (request: PipelineRequest): ReturnType<typeof JSON.parse> =>
  JSON.parse(String(request.body));

describe("GA runtime compatibility in the November preview", () => {
  it("preserves October GA consumer model contracts", () => {
    expectTypeOf<ScoringFunction>().toMatchTypeOf<BaseScoringFunction>();
    expectTypeOf<ScoringFunctionBase>().toMatchTypeOf<BaseScoringFunction>();
    expectTypeOf<ScoringFunction["boost"]>().toEqualTypeOf<number>();
    expectTypeOf<ScoringFunction["fieldName"]>().toEqualTypeOf<string>();
    expectTypeOf<
      KnowledgeBaseModel["azureOpenAIParameters"]
    >().toEqualTypeOf<AzureOpenAIParameters>();
    expectTypeOf<KnowledgeBase["models"]>().toEqualTypeOf<KnowledgeBaseModel[] | undefined>();
    expectTypeOf<KnowledgeBase>().toMatchTypeOf<KnowledgeBaseInput>();
    expectTypeOf<ReturnType<SearchIndexClient["createKnowledgeBase"]>>().toEqualTypeOf<
      Promise<KnowledgeBase>
    >();
    expectTypeOf<ReturnType<SearchIndexClient["createOrUpdateKnowledgeBase"]>>().toEqualTypeOf<
      Promise<KnowledgeBase>
    >();
    expectTypeOf<KnowledgeSourceVectorizer["azureOpenAIParameters"]>().toEqualTypeOf<
      AzureOpenAIParameters | undefined
    >();
    expectTypeOf<VectorSearchVectorizer["kind"]>().toEqualTypeOf<"azureOpenAI" | "customWebApi">();
    expectTypeOf<VectorQuery<object>["kind"]>().toEqualTypeOf<"vector" | "text">();
    expectTypeOf<KnowledgeSource["kind"]>().toEqualTypeOf<
      | "searchIndex"
      | "azureBlob"
      | "indexedSharePoint"
      | "indexedOneLake"
      | "indexedSql"
      | "file"
      | "web"
    >();
    expectTypeOf<SearchOptions<object>["queryType"]>().toEqualTypeOf<
      "simple" | "full" | "semantic" | undefined
    >();
  });

  it("accepts a mutable mixed-model input array without widening the GA model alias", () => {
    const models: KnowledgeBaseModelInput[] = [
      {
        kind: "azureOpenAI",
        azureOpenAIParameters: {
          resourceUrl: "https://example.openai.azure.com",
          deploymentId: "chat",
          modelName: "gpt-4o",
        },
      },
    ];
    models.push(
      { kind: "microsoftRetriever1" },
      {
        kind: "openAICompatible",
        openAICompatibleParameters: {
          uri: "https://gateway.example.com/chat/completions",
          modelName: "gpt-4o",
          managedIdentityAudience: "11111111-2222-3333-4444-555555555555",
        },
      },
    );
    const input: KnowledgeBaseInput = { name: "kb", knowledgeSources: [], models };
    assert.deepEqual(
      input.models?.map((model) => model.kind),
      ["azureOpenAI", "microsoftRetriever1", "openAICompatible"],
    );
    expectTypeOf<KnowledgeBaseModelInput["kind"]>().toEqualTypeOf<
      "azureOpenAI" | "microsoftRetriever1" | "openAICompatible"
    >();
  });

  it.each([undefined, null])(
    "reads GA service statistics with %s knowledge counters",
    async (missing) => {
      const counter = { usage: 0, quota: 100 };
      const t = transport([
        {
          counters: {
            aliasesCount: counter,
            documentCount: counter,
            indexesCount: counter,
            indexersCount: counter,
            dataSourcesCount: counter,
            storageSize: counter,
            synonymMaps: counter,
            skillsetCount: counter,
            vectorIndexSize: counter,
            knowledgeBasesCount: missing,
            knowledgeSourcesCount: missing,
          },
          limits: {},
        },
      ]);
      const clients = [
        new SearchIndexClient(endpoint, credential, {
          serviceVersion: "2026-10-01",
          httpClient: t.httpClient,
        }),
        new ProtocolSearchIndexClient(endpoint, credential, {
          apiVersion: "2026-10-01",
          httpClient: t.httpClient,
        }),
      ];
      for (const client of clients) {
        const { counters } = await client.getServiceStatistics();
        assert.deepEqual(counters.documentCounter, counter);
        assert.deepEqual(counters.vectorIndexSizeCounter, counter);
        assert.isUndefined(counters.knowledgeBaseCounter);
        assert.isUndefined(counters.knowledgeSourceCounter);
      }
      assert.isTrue(
        t.requests.every(
          (request) => new URL(request.url).searchParams.get("api-version") === "2026-10-01",
        ),
      );
    },
  );

  it("preserves preview knowledge counters including zero usage and quota", async () => {
    const counter = { usage: 0, quota: 100 };
    const knowledgeBaseCounter = { usage: 0, quota: 0 };
    const knowledgeSourceCounter = { usage: 2, quota: 10 };
    const t = transport([
      {
        counters: {
          aliasesCount: counter,
          documentCount: counter,
          indexesCount: counter,
          indexersCount: counter,
          dataSourcesCount: counter,
          storageSize: counter,
          synonymMaps: counter,
          skillsetCount: counter,
          vectorIndexSize: counter,
          knowledgeBasesCount: knowledgeBaseCounter,
          knowledgeSourcesCount: knowledgeSourceCounter,
        },
        limits: {},
      },
    ]);
    const client = new SearchIndexClient(endpoint, credential, { httpClient: t.httpClient });
    const { counters } = await client.getServiceStatistics();
    assert.deepEqual(counters.knowledgeBaseCounter, knowledgeBaseCounter);
    assert.deepEqual(counters.knowledgeSourceCounter, knowledgeSourceCounter);
  });

  it("round-trips GA fields for an unrecognized protocol scoring function", async () => {
    const definition = {
      ...index,
      scoringProfiles: [
        {
          name: "custom",
          functions: [
            {
              type: "custom",
              fieldName: "rating",
              boost: 2,
              interpolation: "linear" as const,
            },
          ],
        },
      ],
    };
    const t = transport([definition]);
    const client = new ProtocolSearchIndexClient(endpoint, credential, {
      httpClient: t.httpClient,
    });
    const result = await client.createOrUpdateIndex(definition, "idx");
    assert.deepEqual(body(t.requests[0]).scoringProfiles, definition.scoringProfiles);
    assert.deepEqual(
      result.scoringProfiles?.[0].functions,
      definition.scoringProfiles[0].functions,
    );
  });

  it("preserves numeric protocol and convenience counts", async () => {
    const t = transport([42]);
    const protocol = new ProtocolSearchClient(endpoint, credential, "idx", {
      httpClient: t.httpClient,
    });
    const context = createSearch(endpoint, credential, "idx", { httpClient: t.httpClient });
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    assert.strictEqual(await protocol.getDocumentCount(), 42);
    assert.strictEqual(await getDocumentCount(context), 42);
    assert.equal(await client.getDocumentsCount(), 42);
  });

  it.each([false, true])(
    "preserves protocol argument orders (name first: %s)",
    async (nameFirst) => {
      const t = transport([index, { tokens: [] }, index, { tokens: [] }]);
      const client = new ProtocolSearchIndexClient(endpoint, credential, {
        httpClient: t.httpClient,
      });
      const parameters = { text: "hotel", analyzerName: "standard.lucene" };
      const controller = new AbortController();
      const options = {
        ifMatch: '"etag"',
        allowIndexDowntime: true,
        abortSignal: controller.signal,
        requestOptions: { headers: { "x-test": "present" } },
      };
      for (const requestOptions of [undefined, options]) {
        if (nameFirst) {
          await client.createOrUpdateIndex("hotels", index, requestOptions);
          await client.analyzeText("hotels", parameters, requestOptions);
        } else {
          await client.createOrUpdateIndex(index, "hotels", requestOptions);
          await client.analyzeText(parameters, "hotels", requestOptions);
        }
        const update = t.requests[t.requests.length - 2];
        const analyze = t.requests[t.requests.length - 1];
        assert.equal(new URL(update.url).pathname, "/indexes('hotels')");
        assert.deepEqual(body(update), index);
        assert.equal(update.headers.get("if-match"), requestOptions?.ifMatch);
        assert.equal(
          new URL(update.url).searchParams.get("allowIndexDowntime"),
          requestOptions ? "true" : null,
        );
        assert.equal(new URL(analyze.url).pathname, "/indexes('hotels')/search.analyze");
        assert.deepEqual(body(analyze), { text: "hotel", analyzer: "standard.lucene" });
        assert.equal(analyze.headers.get("x-test"), requestOptions ? "present" : undefined);
        if (requestOptions) assert.equal(analyze.abortSignal, controller.signal);
      }
    },
  );

  it.each(["index", "indexer", "skillset"] as const)(
    "round-trips %s ETags for conditional updates and deletes",
    async (resource) => {
      const t = transport([
        {
          ...index,
          dataSourceName: "ds",
          targetIndexName: "idx",
          skills: [],
          "@odata.etag": '"etag"',
        },
      ]);
      const indexes = new SearchIndexClient(endpoint, credential, { httpClient: t.httpClient });
      const indexers = new SearchIndexerClient(endpoint, credential, { httpClient: t.httpClient });
      const result =
        resource === "index"
          ? await indexes.getIndex("idx")
          : resource === "indexer"
            ? await indexers.getIndexer("idx")
            : await indexers.getSkillset("idx");
      assert.equal(result.etag, '"etag"');
      if (resource === "index") {
        const definition = await indexes.getIndex("idx");
        await indexes.createOrUpdateIndex(definition, { onlyIfUnchanged: true });
        await indexes.deleteIndex(definition, { onlyIfUnchanged: true });
      } else if (resource === "indexer") {
        const definition = await indexers.getIndexer("idx");
        await indexers.createOrUpdateIndexer(definition, { onlyIfUnchanged: true });
        await indexers.deleteIndexer(definition, { onlyIfUnchanged: true });
      } else {
        const definition = await indexers.getSkillset("idx");
        await indexers.createOrUpdateSkillset(definition, { onlyIfUnchanged: true });
        await indexers.deleteSkillset(definition, { onlyIfUnchanged: true });
      }
      assert.equal(t.requests[2].headers.get("if-match"), '"etag"');
      assert.equal(body(t.requests[2])["@odata.etag"], '"etag"');
      assert.equal(t.requests[3].headers.get("if-match"), '"etag"');
    },
  );

  it("preserves document fields while separating search and suggestion metadata", async () => {
    const document = { id: "1", score: 42, highlights: "document", text: "document text" };
    const t = transport([
      { value: [{ ...document, "@search.score": 1 }] },
      { value: [{ ...document, "@search.text": "suggestion" }] },
    ]);
    const client = new SearchClient<typeof document>(endpoint, "idx", credential, {
      httpClient: t.httpClient,
    });
    const result = await client.search("hotel");
    const first = await result.results.next();
    assert.deepEqual(first.value.document, document);
    assert.equal(first.value.score, 1);
    const suggestions = await client.suggest("hotel", "sg");
    assert.deepEqual(suggestions.results[0].document, document);
    assert.equal(suggestions.results[0].text, "suggestion");
  });

  it("round-trips custom analyzers and serializes newly constructed Web API vectorizers", async () => {
    const t = transport([
      {
        ...index,
        analyzers: [
          {
            "@odata.type": "#Microsoft.Azure.Search.CustomAnalyzer",
            name: "custom",
            tokenizer: "standard_v2",
          },
        ],
      },
    ]);
    const client = new SearchIndexClient(endpoint, credential, { httpClient: t.httpClient });
    const result = await client.getIndex("idx");
    await client.createOrUpdateIndex({
      ...result,
      vectorSearch: {
        vectorizers: [
          {
            kind: "customWebApi",
            vectorizerName: "custom",
            parameters: { uri: "https://example.com/vectorize", httpMethod: "POST" },
          },
        ],
      },
    });
    assert.equal(body(t.requests[1]).analyzers[0].tokenizer, "standard_v2");
    assert.equal(
      body(t.requests[1]).vectorSearch.vectorizers[0].customWebApiParameters.uri,
      "https://example.com/vectorize",
    );
  });

  it("serializes and round-trips PII and Split convenience aliases", async () => {
    const t = transport(
      [
        {
          name: "skills",
          skills: [
            {
              "@odata.type": "#Microsoft.Skills.Text.PIIDetectionSkill",
              inputs: [],
              outputs: [],
              maskingCharacter: "#",
              piiCategories: ["Person"],
            },
            {
              "@odata.type": "#Microsoft.Skills.Text.SplitSkill",
              inputs: [],
              outputs: [],
              maximumPageLength: 1000,
            },
          ],
        },
      ],
      201,
    );
    const client = new SearchIndexerClient(endpoint, credential, { httpClient: t.httpClient });
    const definition = {
      name: "skills",
      skills: [
        {
          odatatype: "#Microsoft.Skills.Text.PIIDetectionSkill" as const,
          inputs: [],
          outputs: [],
          maskingCharacter: "#",
          categories: ["Person"],
        },
        {
          odatatype: "#Microsoft.Skills.Text.SplitSkill" as const,
          inputs: [],
          outputs: [],
          maxPageLength: 1000,
        },
      ],
    };
    const result = await client.createSkillset(definition);
    assert.deepInclude(result.skills[0], { maskingCharacter: "#", categories: ["Person"] });
    assert.deepInclude(result.skills[1], { maxPageLength: 1000 });
    await client.createOrUpdateSkillset(result);
    for (const request of t.requests) {
      assert.equal(body(request).skills[0].maskingCharacter, "#");
      assert.deepEqual(body(request).skills[0].piiCategories, ["Person"]);
      assert.equal(body(request).skills[1].maximumPageLength, 1000);
    }
  });

  it("round-trips dynamic indexer settings alongside November ACL configuration", async () => {
    const configuration = { customSetting: "enabled", parsingMode: "json", refreshAllAcls: false };
    const t = transport([
      {
        name: "ixr",
        dataSourceName: "ds",
        targetIndexName: "idx",
        parameters: { configuration },
      },
    ]);
    const client = new SearchIndexerClient(endpoint, credential, { httpClient: t.httpClient });
    const result = await client.getIndexer("ixr");
    assert.equal(result.parameters?.configuration?.customSetting, "enabled");
    await client.createOrUpdateIndexer(result);
    assert.deepEqual(body(t.requests[1]).parameters.configuration, configuration);
  });

  it("retains continuation tokens on mapped resource pages", async () => {
    const next = `${endpoint}/indexes?$skiptoken=second`;
    const t = transport([
      { value: [index], "@odata.nextLink": next },
      { value: [{ name: "second", fields: [] }] },
    ]);
    const client = new SearchIndexClient(endpoint, credential, { httpClient: t.httpClient });
    const first = await client.listIndexes().byPage().next();
    assert.equal(first.value.continuationToken, next);
    const second = await client
      .listIndexes()
      .byPage({ continuationToken: first.value.continuationToken })
      .next();
    assert.equal(second.value[0].name, "second");
    assert.isUndefined(second.value.continuationToken);
  });

  it("resumes the original search, projection, vector and semantic parameters", async () => {
    const next = {
      search: "hotel",
      select: "id",
      searchFields: "description",
      count: true,
      skip: 1,
      semanticFields: "description",
      vectorQueries: [
        {
          kind: "text",
          text: "hotel",
          fields: "embedding",
          filterOverride: "tenant eq 'a'",
          perDocumentVectorLimit: 0,
        },
      ],
    };
    const continuation = {
      value: [],
      "@odata.nextLink": `${endpoint}/indexes('idx')/docs/search.post.search?api-version=2026-11-01-preview`,
      "@search.nextPageParameters": next,
    };
    const t = transport([continuation, continuation, { value: [] }]);
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    const result = await client.search("hotel");
    const first = await result.results.byPage().next();
    const resumed = await client.search("different");
    await resumed.results.byPage({ continuationToken: first.value.continuationToken }).next();
    assert.deepEqual(body(t.requests[3]), next);
  });

  it.each(["documents", "keys"] as const)(
    "forwards deleteDocuments %s options",
    async (overload) => {
      const t = transport([{ value: [] }]);
      const client = new SearchClient<{ id: string }>(endpoint, "idx", credential, {
        httpClient: t.httpClient,
      });
      const controller = new AbortController();
      let responses = 0;
      const options = {
        abortSignal: controller.signal,
        onResponse: () => {
          responses++;
        },
        requestOptions: { headers: { "x-test": "present" } },
      };
      if (overload === "documents") await client.deleteDocuments([{ id: "1" }], options);
      else await client.deleteDocuments("id", ["1"], options);
      assert.equal(t.requests[0].abortSignal, controller.signal);
      assert.equal(t.requests[0].headers.get("x-test"), "present");
      assert.equal(responses, 1);
    },
  );

  it("honors partial-failure handling on the document deletion overload", async () => {
    const t = transport(
      [{ value: [{ key: "1", status: false, statusCode: 400, errorMessage: "bad" }] }],
      207,
    );
    const client = new SearchClient<{ id: string }>(endpoint, "idx", credential, {
      httpClient: t.httpClient,
    });
    await expect(
      client.deleteDocuments([{ id: "1" }], { throwOnAnyFailure: true }),
    ).rejects.toMatchObject({
      results: [{ succeeded: false }],
    });
  });

  it("forwards semantic fields and an explicitly zero answer threshold", async () => {
    const t = transport([{ value: [] }]);
    const client = new SearchClient(endpoint, "idx", credential, { httpClient: t.httpClient });
    await client.search("hotel", {
      queryType: "semantic",
      semanticSearchOptions: {
        semanticFields: ["description"],
        answers: { answerType: "extractive", threshold: 0 },
      },
    });
    assert.equal(body(t.requests[0]).semanticFields, "description");
    assert.equal(body(t.requests[0]).answers, "extractive|threshold-0");
  });
});
