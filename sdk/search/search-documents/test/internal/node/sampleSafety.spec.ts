// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import { ModuleKind, ScriptTarget, transpileModule } from "typescript";
import { assert, describe, it } from "vitest";
import * as sdk from "../../../src/index.js";

const require = createRequire(import.meta.url);
const modelSamples = [
  "knowledgeSourceFilePreview",
  "knowledgeSourceFreshnessPreview",
  "knowledgeBasePreviewConfiguration",
];
const samples = [
  ...modelSamples,
  "knowledgeSourceMcpServerPreview",
  "knowledgeSourceWorkIqPreview",
];
const directories = [
  "samples-dev",
  join("samples", "v13-beta", "typescript", "src"),
  join("samples", "v13-beta", "javascript"),
];

async function runSample(
  sample: string,
  directory: string,
  clients: Record<string, unknown>,
  environment: Record<string, string> = {},
  onExitCode?: (exitCode: number | undefined) => void,
): Promise<unknown[]> {
  const errors: unknown[] = [];
  const file = resolve(
    fileURLToPath(new URL("../../../", import.meta.url)),
    directory,
    `${sample}.${directory.endsWith("javascript") ? "js" : "ts"}`,
  );
  const compiled = transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ModuleKind.CommonJS,
      target: ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  const context = {
    require: (name: string) => {
      if (name === "@azure/search-documents" || name === "@azure/search-documents/searchIndex") {
        return { ...sdk, ...clients };
      }
      if (name === "@azure/search-documents/search") {
        return { SearchClient: clients.ProtocolSearchClient };
      }
      if (name === "@azure/search-documents/knowledgeBaseRetrieval") {
        return { KnowledgeBaseRetrievalClient: clients.KnowledgeRetrievalClient };
      }
      if (name === "@azure/identity") {
        return {
          DefaultAzureCredential: class {},
          getBearerTokenProvider: () => async () => "mock-token",
        };
      }
      if (name === "@azure/core-util") return { delay: async () => {} };
      if (name === "openai") return { AzureOpenAI: clients.AzureOpenAI };
      if (name === "dotenv" || name === "dotenv/config") return { config() {} };
      if (name.startsWith("node:")) return require(name);
      throw new Error(`Unexpected sample dependency: ${name}`);
    },
    exports: {},
    module: { exports: {} },
    sampleCompletion: undefined as Promise<void> | undefined,
    process: {
      argv: ["node", file],
      exitCode: undefined as number | undefined,
      env: {
        ENDPOINT: "https://example.search.windows.net",
        AZURE_OPENAI_ENDPOINT: "https://example.openai.azure.com",
        AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME: "my-embedding",
        AZURE_OPENAI_CHAT_DEPLOYMENT_NAME: "my-chat",
        MCP_SERVER_URL: "https://example.com/mcp",
        MCP_API_KEY: "mock-key",
        WORKIQ_APPLICATION_ID: "mock-application",
        WORKIQ_FEDERATED_CREDENTIAL_ID: "mock-federation",
        WORK_IQ_USER_ASSERTION: "mock-assertion",
        ...environment,
      },
    },
    console: {
      log() {},
      error(...args: unknown[]) {
        errors.push(args.at(-1));
      },
    },
    AbortController,
    AbortSignal,
    fetch:
      clients.fetch ??
      (() => {
        throw new Error("Unexpected sample fetch.");
      }),
    Error,
    URL,
    TextEncoder,
  };
  // Published JavaScript exports main after starting it; await the actual invocation in every format.
  assert.include(compiled, "main().catch(");
  runInNewContext(
    compiled.replace("main().catch(", "globalThis.sampleCompletion = main().catch("),
    context,
  );
  await context.sampleCompletion;
  onExitCode?.(context.process.exitCode);
  return errors;
}

const dp11Environment = {
  AZURE_OPENAI_EMBEDDING_MODEL_NAME: "text-embedding-3-small",
  AZURE_OPENAI_CHAT_MODEL_NAME: "gpt-6-sol",
  AZURE_BLOB_CONNECTION_STRING: "mock-blob-connection",
  AZURE_BLOB_CONTAINER_NAME: "fixture",
  AZURE_BLOB_FOLDER_PATH: "hotels",
  AZURE_GRAPH_CACHE_CONNECTION_STRING: "mock-cache-connection",
  GRAPH_RETRIEVAL_QUERY: "Using the knowledge graph, which organizations operate the hotels?",
  FABRIC_WORKSPACE_ID: "mock-workspace",
  ONELAKE_LAKEHOUSE_ID: "mock-lakehouse",
  ONELAKE_TARGET_PATH: "Files/fixture",
  ONELAKE_ALLOWED_USER_TOKEN: "allowed-token",
  ONELAKE_DENIED_USER_TOKEN: "denied-token",
  ONELAKE_TEST_QUERY: "Unique fixture document",
  KNOWLEDGE_MODEL_PROVIDER: "openAICompatible",
  OPENAI_COMPATIBLE_CHAT_URI: "https://example.com/openai/responses?api-version=preview",
  OPENAI_COMPATIBLE_CHAT_MODEL_NAME: "gpt-6-sol",
  OPENAI_COMPATIBLE_EMBEDDINGS_URI: "https://example.com/openai/embeddings",
  OPENAI_COMPATIBLE_EMBEDDING_MODEL_NAME: "text-embedding-3-small",
  OPENAI_COMPATIBLE_EMBEDDING_DIMENSIONS: "1536",
  OPENAI_COMPATIBLE_AUTH_HEADER: "Ocp-Apim-Subscription-Key",
  OPENAI_COMPATIBLE_API_KEY: "mock-provider-key",
};

async function executeDp11Sample(
  sample: string,
  directory: string,
  failureAt?: string,
  environment: Record<string, string> = {},
): Promise<{
  sources: sdk.KnowledgeSourceInput[];
  indexes: sdk.SearchIndexInput[];
  bases: sdk.KnowledgeBaseInput[];
  searches: Record<string, unknown>[];
  retrievals: { request: sdk.KnowledgeBaseRetrievalRequest; options?: sdk.RetrieveOptions }[];
  starts: string[];
  restores: string[];
  diagnostics: string[];
}> {
  const sources: sdk.KnowledgeSourceInput[] = [];
  const indexes: sdk.SearchIndexInput[] = [];
  const bases: sdk.KnowledgeBaseInput[] = [];
  const created: string[] = [];
  const deleted: string[] = [];
  const searches: Record<string, unknown>[] = [];
  const retrievals: {
    request: sdk.KnowledgeBaseRetrievalRequest;
    options?: sdk.RetrieveOptions;
  }[] = [];
  const starts: string[] = [];
  const restores: string[] = [];
  const diagnostics: string[] = [];
  const documents: Record<string, unknown>[] = [];
  const operations: { id: string; status: string; result: { fileId: string } }[] = [];
  const fail = (operation: string): void => {
    if (failureAt === operation) throw new Error(`Mock failure at ${operation}`);
  };
  function begin(
    kind: string,
    body: sdk.UploadKnowledgeSourceFileMultipartRequest,
    options: { resumeFrom?: string },
  ): object {
    const revision = body.metadata.metadata?.revision ?? "1";
    if (options.resumeFrom) {
      assert.equal(options.resumeFrom, `${kind}:${revision}`);
      restores.push(kind);
    } else {
      starts.push(kind);
    }
    return {
      onProgress() {},
      async poll() {
        fail("poll");
      },
      async serialize() {
        return `${kind}:${revision}`;
      },
      async pollUntilDone() {
        fail("pollUntilDone");
        operations.push({
          id: `operation-${revision}`,
          status: "Succeeded",
          result: { fileId: "file-1" },
        });
        return { fileId: "file-1", metadata: { revision } };
      },
    };
  }
  class KnowledgeRetrievalClient {
    async retrieve(
      request: sdk.KnowledgeBaseRetrievalRequest,
      options?: sdk.RetrieveOptions,
    ): Promise<object> {
      fail("retrieve");
      retrievals.push({ request, options });
      if (sample === "knowledgeSourceOneLakeSecurity") {
        const denied = options?.querySourceAuthorization === "denied-token";
        return {
          response: [],
          references: denied && failureAt !== "leak" ? [] : [{ type: "indexedOneLake" }],
          activity:
            denied && failureAt === "upstreamError"
              ? [{ error: { message: "Fabric failed" } }]
              : [],
        };
      }
      if (sample === "knowledgeSourceGraphExtraction") {
        return {
          response: [{ content: [] }],
          references: [
            {
              type: "graphSearch",
              sourceData:
                failureAt === "missingHydration"
                  ? { hotel: "Alpine Hotel" }
                  : { snippet: "The Alpine Hotel is operated by Summit Hospitality." },
            },
          ],
          activity:
            failureAt === "textFallback"
              ? []
              : [
                  {
                    type: "graphSearch",
                    graphSearchArguments: {
                      gql: "MATCH (h:Hotel)-[r:operatedBy]->(o:Organization) RETURN h, o LIMIT 5",
                    },
                  },
                ],
        };
      }
      if (sample === "queryHintsAutoConfiguration") {
        const country = JSON.stringify(request).includes("Japan") ? "Japan" : "Canada";
        return {
          references: [
            {
              type: "searchIndex",
              docKey: failureAt === "leak" ? "us-1" : country === "Japan" ? "jp-1" : "ca-1",
            },
          ],
          activity:
            failureAt === "missingFilter"
              ? []
              : [
                  {
                    type: "searchIndex",
                    queryHintProcessing: { generatedFilter: `country eq '${country}'` },
                  },
                ],
        };
      }
      return {
        response: [{ content: [] }],
        references: [
          {
            type: "searchIndex",
            docKey:
              request.toolName === "canada-hr"
                ? failureAt === "leak"
                  ? "hr-us"
                  : "hr-ca"
                : "product",
          },
        ],
        activity: [],
      };
    }
  }
  class SearchIndexClient {
    async createIndex(definition: sdk.SearchIndexInput): Promise<object> {
      fail("createIndex");
      indexes.push(definition);
      created.push(definition.name);
      return definition;
    }
    async createKnowledgeSource(definition: sdk.KnowledgeSourceInput): Promise<object> {
      fail("createKnowledgeSource");
      sources.push(definition);
      if (sample === "knowledgeSourceGraphExtraction") {
        created.push(
          ...["index", "graphIndex", "datasource", "skillset", "indexer"].map(
            (kind) => `${definition.name}-${kind}`,
          ),
        );
      }
      created.push(definition.name);
      return definition;
    }
    async createKnowledgeBase(definition: sdk.KnowledgeBaseInput): Promise<object> {
      fail("createKnowledgeBase");
      bases.push(definition);
      created.push(definition.name);
      return definition;
    }
    async getKnowledgeBase(): Promise<object> {
      const base = structuredClone(bases[0]);
      for (const model of base.models ?? []) {
        if ("openAICompatibleParameters" in model) delete model.openAICompatibleParameters.headers;
      }
      return base;
    }
    async getKnowledgeSource(): Promise<object> {
      const source = structuredClone(sources[0]);
      if (
        "azureBlobParameters" in source &&
        source.azureBlobParameters.ingestionParameters?.cache
      ) {
        Reflect.deleteProperty(
          source.azureBlobParameters.ingestionParameters.cache,
          "storageConnectionString",
        );
        return {
          ...source,
          azureBlobParameters: {
            ...source.azureBlobParameters,
            createdResources: {
              additionalProperties: Object.fromEntries(
                ["datasource", "indexer", "skillset", "graphIndex", "index"].map((kind) => [
                  kind,
                  `${source.name}-${kind}`,
                ]),
              ),
            },
          },
        };
      }
      return source;
    }
    async getIndex(name: string): Promise<object> {
      return {
        name,
        etag: "mock-etag",
        fields: [
          { name: "id", key: true },
          { name: "snippet", retrievable: true },
        ],
        graphProfile: {
          provenanceIndexName: `${sources[0]?.name}-index`,
          fields: { graphNameField: "graphName" },
        },
      };
    }
    getSearchClient(): object {
      return {
        async uploadDocuments(batch: Record<string, unknown>[]) {
          fail("uploadDocuments");
          documents.push(...batch);
        },
        async getDocumentsCount() {
          return sample === "knowledgeSourceGraphExtraction" ? 2 : documents.length;
        },
        async search(_text: string, options: Record<string, unknown>) {
          fail("vectorSearch");
          searches.push(options);
          return {
            facets: { country: [{ value: "Canada", count: 2 }] },
            results: [
              { score: 1, document: { id: "alpine", content: "An indoor pool and family rooms." } },
            ],
          };
        },
        async graph(query: string, options: sdk.GraphOptions) {
          if (query.includes("MATCH (s)-")) {
            throw {
              statusCode: 400,
              details: { diagnostics: [{ severity: "error", phase: "planning" }] },
            };
          }
          fail("graph");
          searches.push({ query, ...options });
          if (sample === "knowledgeSourceGraphExtraction") {
            return {
              value:
                failureAt === "missingRelationships"
                  ? []
                  : [
                      {
                        additionalProperties: {
                          hotel: "The Alpine Hotel",
                          organization: "Summit Hospitality",
                        },
                        provenance: { evidence: [{ assertionId: "assertion-1" }] },
                      },
                    ],
            };
          }
          return {
            value:
              options.executionMode === "planOnly"
                ? []
                : [{ additionalProperties: { subject: "Ada" }, provenance: [] }],
            statistics: { rows: 1 },
          };
        },
      };
    }
    getKnowledgeRetrievalClient(): KnowledgeRetrievalClient {
      return new KnowledgeRetrievalClient();
    }
    beginIngestKnowledgeSourceFile(
      _name: string,
      body: sdk.UploadKnowledgeSourceFileMultipartRequest,
      options: { resumeFrom?: string },
    ): object {
      return begin("ingest", body, options);
    }
    beginReplaceKnowledgeSourceFile(
      _name: string,
      _id: string,
      body: sdk.UploadKnowledgeSourceFileMultipartRequest,
      options: { resumeFrom?: string },
    ): object {
      return begin("replace", body, options);
    }
    async *listKnowledgeSourceFileIngestionOperations(): AsyncIterable<object> {
      yield* operations;
    }
    async getKnowledgeSourceFileIngestionOperation(_name: string, id: string): Promise<object> {
      fail("diagnostics");
      diagnostics.push(id);
      return operations.find((operation) => operation.id === id)!;
    }
    async deleteKnowledgeSourceFile(): Promise<void> {}
    async getKnowledgeSourceStatus(): Promise<object> {
      return {
        synchronizationStatus: "active",
        lastSynchronizationState: {
          endTime: new Date(),
          itemsUpdatesProcessed: 1,
          itemsUpdatesFailed: failureAt === "failedIngestion" ? 1 : 0,
          graphStatistics: { triplesWritten: failureAt === "missingTriples" ? 0 : 1 },
        },
      };
    }
    async deleteKnowledgeBase(name: string): Promise<void> {
      deleted.push(name);
    }
    async deleteKnowledgeSource(name: string): Promise<void> {
      deleted.push(name);
    }
    async deleteIndex(resource: string | { name: string }): Promise<void> {
      deleted.push(typeof resource === "string" ? resource : resource.name);
    }
  }
  class SearchIndexerClient {
    async getIndexer(name: string): Promise<object> {
      return { name, etag: "mock-etag" };
    }
    async getIndexerStatus(): Promise<object> {
      return { lastResult: { status: "success", failedItemCount: 0 } };
    }
    async getSkillset(name: string): Promise<object> {
      return { name, etag: "mock-etag" };
    }
    async getDataSourceConnection(name: string): Promise<object> {
      return {
        name,
        etag: "mock-etag",
        container: {
          query: environment.AZURE_BLOB_FOLDER_PATH ?? dp11Environment.AZURE_BLOB_FOLDER_PATH,
        },
      };
    }
    async deleteIndexer(resource: { name: string }): Promise<void> {
      deleted.push(resource.name);
    }
    async deleteSkillset(resource: { name: string }): Promise<void> {
      deleted.push(resource.name);
    }
    async deleteDataSourceConnection(resource: { name: string }): Promise<void> {
      deleted.push(resource.name);
    }
  }
  class ProtocolSearchClient {
    async searchPost(request: Record<string, unknown>): Promise<object> {
      fail("searchPost");
      searches.push(request);
      return {
        results: [{ additionalProperties: { id: "pool" } }],
        debugInfo: { agentic: { usage: { reasoningTokens: 3 }, subQueries: ["pool", "family"] } },
      };
    }
  }
  let exitCode: number | undefined;
  const errors = await runSample(
    sample,
    directory,
    {
      SearchIndexClient,
      SearchIndexerClient,
      KnowledgeRetrievalClient,
      ProtocolSearchClient,
      fetch: async (_uri: string, options: { body: string; redirect: string }) => {
        fail("embeddingFetch");
        const request = JSON.parse(options.body) as { input: string[]; dimensions: number };
        assert.notProperty(request, "model", "The gateway URI selects the deployment.");
        assert.equal(options.redirect, "error");
        return {
          ok: true,
          json: async () => ({
            data: request.input.map((_, index) => ({
              index,
              embedding: Array(failureAt === "badEmbedding" ? 1 : request.dimensions).fill(
                index + 1,
              ),
            })),
          }),
        };
      },
    },
    { ...dp11Environment, ...environment },
    (code) => {
      exitCode = code;
    },
  );
  assert.deepEqual(
    deleted,
    [...created].reverse(),
    "Only successful creations are cleaned up, in dependency order.",
  );
  if (failureAt) {
    assert.isNotEmpty(errors, "A failed step must not be reported as sample success.");
    assert.equal(exitCode, 1);
  } else {
    assert.deepEqual(errors, []);
    assert.isUndefined(exitCode);
  }
  return { sources, indexes, bases, searches, retrievals, starts, restores, diagnostics };
}

for (const directory of directories) {
  describe(`${directory}: self-contained November feature samples`, () => {
    it("resumes ingestion and replacement without starting either operation twice", async () => {
      const run = await executeDp11Sample("knowledgeSourceFileLro", directory);
      assert.deepEqual(run.starts, ["ingest", "replace"]);
      assert.deepEqual(run.restores, ["ingest", "replace"]);
      assert.deepEqual(run.diagnostics, ["operation-1", "operation-2"]);
      assert.nestedPropertyVal(
        run.sources[0],
        "fileParameters.ingestionParameters.embeddingModel.azureOpenAIParameters.deploymentId",
        "my-embedding",
      );
      assert.nestedPropertyVal(
        run.sources[0],
        "fileParameters.ingestionParameters.embeddingModel.azureOpenAIParameters.modelName",
        "text-embedding-3-small",
      );
    });
    it.each(["createKnowledgeSource", "poll", "pollUntilDone", "diagnostics"])(
      "reports File LRO %s failures and cleans up only its owned source",
      async (failureAt) => {
        await executeDp11Sample("knowledgeSourceFileLro", directory, failureAt);
      },
    );
    it("persists two tool scopes and retrieves through singular toolName", async () => {
      const run = await executeDp11Sample("knowledgeBaseTools", directory);
      assert.deepEqual(
        run.retrievals.map(({ request }) => request.toolName),
        ["canada-hr", "product-search"],
      );
      assert.nestedPropertyVal(
        run.bases[0],
        "tools[0].knowledgeSources[0].filterAddOn",
        "category eq 'HR' and country eq 'CA'",
      );
      assert.nestedPropertyVal(
        run.bases[0],
        "tools[1].knowledgeSources[0].filterAddOn",
        "category eq 'Product'",
      );
    });
    it.each([
      "createIndex",
      "uploadDocuments",
      "createKnowledgeSource",
      "createKnowledgeBase",
      "retrieve",
      "leak",
    ])(
      "rejects tool %s failures or out-of-scope documents and cleans up in dependency order",
      async (failureAt) => {
        await executeDp11Sample("knowledgeBaseTools", directory, failureAt);
      },
    );
    it("uses direct agentic search diagnostics and then a persisted MR1 model", async () => {
      const run = await executeDp11Sample("agenticSearch", directory);
      assert.containSubset(run.searches[0], {
        queryType: "agentic",
        debug: "agentic",
        agenticOptions: { maxRuntimeInSeconds: 10 },
      });
      assert.nestedPropertyVal(run.bases[0], "models[0].kind", "microsoftRetriever1");
      assert.lengthOf(run.retrievals, 1);
    });
    it.each([
      "createIndex",
      "searchPost",
      "createKnowledgeSource",
      "createKnowledgeBase",
      "retrieve",
    ])("cleans up the agentic flow after %s fails", async (failureAt) => {
      await executeDp11Sample("agenticSearch", directory, failureAt);
    });
    it("plans a constrained graph query before execution with provenance", async () => {
      const run = await executeDp11Sample("knowledgeGraphRetrieval", directory);
      assert.equal(run.searches[0].executionMode, "planOnly");
      assert.containSubset(run.searches[1], {
        executionMode: "execute",
        provenance: { kind: "ids" },
        includeStatistics: true,
      });
    });
    it.each(["createIndex", "uploadDocuments", "graph"])(
      "cleans up graph resources after %s fails",
      async (failureAt) => {
        await executeDp11Sample("knowledgeGraphRetrieval", directory, failureAt);
      },
    );
    it("passes distinct OneLake user tokens separately from admin credentials", async () => {
      const run = await executeDp11Sample("knowledgeSourceOneLakeSecurity", directory);
      assert.containSubset(run.sources[0], {
        indexedOneLakeParameters: {
          ingestionParameters: {
            ingestionPermissionOptions: ["oneLakeParentFolders", "oneLakeLakehouseId"],
          },
        },
      });
      assert.deepEqual(
        run.retrievals.map(({ options }) => options?.querySourceAuthorization),
        ["allowed-token", "denied-token"],
      );
      for (const { request } of run.retrievals) assert.notProperty(request, "enableElevatedRead");
    });
    it.each([
      "createKnowledgeSource",
      "failedIngestion",
      "createKnowledgeBase",
      "retrieve",
      "leak",
      "upstreamError",
    ])(
      "does not mistake OneLake %s failures or leaks for successful ACL enforcement",
      async (failureAt) => {
        await executeDp11Sample("knowledgeSourceOneLakeSecurity", directory, failureAt);
      },
    );
    it("combines a cached inline ontology with graph-only retrieval verification", async () => {
      const run = await executeDp11Sample("knowledgeSourceGraphExtraction", directory);
      assert.nestedPropertyVal(
        run.sources[0],
        "azureBlobParameters.ingestionParameters.cache.storageConnectionString",
        "mock-cache-connection",
      );
      assert.nestedPropertyVal(
        run.sources[0],
        "azureBlobParameters.graphExtraction.ontology.kind",
        "inline",
      );
      assert.containSubset(run.retrievals[0].request, {
        knowledgeSourceParams: [
          {
            kind: "azureBlob",
            graphParameters: { includeQuery: true, provenance: { kind: "none" } },
          },
        ],
      });
      assert.nestedPropertyVal(
        run.retrievals[1].request,
        "knowledgeSourceParams[0].graphParameters.provenance.hydrateDocuments.select",
        "id,snippet",
      );
      assert.equal(run.searches[0].filter, "graphName eq 'hotels'");
    });
    it.each([
      "createKnowledgeSource",
      "failedIngestion",
      "missingRelationships",
      "missingHydration",
      "createKnowledgeBase",
      "retrieve",
      "textFallback",
    ])(
      "reports graph extraction %s failures rather than accepting a text-only fallback",
      async (failureAt) => {
        await executeDp11Sample("knowledgeSourceGraphExtraction", directory, failureAt);
      },
    );
    it("uses automatic country facets without forcing filters and queries a new value after the TTL", async () => {
      const run = await executeDp11Sample("queryHintsAutoConfiguration", directory, undefined, {
        QUERY_HINT_REFRESH: "true",
      });
      assert.lengthOf(run.retrievals, 2);
      assert.nestedPropertyVal(
        run.sources[0],
        "searchIndexParameters.queryHints.filters[0].autoConfiguration.cacheTtl",
        60,
      );
      for (const { request } of run.retrievals) {
        assert.notProperty(request, "knowledgeSourceParams");
      }
    });
    it.each(["retrieve", "missingFilter", "leak"])(
      "rejects automatic query-hint %s failures rather than accepting ungrounded results",
      async (failureAt) => {
        await executeDp11Sample("queryHintsAutoConfiguration", directory, failureAt);
      },
    );
    it.each(["/", "\\", "/all"])(
      "rejects an unsafe graph-extraction folder %s before creation",
      async (folder) => {
        const run = await executeDp11Sample(
          "knowledgeSourceGraphExtraction",
          directory,
          "invalidFolder",
          { AZURE_BLOB_FOLDER_PATH: folder },
        );
        assert.isEmpty(run.sources);
      },
    );
    it("uses complete compatible model URLs and APIM authentication for vector search and KB retrieval", async () => {
      const run = await executeDp11Sample("knowledgeBaseModelProviders", directory);
      assert.nestedPropertyVal(
        run.bases[0],
        "models[0].openAICompatibleParameters.uri",
        dp11Environment.OPENAI_COMPATIBLE_CHAT_URI,
      );
      assert.nestedPropertyVal(
        run.bases[0],
        "models[0].openAICompatibleParameters.headers.Ocp-Apim-Subscription-Key",
        "mock-provider-key",
      );
      assert.nestedPropertyVal(
        run.indexes[0],
        "vectorSearch.vectorizers[0].openAICompatibleParameters.uri",
        dp11Environment.OPENAI_COMPATIBLE_EMBEDDINGS_URI,
      );
      assert.nestedPropertyVal(run.searches[0], "vectorSearchOptions.queries[0].kind", "text");
      assert.nestedPropertyVal(run.bases[0], "retrievalReasoningEffort.kind", "low");
      assert.lengthOf(run.retrievals, 1);
    });
    it("keeps GPT-6 deployment aliases separate from the native model profile", async () => {
      const run = await executeDp11Sample("knowledgeBaseModelProviders", directory, undefined, {
        KNOWLEDGE_MODEL_PROVIDER: "azureOpenAI",
      });
      assert.nestedPropertyVal(
        run.bases[0],
        "models[0].azureOpenAIParameters.deploymentId",
        "my-chat",
      );
      assert.nestedPropertyVal(
        run.bases[0],
        "models[0].azureOpenAIParameters.modelName",
        "gpt-6-sol",
      );
    });
    it.each([
      "embeddingFetch",
      "badEmbedding",
      "createIndex",
      "uploadDocuments",
      "vectorSearch",
      "createKnowledgeSource",
      "createKnowledgeBase",
      "retrieve",
    ])("cleans up the configured provider flow after %s fails", async (failureAt) => {
      await executeDp11Sample("knowledgeBaseModelProviders", directory, failureAt);
    });
  });
}

async function executeSample(
  sample: string,
  directory: string,
  failureAt?: string,
  environment: Record<string, string> = {},
): Promise<{
  created: { operation: string; definition: Record<string, unknown> }[];
  deleted: string[];
}> {
  const created: { operation: string; definition: Record<string, unknown> }[] = [];
  const deleted: string[] = [];
  const fileLists: string[] = [];
  const failure = new Error(`Mock failure at ${failureAt}`);
  let fileDeleted = false;
  const create = (
    operation: string,
    definition: Record<string, unknown>,
  ): Record<string, unknown> => {
    if (failureAt === operation) throw failure;
    created.push({ operation, definition });
    return definition;
  };
  class SearchIndexClient {
    async createIndex(definition: Record<string, unknown>): Promise<Record<string, unknown>> {
      return create("createIndex", definition);
    }
    async createKnowledgeSource(
      definition: Record<string, unknown>,
    ): Promise<Record<string, unknown>> {
      return create("createKnowledgeSource", definition);
    }
    async createKnowledgeBase(
      definition: Record<string, unknown>,
    ): Promise<Record<string, unknown>> {
      return create("createKnowledgeBase", definition);
    }
    async getKnowledgeSource(name: string): Promise<{ name: string }> {
      if (failureAt === "getKnowledgeSource") throw failure;
      return { name };
    }
    async uploadKnowledgeSourceFile(): Promise<Record<string, unknown>> {
      if (failureAt === "upload") throw failure;
      return { fileId: "file-1", fileName: "manuals/sample.txt", fileSizeBytes: 10 };
    }
    async uploadKnowledgeSourceFileMultipart(): Promise<Record<string, unknown>> {
      return this.uploadKnowledgeSourceFile();
    }
    async updateKnowledgeSourceFile(): Promise<Record<string, unknown>> {
      return { fileId: "file-1", metadata: { revision: "2" } };
    }
    listKnowledgeSourceFiles(name: string): AsyncIterable<{
      fileId: string;
      prefix: string;
    }> & { byPage: () => AsyncIterable<{ fileId: string; prefix: string }[]> } {
      fileLists.push(name);
      const files = fileDeleted ? [] : [{ fileId: "file-1", prefix: "manuals/" }];
      return {
        async *[Symbol.asyncIterator]() {
          yield* files;
        },
        async *byPage() {
          yield files;
        },
      };
    }
    async deleteKnowledgeSourceFile(name: string): Promise<void> {
      fileLists.push(name);
      fileDeleted = true;
    }
    async deleteKnowledgeBase(name: string): Promise<void> {
      deleted.push(name);
    }
    async deleteKnowledgeSource(name: string): Promise<void> {
      deleted.push(name);
    }
    async deleteIndex(name: string): Promise<void> {
      deleted.push(name);
    }
  }
  class KnowledgeRetrievalClient {
    async retrieve(): Promise<object> {
      if (failureAt === "retrieve") throw failure;
      return {};
    }
    async *retrieveStream(request: {
      retrievalReasoningEffort?: { kind: string };
    }): AsyncIterable<object> {
      if (failureAt === "retrieve") throw failure;
      yield {
        event: "retrieval.started",
        data: { reasoningEffort: request.retrievalReasoningEffort ?? { kind: "auto" } },
      };
    }
  }
  const errors = await runSample(
    sample,
    directory,
    { SearchIndexClient, KnowledgeRetrievalClient },
    environment,
  );
  assert.deepEqual(errors, failureAt ? [failure] : []);
  assert.sameMembers(
    deleted,
    created.map(({ definition }) => definition.name as string),
  );
  assert.isTrue(
    fileLists.every((name) =>
      created.some(
        ({ operation, definition }) =>
          operation === "createKnowledgeSource" && definition.name === name,
      ),
    ),
    "File cleanup must only access a successfully created knowledge source",
  );
  return { created, deleted };
}

for (const directory of directories) {
  for (const sample of samples) {
    describe(`${directory}: ${sample} sample safety`, () => {
      const failures = [
        "createKnowledgeSource",
        "createKnowledgeBase",
        "retrieve",
        sample === "knowledgeBasePreviewConfiguration"
          ? "createIndex"
          : modelSamples.includes(sample)
            ? "upload"
            : "getKnowledgeSource",
      ];
      it.each(failures)("cleans up only owned resources after %s fails", async (failureAt) => {
        await executeSample(sample, directory, failureAt);
      });

      it("isolates separate runs and cleans up successful creations", async () => {
        const first = await executeSample(sample, directory);
        const second = await executeSample(sample, directory);
        assert.isNotEmpty(first.created);
        const firstNames = new Set(first.created.map(({ definition }) => definition.name));
        assert.isFalse(second.created.some(({ definition }) => firstNames.has(definition.name)));
      });

      if (modelSamples.includes(sample)) {
        it.each([undefined, "custom"])(
          "separates deployment aliases from %s model settings",
          async (setting) => {
            const { created } = await executeSample(
              sample,
              directory,
              undefined,
              setting
                ? {
                    AZURE_OPENAI_EMBEDDING_MODEL_NAME: "text-embedding-3-small",
                    AZURE_OPENAI_CHAT_MODEL_NAME: "gpt-4o",
                  }
                : {},
            );
            const chat = sample === "knowledgeBasePreviewConfiguration";
            const definition = created.find(
              ({ operation }) =>
                operation === (chat ? "createKnowledgeBase" : "createKnowledgeSource"),
            )!.definition;
            const path = chat
              ? "models[0].azureOpenAIParameters"
              : "fileParameters.ingestionParameters.embeddingModel.azureOpenAIParameters";
            assert.nestedPropertyVal(
              definition,
              `${path}.deploymentId`,
              chat ? "my-chat" : "my-embedding",
            );
            assert.nestedPropertyVal(
              definition,
              `${path}.modelName`,
              chat
                ? setting
                  ? "gpt-4o"
                  : "gpt-5.4-mini"
                : setting
                  ? "text-embedding-3-small"
                  : "text-embedding-ada-002",
            );
          },
        );
      }
    });
  }
}

async function executeNovemberSample(
  directory: string,
  graphQuery?: string,
): Promise<{
  errors: unknown[];
  graphs: { gql: string; options: sdk.GraphOptions }[];
  searches: Record<string, unknown>[];
  retrievals: sdk.KnowledgeBaseRetrievalRequest[];
}> {
  const graphs: { gql: string; options: sdk.GraphOptions }[] = [];
  const searches: Record<string, unknown>[] = [];
  const retrievals: sdk.KnowledgeBaseRetrievalRequest[] = [];
  class SearchClient {
    async graph(gql: string, options: sdk.GraphOptions): Promise<object> {
      graphs.push({ gql, options });
      return { value: [] };
    }
    async search(_text: string, options: Record<string, unknown>): Promise<object> {
      searches.push(options);
      return { results: [] };
    }
  }
  class KnowledgeRetrievalClient {
    async retrieve(request: sdk.KnowledgeBaseRetrievalRequest): Promise<object> {
      retrievals.push(request);
      return {};
    }
  }
  class SearchIndexClient {
    beginIngestKnowledgeSourceFile(): object {
      return {
        onProgress() {},
        async pollUntilDone() {
          return { fileId: "file-1", createdAt: new Date() };
        },
      };
    }
    async *listKnowledgeSourceFileIngestionOperations(): AsyncIterable<never> {}
  }
  const errors = await runSample(
    "novemberPreview",
    directory,
    { SearchClient, KnowledgeRetrievalClient, SearchIndexClient },
    {
      GRAPH_QUERY: graphQuery ?? "MATCH (s:Person)-[r:studied]->(o:Topic) RETURN s, r, o LIMIT 5",
    },
  );
  return { errors, graphs, searches, retrievals };
}

for (const directory of directories) {
  describe(`${directory}: November preview sample requests`, () => {
    it("uses supported provenance and the configured graph query", async () => {
      const { errors, graphs } = await executeNovemberSample(directory);
      assert.isEmpty(errors);
      assert.lengthOf(graphs, 1);
      assert.equal(graphs[0].gql, "MATCH (s:Person)-[r:studied]->(o:Topic) RETURN s, r, o LIMIT 5");
      assert.equal(graphs[0].options.provenance?.kind, "ids");
    });

    it("uses explicit request hints rather than stored-only auto-configuration", async () => {
      const { errors, searches, retrievals } = await executeNovemberSample(directory);
      assert.isEmpty(errors);
      assert.lengthOf(retrievals, 1);
      assert.deepEqual(retrievals[0].retrievalReasoningEffort, { kind: "low" });
      assert.containSubset(retrievals[0], {
        knowledgeSourceParams: [
          {
            kind: "searchIndex",
            queryHintOverrides: { filters: [{ field: "category", fieldValues: ["manual"] }] },
          },
        ],
      });
      assert.notNestedProperty(
        retrievals[0],
        "knowledgeSourceParams[0].queryHintOverrides.filters[0].autoConfiguration",
      );
      assert.nestedPropertyVal(
        searches[0],
        "vectorSearchOptions.queries[0].topicGraph.minDiversityPoolSize",
        500,
      );
      assert.nestedPropertyVal(
        retrievals[0],
        "knowledgeSourceParams[0].topicGraph.minDiversityPoolSize",
        500,
      );
    });

    it("requires a configured graph query before making requests", async () => {
      const { errors, graphs } = await executeNovemberSample(directory, "");
      assert.lengthOf(errors, 1);
      assert.match(String(errors[0]), /GRAPH_QUERY/);
      assert.isEmpty(graphs);
    });
  });
}

async function executeTopicGraphSample(
  directory: string,
  failureAt?: string,
  model?: string,
  environment: Record<string, string> = {},
): Promise<{
  errors: unknown[];
  failure: Error;
  definitions: sdk.SearchIndex[];
  linked?: sdk.SearchIndex;
  source?: sdk.KnowledgeSource;
  embeddings: Record<string, unknown>[];
  uploads: Record<string, unknown>[][];
  searches: Record<string, unknown>[];
  retrievals: sdk.KnowledgeBaseRetrievalRequest[];
  openAIOptions?: Record<string, unknown>;
  searchCredential?: unknown;
}> {
  const failure = new Error(`Mock failure at ${failureAt}`);
  const definitions: sdk.SearchIndex[] = [];
  const created: string[] = [];
  const deleted: string[] = [];
  const embeddings: Record<string, unknown>[] = [];
  const uploads: Record<string, unknown>[][] = [];
  const searches: Record<string, unknown>[] = [];
  const retrievals: sdk.KnowledgeBaseRetrievalRequest[] = [];
  const documentsByIndex = new Map<string, Record<string, unknown>[]>();
  let linked: sdk.SearchIndex | undefined;
  let source: sdk.KnowledgeSource | undefined;
  let openAIOptions: Record<string, unknown> | undefined;
  let searchCredential: unknown;
  const fail = (stage: string): void => {
    if (failureAt === stage) throw failure;
  };
  class SearchIndexClient {
    constructor(_endpoint: string, credential: unknown) {
      searchCredential = credential;
    }
    async createIndex(index: sdk.SearchIndex): Promise<sdk.SearchIndex> {
      fail(index.name.startsWith("topicgraph-chunks-") ? "corpus" : "sidecar");
      definitions.push(index);
      created.push(index.name);
      return index;
    }
    async getIndex(name: string): Promise<sdk.SearchIndex> {
      return {
        ...definitions.find((index) => index.name === name)!,
        etag: failureAt === "missingETag" ? undefined : '"fixture-etag"',
      };
    }
    async createOrUpdateIndex(
      index: sdk.SearchIndex,
      options: { onlyIfUnchanged?: boolean },
    ): Promise<sdk.SearchIndex> {
      fail("link");
      assert.lengthOf(definitions, 2, "The sidecar must exist before linking");
      assert.isTrue(options.onlyIfUnchanged);
      assert.equal(index.etag, '"fixture-etag"');
      linked = index;
      return index;
    }
    getSearchClient(name: string): object {
      return {
        indexName: name,
        async uploadDocuments(documents: Record<string, unknown>[]) {
          uploads.push(documents);
          documentsByIndex.set(name, documents);
          return {
            results: documents.map((document) => ({
              key: document.id,
              succeeded: failureAt !== "partialUpload",
            })),
          };
        },
        async getDocumentsCount() {
          return failureAt === "emptySidecar" && name.startsWith("topicgraph-centroids-")
            ? 0
            : documentsByIndex.get(name)!.length;
        },
        async search(_text: string, options: Record<string, unknown>) {
          searches.push(options);
          return {
            results: documentsByIndex
              .get(name)!
              .slice(0, 6)
              .map((document) => {
                const { contentVector: _vector, ...visible } = document;
                return { score: 1, document: visible };
              }),
          };
        },
      };
    }
    async createKnowledgeSource(definition: sdk.KnowledgeSource): Promise<sdk.KnowledgeSource> {
      fail("source");
      source = definition;
      created.push(definition.name);
      return definition;
    }
    async createKnowledgeBase(definition: sdk.KnowledgeBase): Promise<sdk.KnowledgeBase> {
      fail("base");
      created.push(definition.name);
      assert.equal(definition.retrievalReasoningEffort?.kind, "minimal");
      assert.equal(definition.outputMode, "extractiveData");
      assert.isUndefined(definition.models, "No chat deployment is needed");
      return definition;
    }
    getKnowledgeRetrievalClient(): object {
      return {
        async retrieve(request: sdk.KnowledgeBaseRetrievalRequest) {
          fail("retrieve");
          retrievals.push(request);
          return {
            references:
              failureAt === "emptyReferences" ? [] : [{ id: "ref-1", type: "searchIndex" }],
            activity: [
              {
                id: 1,
                type: "searchIndex",
                ...(failureAt === "activityError" ? { error: { code: "MockError" } } : {}),
              },
            ],
          };
        },
      };
    }
    async deleteIndex(name: string): Promise<void> {
      deleted.push(name);
    }
    async deleteKnowledgeSource(name: string): Promise<void> {
      deleted.push(name);
    }
    async deleteKnowledgeBase(name: string): Promise<void> {
      deleted.push(name);
    }
  }
  class AzureOpenAI {
    constructor(options: Record<string, unknown>) {
      openAIOptions = options;
    }
    embeddings = {
      async create(request: { input: string[] } & Record<string, unknown>) {
        embeddings.push(request);
        return {
          data: request.input
            .map((_, index) => ({
              index,
              embedding: Array(failureAt === "badEmbedding" ? 1 : 1536).fill(index + 1),
            }))
            .reverse(),
        };
      },
    };
  }
  const errors = await runSample(
    "topicGraphDiverseSearch",
    directory,
    { SearchIndexClient, AzureOpenAI },
    { ...(model ? { AZURE_OPENAI_EMBEDDING_MODEL_NAME: model } : {}), ...environment },
  );
  assert.sameMembers(deleted, created, "Delete exactly the resources successfully created");
  assert.deepEqual(
    deleted,
    [
      ...created.filter((name) => name.startsWith("topicgraph-base-")),
      ...created.filter((name) => name.startsWith("topicgraph-source-")),
      ...created.filter((name) => name.startsWith("topicgraph-chunks-")),
      ...created.filter((name) => name.startsWith("topicgraph-centroids-")),
    ],
    "Delete dependents before their source indexes",
  );
  return {
    errors,
    failure,
    definitions,
    linked,
    source,
    embeddings,
    uploads,
    searches,
    retrievals,
    openAIOptions,
    searchCredential,
  };
}

for (const directory of directories) {
  describe(`${directory}: synthetic Topic Graph sample`, () => {
    it("uses explicit model keys for both embedding callers without also selecting token authentication", async () => {
      const run = await executeTopicGraphSample(directory, undefined, undefined, {
        AZURE_OPENAI_API_KEY: "mock-embedding-key",
        AZURE_SEARCH_API_KEY: "mock-search-key",
      });
      assert.isEmpty(run.errors);
      assert.instanceOf(run.searchCredential, sdk.AzureKeyCredential);
      assert.propertyVal(run.openAIOptions, "apiKey", "mock-embedding-key");
      assert.notProperty(run.openAIOptions, "azureADTokenProvider");
      assert.nestedPropertyVal(
        run.definitions[0],
        "vectorSearch.vectorizers[0].parameters.apiKey",
        "mock-embedding-key",
      );
    });
    it("links populated indexes and demonstrates inherited and replacement settings", async () => {
      const run = await executeTopicGraphSample(directory);
      assert.isEmpty(run.errors);
      assert.isFunction(run.openAIOptions?.azureADTokenProvider);
      assert.notProperty(run.openAIOptions, "apiKey");
      assert.lengthOf(run.definitions, 2);
      assert.isUndefined(run.definitions[0].vectorSearch?.topicGraphProfiles);
      assert.deepEqual(run.linked?.semanticSearch, run.definitions[0].semanticSearch);
      assert.deepEqual(
        run.linked?.vectorSearch?.vectorizers,
        run.definitions[0].vectorSearch?.vectorizers,
      );
      assert.deepEqual(run.linked?.vectorSearch?.topicGraphProfiles, [
        {
          name: "topics",
          indexName: run.definitions[1].name,
          defaultKind: "balanced",
          defaultMinDiversityPoolSize: 1000,
        },
      ]);
      assert.nestedPropertyVal(
        run.linked?.fields.find((field) => field.name === "contentVector"),
        "topicGraphProfile",
        "topics",
      );
      assert.sameMembers(
        run.definitions[1].fields.map((field) => field.name),
        ["id", "subject_id", "object_vector"],
      );
      assert.lengthOf(run.uploads[0], 9);
      assert.lengthOf(run.uploads[1], 3);
      for (let topic = 0; topic < 3; topic++) {
        assert.deepEqual(
          run.uploads[1][topic].object_vector,
          run.uploads[0][topic * 3].contentVector,
        );
      }
      assert.equal(
        (run.uploads[0][0].contentVector as number[])[0],
        1,
        "Use response indexes, not response order",
      );
      assert.lengthOf(run.searches, 4);
      assert.nestedPropertyVal(
        run.searches[0],
        "vectorSearchOptions.queries[0].topicGraph.kind",
        "none",
      );
      assert.nestedPropertyVal(
        run.searches[1],
        "vectorSearchOptions.queries[0].topicGraph.minDiversityPoolSize",
        500,
      );
      assert.nestedPropertyVal(
        run.searches[2],
        "vectorSearchOptions.queries[0].topicGraph.kind",
        "balanced",
      );
      assert.notNestedProperty(
        run.searches[2],
        "vectorSearchOptions.queries[0].topicGraph.diversityFactor",
      );
      assert.notNestedProperty(run.searches[3], "vectorSearchOptions.queries[0].topicGraph");
      assert.nestedPropertyVal(run.source, "searchIndexParameters.topicGraph.kind", "diverse");
      assert.include(
        (run.source as sdk.SearchIndexKnowledgeSource).searchIndexParameters.searchFields?.map(
          (field) => field.name,
        ) ?? [],
        "contentVector",
      );
      assert.lengthOf(run.retrievals, 4);
      assert.notNestedProperty(run.retrievals[0], "knowledgeSourceParams[0].topicGraph");
      assert.nestedPropertyVal(
        run.retrievals[1],
        "knowledgeSourceParams[0].topicGraph.minDiversityPoolSize",
        2000,
      );
      assert.nestedPropertyVal(
        run.retrievals[1],
        "knowledgeSourceParams[0].topicGraph.diversityFactor",
        0.25,
      );
      assert.nestedPropertyVal(
        run.retrievals[2],
        "knowledgeSourceParams[0].topicGraph.kind",
        "balanced",
      );
      assert.notNestedProperty(
        run.retrievals[2],
        "knowledgeSourceParams[0].topicGraph.minDiversityPoolSize",
      );
      assert.deepEqual(
        (run.retrievals[3].knowledgeSourceParams![0] as sdk.SearchIndexKnowledgeSourceParams)
          .topicGraph,
        { kind: "none" },
      );
      assert.equal(run.embeddings[0].model, "my-embedding");
      assert.nestedPropertyVal(
        run.definitions[0],
        "vectorSearch.vectorizers[0].parameters.modelName",
        "text-embedding-3-small",
      );
    });

    it.each(["corpus", "sidecar", "link", "source", "base", "retrieve"])(
      "preserves ownership after %s fails",
      async (stage) => {
        const run = await executeTopicGraphSample(directory, stage);
        assert.deepEqual(run.errors, [run.failure]);
      },
    );

    it.each([
      ["missingETag", /ETag/],
      ["partialUpload", /failed to upload/],
      ["emptySidecar", /Expected 3 searchable documents/],
      ["badEmbedding", /1536 finite values/],
      ["emptyReferences", /nonempty references/],
      ["activityError", /successful search-index activity/],
    ] as const)("rejects an incomplete %s run", async (stage, message) => {
      const run = await executeTopicGraphSample(directory, stage);
      assert.lengthOf(run.errors, 1);
      assert.match(String(run.errors[0]), message);
    });

    it("does not send unsupported dimensions to ada-002", async () => {
      const run = await executeTopicGraphSample(directory, undefined, "text-embedding-ada-002");
      assert.isEmpty(run.errors);
      assert.notProperty(run.embeddings[0], "dimensions");
      assert.nestedPropertyVal(
        run.definitions[0],
        "vectorSearch.vectorizers[0].parameters.modelName",
        "text-embedding-ada-002",
      );
    });
  });
}
