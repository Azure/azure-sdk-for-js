// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the preview-only configuration knobs for a
 * `KnowledgeBase` introduced by the 2026-05-01-preview data plane:
 *   - `corsOptions` to allow browser callers.
 *   - KB-level retrieval defaults: `retrievalInstructions`,
 *     `answerInstructions`, `retrievalReasoningEffort`, `outputMode`.
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

async function main(): Promise<void> {
  console.log(`Running Knowledge Base Preview Configuration Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

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
    retrievalReasoningEffort: { kind: "medium" },
    outputMode: KnownKnowledgeRetrievalOutputMode.AnswerSynthesis,
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
    console.log(`  outputMode:               ${created.outputMode ?? "<none>"}`);
    console.log(
      `  knowledgeSources[0]:      ${created.knowledgeSources[0]?.name} ` +
        `(enableFreshness=${created.knowledgeSources[0]?.enableFreshness ?? false})`,
    );

    // Patch a couple of KB-level defaults.
    created.outputMode = KnownKnowledgeRetrievalOutputMode.ExtractiveData;
    created.retrievalReasoningEffort = { kind: "low" };
    const updated = await client.createOrUpdateKnowledgeBase(KNOWLEDGE_BASE_NAME, created);
    console.log(
      `Updated KB defaults: outputMode=${updated.outputMode}, ` +
        `retrievalReasoningEffort=${updated.retrievalReasoningEffort?.kind}`,
    );
  } finally {
    await client.deleteKnowledgeBase(KNOWLEDGE_BASE_NAME).catch(() => {});
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
    await client.deleteIndex(INDEX_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
