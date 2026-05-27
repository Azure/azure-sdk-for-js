// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the `freshnessPolicy` knowledge source ingestion
 * setting added in `13.1.0-beta.1`. The freshness policy biases
 * retrieval toward newer documents by boosting items ingested within
 * the configured ISO-8601 duration window (for example `P90D` for the
 * last 90 days).
 *
 * The sample creates a File knowledge source whose
 * `ingestionParameters.freshnessPolicy.boostingDuration` is set to 30
 * days, uploads a small file, and then deletes the source.
 *
 * Prerequisites:
 *   - The search service must have a managed identity granted the
 *     "Cognitive Services OpenAI User" role on the Azure OpenAI account
 *     used for embeddings.
 *   - `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME`
 *     must be set in the environment.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { DefaultAzureCredential } from "@azure/identity";
import type { FileKnowledgeSource, FreshnessPolicy } from "@azure/search-documents";
import { SearchIndexClient } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const azureOpenAIEmbeddingDeployment =
  process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME || "text-embedding-ada-002";

const KNOWLEDGE_SOURCE_NAME = "example-freshness-policy-knowledge-source-sample";

async function main(): Promise<void> {
  console.log(`Running Freshness Policy Sample....`);
  if (!endpoint || !azureOpenAIEndpoint) {
    console.log(
      "Set ENDPOINT and AZURE_OPENAI_ENDPOINT (and optionally " +
        "AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME) before running this sample.",
    );
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  // Boost documents ingested within the last 30 days.
  const freshnessPolicy: FreshnessPolicy = { boostingDuration: "P30D" };

  const fileKnowledgeSource: FileKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "file",
    description: "File knowledge source with a 30-day freshness boosting window.",
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
      `Created ${created.kind} knowledge source ${created.name} with freshness boosting ` +
        `window ${freshnessPolicy.boostingDuration}.`,
    );

    // Upload a small file so the knowledge source has content to rank.
    const fileName = "sample.txt";
    const fileContents = readFileSync(
      resolve(dirname(fileURLToPath(import.meta.url)), "fixtures", fileName),
    );
    const uploaded = await client.uploadKnowledgeSourceFile(
      KNOWLEDGE_SOURCE_NAME,
      fileContents,
      `attachment; filename="${fileName}"`,
    );
    console.log(
      `Uploaded ${uploaded.fileName} (${uploaded.fileSizeBytes} bytes, id=${uploaded.fileId})`,
    );
  } finally {
    try {
      for await (const file of client.listKnowledgeSourceFiles(KNOWLEDGE_SOURCE_NAME)) {
        if (file.fileId) {
          await client
            .deleteKnowledgeSourceFile(KNOWLEDGE_SOURCE_NAME, file.fileId)
            .catch(() => {});
        }
      }
    } catch {
      // ignore — knowledge source may not have been created
    }
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
