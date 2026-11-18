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
): Promise<unknown[]> {
  const errors: unknown[] = [];
  const file = resolve(
    fileURLToPath(new URL("../../../", import.meta.url)),
    directory,
    `${sample}.${directory.endsWith("javascript") ? "js" : "ts"}`,
  );
  const compiled = transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ModuleKind.CommonJS, target: ScriptTarget.ES2022 },
  }).outputText;
  const context = {
    require: (name: string) => {
      if (name === "@azure/search-documents" || name === "@azure/search-documents/searchIndex") {
        return { ...sdk, ...clients };
      }
      if (name === "@azure/identity") {
        return {
          DefaultAzureCredential: class {},
          getBearerTokenProvider: () => async () => "mock-token",
        };
      }
      if (name === "@azure/core-util") return { delay: async () => {} };
      if (name === "openai") return { AzureOpenAI: clients.AzureOpenAI };
      if (name === "dotenv") return { config() {} };
      if (name.startsWith("node:")) return require(name);
      throw new Error(`Unexpected sample dependency: ${name}`);
    },
    exports: {},
    module: { exports: {} },
    sampleCompletion: undefined as Promise<void> | undefined,
    process: {
      argv: ["node", file],
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
    TextEncoder,
  };
  // Published JavaScript exports main after starting it; await the actual invocation in every format.
  assert.include(compiled, "main().catch(");
  runInNewContext(
    compiled.replace("main().catch(", "globalThis.sampleCompletion = main().catch("),
    context,
  );
  await context.sampleCompletion;
  return errors;
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
  const fail = (stage: string): void => {
    if (failureAt === stage) throw failure;
  };
  class SearchIndexClient {
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
    model ? { AZURE_OPENAI_EMBEDDING_MODEL_NAME: model } : {},
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
  };
}

for (const directory of directories) {
  describe(`${directory}: synthetic Topic Graph sample`, () => {
    it("links populated indexes and demonstrates inherited and replacement settings", async () => {
      const run = await executeTopicGraphSample(directory);
      assert.isEmpty(run.errors);
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
