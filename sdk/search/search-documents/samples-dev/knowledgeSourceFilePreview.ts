// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Preview sample for the `file` knowledge source kind. Walks
 * through the full lifecycle that customers will exercise:
 *   1. Create the File knowledge source backed by an Azure OpenAI
 *      embedding deployment, upload a file into it, and list the files.
 *   2. Read the source back via `getKnowledgeSource` and list all KSes.
 *   3. Attach the source to a `KnowledgeBase`.
 *   4. Issue a `retrieve` call against the KB and inspect the
 *      file-specific reference / activity shape (`type: "file"`).
 *   5. Tear everything down.
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
import type { FileKnowledgeSource, KnowledgeBase } from "@azure/search-documents";
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

const KNOWLEDGE_SOURCE_NAME = "example-knowledge-source-file-preview-sample";
const KNOWLEDGE_BASE_NAME = "example-kb-for-file-ks-preview-sample";

async function main(): Promise<void> {
  console.log(`Running Knowledge Source File Preview Sample....`);
  if (!endpoint || !azureOpenAIEndpoint) {
    console.log(
      "Set ENDPOINT and AZURE_OPENAI_ENDPOINT (and optionally " +
        "AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME) before running this sample.",
    );
    return;
  }

  const credential = new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential);

  const fileKnowledgeSource: FileKnowledgeSource = {
    name: KNOWLEDGE_SOURCE_NAME,
    kind: "file",
    description: "File knowledge source preview sample.",
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
    // 1. Create the KS and upload a file.
    const created = await client.createKnowledgeSource(fileKnowledgeSource);
    console.log(`Created File knowledge source: ${created.name}`);

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

    // 2. Read it back / list.
    const fetched = await client.getKnowledgeSource(KNOWLEDGE_SOURCE_NAME);
    console.log(`Read back: ${fetched.name} (kind=${fetched.kind})`);
    console.log(`Files currently in ${KNOWLEDGE_SOURCE_NAME}:`);
    for await (const file of client.listKnowledgeSourceFiles(KNOWLEDGE_SOURCE_NAME)) {
      console.log(`  - ${file.fileName} (id=${file.fileId}, ${file.fileSizeBytes} bytes)`);
    }

    // 3. Attach to a KB.
    const knowledgeBase: KnowledgeBase = {
      name: KNOWLEDGE_BASE_NAME,
      description: "Knowledge base wired to a File knowledge source.",
      knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
    };
    await client.createKnowledgeBase(knowledgeBase);
    console.log(`Attached ${KNOWLEDGE_SOURCE_NAME} to ${KNOWLEDGE_BASE_NAME}`);

    // 4. Retrieve and look at the File-specific reference / activity shape.
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const response = await retrievalClient.retrieve({
      intents: [{ type: "semantic", search: "Summarize the uploaded document." }],
      includeActivity: true,
    });
    console.log(`Retrieve activity records: ${response.activity?.length ?? 0}`);
    for (const ref of response.references ?? []) {
      if (ref.type === "file") {
        console.log(
          `  - file reference: docKey=${(ref as { docKey?: string }).docKey ?? "<none>"}`,
        );
      }
    }
  } finally {
    // 5. Tear down.
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
