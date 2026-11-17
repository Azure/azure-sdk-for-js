// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as crypto from "node:crypto";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import { ModuleKind, ScriptTarget, transpileModule } from "typescript";
import { assert, expect } from "vitest";
import { env, isLiveMode, isPlaybackMode } from "@azure-tools/test-recorder";
import type { Recorder } from "@azure-tools/test-recorder";
import {
  createDefaultHttpClient,
  createHttpHeaders,
  createPipelineFromOptions,
  createPipelineRequest,
} from "@azure/core-rest-pipeline";
import type { HttpClient } from "@azure/core-rest-pipeline";
import * as coreUtil from "@azure/core-util";
import * as sdk from "../../../src/index.js";
import * as protocolIndex from "../../../src/searchIndex/index.js";
import * as protocolSearch from "../../../src/search/index.js";
import * as protocolRetrieval from "../../../src/knowledgeBaseRetrieval/index.js";
import { AzureOpenAI } from "openai";

const require = createRequire(import.meta.url);
type Constructor = new (...args: never[]) => object;
interface OwnedResource {
  kind: string;
  name: string;
  get: () => Promise<unknown>;
  remove: () => Promise<unknown>;
}

function isNotFound(error: unknown): boolean {
  return !!error && typeof error === "object" && "statusCode" in error && error.statusCode === 404;
}

/** Execute unmodified sample bodies with real SDK clients; route every HTTP request through the recorder. */
export async function runRecordedSample(
  sample: string,
  recorder: Recorder,
  environment: Record<string, string> = {},
): Promise<void> {
  const owned: OwnedResource[] = [];
  const endpoint = env.ENDPOINT!;
  const credential = new sdk.AzureKeyCredential(env.AZURE_SEARCH_API_KEY!);
  const transport = createDefaultHttpClient();
  const httpClient: HttpClient = {
    async sendRequest(request) {
      if (!isLiveMode()) {
        const url = new URL(request.url);
        assert.include(
          ["localhost", "127.0.0.1"],
          url.hostname,
          "Recorded tests must never bypass the proxy.",
        );
        assert.equal(url.port, env.TEST_PROXY_HTTP_PORT ?? "5000");
        assert.equal(request.headers.get("x-recording-id"), recorder.recordingId);
      }
      return transport.sendRequest(request);
    },
  };
  const options = (): NonNullable<ConstructorParameters<typeof sdk.SearchIndexClient>[2]> =>
    recorder.configureClientOptions({
      serviceVersion: "2026-11-01-preview",
      retryOptions: { maxRetries: 1 },
      httpClient,
    });
  const verifier = new sdk.SearchIndexClient(endpoint, credential, options());
  const indexers = new sdk.SearchIndexerClient(endpoint, credential, options());
  const sourceReader = new protocolIndex.SearchIndexClient(
    endpoint,
    credential,
    recorder.configureClientOptions({
      apiVersion: "2026-11-01-preview",
      httpClient,
    }),
  );
  const generated = new Set<string>();
  const register = (kind: string, name: string, client: object): void => {
    if (owned.some((resource) => resource.kind === kind && resource.name === name)) return;
    const get = Reflect.get(client, `get${kind}`) as (name: string) => Promise<unknown>;
    const remove = Reflect.get(client, `delete${kind}`) as (name: string) => Promise<unknown>;
    owned.push({
      kind,
      name,
      get: () => get.call(client, name),
      remove: () => remove.call(client, name),
    });
  };
  async function observeGenerated(name: string): Promise<void> {
    const source = await sourceReader.getKnowledgeSource(name);
    for (const parameters of Object.values(source)) {
      if (!parameters || typeof parameters !== "object" || !("createdResources" in parameters)) {
        continue;
      }
      const resources = (
        parameters.createdResources as { additionalProperties?: Record<string, string> } | undefined
      )?.additionalProperties;
      for (const [key, kind] of [
        ["indexer", "Indexer"],
        ["skillset", "Skillset"],
        ["datasource", "DataSourceConnection"],
        ["graphIndex", "Index"],
        ["index", "Index"],
      ]) {
        const resourceName = resources?.[key];
        if (!resourceName || generated.has(resourceName)) continue;
        assert(
          resourceName.startsWith(`${name}-`),
          "Generated cleanup must remain scoped to its owned source.",
        );
        generated.add(resourceName);
        register(kind, resourceName, kind === "Index" ? verifier : indexers);
      }
    }
  }
  function recordConstructor<T extends Constructor>(
    Client: T,
    optionsPosition: number,
    track = false,
  ): T {
    return new Proxy(Client, {
      construct(target, argumentsList: unknown[]) {
        const args = [...argumentsList];
        args[optionsPosition] = recorder.configureClientOptions({
          ...(args[optionsPosition] as object | undefined),
          retryOptions: { maxRetries: 1 },
          httpClient,
        });
        const client = Reflect.construct(target, args) as object;
        if (track) {
          for (const kind of ["Index", "KnowledgeSource", "KnowledgeBase"]) {
            const create = Reflect.get(client, `create${kind}`) as (
              ...parameters: unknown[]
            ) => Promise<unknown>;
            const get = Reflect.get(client, `get${kind}`) as (name: string) => Promise<unknown>;
            Reflect.set(
              client,
              `create${kind}`,
              async (definition: { name: string }, ...rest: unknown[]) => {
                assert.match(
                  definition.name,
                  /-[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}(?:-|$)/,
                );
                try {
                  await get.call(client, definition.name);
                  assert.fail("Refusing to overwrite an existing resource.");
                } catch (error) {
                  if (!isNotFound(error)) throw error;
                }
                register(kind, definition.name, client);
                return create.call(client, definition, ...rest);
              },
            );
          }
          const remove = Reflect.get(client, "deleteKnowledgeSource") as (
            ...parameters: unknown[]
          ) => Promise<unknown>;
          Reflect.set(client, "deleteKnowledgeSource", async (name: string, ...rest: unknown[]) => {
            assert(
              owned.some(
                (resource) => resource.kind === "KnowledgeSource" && resource.name === name,
              ),
            );
            await observeGenerated(name);
            return remove.call(client, name, ...rest);
          });
        }
        return client;
      },
    });
  }
  const fetchOptions = recorder.configureClientOptions({ retryOptions: { maxRetries: 0 } });
  const pipeline = createPipelineFromOptions(fetchOptions);
  for (const { policy, position } of fetchOptions.additionalPolicies ?? []) {
    pipeline.addPolicy(policy, position === "perRetry" ? { afterPhase: "Sign" } : {});
  }
  const recordedFetch: typeof fetch = async (input, init) => {
    const request = new Request(input, init);
    const response = await pipeline.sendRequest(
      httpClient,
      createPipelineRequest({
        url: request.url,
        method: request.method as "POST",
        headers: createHttpHeaders(Object.fromEntries(request.headers)),
        body: await request.text(),
        abortSignal: request.signal,
        timeout: 60_000,
      }),
    );
    return new Response(response.bodyAsText, {
      status: response.status,
      headers: response.headers.toJSON(),
    });
  };
  const modules: Record<string, unknown> = {
    "@azure/search-documents": {
      ...sdk,
      SearchIndexClient: recordConstructor(sdk.SearchIndexClient, 2, true),
      SearchIndexerClient: recordConstructor(sdk.SearchIndexerClient, 2),
      SearchClient: recordConstructor(sdk.SearchClient, 3),
      KnowledgeRetrievalClient: recordConstructor(sdk.KnowledgeRetrievalClient, 3),
    },
    "@azure/search-documents/searchIndex": {
      ...protocolIndex,
      SearchIndexClient: recordConstructor(protocolIndex.SearchIndexClient, 2),
    },
    "@azure/search-documents/search": {
      ...protocolSearch,
      SearchClient: recordConstructor(protocolSearch.SearchClient, 3),
    },
    "@azure/search-documents/knowledgeBaseRetrieval": {
      ...protocolRetrieval,
      KnowledgeBaseRetrievalClient: recordConstructor(
        protocolRetrieval.KnowledgeBaseRetrievalClient,
        3,
      ),
    },
    "@azure/core-util": {
      ...coreUtil,
      delay: async (...args: Parameters<typeof coreUtil.delay>) => {
        if (!isPlaybackMode()) await coreUtil.delay(...args);
      },
    },
    openai: {
      AzureOpenAI: class extends AzureOpenAI {
        constructor(settings: ConstructorParameters<typeof AzureOpenAI>[0]) {
          super({ ...settings, fetch: recordedFetch });
        }
      },
    },
    dotenv: { config() {} },
    "dotenv/config": {},
  };
  let uuid = 0;
  const errors: unknown[] = [];
  const file = fileURLToPath(new URL(`../../../samples-dev/${sample}.ts`, import.meta.url));
  const context = {
    require(name: string) {
      if (name === "node:crypto") {
        return {
          ...crypto,
          randomUUID: () => recorder.variable(`sample-uuid-${++uuid}`, crypto.randomUUID()),
        };
      }
      if (name in modules) return modules[name];
      if (name.startsWith("node:") || name === "@azure/identity") return require(name);
      throw new Error(`Unexpected sample dependency: ${name}`);
    },
    exports: {},
    module: { exports: {} },
    process: {
      argv: ["node", file],
      env: { ...env, ...environment },
      exitCode: undefined as number | undefined,
    },
    console: {
      log() {},
      error(...args: unknown[]) {
        errors.push(args);
      },
    },
    fetch: recordedFetch,
    AbortController,
    AbortSignal,
    TextEncoder,
    URL,
    Error,
    completion: undefined as Promise<void> | undefined,
  };
  const compiled = transpileModule(readFileSync(file, "utf8"), {
    compilerOptions: {
      module: ModuleKind.CommonJS,
      target: ScriptTarget.ES2022,
      esModuleInterop: true,
    },
  }).outputText;
  assert.include(compiled, "main().catch(");
  const failures: unknown[] = [];
  try {
    runInNewContext(
      compiled.replace("main().catch(", "globalThis.completion = main().catch("),
      context,
    );
    await context.completion;
    assert.deepEqual(
      errors,
      [],
      "The actual sample must finish without operation or cleanup errors.",
    );
    assert.isUndefined(context.process.exitCode);
  } catch (error) {
    failures.push(error);
  }
  for (const source of owned.filter((resource) => resource.kind === "KnowledgeSource")) {
    try {
      await observeGenerated(source.name);
    } catch (error) {
      if (!isNotFound(error)) failures.push(error);
    }
  }
  const leaked: string[] = [];
  const priority = [
    "KnowledgeBase",
    "KnowledgeSource",
    "Indexer",
    "Skillset",
    "DataSourceConnection",
    "Index",
  ];
  for (const resource of [...owned]
    .reverse()
    .sort((a, b) => priority.indexOf(a.kind) - priority.indexOf(b.kind))) {
    try {
      try {
        await resource.get();
      } catch (error) {
        if (isNotFound(error)) continue;
        throw error;
      }
      leaked.push(`${resource.kind}: ${resource.name}`);
      await resource.remove();
      await expect(resource.get()).rejects.toMatchObject({ statusCode: 404 });
    } catch (error) {
      failures.push(error);
    }
  }
  if (leaked.length) {
    failures.push(
      new Error(`Sample needed fallback cleanup for ${leaked.length} owned resources.`),
    );
  }
  if (failures.length) {
    throw new AggregateError(
      failures,
      `${sample}: sample execution or owned-resource cleanup failed.`,
    );
  }
}
