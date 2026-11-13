// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { AzureKeyCredential } from "@azure/core-auth";
import { AbortError } from "@azure/abort-controller";
import { KnowledgeRetrievalClient } from "../../src/knowledgeRetrievalClient.js";
import { SearchClient } from "../../src/searchClient.js";
import { SearchClient as ProtocolSearchClient } from "../../src/search/index.js";
import { SearchIndexClient as ProtocolSearchIndexClient } from "../../src/searchIndex/index.js";
import { SearchIndexClient } from "../../src/searchIndexClient.js";
import { SearchIndexerClient } from "../../src/searchIndexerClient.js";
import type {
  AzureBlobKnowledgeSource,
  ChatCompletionSkill,
  IndexedOneLakeKnowledgeSource,
  KnowledgeBase,
  KnowledgeBaseInput,
  KnowledgeBaseModelInput,
  KnowledgeBaseOpenAICompatibleModel,
  KnowledgeSourceFileIngestionPoller,
  SearchIndex,
  SearchIndexer,
  SearchIndexerDataSourceConnection,
  SearchClientOptions,
  VectorQueryTopicGraphUnion,
} from "../../src/index.js";

const endpoint = "https://example.search.windows.net";
const credential = new AzureKeyCredential("not-a-real-key");

interface MockReply {
  body: unknown;
  bodyAsText?: string;
  status?: number;
  headers?: Record<string, string>;
}

function mockOptions(replies: MockReply[], requests: PipelineRequest[]): SearchClientOptions {
  let offset = 0;
  return {
    retryOptions: { maxRetries: 0 },
    additionalPolicies: [
      {
        position: "perCall",
        policy: {
          name: "november-preview-mock",
          async sendRequest(request): Promise<PipelineResponse> {
            if (request.abortSignal?.aborted) {
              throw new AbortError();
            }
            requests.push(request);
            const reply = replies[offset++];
            assert.isDefined(reply, "Unexpected HTTP request");
            return {
              request,
              status: reply.status ?? 200,
              headers: createHttpHeaders({
                "content-type": "application/json",
                ...reply.headers,
              }),
              bodyAsText: reply.bodyAsText ?? JSON.stringify(reply.body),
            };
          },
        },
      },
    ],
  };
}

describe("2026-11-01-preview convenience integration", () => {
  it("serializes graph constraints and returns rows, provenance and diagnostics", async () => {
    const requests: PipelineRequest[] = [];
    const client = new SearchClient(
      endpoint,
      "edges",
      credential,
      mockOptions(
        [
          {
            body: {
              "@odata.count": 1,
              value: [{ entity: "Ada", "@search.graphProvenance": { kind: "none" } }],
              "@search.graphStats": { executionMode: "execute", queryCount: 2, totalMs: 12 },
              "@search.graphDiagnostics": [
                {
                  code: "bounded",
                  severity: "warning",
                  phase: "execution",
                  message: "Bounded query",
                  span: null,
                  suggestions: ["Limit the result set"],
                },
              ],
              "@search.graphExplain": { logical: { operator: "scan" } },
            },
          },
        ],
        requests,
      ),
    );

    const result = await client.graph("MATCH (n) RETURN n", {
      filter: "confidence gt 0.8",
      executionMode: "execute",
      explain: ["logical"],
      includeDiagnostics: true,
      provenance: { kind: "none" },
      querySourceAuthorization: "user-assertion",
      vectorQueries: [
        { kind: "vector", vector: [1, 0], fields: ["embedding"], topicGraph: { kind: "none" } },
      ],
    });

    assert.include(requests[0].url, "/docs/search.graph");
    assert.include(requests[0].url, "api-version=2026-11-01-preview");
    assert.equal(requests[0].headers.get("x-ms-query-source-authorization"), "user-assertion");
    const body = JSON.parse(requests[0].body as string);
    assert.equal(body.gql, "MATCH (n) RETURN n");
    assert.equal(body.vectorQueries[0].fields, "embedding");
    assert.equal(body.vectorQueries[0].topicGraph.kind, "none");
    assert.equal(body.includeDiagnostics, true);
    assert.equal(result.value[0].additionalProperties?.entity, "Ada");
    assert.equal(result.statistics?.queryCount, 2);
    expect(result.diagnostics?.[0]).toEqual({
      code: "bounded",
      severity: "warning",
      phase: "execution",
      message: "Bounded query",
      span: null,
      suggestions: ["Limit the result set"],
    });
  });

  it.each([undefined, { kind: "ids" }])(
    "preserves a projected provenance column alongside %s graph metadata",
    async (provenance) => {
      const client = new SearchClient(
        endpoint,
        "edges",
        credential,
        mockOptions(
          [
            {
              body: {
                value: [
                  {
                    entity: "Ada",
                    provenance: "customer-column",
                    ...(provenance && { "@search.graphProvenance": provenance }),
                  },
                ],
              },
            },
          ],
          [],
        ),
      );
      const result = await client.graph("MATCH (n) RETURN n");
      assert.deepEqual(result.value[0].additionalProperties, {
        entity: "Ada",
        provenance: "customer-column",
      });
      assert.equal(result.value[0].provenance?.kind, provenance?.kind);
    },
  );

  it.each<MockReply>([
    ...[401, 429, 502].map((status) => ({
      status,
      body: undefined,
      bodyAsText: "Upstream error",
      headers: { "content-type": "text/plain" },
    })),
    { status: 400, body: { message: "Invalid request" } },
    { status: 400, body: { error: "Invalid request" } },
    {
      status: 400,
      body: {
        error: { code: "InvalidGraphQuery", message: "Invalid query" },
        "@search.graphDiagnostics": { message: "Malformed diagnostics" },
      },
    },
  ])("preserves HTTP $status errors with malformed graph bodies", async (reply) => {
    const client = new SearchClient(endpoint, "edges", credential, mockOptions([reply], []));
    await expect(client.graph("invalid")).rejects.toMatchObject({
      name: "RestError",
      statusCode: reply.status,
    });
  });

  it("preserves structured graph failures", async () => {
    const client = new SearchClient(
      endpoint,
      "edges",
      credential,
      mockOptions(
        [{ status: 400, body: { error: { code: "InvalidGraphQuery", message: "Invalid query" } } }],
        [],
      ),
    );
    await expect(client.graph("invalid")).rejects.toMatchObject({
      code: "InvalidGraphQuery",
      statusCode: 400,
      details: { error: { code: "InvalidGraphQuery", message: "Invalid query" } },
    });
  });

  it("serializes topic-graph variants and agentic options through the protocol client", async () => {
    const requests: PipelineRequest[] = [];
    const client = new ProtocolSearchClient(
      endpoint,
      credential,
      "index",
      mockOptions(
        [
          {
            body: {
              value: [],
              "@search.debug": {
                agentic: {
                  terminationReason: "modelStopped",
                  subQueries: [{ search: "question", iteration: 1 }],
                  usage: { agenticPlanningTokens: 0, reasoningTokens: 42 },
                },
              },
            },
          },
        ],
        requests,
      ),
    );
    const strategies: VectorQueryTopicGraphUnion[] = [
      { kind: "none" },
      { kind: "diverse", diversityFactor: 0, minDiversityPoolSize: 250 },
      { kind: "diverse", diversityFactor: 1, minDiversityPoolSize: 10000 },
      { kind: "balanced", minDiversityPoolSize: 1000 },
    ];
    const result = await client.searchPost({
      searchText: "question",
      queryType: "agentic",
      moreLikeThis: "document-1",
      agenticOptions: { maxRuntimeInSeconds: 10 },
      debug: "agentic",
      vectorQueries: strategies.map((topicGraph) => ({
        kind: "vector",
        vector: [1, 0],
        fields: "embedding",
        topicGraph,
      })),
    });
    const body = JSON.parse(requests[0].body as string);
    assert.deepEqual(
      body.vectorQueries.map((q: { topicGraph: unknown }) => q.topicGraph),
      strategies,
    );
    assert.equal(body.moreLikeThis, "document-1");
    assert.equal(body.queryType, "agentic");
    assert.equal(body.agenticOptions.maxRuntimeInSeconds, 10);
    assert.equal(body.debug, "agentic");
    assert.equal(result.debugInfo?.agentic?.terminationReason, "modelStopped");
    assert.deepEqual(result.debugInfo?.agentic?.subQueries, [{ search: "question", iteration: 1 }]);
    assert.deepEqual(result.debugInfo?.agentic?.usage, {
      agenticPlanningTokens: 0,
      reasoningTokens: 42,
    });
  });

  it("round trips topic profiles with GA scoring functions and vectorizers", async () => {
    const requests: PipelineRequest[] = [];
    const index: SearchIndex = {
      name: "topics",
      fields: [
        { name: "id", type: "Edm.String", key: true },
        {
          name: "embedding",
          type: "Collection(Edm.Single)",
          searchable: true,
          vectorSearchDimensions: 2,
          vectorSearchProfileName: "vectors",
          topicGraphProfile: "topics",
        },
      ],
      vectorSearch: {
        profiles: [{ name: "vectors", algorithmConfigurationName: "hnsw" }],
        algorithms: [{ name: "hnsw", kind: "hnsw" }],
        topicGraphProfiles: [{ name: "topics", indexName: "graph", defaultKind: "balanced" }],
        vectorizers: [
          {
            vectorizerName: "azure",
            kind: "azureOpenAI",
            parameters: {
              resourceUrl: "https://example.openai.azure.com",
              deploymentId: "embedding",
              modelName: "text-embedding-3-small",
            },
          },
        ],
      },
      scoringProfiles: [
        {
          name: "rating",
          functions: [
            {
              type: "magnitude",
              fieldName: "rating",
              boost: 2,
              parameters: { boostingRangeStart: 0, boostingRangeEnd: 5 },
            },
          ],
        },
      ],
      oneLakeSecuritySource: { fabricWorkspaceId: "workspace", lakehouseId: "lakehouse" },
      sharePointConnectorAppRegistration: {
        applicationId: "app-id",
        federatedCredentialId: "credential-id",
        tenantId: "tenant-id",
      },
      graphProfile: {
        kind: "document",
        provenanceIndexName: "docs",
        fields: {
          assertionIdField: "assertionId",
          factIdField: "factId",
          subjectField: "subject",
          predicateField: "predicate",
          objectField: "object",
          objectStringField: "objectString",
          objectDoubleField: "objectDouble",
          objectBoolField: "objectBool",
          objectDateTimeField: "objectDateTime",
          subjectTypeField: "subjectType",
          subjectIdField: "subjectId",
          objectTypeField: "objectType",
          objectIdField: "objectId",
          confidenceField: "confidence",
          subjectConfidenceField: "subjectConfidence",
          predicateConfidenceField: "predicateConfidence",
          objectConfidenceField: "objectConfidence",
          sourceChunkIdField: "sourceChunkId",
          sourceParentIdField: "sourceParentId",
          graphNameField: "graphName",
          subjectIdDisplayNameField: "subjectDisplayName",
          objectIdDisplayNameField: "objectDisplayName",
        },
      },
    };
    const wire = {
      ...index,
      fields: [{ name: "embedding", type: "Collection(Edm.Single)", topicGraphProfile: "topics" }],
      scoringProfiles: [
        {
          name: "rating",
          functions: [
            {
              type: "magnitude",
              fieldName: "rating",
              boost: 2,
              magnitude: { boostingRangeStart: 0, boostingRangeEnd: 5 },
            },
          ],
        },
      ],
      vectorSearch: {
        ...index.vectorSearch,
        vectorizers: [
          {
            name: "azure",
            kind: "azureOpenAI",
            azureOpenAIParameters: {
              resourceUri: "https://example.openai.azure.com",
              deploymentId: "embedding",
              modelName: "text-embedding-3-small",
            },
          },
        ],
        topicGraphProfiles: [{ name: "topics", indexName: "graph", defaultKind: "balanced" }],
      },
    };
    const client = new SearchIndexClient(
      endpoint,
      credential,
      mockOptions([{ body: wire }], requests),
    );
    const actual = await client.createOrUpdateIndex(index);
    const body = JSON.parse(requests[0].body as string);
    assert.equal(body.fields[1].topicGraphProfile, "topics");
    assert.deepEqual(body.scoringProfiles[0].functions[0], {
      type: "magnitude",
      fieldName: "rating",
      boost: 2,
      magnitude: { boostingRangeStart: 0, boostingRangeEnd: 5 },
    });
    expect(actual.scoringProfiles).toMatchObject(index.scoringProfiles ?? []);
    assert.equal(actual.vectorSearch?.topicGraphProfiles?.[0].defaultKind, "balanced");
    assert.equal(actual.vectorSearch?.vectorizers?.[0].kind, "azureOpenAI");
    assert.equal(actual.fields[0].type, "Collection(Edm.Single)");
    assert.deepEqual(actual.oneLakeSecuritySource, index.oneLakeSecuritySource);
    assert.deepEqual(
      actual.sharePointConnectorAppRegistration,
      index.sharePointConnectorAppRegistration,
    );
    assert.deepEqual(body.graphProfile, index.graphProfile);
    assert.deepEqual(actual.graphProfile, index.graphProfile);
  });

  it("preserves restored indexer ACL configuration", async () => {
    const requests: PipelineRequest[] = [];
    const indexer = {
      name: "indexer",
      dataSourceName: "sharepoint",
      targetIndexName: "docs",
      parameters: {
        configuration: {
          refreshAllAcls: true,
        },
      },
    };
    const client = new SearchIndexerClient(
      endpoint,
      credential,
      mockOptions([{ body: indexer }], requests),
    );
    const actual = await client.createOrUpdateIndexer(indexer);
    assert.deepEqual(
      JSON.parse(requests[0].body as string).parameters.configuration,
      indexer.parameters.configuration,
    );
    assert.equal(actual.parameters?.configuration?.refreshAllAcls, true);
  });

  it("round trips tools, filter facet auto-configuration, models and ingestion cache", async () => {
    const requests: PipelineRequest[] = [];
    const base: KnowledgeBase = {
      name: "kb",
      knowledgeSources: [{ name: "source" }],
      tools: [
        {
          name: "lookup",
          description: "Lookup facts",
          knowledgeSources: [
            {
              name: "source",
              alwaysQuerySource: true,
              rerankerThreshold: 0,
              filterAddOn: "category eq 'manual'",
              maxOutputDocuments: 50,
              failOnError: true,
            },
          ],
        },
      ],
      models: [
        {
          kind: "azureOpenAI",
          azureOpenAIParameters: {
            resourceUrl: "https://example.openai.azure.com",
            deploymentId: "chat",
            modelName: "gpt-6-sol",
          },
        },
      ],
    };
    const source = {
      name: "source",
      kind: "searchIndex" as const,
      searchIndexParameters: {
        searchIndexName: "docs",
        topicGraph: { kind: "diverse" as const, diversityFactor: 0.4 },
        queryHints: {
          filters: [
            { field: "category", autoConfiguration: { cacheTtl: 60, maxFacetValueCount: 50 } },
          ],
        },
      },
    };
    const blob = {
      name: "blob",
      kind: "azureBlob" as const,
      azureBlobParameters: {
        connectionString: "ResourceId=/subscriptions/example",
        containerName: "docs",
        graphExtraction: {
          graphName: "facts",
          pageDegreeOfParallelism: 2,
          grounding: { index: { indexName: "grounding", vectorFieldName: "embedding" } },
        },
        topicGraph: { kind: "balanced" as const },
        ingestionParameters: {
          cache: {
            storageConnectionString: "ResourceId=/subscriptions/cache",
            enableReprocessing: true,
          },
          embeddingModel: {
            kind: "azureOpenAI" as const,
            azureOpenAIParameters: {
              resourceUrl: "https://example.openai.azure.com",
              deploymentId: "embedding",
              modelName: "text-embedding-3-small",
            },
          },
        },
      },
    };
    const client = new SearchIndexClient(
      endpoint,
      credential,
      mockOptions(
        [
          {
            body: {
              ...base,
              models: [
                {
                  kind: "azureOpenAI",
                  azureOpenAIParameters: {
                    resourceUri: "https://example.openai.azure.com",
                    deploymentId: "chat",
                    modelName: "gpt-6-sol",
                  },
                },
              ],
            },
          },
          { body: source },
          { body: blob },
        ],
        requests,
      ),
    );
    const actual = await client.createOrUpdateKnowledgeBase(base);
    assert.deepEqual(JSON.parse(requests[0].body as string).tools, base.tools);
    expect(actual.tools).toMatchObject(base.tools ?? []);
    expect(actual.models).toMatchObject(base.models ?? []);
    const createdSource = await client.createOrUpdateKnowledgeSource(source);
    expect(createdSource).toMatchObject(source);
    const createdBlob = (await client.createOrUpdateKnowledgeSource(
      blob,
    )) as AzureBlobKnowledgeSource;
    const sourceBody = JSON.parse(requests[1].body as string);
    assert.equal(sourceBody.searchIndexParameters.queryHints.filters[0].fieldValues, undefined);
    assert.equal(
      sourceBody.searchIndexParameters.queryHints.filters[0].autoConfiguration.maxFacetValueCount,
      50,
    );
    const blobBody = JSON.parse(requests[2].body as string);
    assert.equal(blobBody.azureBlobParameters.ingestionParameters.cache.enableReprocessing, true);
    assert.equal(blobBody.azureBlobParameters.graphExtraction.graphName, "facts");
    assert.deepEqual(
      createdBlob.azureBlobParameters.graphExtraction?.grounding?.index,
      blob.azureBlobParameters.graphExtraction.grounding.index,
    );
    assert.equal(createdBlob.kind, "azureBlob");
    if (createdBlob.kind === "azureBlob") {
      assert.equal(createdBlob.azureBlobParameters.topicGraph?.kind, "balanced");
      assert.equal(createdBlob.azureBlobParameters.graphExtraction?.graphName, "facts");
      assert.equal(
        createdBlob.azureBlobParameters.ingestionParameters?.embeddingModel?.kind,
        "azureOpenAI",
      );
    }
  });

  it("retrieves tool-scoped graph activities, references and topic controls", async () => {
    const requests: PipelineRequest[] = [];
    const client = new KnowledgeRetrievalClient(
      endpoint,
      "kb",
      credential,
      mockOptions(
        [
          {
            body: {
              response: [],
              activity: [
                {
                  id: 1,
                  type: "graphSearch",
                  elapsedMs: 12,
                  knowledgeSourceName: "blob",
                  graphSearchArguments: {
                    naturalLanguageQuery: "What is connected?",
                    graphIndexName: "facts",
                    gql: "MATCH (n) RETURN n",
                    outcome: "Success",
                    attempts: 1,
                    inputTokens: 20,
                    outputTokens: 10,
                    modelElapsedMs: 8,
                    modelName: "gpt-6-sol",
                  },
                },
              ],
              references: [{ id: "ref", type: "graphSearch", graphIndexName: "facts" }],
            },
          },
        ],
        requests,
      ),
    );
    const result = await client.retrieve({
      toolName: "lookup",
      intents: [{ type: "semantic", search: "What is connected?" }],
      knowledgeSourceParams: [
        {
          kind: "azureBlob",
          knowledgeSourceName: "blob",
          topicGraph: { kind: "balanced" },
          graphParameters: {
            includeQuery: true,
            provenance: { kind: "hydrate", hydrateDocuments: { select: "id,title", top: 100 } },
          },
        },
      ],
    });
    const body = JSON.parse(requests[0].body as string);
    assert.equal(body.toolName, "lookup");
    assert.equal(body.knowledgeSourceParams[0].topicGraph.kind, "balanced");
    assert.equal(body.knowledgeSourceParams[0].graphParameters.includeQuery, true);
    assert.deepEqual(body.knowledgeSourceParams[0].graphParameters.provenance, {
      kind: "hydrate",
      hydrateDocuments: { select: "id,title", top: 100 },
    });
    assert.equal(result.activity?.[0].type, "graphSearch");
    assert.equal(result.activity?.[0].elapsedMs, 12);
    expect(result.activity?.[0]).toMatchObject({
      graphSearchArguments: {
        naturalLanguageQuery: "What is connected?",
        graphIndexName: "facts",
        gql: "MATCH (n) RETURN n",
        outcome: "Success",
        attempts: 1,
        inputTokens: 20,
        outputTokens: 10,
        modelElapsedMs: 8,
        modelName: "gpt-6-sol",
      },
    });
    assert.equal(result.references?.[0].type, "graphSearch");
  });

  it.each(["stored headers", "managed identity"] as const)(
    "preserves OpenAI-compatible GPT-6 model configuration with %s through the protocol client",
    async (authentication) => {
      const requests: PipelineRequest[] = [];
      const identity = {
        odatatype: "#Microsoft.Azure.Search.DataUserAssignedIdentity" as const,
        resourceId:
          "/subscriptions/example/providers/Microsoft.ManagedIdentity/userAssignedIdentities/model",
      };
      const parameters: KnowledgeBaseOpenAICompatibleModel["openAICompatibleParameters"] = {
        uri: "https://gateway.example.com/models/chat/responses?deployment=preview",
        modelName: "gpt-6-sol",
        ...(authentication === "stored headers"
          ? { headers: { "x-test-key": "not-a-real-key" } }
          : {
              managedIdentityAudience: "00000000-0000-0000-0000-000000000001",
              authIdentity: identity,
            }),
      };
      const { headers, authIdentity, ...readable } = parameters;
      const wire = {
        name: "kb",
        knowledgeSources: [{ name: "source" }],
        models: [
          {
            kind: "openAICompatible",
            openAICompatibleParameters: {
              ...readable,
              ...(authIdentity
                ? {
                    authIdentity: {
                      "@odata.type": identity.odatatype,
                      userAssignedIdentity: identity.resourceId,
                    },
                  }
                : {}),
            },
          },
        ],
      };
      const client = new ProtocolSearchIndexClient(
        endpoint,
        credential,
        mockOptions([{ body: wire }, { body: wire }], requests),
      );
      const created = await client.createOrUpdateKnowledgeBase("kb", {
        name: "kb",
        knowledgeSources: [{ name: "source" }],
        models: [{ kind: "openAICompatible", openAICompatibleParameters: parameters }],
      });
      const sent = JSON.parse(requests[0].body as string).models[0].openAICompatibleParameters;
      assert.equal(sent.uri, parameters.uri);
      assert.equal(sent.modelName, parameters.modelName);
      assert.deepEqual(sent.headers, headers);
      assert.equal(sent.managedIdentityAudience, parameters.managedIdentityAudience);
      if (authIdentity) {
        assert.deepEqual(sent.authIdentity, {
          "@odata.type": identity.odatatype,
          userAssignedIdentity: identity.resourceId,
        });
      }
      expect(created.models?.[0]).toMatchObject({
        kind: "openAICompatible",
        openAICompatibleParameters: readable,
      });
      await client.createOrUpdateKnowledgeBase("kb", created);
      assert.notProperty(
        JSON.parse(requests[1].body as string).models[0].openAICompatibleParameters,
        "headers",
      );
      assert.isTrue(requests.every((request) => new URL(request.url).origin === endpoint));
    },
  );

  it("round trips OpenAI-compatible index vectorizers without returned credentials", async () => {
    const requests: PipelineRequest[] = [];
    const parameters = {
      uri: "https://gateway.example.com/embeddings?deployment=small",
      modelName: "text-embedding-3-small",
      dimensions: 2,
      headers: { "x-test-key": "not-a-real-key" },
    };
    const definition = {
      name: "vectors",
      fields: [
        { name: "id", type: "Edm.String", key: true },
        {
          name: "embedding",
          type: "Collection(Edm.Single)",
          searchable: true,
          vectorSearchDimensions: 2,
          vectorSearchProfileName: "vectors",
        },
      ],
      vectorSearch: {
        algorithms: [{ name: "hnsw", kind: "hnsw" as const }],
        profiles: [
          { name: "vectors", algorithmConfigurationName: "hnsw", vectorizerName: "gateway" },
        ],
        vectorizers: [
          {
            vectorizerName: "gateway",
            kind: "openAICompatible" as const,
            openAICompatibleParameters: parameters,
          },
        ],
      },
    };
    const readable = { ...parameters, headers: undefined };
    const client = new ProtocolSearchIndexClient(
      endpoint,
      credential,
      mockOptions(
        [
          {
            body: {
              ...definition,
              vectorSearch: {
                ...definition.vectorSearch,
                vectorizers: [
                  {
                    name: "gateway",
                    kind: "openAICompatible",
                    openAICompatibleParameters: readable,
                  },
                ],
              },
            },
          },
        ],
        requests,
      ),
    );
    const actual = await client.createOrUpdateIndex(definition, definition.name);
    const sent = JSON.parse(requests[0].body as string).vectorSearch.vectorizers[0];
    assert.deepEqual(sent, {
      name: "gateway",
      kind: "openAICompatible",
      openAICompatibleParameters: parameters,
    });
    expect(actual.vectorSearch?.vectorizers?.[0]).toMatchObject({
      vectorizerName: "gateway",
      kind: "openAICompatible",
      openAICompatibleParameters: readable,
    });
  });

  it("preserves OpenAI-compatible embedding and image verbalization models during ingestion", async () => {
    const requests: PipelineRequest[] = [];
    const ingestionParameters = {
      contentExtractionMode: "minimal",
      embeddingModel: {
        kind: "openAICompatible" as const,
        openAICompatibleParameters: {
          uri: "https://gateway.example.com/embeddings",
          modelName: "text-embedding-3-large",
          dimensions: 3072,
          managedIdentityAudience: "00000000-0000-0000-0000-000000000001",
        },
      },
      chatCompletionModel: {
        kind: "openAICompatible" as const,
        openAICompatibleParameters: {
          uri: "https://gateway.example.com/chat/completions",
          modelName: "gpt-4o",
          managedIdentityAudience: "00000000-0000-0000-0000-000000000001",
        },
      },
    };
    const definition = {
      name: "blob",
      kind: "azureBlob" as const,
      azureBlobParameters: {
        connectionString: "ResourceId=/subscriptions/example",
        containerName: "documents",
        ingestionParameters,
      },
    };
    const client = new ProtocolSearchIndexClient(
      endpoint,
      credential,
      mockOptions([{ body: definition }], requests),
    );
    const actual = await client.createOrUpdateKnowledgeSource("blob", definition);
    assert.deepEqual(
      JSON.parse(requests[0].body as string).azureBlobParameters.ingestionParameters,
      ingestionParameters,
    );
    expect(actual).toMatchObject(definition);
  });

  it("preserves gateway chat-completion skills through the convenience layer", async () => {
    const requests: PipelineRequest[] = [];
    const skill: ChatCompletionSkill = {
      odatatype: "#Microsoft.Skills.Custom.ChatCompletionSkill",
      name: "describe",
      context: "/document",
      uri: "https://gateway.example.com/chat/completions?deployment=chat",
      apiKey: "not-a-real-key",
      inputs: [{ name: "userMessage", source: "/document/content" }],
      outputs: [{ name: "response", targetName: "description" }],
      commonModelParameters: { model: "gpt-4o", temperature: 0 },
      extraParameters: { custom: { enabled: true } },
      extraParametersBehavior: "pass-through",
      responseFormat: { type: "text" },
    };
    const { odatatype, ...properties } = skill;
    const wire = { ...properties, "@odata.type": odatatype };
    const client = new SearchIndexerClient(
      endpoint,
      credential,
      mockOptions([{ body: { name: "skills", skills: [wire] } }], requests),
    );
    const actual = await client.createOrUpdateSkillset({ name: "skills", skills: [skill] });
    assert.deepEqual(JSON.parse(requests[0].body as string).skills[0], wire);
    expect(actual.skills[0]).toMatchObject(skill);
  });

  it("preserves Azure OpenAI model reads through the convenience client", async () => {
    const wire = {
      name: "kb",
      knowledgeSources: [],
      models: [
        {
          kind: "azureOpenAI",
          azureOpenAIParameters: {
            resourceUri: "https://example.openai.azure.com",
            deploymentId: "chat",
            modelName: "gpt-4o",
          },
        },
      ],
    };
    const client = new SearchIndexClient(
      endpoint,
      credential,
      mockOptions([{ body: wire }, { body: { value: [wire] } }], []),
    );
    const expected = {
      models: [
        {
          kind: "azureOpenAI",
          azureOpenAIParameters: {
            resourceUrl: "https://example.openai.azure.com",
            deploymentId: "chat",
            modelName: "gpt-4o",
          },
        },
      ],
    };
    expect(await client.getKnowledgeBase("kb")).toMatchObject(expected);
    expect((await client.listKnowledgeBases().next()).value).toMatchObject(expected);
  });

  it.each([
    {
      kind: "azureOpenAI",
      azureOpenAIParameters: {
        resourceUrl: "https://example.openai.azure.com",
        deploymentId: "chat",
        modelName: "gpt-4o",
      },
    },
    { kind: "microsoftRetriever1" },
    {
      kind: "openAICompatible",
      openAICompatibleParameters: {
        uri: "https://gateway.example.com/chat/completions",
        modelName: "gpt-4o",
        managedIdentityAudience: "11111111-2222-3333-4444-555555555555",
      },
    },
  ] satisfies KnowledgeBaseModelInput[])(
    "creates and updates knowledge bases with $kind inputs",
    async (model) => {
      const wireModel =
        model.kind === "azureOpenAI"
          ? {
              kind: model.kind,
              azureOpenAIParameters: {
                resourceUri: model.azureOpenAIParameters.resourceUrl,
                deploymentId: model.azureOpenAIParameters.deploymentId,
                modelName: model.azureOpenAIParameters.modelName,
              },
            }
          : model;
      const wire = { name: "kb", knowledgeSources: [], models: [wireModel] };
      const requests: PipelineRequest[] = [];
      const client = new SearchIndexClient(
        endpoint,
        credential,
        mockOptions([{ body: wire, status: 201 }, { body: wire }, { body: wire }], requests),
      );
      const input: KnowledgeBaseInput = {
        name: "kb",
        knowledgeSources: [],
        models: [model],
      };
      expect(await client.createKnowledgeBase(input)).toMatchObject({ models: [model] });
      expect(await client.createOrUpdateKnowledgeBase(input)).toMatchObject({ models: [model] });
      expect(await client.createOrUpdateKnowledgeBase("kb", input)).toMatchObject({
        models: [model],
      });
      for (const request of requests) {
        assert.deepEqual(JSON.parse(request.body as string), wire);
      }
      assert.deepEqual(
        requests.map((request) => request.method),
        ["POST", "PUT", "PUT"],
      );
    },
  );

  it("preserves Microsoft Retriever 1 configuration and agentic reasoning accounting", async () => {
    const requests: PipelineRequest[] = [];
    const base = {
      name: "kb",
      knowledgeSources: [{ name: "source" }],
      models: [{ kind: "microsoftRetriever1" as const }],
    };
    const indexClient = new ProtocolSearchIndexClient(
      endpoint,
      credential,
      mockOptions([{ body: base }], requests),
    );
    const actual = await indexClient.createOrUpdateKnowledgeBase("kb", base);
    assert.deepEqual(JSON.parse(requests[0].body as string).models, base.models);
    assert.deepEqual(actual.models, base.models);

    const client = new KnowledgeRetrievalClient(
      endpoint,
      "kb",
      credential,
      mockOptions(
        [
          {
            body: {
              response: [],
              activity: [
                {
                  id: 1,
                  type: "agenticReasoning",
                  reasoningTokens: 0,
                  retrievalReasoningEffort: { kind: "minimal" },
                  logicalReasoningEffort: { kind: "low" },
                },
              ],
            },
          },
        ],
        requests,
      ),
    );
    const result = await client.retrieve({
      intents: [{ type: "semantic", search: "Find relevant facts" }],
      retrievalReasoningEffort: { kind: "minimal" },
      includeActivity: true,
    });
    assert.equal(JSON.parse(requests[1].body as string).retrievalReasoningEffort.kind, "minimal");
    expect(result.activity?.[0]).toMatchObject({
      type: "agenticReasoning",
      reasoningTokens: 0,
      retrievalReasoningEffort: { kind: "minimal" },
      logicalReasoningEffort: { kind: "low" },
    });
  });

  it.each([
    { name: "deferred", ontology: undefined },
    {
      name: "inline",
      ontology: {
        kind: "inline",
        name: "people",
        value: JSON.stringify({
          "@context": {
            schema: "https://schema.org/",
            rdfs: "http://www.w3.org/2000/01/rdf-schema#",
          },
          "@graph": [{ "@id": "schema:Person", "@type": "rdfs:Class" }],
        }),
      },
    },
  ])(
    "preserves $name graph extraction ontology and synchronization statistics",
    async ({ ontology }) => {
      const requests: PipelineRequest[] = [];
      const graphExtraction = { graphName: "facts", ontology, pageDegreeOfParallelism: 1024 };
      const definition = {
        name: "blob",
        kind: "azureBlob" as const,
        azureBlobParameters: {
          connectionString: "ResourceId=/subscriptions/example",
          containerName: "documents",
          graphExtraction,
          ingestionParameters: {
            cache: {
              storageConnectionString: "ResourceId=/subscriptions/cache",
              enableReprocessing: true,
            },
          },
        },
      };
      const synchronization = {
        startTime: "2026-11-01T00:00:00Z",
        itemsUpdatesProcessed: 1,
        itemsUpdatesFailed: 0,
        itemsSkipped: 0,
      };
      const client = new SearchIndexClient(
        endpoint,
        credential,
        mockOptions(
          [
            {
              body: {
                ...definition,
                azureBlobParameters: {
                  ...definition.azureBlobParameters,
                  ingestionParameters: { cache: { enableReprocessing: true } },
                },
              },
            },
            {
              body: {
                kind: "azureBlob",
                synchronizationStatus: "active",
                currentSynchronizationState: {
                  ...synchronization,
                  graphStatistics: { triplesWritten: 0 },
                },
                lastSynchronizationState: {
                  ...synchronization,
                  endTime: "2026-11-01T00:01:00Z",
                  graphStatistics: { ontologyName: "people", triplesWritten: 42 },
                },
              },
            },
          ],
          requests,
        ),
      );
      const actual = (await client.createOrUpdateKnowledgeSource(
        definition,
      )) as AzureBlobKnowledgeSource;
      const sent = JSON.parse(requests[0].body as string).azureBlobParameters;
      assert.deepEqual(sent.graphExtraction, JSON.parse(JSON.stringify(graphExtraction)));
      assert.equal(
        sent.ingestionParameters.cache.storageConnectionString,
        "ResourceId=/subscriptions/cache",
      );
      assert.equal(actual.azureBlobParameters.ingestionParameters?.cache?.enableReprocessing, true);
      assert.isUndefined(
        actual.azureBlobParameters.ingestionParameters?.cache?.storageConnectionString,
      );
      assert.deepEqual(actual.azureBlobParameters.graphExtraction?.ontology, ontology);
      const status = await client.getKnowledgeSourceStatus("blob");
      assert.deepEqual(status.currentSynchronizationState?.graphStatistics, {
        ontologyName: undefined,
        triplesWritten: 0,
      });
      assert.deepEqual(status.lastSynchronizationState?.graphStatistics, {
        ontologyName: "people",
        triplesWritten: 42,
      });
      assert.instanceOf(status.lastSynchronizationState?.endTime, Date);
    },
  );

  it("round trips OneLake security fields and ingestion permission options", async () => {
    const requests: PipelineRequest[] = [];
    const index: SearchIndex = {
      name: "onelake",
      permissionFilterOption: "enabled",
      oneLakeSecuritySource: { fabricWorkspaceId: "workspace", lakehouseId: "lakehouse" },
      fields: [
        { name: "id", type: "Edm.String", key: true },
        {
          name: "parentFolders",
          type: "Collection(Edm.String)",
          filterable: true,
          permissionFilter: "oneLakeParentFolders",
        },
        {
          name: "lakehouse",
          type: "Edm.String",
          filterable: true,
          permissionFilter: "oneLakeLakehouseId",
        },
      ],
    };
    const source: IndexedOneLakeKnowledgeSource = {
      name: "source",
      kind: "indexedOneLake",
      indexedOneLakeParameters: {
        fabricWorkspaceId: "workspace",
        lakehouseId: "lakehouse",
        ingestionParameters: {
          ingestionPermissionOptions: ["oneLakeParentFolders", "oneLakeLakehouseId"],
        },
      },
    };
    const indexClient = new SearchIndexClient(
      endpoint,
      credential,
      mockOptions([{ body: index }, { body: source }], requests),
    );
    const actualIndex = await indexClient.createOrUpdateIndex(index);
    const actualSource = await indexClient.createOrUpdateKnowledgeSource(source);
    const indexBody = JSON.parse(requests[0].body as string);
    assert.equal(indexBody.permissionFilterOption, "enabled");
    assert.deepEqual(indexBody.oneLakeSecuritySource, index.oneLakeSecuritySource);
    assert.equal(indexBody.fields[1].permissionFilter, "oneLakeParentFolders");
    assert.equal(indexBody.fields[2].permissionFilter, "oneLakeLakehouseId");
    expect(actualIndex.fields).toMatchObject(index.fields);
    expect(actualSource).toMatchObject(source);
    assert.deepEqual(
      JSON.parse(requests[1].body as string).indexedOneLakeParameters.ingestionParameters,
      source.indexedOneLakeParameters.ingestionParameters,
    );

    const dataSource: SearchIndexerDataSourceConnection = {
      name: "onelake-source",
      type: "onelake",
      connectionString: "ResourceId=/subscriptions/example",
      container: { name: "Files" },
      indexerPermissionOptions: ["oneLakeParentFolders", "oneLakeLakehouseId"],
    };
    const indexer: SearchIndexer = {
      name: "onelake-indexer",
      dataSourceName: dataSource.name,
      targetIndexName: index.name,
      fieldMappings: [
        { sourceFieldName: "metadata_onelake_parent_folders", targetFieldName: "parentFolders" },
      ],
    };
    const indexerClient = new SearchIndexerClient(
      endpoint,
      credential,
      mockOptions(
        [
          {
            body: {
              name: dataSource.name,
              type: dataSource.type,
              container: dataSource.container,
              credentials: { connectionString: dataSource.connectionString },
              indexerPermissionOptions: dataSource.indexerPermissionOptions,
            },
          },
          { body: indexer },
        ],
        requests,
      ),
    );
    const actualDataSource = await indexerClient.createOrUpdateDataSourceConnection(dataSource);
    assert.deepEqual(
      JSON.parse(requests[2].body as string).indexerPermissionOptions,
      dataSource.indexerPermissionOptions,
    );
    assert.deepEqual(
      actualDataSource.indexerPermissionOptions,
      dataSource.indexerPermissionOptions,
    );
    const actualIndexer = await indexerClient.createOrUpdateIndexer(indexer);
    const sentIndexer = JSON.parse(requests[3].body as string);
    assert.deepEqual(sentIndexer.fieldMappings, indexer.fieldMappings);
    expect(actualIndexer.fieldMappings).toMatchObject(indexer.fieldMappings ?? []);
  });

  it("paginates ingestion diagnostics and retains request cancellation", async () => {
    const requests: PipelineRequest[] = [];
    const operation = { id: "op-1", kind: "knowledgeSourceFileIngestion", status: "Running" };
    const controller = new AbortController();
    const client = new SearchIndexClient(
      endpoint,
      credential,
      mockOptions(
        [
          {
            body: {
              value: [operation],
              "@odata.nextLink": `${endpoint}/knowledgesources('files')/ingestionOperations?next=2`,
            },
          },
          {
            body: {
              value: [{ ...operation, id: "op-2", status: "Succeeded", result: { fileId: "f" } }],
            },
          },
          {
            body: {
              ...operation,
              status: "Failed",
              error: { code: "InvalidFile", message: "Bad file" },
            },
          },
        ],
        requests,
      ),
    );
    const ids: string[] = [];
    for await (const item of client.listKnowledgeSourceFileIngestionOperations("files", {
      abortSignal: controller.signal,
    })) {
      ids.push(item.id);
    }
    assert.deepEqual(ids, ["op-1", "op-2"]);
    assert.equal(requests[1].abortSignal, controller.signal);
    const failed = await client.getKnowledgeSourceFileIngestionOperation("files", "op-1");
    assert.equal(failed.status, "Failed");
    assert.equal(failed.error?.code, "InvalidFile");
  });

  it("polls asynchronous file ingestion to its typed result using core-lro", async () => {
    const requests: PipelineRequest[] = [];
    let responseCount = 0;
    const operationLocation = `${endpoint}/knowledgesources('files')/ingestionOperations('op')`;
    const client = new SearchIndexClient(
      endpoint,
      credential,
      mockOptions(
        [
          {
            status: 202,
            headers: { "operation-location": operationLocation, "retry-after": "0" },
            body: { id: "op", kind: "knowledgeSourceFileIngestion", status: "Running" },
          },
          {
            body: {
              id: "op",
              kind: "knowledgeSourceFileIngestion",
              status: "Succeeded",
              result: {
                fileId: "file-1",
                fileName: "manual.txt",
                createdAt: "2026-11-01T00:00:00Z",
              },
            },
          },
        ],
        requests,
      ),
    );
    const poller = client.beginIngestKnowledgeSourceFile(
      "files",
      {
        metadata: { fileName: "manual.txt" },
        content: { contents: new Uint8Array([65]), contentType: "text/plain" },
      },
      {
        updateIntervalInMs: 0,
        requestOptions: { headers: { "x-preview-poll": "fresh" }, timeout: 12345 },
        onResponse: () => responseCount++,
      },
    );
    const file = await poller.pollUntilDone();
    assert.equal(file.fileId, "file-1");
    assert.instanceOf(file.createdAt, Date);
    assert.equal(requests[0].method, "POST");
    assert.include(requests[0].url, "/files:ingest");
    assert.equal(requests[1].method, "GET");
    assert.include(requests[1].url, "api-version=2026-11-01-preview");
    assert.isTrue(requests.every((request) => request.headers.get("x-preview-poll") === "fresh"));
    assert.isTrue(requests.every((request) => request.timeout === 12345));
    assert.equal(responseCount, 2);
    assert.isTrue(poller.isDone);
  });

  it("keeps explicit stable and earlier preview API versions", async () => {
    for (const serviceVersion of [
      "2024-07-01",
      "2025-11-01-preview",
      "2026-04-01",
      "2026-05-01-preview",
      "2026-08-01-preview",
    ]) {
      const requests: PipelineRequest[] = [];
      const client = new SearchIndexClient(endpoint, credential, {
        ...mockOptions([{ body: { value: [] } }], requests),
        serviceVersion,
      });
      for await (const _ of client.listIndexesNames()) {
        /* drain */
      }
      assert.include(requests[0].url, `api-version=${serviceVersion}`);
      assert.equal(client.getSearchClient("docs").serviceVersion, serviceVersion);
      assert.equal(client.getKnowledgeRetrievalClient("kb").serviceVersion, serviceVersion);
    }
  });

  it("reports replacement failures through the core-lro poller", async () => {
    const requests: PipelineRequest[] = [];
    const location = `${endpoint}/knowledgesources('files')/ingestionOperations('replace')`;
    const client = new SearchIndexClient(
      endpoint,
      credential,
      mockOptions(
        [
          {
            status: 202,
            headers: { "operation-location": location, "retry-after": "0" },
            body: { status: "Running" },
          },
          {
            body: {
              status: "Failed",
              error: { code: "InvalidFile", message: "Cannot extract text" },
            },
          },
        ],
        requests,
      ),
    );
    const poller = client.beginReplaceKnowledgeSourceFile(
      "files",
      "file-1",
      {
        metadata: { fileName: "replacement.txt" },
        content: { contents: new Uint8Array([65]), contentType: "text/plain" },
      },
      { updateIntervalInMs: 0 },
    );
    await expect(poller.pollUntilDone()).rejects.toThrow(/InvalidFile.*Cannot extract text/);
    assert.include(requests[0].url, "/files('file-1'):ingest");
    assert.equal(poller.operationState?.status, "failed");
  });

  it.each(["ingestion", "replacement"] as const)(
    "resumes a serialized %s poller without another upload",
    async (operation) => {
      const requests: PipelineRequest[] = [];
      let responseCount = 0;
      const location = `${endpoint}/knowledgesources('files')/ingestionOperations('resume')`;
      const client = new SearchIndexClient(
        endpoint,
        credential,
        mockOptions(
          [
            {
              status: 202,
              headers: { "operation-location": location, "retry-after": "0" },
              body: { status: "Running" },
            },
            { body: { status: "Running" } },
            { body: { status: "Succeeded", result: { fileId: "resumed-file" } } },
          ],
          requests,
        ),
      );
      const body = {
        metadata: { fileName: "resume.txt" },
        content: { contents: new Uint8Array([65]), contentType: "text/plain" },
      };
      const begin = (
        options: Parameters<typeof client.beginIngestKnowledgeSourceFile>[2],
      ): KnowledgeSourceFileIngestionPoller =>
        operation === "ingestion"
          ? client.beginIngestKnowledgeSourceFile("files", body, options)
          : client.beginReplaceKnowledgeSourceFile("files", "file-1", body, options);
      const poller = begin({ updateIntervalInMs: 0 });
      await poller.poll();
      const resumeFrom = await poller.serialize();
      const restored = begin({
        resumeFrom,
        updateIntervalInMs: 0,
        requestOptions: { headers: { "x-preview-poll": "resumed" }, timeout: 14567 },
        onResponse: () => responseCount++,
      });
      assert.equal((await restored.pollUntilDone()).fileId, "resumed-file");
      assert.equal(requests.filter((request) => request.method === "POST").length, 1);
      assert.include(
        requests[0].url,
        operation === "ingestion" ? "/files:ingest" : "/files('file-1'):ingest",
      );
      assert.equal(requests.at(-1)?.headers.get("x-preview-poll"), "resumed");
      assert.equal(requests.at(-1)?.timeout, 14567);
      assert.equal(responseCount, 1);
    },
  );

  it("aborts an in-progress file ingestion poller without another upload", async () => {
    const requests: PipelineRequest[] = [];
    const controller = new AbortController();
    const location = `${endpoint}/knowledgesources('files')/ingestionOperations('abort')`;
    const client = new SearchIndexClient(
      endpoint,
      credential,
      mockOptions(
        [
          {
            status: 202,
            headers: { "operation-location": location, "retry-after": "0" },
            body: { status: "Running" },
          },
          { body: { status: "Running" } },
        ],
        requests,
      ),
    );
    const poller = client.beginIngestKnowledgeSourceFile(
      "files",
      {
        metadata: { fileName: "manual.txt" },
        content: { contents: new Uint8Array([65]), contentType: "text/plain" },
      },
      { updateIntervalInMs: 0, abortSignal: controller.signal },
    );
    await poller.poll();
    assert.isFalse(poller.isDone);
    assert.isFalse(requests[1].abortSignal?.aborted);
    controller.abort();
    await expect(poller.pollUntilDone({ abortSignal: controller.signal })).rejects.toMatchObject({
      name: "AbortError",
    });
    assert.equal(requests.length, 2);
    assert.isTrue(requests[1].abortSignal?.aborted);
  });
});
