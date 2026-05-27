// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the `file` knowledge source preview kind added in
 * `13.1.0-beta.1`. The sample creates a File knowledge source backed by
 * an Azure OpenAI embedding deployment, uploads a small text file, lists
 * the files in the source, and cleans up at the end.
 *
 * File knowledge sources accept direct file uploads (PDF, DOCX, TXT, HTML,
 * Markdown). Each file is chunked, vectorized using the configured
 * embedding model, and made available for retrieval through any
 * `KnowledgeBase` that references the source.
 *
 * Prerequisites:
 *   - The search service must have a system- or user-assigned managed
 *     identity granted the "Cognitive Services OpenAI User" role on the
 *     Azure OpenAI account used for embeddings.
 *   - `AZURE_OPENAI_ENDPOINT` and `AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME`
 *     must be set in the environment.
 */

import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import { DefaultAzureCredential } from "@azure/identity";
import type { FileKnowledgeSource } from "@azure/search-documents";
import { SearchIndexClient } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";
const azureOpenAIEndpoint = process.env.AZURE_OPENAI_ENDPOINT || "";
const azureOpenAIEmbeddingDeployment =
  process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME || "text-embedding-ada-002";

const KNOWLEDGE_SOURCE_NAME = "example-file-knowledge-source-sample";

async function main(): Promise<void> {
  console.log(`Running File Knowledge Source Sample....`);
  if (!endpoint || !azureOpenAIEndpoint) {
    console.log(
      "Set ENDPOINT and AZURE_OPENAI_ENDPOINT (and optionally " +
        "AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME) before running this sample.",
    );
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  const fileKnowledgeSource: FileKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "file",
    description: "File knowledge source that ingests uploaded documents.",
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
      },
    },
  };

  try {
    const created = await client.createKnowledgeSource(fileKnowledgeSource);
    console.log(`Created File knowledge source: ${created.name}`);

    // Upload a small file from the fixtures directory next to this sample.
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

    console.log(`Files in ${KNOWLEDGE_SOURCE_NAME}:`);
    for await (const file of client.listKnowledgeSourceFiles(KNOWLEDGE_SOURCE_NAME)) {
      console.log(`  - ${file.fileName} (id=${file.fileId}, ${file.fileSizeBytes} bytes)`);
    }
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
