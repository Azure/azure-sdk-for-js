// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the preview-only configuration knobs for a
 * `KnowledgeBase` in the 2026-08-01-preview data plane:
 *   - `corsOptions` to allow browser callers.
 *   - KB-level retrieval defaults: `retrievalInstructions`,
 *     `answerInstructions`, `retrievalReasoningEffort`, `outputMode`.
 *   - `retrieveDefaults` for stored document/token/runtime limits.
 *   - `models` pointing at one of the new GPT-5.x deployments
 *     (e.g. `gpt-5.4` or `gpt-5.4-mini`).
 *   - At least one knowledge source attached with preview-relevant
 *     default behavior (`enableFreshness: true`).
 *
 * The sample creates the KB, prints back the persisted defaults, then
 * patches a couple of the defaults via `createOrUpdate`.
 */

import { DefaultAzureCredential } from "@azure/identity";
import type {
  KnowledgeBase,
  KnowledgeBaseAzureOpenAIModel,
  SearchIndexKnowledgeSource,
} from "@azure/search-documents";
import {
  KnowledgeRetrievalClient,
  KnownAzureOpenAIModelName,
  KnownKnowledgeRetrievalOutputMode,
  SearchIndexClient,
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
// Default to a GPT-5.x deployment; override via environment when needed.
const azureOpenAIChatDeployment =
  process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME || KnownAzureOpenAIModelName.Gpt54Mini;

const INDEX_NAME = "example-index-for-kb-preview-config-sample";
const KNOWLEDGE_SOURCE_NAME = "example-ks-for-kb-preview-config-sample";
const KNOWLEDGE_BASE_NAME = "example-knowledge-base-preview-config-sample";

function assertSample(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Sample assertion failed: ${message}`);
  }
}

async function getEffectiveReasoningEffort(
  client: KnowledgeRetrievalClient,
  requestReasoningEffort?: { kind: "low" },
): Promise<string> {
  const controller = new AbortController();
  const events = await client.retrieveStream(
    {
      intents: [{ type: "semantic", search: "What information is available?" }],
      outputMode: KnownKnowledgeRetrievalOutputMode.ExtractiveData,
      retrievalReasoningEffort: requestReasoningEffort,
      // This request-level byte limit is distinct from the stored token limit below.
      maxOutputSize: 4096,
    },
    { abortSignal: controller.signal },
  );

  for await (const event of events) {
    if (event.event === "retrieval.started") {
      controller.abort();
      return event.data.reasoningEffort.kind;
    }
    if (event.event === "error") {
      throw new Error(event.data.error.message ?? "Retrieval failed before it started");
    }
  }
  throw new Error("The retrieval stream ended before retrieval.started");
}

async function main(): Promise<void> {
  console.log(`Running Knowledge Base Preview Configuration Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  await client.createIndex({
    name: INDEX_NAME,
    fields: [
      { type: "Edm.String", name: "id", key: true },
      { type: "Edm.String", name: "content", searchable: true },
    ],
  });
  const searchIndexKnowledgeSource: SearchIndexKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "searchIndex",
    searchIndexParameters: { searchIndexName: INDEX_NAME },
  };
  await client.createKnowledgeSource(searchIndexKnowledgeSource);

  // Use a new GPT-5.x deployment for query planning / answer synthesis.
  const models: KnowledgeBaseAzureOpenAIModel[] | undefined = azureOpenAIEndpoint
    ? [
        {
          kind: "azureOpenAI",
          azureOpenAIParameters: {
            deploymentId: azureOpenAIChatDeployment,
            resourceUrl: azureOpenAIEndpoint,
            modelName: azureOpenAIChatDeployment,
          },
        },
      ]
    : undefined;

  const knowledgeBase: KnowledgeBase = {
    name: KNOWLEDGE_BASE_NAME,
    description: "Knowledge base demonstrating preview-only configuration knobs.",
    // Reference the KS with preview-relevant defaults. `enableFreshness`
    // tells the KB to apply the KS's freshness policy at retrieval time.
    knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME, enableFreshness: true }],
    // KB-level retrieval defaults — these apply unless the retrieve
    // request overrides them.
    retrievalInstructions:
      "Only return content directly relevant to the user's question. " +
      "Prefer recent documents over older ones when both are equally relevant.",
    answerInstructions:
      "Always cite the source title. Refuse to answer if no supporting passage is found.",
    retrievalReasoningEffort: { kind: "auto" },
    outputMode: KnownKnowledgeRetrievalOutputMode.ExtractiveData,
    retrieveDefaults: {
      maxOutputDocuments: 8,
      maxOutputSizeInTokens: 4096,
      maxRuntimeInSeconds: 30,
    },
    models,
    corsOptions: {
      allowedOrigins: ["*"],
      maxAgeInSeconds: 60,
    },
  };

  try {
    const created = await client.createKnowledgeBase(knowledgeBase);
    console.log(`Created knowledge base ${created.name}`);
    console.log(`  models[0].modelName:      ${models?.[0]?.azureOpenAIParameters?.modelName}`);
    console.log(`  retrievalInstructions:    ${created.retrievalInstructions ?? "<none>"}`);
    console.log(`  answerInstructions:       ${created.answerInstructions ?? "<none>"}`);
    console.log(
      `  retrievalReasoningEffort: ${created.retrievalReasoningEffort?.kind ?? "<none>"}`,
    );
    console.log(
      `  retrieveDefaults.maxOutputSizeInTokens: ` +
        `${created.retrieveDefaults?.maxOutputSizeInTokens ?? "<none>"}`,
    );
    console.log(`  outputMode:               ${created.outputMode ?? "<none>"}`);
    console.log(
      `  knowledgeSources[0]:      ${created.knowledgeSources[0]?.name} ` +
        `(enableFreshness=${created.knowledgeSources[0]?.enableFreshness ?? false})`,
    );

    assertSample(created.retrievalReasoningEffort?.kind === "auto", "stored effort should be auto");
    assertSample(
      created.retrieveDefaults?.maxOutputSizeInTokens === 4096,
      "stored token limit should round-trip",
    );

    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const storedEffort = await getEffectiveReasoningEffort(retrievalClient);
    assertSample(storedEffort === "auto", "stored auto should override the service default");

    const requestEffort = await getEffectiveReasoningEffort(retrievalClient, { kind: "low" });
    assertSample(requestEffort === "low", "request low should override stored auto");

    console.log(`Reasoning precedence: request low overrides stored auto`);
  } finally {
    await client.deleteKnowledgeBase(KNOWLEDGE_BASE_NAME).catch(() => {});
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
    await client.deleteIndex(INDEX_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
