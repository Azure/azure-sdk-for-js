// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createTestCredential } from "@azure-tools/test-credential";
import { assertEnvironmentVariable, env, Recorder } from "@azure-tools/test-recorder";
import { delay } from "@azure/core-util";
import { afterEach, assert, beforeEach, describe, expect, it } from "vitest";
import type {
  KnowledgeRetrievalClient,
  SearchClient,
  SearchField,
  SearchIndexClient,
} from "../../../../src/index.js";
import { SearchIndexClient as ProtocolIndexClient } from "../../../../src/searchIndex/index.js";
import { SearchClient as ProtocolSearchClient } from "../../../../src/search/index.js";
import type {
  GraphFieldMappings,
  KnowledgeBase,
  SearchIndexKnowledgeSource,
} from "../../../../src/models/azure/search/documents/indexes/index.js";
import type { KnowledgeBaseSearchIndexReference } from "../../../../src/models/azure/search/documents/knowledgeBases/index.js";
import { defaultServiceVersion } from "../../../../src/serviceUtils.js";
import type { Hotel } from "../../utils/interfaces.js";
import { createClients } from "../../utils/recordedClient.js";
import { createIndex, createRandomIndexName, populateIndex, WAIT_TIME } from "../../utils/setup.js";

describe("November deployment features", { timeout: 120_000 }, () => {
  let recorder: Recorder;
  let indexClient: SearchIndexClient;
  let protocolIndexClient: ProtocolIndexClient;
  let searchClient: SearchClient<Hotel>;
  let protocolSearchClient: ProtocolSearchClient;
  let indexName: string;
  let baseName: string;
  let sourceName: string;
  let graphName: string;

  beforeEach(async (ctx) => {
    recorder = new Recorder(ctx);
    ({ indexClient, searchClient, indexName } = await createClients<Hotel>(
      defaultServiceVersion,
      recorder,
      createRandomIndexName(),
    ));
    baseName = `kb-${indexName}`;
    sourceName = `ks-${indexName}`;
    graphName = `graph-${indexName}`;
    const endpoint = assertEnvironmentVariable("ENDPOINT");
    const credential = createTestCredential();
    const options = recorder.configureClientOptions({ apiVersion: defaultServiceVersion });
    protocolIndexClient = new ProtocolIndexClient(endpoint, credential, options);
    protocolSearchClient = new ProtocolSearchClient(endpoint, credential, indexName, options);
    await createIndex(indexClient, indexName, defaultServiceVersion);
    await delay(WAIT_TIME);
    await populateIndex(searchClient);
  });

  afterEach(async () => {
    try {
      await indexClient?.deleteKnowledgeBase(baseName).catch(() => {});
      await indexClient?.deleteKnowledgeSource(sourceName).catch(() => {});
      await indexClient?.deleteIndex(graphName).catch(() => {});
      await indexClient?.deleteIndex(indexName).catch(() => {});
    } finally {
      await recorder?.stop();
    }
  });

  async function createSource(
    parameters: Partial<SearchIndexKnowledgeSource["searchIndexParameters"]> = {},
  ): Promise<SearchIndexKnowledgeSource> {
    const source = await protocolIndexClient.createKnowledgeSource({
      name: sourceName,
      kind: "searchIndex",
      searchIndexParameters: {
        searchIndexName: indexName,
        searchFields: [{ name: "hotelName" }, { name: "description" }],
        semanticConfigurationName: "semantic-configuration",
        ...parameters,
      },
    });
    assert.equal(source.kind, "searchIndex");
    return source as SearchIndexKnowledgeSource;
  }

  function retrievalClient(): KnowledgeRetrievalClient {
    return indexClient.getKnowledgeRetrievalClient(baseName);
  }

  it("retrieves through a persisted knowledge-base tool", async () => {
    await createSource();
    const definition: KnowledgeBase = {
      name: baseName,
      knowledgeSources: [{ name: sourceName }],
      tools: [
        {
          name: "luxury-hotels",
          description: "Find luxury hotels.",
          knowledgeSources: [
            {
              name: sourceName,
              filterAddOn: "category eq 'Luxury'",
              rerankerThreshold: 0,
            },
          ],
        },
      ],
    };
    await protocolIndexClient.createKnowledgeBase(definition);
    const stored = await protocolIndexClient.getKnowledgeBase(baseName);
    assert.equal(stored.tools?.[0].name, "luxury-hotels");
    assert.equal(stored.tools?.[0].knowledgeSources[0].filterAddOn, "category eq 'Luxury'");
    const result = await retrievalClient().retrieve({
      toolName: "luxury-hotels",
      intents: [{ type: "semantic", search: "What luxury hotels have a pool?" }],
      retrievalReasoningEffort: { kind: "minimal" },
      includeActivity: true,
    });
    assert.isAbove(result.response?.length ?? 0, 0);
    assert.isAbove(result.references?.length ?? 0, 0);
    assert.isAbove(result.activity?.length ?? 0, 0);
    for (const reference of result.references ?? []) {
      assert.equal(reference.type, "searchIndex");
      if (reference.type === "searchIndex") {
        const key = (reference as KnowledgeBaseSearchIndexReference).docKey;
        assert.exists(key);
        const document = await searchClient.getDocument(key!);
        assert.equal(document.category, "Luxury");
      }
    }
  });

  it("retrieves using Microsoft Retriever 1", async () => {
    await createSource();
    await protocolIndexClient.createKnowledgeBase({
      name: baseName,
      knowledgeSources: [{ name: sourceName }],
      models: [{ kind: "microsoftRetriever1" }],
    });
    const stored = await protocolIndexClient.getKnowledgeBase(baseName);
    assert.equal(stored.models?.[0].kind, "microsoftRetriever1");
    const result = await retrievalClient().retrieve({
      intents: [{ type: "semantic", search: "Find luxury hotels with pools." }],
      retrievalReasoningEffort: { kind: "minimal" },
      includeActivity: true,
    });
    assert.isAbove(result.response?.length ?? 0, 0);
    assert.isAbove(result.references?.length ?? 0, 0);
    assert.isAbove(result.activity?.length ?? 0, 0);
  });

  it("accepts facet-backed query hints during retrieval", async () => {
    // Deployment names can equal model names; preserve distinct playback placeholders.
    await recorder.addSanitizers({
      bodyKeySanitizers: [
        { jsonPath: "$.models[*].azureOpenAIParameters.modelName", value: "gpt-4o" },
      ],
    });
    await createSource({
      queryHints: {
        filters: [
          { field: "category", autoConfiguration: { cacheTtl: 60, maxFacetValueCount: 20 } },
        ],
      },
    });
    const stored = await protocolIndexClient.getKnowledgeSource(sourceName);
    assert.equal(stored.kind, "searchIndex");
    assert.equal(
      (stored as SearchIndexKnowledgeSource).searchIndexParameters.queryHints?.filters?.[0]
        .autoConfiguration?.maxFacetValueCount,
      20,
    );
    await protocolIndexClient.createKnowledgeBase({
      name: baseName,
      knowledgeSources: [{ name: sourceName }],
      models: [
        {
          kind: "azureOpenAI",
          azureOpenAIParameters: {
            resourceUrl: assertEnvironmentVariable("AZURE_OPENAI_ENDPOINT"),
            deploymentId: assertEnvironmentVariable("AZURE_OPENAI_CHAT_DEPLOYMENT_NAME"),
            modelName: env.AZURE_OPENAI_CHAT_MODEL_NAME ?? "gpt-4o",
          },
        },
      ],
    });
    const result = await retrievalClient().retrieve({
      messages: [
        { role: "user", content: [{ type: "text", text: "Find hotels in the Luxury category." }] },
      ],
      retrievalReasoningEffort: { kind: "low" },
      includeActivity: true,
    });
    assert.isAbove(result.references?.length ?? 0, 0);
  });

  it("executes a direct agentic query with diagnostics", async () => {
    const result = await protocolSearchClient.searchPost({
      searchText: "Find luxury hotels with pools.",
      queryType: "agentic",
      semanticConfigurationName: "semantic-configuration",
      agenticOptions: { maxRuntimeInSeconds: 10 },
      debug: "agentic",
      top: 3,
    });
    assert.isAbove(result.results.length, 0);
    assert.exists(result.debugInfo?.agentic);
    assert.isAtLeast(result.debugInfo?.agentic?.usage?.reasoningTokens ?? -1, 0);
    assert.isAbove(result.debugInfo?.agentic?.subQueries?.length ?? 0, 0);
  });

  it("queries an edge-list graph populated with source assertions", async () => {
    const mappings: GraphFieldMappings = {
      assertionIdField: "id",
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
    };
    const numbers = new Set([
      "objectDouble",
      "confidence",
      "subjectConfidence",
      "predicateConfidence",
      "objectConfidence",
    ]);
    const fields: SearchField[] = Object.values(mappings).map((name) => ({
      name,
      type: numbers.has(name)
        ? "Edm.Double"
        : name === "objectBool"
          ? "Edm.Boolean"
          : name === "objectDateTime"
            ? "Edm.DateTimeOffset"
            : "Edm.String",
      key: name === "id",
      filterable: true,
      facetable: name !== "objectBool" && name !== "objectDateTime",
      sortable: true,
    }));
    await indexClient.createIndex({
      name: graphName,
      fields,
      graphProfile: { kind: "edgeList", fields: mappings },
    });
    const client = indexClient.getSearchClient(graphName);
    const indexed = await client.uploadDocuments([
      {
        id: "assertion-1",
        factId: "fact-1",
        subject: "Ada Lovelace",
        predicate: "studied",
        object: "Computing",
        objectString: "Computing",
        subjectType: "Person",
        subjectId: "ada",
        objectType: "Topic",
        objectId: "computing",
        confidence: 1,
        subjectConfidence: 1,
        predicateConfidence: 1,
        objectConfidence: 1,
        sourceChunkId: "chunk-1",
        sourceParentId: "source-1",
        graphName: "facts",
        subjectDisplayName: "Ada Lovelace",
        objectDisplayName: "Computing",
      },
    ]);
    assert.isTrue(indexed.results.every((entry) => entry.succeeded));
    await delay(WAIT_TIME);
    const graph = await client.graph(
      "MATCH (s:Person)-[r:studied]->(o:Topic) RETURN s, r, o LIMIT 5",
      {
        includeStatistics: true,
        includeDiagnostics: true,
        provenance: { kind: "ids" },
      },
    );
    assert.isAbove(graph.value.length, 0);
    assert.exists(graph.statistics);
    await expect(
      client.graph("MATCH (s)-[r]->(o) RETURN s, r, o LIMIT 5", { includeDiagnostics: true }),
    ).rejects.toMatchObject({
      statusCode: 400,
      details: {
        diagnostics: expect.arrayContaining([
          expect.objectContaining({ severity: "error", phase: "planning" }),
        ]),
      },
    });
  });
});
