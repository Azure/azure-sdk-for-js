// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates `2026-10-01` GA knowledge base configuration with retrieval
 * instructions, reasoning effort, output mode, a model, and CORS options.
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
  KnownKnowledgeRetrievalReasoningEffortKind,
  SearchIndexClient,
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
// Default to a GPT-5.x deployment; override via environment when needed.
const azureOpenAIChatDeployment =
  process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME || KnownAzureOpenAIModelName.Gpt54Mini;
const azureOpenAIChatModel =
  process.env.AZURE_OPENAI_CHAT_MODEL_NAME || KnownAzureOpenAIModelName.Gpt54Mini;

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
  console.log(`Running Knowledge Base Configuration Sample....`);
  if (!endpoint || !azureOpenAIEndpoint) {
    console.log("Set ENDPOINT and AZURE_OPENAI_ENDPOINT, and deploy the configured chat model.");
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
    semanticSearch: {
      defaultConfigurationName: "content",
      configurations: [
        { name: "content", prioritizedFields: { contentFields: [{ name: "content" }] } },
      ],
    },
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
            modelName: azureOpenAIChatModel,
          },
        },
      ]
    : undefined;

  const knowledgeBase: KnowledgeBase = {
    name: KNOWLEDGE_BASE_NAME,
    description: "Knowledge base demonstrating retrieval configuration.",
    knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
    retrievalInstructions:
      "Only return content directly relevant to the user's question. " +
      "Prefer recent documents over older ones when both are equally relevant.",
    answerInstructions:
      "Always cite the source title. Refuse to answer if no supporting passage is found.",
    retrievalReasoningEffort: { kind: KnownKnowledgeRetrievalReasoningEffortKind.Medium },
    outputMode: KnownKnowledgeRetrievalOutputMode.ExtractiveData,
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
    console.log(`  knowledgeSources[0]:      ${created.knowledgeSources[0]?.name}`);

    assertSample(
      created.retrievalReasoningEffort?.kind === "medium",
      "stored effort should be medium",
    );

    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const storedEffort = await getEffectiveReasoningEffort(retrievalClient);
    assertSample(storedEffort === "medium", "stored medium should override the service default");

    const requestEffort = await getEffectiveReasoningEffort(retrievalClient, { kind: "low" });
    assertSample(requestEffort === "low", "request low should override stored medium");

    console.log(`Reasoning precedence: request low overrides stored medium`);

    const persisted = await client.getKnowledgeBase(KNOWLEDGE_BASE_NAME);
    persisted.outputMode = KnownKnowledgeRetrievalOutputMode.AnswerSynthesis;
    persisted.answerInstructions = "Answer concisely and cite every supporting source.";
    const updated = await client.createOrUpdateKnowledgeBase(persisted);
    console.log(`Updated stored output mode: ${updated.outputMode}`);
  } finally {
    await client.deleteKnowledgeBase(KNOWLEDGE_BASE_NAME).catch(() => {});
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
    await client.deleteIndex(INDEX_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
