// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the preview freshness + persisted-defaults
 * surface for indexed knowledge sources introduced by the
 * 2026-05-01-preview data plane.
 *
 * Concretely the sample shows:
 *   - A File knowledge source whose `ingestionParameters` set a
 *     `freshnessPolicy` (`boostingDuration`) so that newer documents
 *     receive a ranking boost during retrieval.
 *   - KS-level persisted retrieval defaults baked into the source
 *     definition (so they apply at every retrieve call without
 *     re-specifying them on the request).
 *   - The `KnowledgeSourceReference.enableFreshness` flag that wires
 *     the knowledge base to honor the source's freshness policy.
 *   - A retrieval that benefits from the freshness boost.
 *
 * Prerequisites:
 *   - The search service must have a managed identity with the
 *     "Cognitive Services OpenAI User" role on the embedding account.
 *   - `AZURE_OPENAI_ENDPOINT` and
 *     `AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME` must be set.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { DefaultAzureCredential } from "@azure/identity";
import type { FileKnowledgeSource, FreshnessPolicy, KnowledgeBase } from "@azure/search-documents";
import {
  KnowledgeRetrievalClient,
  KnownAzureOpenAIModelName,
  SearchIndexClient,
} from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const azureOpenAIEmbeddingDeployment =
  process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME ||
  KnownAzureOpenAIModelName.TextEmbeddingAda002;

const KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-freshness-preview-sample";
const KNOWLEDGE_BASE_NAME = "example-kb-for-freshness-preview-sample";

async function main(): Promise<void> {
  console.log(`Running Knowledge Source Freshness Preview Sample....`);
  if (!endpoint || !azureOpenAIEndpoint) {
    console.log(
      "Set ENDPOINT and AZURE_OPENAI_ENDPOINT (and optionally " +
        "AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME) before running this sample.",
    );
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  // KS-level persisted default: bias retrieval toward documents
  // ingested within the last 30 days.
  const freshnessPolicy: FreshnessPolicy = { boostingDuration: "P30D" };

  const fileKnowledgeSource: FileKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "file",
    description: "File knowledge source with a persisted 30-day freshness boost.",
    fileParameters: {
      ingestionParameters: {
        embeddingModel: {
          kind: "azureOpenAI",
          azureOpenAIParameters: {
            deploymentId: azureOpenAIEmbeddingDeployment,
            resourceUrl: azureOpenAIEndpoint,
            modelName: azureOpenAIEmbeddingDeployment,
          },
        },
        freshnessPolicy,
      },
    },
  };

  try {
    const created = await client.createKnowledgeSource(fileKnowledgeSource);
    console.log(
      `Created ${created.kind} knowledge source ${created.name} ` +
        `with freshness window ${freshnessPolicy.boostingDuration}.`,
    );

    // Upload a small file so the KS has retrievable content.
    const fileName = "sample.txt";
    const fileContents = readFileSync(
      resolve(dirname(fileURLToPath(import.meta.url)), "fixtures", fileName),
    );
    await client.uploadKnowledgeSourceFile(
      KNOWLEDGE_SOURCE_NAME,
      fileContents,
      `attachment; filename="${fileName}"`,
    );

    // Wire the KS into a KB and opt into freshness via the reference.
    const knowledgeBase: KnowledgeBase = {
      name: KNOWLEDGE_BASE_NAME,
      description: "Knowledge base wired to honor the source's freshness policy.",
      knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME, enableFreshness: true }],
    };
    await client.createKnowledgeBase(knowledgeBase);
    console.log(
      `Attached ${KNOWLEDGE_SOURCE_NAME} to ${KNOWLEDGE_BASE_NAME} with enableFreshness=true`,
    );

    // Retrieve through the KB; the freshness defaults persist on the
    // source and the KB reference, so no extra request-level flags are
    // required to benefit from the boost.
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const response = await retrievalClient.retrieve({
      intents: [{ type: "semantic", search: "What is in the uploaded document?" }],
      includeActivity: true,
    });
    console.log(
      `Retrieve activity records: ${response.activity?.length ?? 0}, ` +
        `references: ${response.references?.length ?? 0}`,
    );
  } finally {
    await client.deleteKnowledgeBase(KNOWLEDGE_BASE_NAME).catch(() => {});
    try {
      for await (const file of client.listKnowledgeSourceFiles(KNOWLEDGE_SOURCE_NAME)) {
        if (file.fileId) {
          await client
            .deleteKnowledgeSourceFile(KNOWLEDGE_SOURCE_NAME, file.fileId)
            .catch(() => {});
        }
      }
    } catch {
      // knowledge source may not exist
    }
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
