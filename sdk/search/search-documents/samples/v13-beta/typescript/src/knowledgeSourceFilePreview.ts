// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Preview sample for the `file` knowledge source kind. Walks
 * through the full lifecycle that customers will exercise:
 *   1. Create the File knowledge source backed by an Azure OpenAI
 *      embedding deployment and upload a relative-path file with metadata.
 *   2. Update the file, page through a prefix-filtered list, and inspect
 *      the parsing/extraction modes selected by the service.
 *   2. Read the source back via `getKnowledgeSource` and list all KSes.
 *   3. Attach the source to a `KnowledgeBase` and retrieve from it.
 *   4. Inspect the
 *      file-specific reference / activity shape (`type: "file"`).
 *   5. Delete the file and tear everything down.
 *
 * Prerequisites:
 *   - The search service must have a managed identity with the
 *     "Cognitive Services OpenAI User" role on the embedding account.
 *   - `AZURE_OPENAI_ENDPOINT` and
 *     `AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME` must be set.
 */

import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

import { DefaultAzureCredential } from "@azure/identity";
import type {
  FileKnowledgeSource,
  KnowledgeBase,
  KnowledgeBaseFileReference,
} from "@azure/search-documents";
import {
  KnowledgeRetrievalClient,
  KnownAzureOpenAIModelName,
  KnownBlobIndexerParsingMode,
  KnownFileKnowledgeSourceExtractionMode,
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

function assertSample(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(`Sample assertion failed: ${message}`);
  }
}

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
    corsOptions: {
      allowedOrigins: ["https://contoso.example"],
      maxAgeInSeconds: 300,
    },
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
    // 1. Create the KS and upload a relative-path file with custom metadata.
    const created = await client.createKnowledgeSource(fileKnowledgeSource);
    console.log(`Created File knowledge source: ${created.name}`);

    const fileName = "sample.txt";
    const relativePath = `manuals/${fileName}`;
    const fileContents = readFileSync(resolve(dirname(process.argv[1]), "fixtures", fileName));
    const uploaded = await client.uploadKnowledgeSourceFileMultipart(KNOWLEDGE_SOURCE_NAME, {
      metadata: {
        fileName: relativePath,
        metadata: { category: "manual", revision: "1" },
      },
      content: { contents: fileContents, contentType: "text/plain", filename: fileName },
    });
    assertSample(uploaded.fileId, "the service should return a file ID");
    console.log(`Uploaded ${uploaded.fileName} (${uploaded.fileSizeBytes} bytes)`);

    // 2. Replace the file content/metadata in place.
    const updated = await client.updateKnowledgeSourceFile(KNOWLEDGE_SOURCE_NAME, uploaded.fileId, {
      metadata: {
        fileName: relativePath,
        metadata: { category: "manual", revision: "2" },
      },
      content: { contents: fileContents, contentType: "text/plain", filename: fileName },
    });
    assertSample(updated.fileId === uploaded.fileId, "an update should preserve the file ID");
    assertSample(updated.metadata?.revision === "2", "updated metadata should round-trip");

    // The SDK follows opaque continuation links internally. pageSize=1 forces paging without
    // exposing or parsing service continuation state.
    const seenFileIds = new Set<string>();
    for await (const page of client
      .listKnowledgeSourceFiles(KNOWLEDGE_SOURCE_NAME, {
        prefix: "manuals/",
        pageSize: 1,
      })
      .byPage()) {
      for (const file of page) {
        assertSample(file.prefix === "manuals/", "prefix filtering should be preserved");
        assertSample(file.fileId, "listed files should have an ID");
        assertSample(!seenFileIds.has(file.fileId), "paged results must not contain duplicates");
        seenFileIds.add(file.fileId);

        if (file.parsingMode !== undefined) {
          assertSample(
            new Set<string>(Object.values(KnownBlobIndexerParsingMode)).has(file.parsingMode),
            `unexpected service-selected parsing mode ${file.parsingMode}`,
          );
        }
        if (file.extractionMode !== undefined) {
          assertSample(
            file.extractionMode === KnownFileKnowledgeSourceExtractionMode.Minimal ||
              file.extractionMode === KnownFileKnowledgeSourceExtractionMode.Standard,
            `unexpected service-selected extraction mode ${file.extractionMode}`,
          );
        }
        console.log(
          `  - ${file.fileName}: parsing=${file.parsingMode ?? "pending"}, ` +
            `extraction=${file.extractionMode ?? "pending"}`,
        );
      }
    }
    assertSample(seenFileIds.has(uploaded.fileId), "prefix paging should return the uploaded file");

    // 3. Read the source back.
    const fetched = await client.getKnowledgeSource(KNOWLEDGE_SOURCE_NAME);
    console.log(`Read back: ${fetched.name} (kind=${fetched.kind})`);

    // 4. Attach to a KB.
    const knowledgeBase: KnowledgeBase = {
      name: KNOWLEDGE_BASE_NAME,
      description: "Knowledge base wired to a File knowledge source.",
      knowledgeSources: [{ name: KNOWLEDGE_SOURCE_NAME }],
    };
    await client.createKnowledgeBase(knowledgeBase);
    console.log(`Attached ${KNOWLEDGE_SOURCE_NAME} to ${KNOWLEDGE_BASE_NAME}`);

    // 5. Retrieve and look at the File-specific reference / activity shape.
    const retrievalClient = new KnowledgeRetrievalClient(endpoint, KNOWLEDGE_BASE_NAME, credential);
    const response = await retrievalClient.retrieve({
      intents: [{ type: "semantic", search: "Summarize the uploaded document." }],
      includeActivity: true,
    });
    console.log(`Retrieve activity records: ${response.activity?.length ?? 0}`);
    for (const ref of response.references ?? []) {
      if (ref.type === "file") {
        const fileReference = ref as KnowledgeBaseFileReference;
        console.log(`  - file reference: citation=${fileReference.citationUrl ?? "<none>"}`);
      }
    }

    // 6. Delete the file explicitly and verify it is gone.
    await client.deleteKnowledgeSourceFile(KNOWLEDGE_SOURCE_NAME, uploaded.fileId);
    for await (const file of client.listKnowledgeSourceFiles(KNOWLEDGE_SOURCE_NAME, {
      prefix: "manuals/",
    })) {
      assertSample(file.fileId !== uploaded.fileId, "the deleted file should not be listed");
    }
  } finally {
    // 7. Tear down only resources created by this sample.
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
