// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the `KnowledgeBase`-level configuration options
 * added in `13.1.0-beta.1`. The sample creates a knowledge base with:
 *   - `retrievalInstructions`: prompt-style guidance used while
 *     planning the retrieval.
 *   - `answerInstructions`: prompt-style guidance used while
 *     synthesizing the final answer.
 *   - `retrievalReasoningEffort`: discriminated-union control over how
 *     much reasoning the planner applies.
 *   - `outputMode`: shape of the retrieval response
 *     (`extractiveData` vs `answerSynthesis`).
 *   - `models`: Azure OpenAI chat-completion model used for query
 *     planning / answer synthesis.
 *   - `corsOptions`: CORS configuration for browser callers.
 *
 * The sample then patches the knowledge base via `createOrUpdate` to
 * show that the same configuration fields can be modified after
 * creation.
 */

import { DefaultAzureCredential } from "@azure/identity";
import type {
  KnowledgeBase,
  KnowledgeBaseAzureOpenAIModel,
  SearchIndexKnowledgeSource,
} from "@azure/search-documents";
import { KnownKnowledgeRetrievalOutputMode, SearchIndexClient } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const azureOpenAIChatDeployment = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME || "gpt-4o-mini";

const INDEX_NAME = "example-index-for-kb-config-sample";
const KNOWLEDGE_SOURCE_NAME = "example-ks-for-kb-config-sample";
const KNOWLEDGE_BASE_NAME = "example-knowledge-base-config-sample";

async function main(): Promise<void> {
  console.log(`Running Knowledge Base Configuration Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  // Set up an index + knowledge source so the knowledge base has a source to reference.
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

  // Optional Azure OpenAI chat-completion model for query planning /
  // answer synthesis. Only attached if AZURE_OPENAI_ENDPOINT is set.
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
    description: "Knowledge base demonstrating configuration options.",
    knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
    // Prompt-style guidance applied while the planner forms sub-queries.
    retrievalInstructions:
      "Only return content that is directly relevant to the user's question. " +
      "Prefer recent documents over older ones when both are equally relevant.",
    // Prompt-style guidance applied while the answer is synthesized.
    answerInstructions:
      "Always cite the source title. Refuse to answer if no supporting passage is found.",
    // Reasoning effort is a discriminated union — pass an object with a `kind` field.
    retrievalReasoningEffort: { kind: "medium" },
    // Response shape: raw passages (`extractiveData`) vs synthesized text (`answerSynthesis`).
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
    console.log(`  retrievalInstructions:   ${created.retrievalInstructions ?? "<none>"}`);
    console.log(`  answerInstructions:      ${created.answerInstructions ?? "<none>"}`);
    console.log(`  retrievalReasoningEffort: ${created.retrievalReasoningEffort?.kind ?? "<none>"}`);
    console.log(`  outputMode:              ${created.outputMode ?? "<none>"}`);
    console.log(`  models:                  ${created.models?.length ?? 0}`);

    // Patch a couple of configuration fields. `createOrUpdate` requires
    // the full resource shape; here we re-use the just-created instance.
    created.outputMode = KnownKnowledgeRetrievalOutputMode.ExtractiveData;
    created.retrievalReasoningEffort = { kind: "low" };
    const updated = await client.createOrUpdateKnowledgeBase(KNOWLEDGE_BASE_NAME, created);
    console.log(
      `Updated knowledge base outputMode=${updated.outputMode}, ` +
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
