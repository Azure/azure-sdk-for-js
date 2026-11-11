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
const samples = [
  "knowledgeSourceFilePreview",
  "knowledgeSourceFreshnessPreview",
  "knowledgeBasePreviewConfiguration",
];

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
  const errors: unknown[] = [];
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
  const file = resolve(
    fileURLToPath(new URL("../../../", import.meta.url)),
    directory,
    `${sample}.${directory.endsWith("javascript") ? "js" : "ts"}`,
  );
  const compiled = transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: { module: ModuleKind.CommonJS, target: ScriptTarget.ES2022 },
  }).outputText;
  await runInNewContext(compiled, {
    require: (name: string) => {
      if (name === "@azure/search-documents") {
        return { ...sdk, SearchIndexClient, KnowledgeRetrievalClient };
      }
      if (name === "@azure/identity") return { DefaultAzureCredential: class {} };
      if (name === "dotenv") return { config() {} };
      if (name.startsWith("node:")) return require(name);
      throw new Error(`Unexpected sample dependency: ${name}`);
    },
    exports: {},
    process: {
      argv: ["node", file],
      env: {
        ENDPOINT: "https://example.search.windows.net",
        AZURE_OPENAI_ENDPOINT: "https://example.openai.azure.com",
        AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME: "my-embedding",
        AZURE_OPENAI_CHAT_DEPLOYMENT_NAME: "my-chat",
        ...environment,
      },
    },
    console: {
      log() {},
      error(_message: string, error: unknown) {
        errors.push(error);
      },
    },
    AbortController,
  });
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

for (const directory of [
  "samples-dev",
  join("samples", "v13-beta", "typescript", "src"),
  join("samples", "v13-beta", "javascript"),
]) {
  for (const sample of samples) {
    describe(`${directory}: ${sample} sample safety`, () => {
      const failures = [
        "createKnowledgeSource",
        "createKnowledgeBase",
        "retrieve",
        sample === "knowledgeBasePreviewConfiguration" ? "createIndex" : "upload",
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
    });
  }
}
