// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { assert, describe, expect, it } from "vitest";
import { createHttpHeaders } from "@azure/core-rest-pipeline";
import type { PipelineRequest, PipelineResponse } from "@azure/core-rest-pipeline";
import { AzureKeyCredential } from "@azure/core-auth";
import { KnowledgeRetrievalClient } from "../../src/knowledgeRetrievalClient.js";
import { SearchClient } from "../../src/searchClient.js";
import { SearchIndexClient } from "../../src/searchIndexClient.js";
import { SearchIndexerClient } from "../../src/searchIndexerClient.js";
import type {
  BaseScoringFunction,
  AzureBlobKnowledgeSource,
  KnowledgeBase,
  SearchIndex,
  SearchClientOptions,
  VectorQueryTopicGraphUnion,
} from "../../src/index.js";

const endpoint = "https://example.search.windows.net";
const credential = new AzureKeyCredential("not-a-real-key");

interface MockReply {
  body: unknown;
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
              bodyAsText: JSON.stringify(reply.body),
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
                { code: "bounded", severity: "warning", message: "Bounded query" },
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
    assert.equal(result.diagnostics?.[0].code, "bounded");
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
    });
  });

  it("serializes all topic-graph variants and restored preview search options", async () => {
    const requests: PipelineRequest[] = [];
    const client = new SearchClient(
      endpoint,
      "index",
      credential,
      mockOptions(
        [
          {
            body: {
              value: [],
              "@search.debug": { agentic: { terminationReason: "modelStopped" } },
            },
          },
        ],
        requests,
      ),
    );
    const strategies: VectorQueryTopicGraphUnion[] = [
      { kind: "none" },
      { kind: "diverse", diversityFactor: 0.6, minDiversityPoolSize: 30 },
      { kind: "balanced", minDiversityPoolSize: 20 },
    ];
    const result = await client.search("question", {
      queryType: "agentic",
      moreLikeThis: "document-1",
      agenticOptions: { maxRuntimeInSeconds: 10 },
      debug: "agentic",
      vectorSearchOptions: {
        queries: strategies.map((topicGraph) => ({
          kind: "vector",
          vector: [1, 0],
          fields: ["embedding"],
          topicGraph,
        })),
      },
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
  });

  it("round trips topic profiles, random scoring and OpenAI-compatible vectorizers", async () => {
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
            vectorizerName: "compatible",
            kind: "openAICompatible",
            openAICompatibleParameters: {
              uri: "https://example.invalid/embeddings",
              modelName: "text-embedding-3-small",
              dimensions: 2,
            },
          },
        ],
      },
      scoringProfiles: [
        { name: "shuffle", functions: [{ type: "random", parameters: { seedParameter: "seed" } }] },
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
      vectorSearch: {
        ...index.vectorSearch,
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
      type: "random",
      random: { seedParameter: "seed" },
    });
    assert.notProperty(body.scoringProfiles[0].functions[0], "fieldName");
    assert.notProperty(body.scoringProfiles[0].functions[0], "boost");
    assert.equal(actual.vectorSearch?.topicGraphProfiles?.[0].defaultKind, "balanced");
    assert.equal(actual.vectorSearch?.vectorizers?.[0].kind, "openAICompatible");
    assert.equal(actual.fields[0].type, "Collection(Edm.Single)");
    assert.deepEqual(actual.oneLakeSecuritySource, index.oneLakeSecuritySource);
    assert.deepEqual(
      actual.sharePointConnectorAppRegistration,
      index.sharePointConnectorAppRegistration,
    );
    assert.deepEqual(body.graphProfile, index.graphProfile);
    assert.deepEqual(actual.graphProfile, index.graphProfile);
    const classic: BaseScoringFunction = { type: "magnitude", fieldName: "rating", boost: 2 };
    assert.equal(classic.fieldName, "rating");
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
        { name: "lookup", description: "Lookup facts", knowledgeSources: [{ name: "source" }] },
      ],
      models: [
        { kind: "microsoftRetriever1" },
        {
          kind: "openAICompatible",
          openAICompatibleParameters: {
            uri: "https://example.invalid/chat/completions",
            modelName: "gpt-6-sol",
            managedIdentityAudience: "https://example.invalid",
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
            kind: "openAICompatible" as const,
            openAICompatibleParameters: {
              uri: "https://example.invalid/embeddings",
              modelName: "text-embedding-3-small",
            },
          },
        },
      },
    };
    const client = new SearchIndexClient(
      endpoint,
      credential,
      mockOptions([{ body: base }, { body: source }, { body: blob }], requests),
    );
    const actual = await client.createOrUpdateKnowledgeBase(base);
    assert.equal(actual.tools?.[0].name, "lookup");
    assert.equal(actual.tools?.[0].knowledgeSources[0].name, "source");
    assert.equal(actual.models?.[0].kind, "microsoftRetriever1");
    assert.equal(actual.models?.[1].kind, "openAICompatible");
    await client.createOrUpdateKnowledgeSource(source);
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
        "openAICompatible",
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
                { id: 1, type: "graphSearch", elapsedMs: 12, knowledgeSourceName: "blob" },
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
          graphParameters: { includeQuery: true, provenance: { kind: "none" } },
        },
      ],
    });
    const body = JSON.parse(requests[0].body as string);
    assert.equal(body.toolName, "lookup");
    assert.equal(body.knowledgeSourceParams[0].topicGraph.kind, "balanced");
    assert.equal(body.knowledgeSourceParams[0].graphParameters.includeQuery, true);
    assert.equal(result.activity?.[0].type, "graphSearch");
    assert.equal(result.activity?.[0].elapsedMs, 12);
    assert.equal(result.references?.[0].type, "graphSearch");
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
      { updateIntervalInMs: 0 },
    );
    const file = await poller.pollUntilDone();
    assert.equal(file.fileId, "file-1");
    assert.instanceOf(file.createdAt, Date);
    assert.equal(requests[0].method, "POST");
    assert.include(requests[0].url, "/files:ingest");
    assert.equal(requests[1].method, "GET");
    assert.include(requests[1].url, "api-version=2026-11-01-preview");
    assert.isTrue(poller.isDone);
  });

  it("keeps explicit stable and earlier preview API versions", async () => {
    for (const serviceVersion of ["2024-07-01", "2026-04-01", "2026-08-01-preview"]) {
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

  it("resumes a serialized ingestion poller without another upload", async () => {
    const requests: PipelineRequest[] = [];
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
    const poller = client.beginIngestKnowledgeSourceFile("files", body, { updateIntervalInMs: 0 });
    await poller.poll();
    const resumeFrom = await poller.serialize();
    const restored = client.beginIngestKnowledgeSourceFile("files", body, {
      resumeFrom,
      updateIntervalInMs: 0,
    });
    assert.equal((await restored.pollUntilDone()).fileId, "resumed-file");
    assert.equal(requests.filter((request) => request.method === "POST").length, 1);
  });
});
