// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Ingest and replace a File knowledge source document asynchronously, resume
 * both operations with a new client, and inspect retained operation diagnostics.
 *
 * Set ENDPOINT, AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME and
 * AZURE_OPENAI_EMBEDDING_MODEL_NAME. The Search managed identity needs access to the
 * embedding deployment; alternatively set AZURE_OPENAI_API_KEY. The deployment alias
 * and underlying model name are separate settings.
 *
 * Creates a uniquely named source and removes it, including its uploaded file.
 */

import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential, SearchIndexClient } from "@azure/search-documents";
import type { UploadKnowledgeSourceFileMultipartRequest } from "@azure/search-documents";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env.ENDPOINT;
  const resourceUrl = process.env.AZURE_OPENAI_ENDPOINT;
  const deploymentId = process.env.AZURE_OPENAI_EMBEDDING_DEPLOYMENT_NAME;
  const modelName = process.env.AZURE_OPENAI_EMBEDDING_MODEL_NAME;
  assert(endpoint && resourceUrl && deploymentId && modelName, "Set the required sample settings.");
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const options = { serviceVersion: "2026-11-01-preview" };
  const client = new SearchIndexClient(endpoint, credential, options);
  const sourceName = `sample-file-lro-${randomUUID()}`;
  let created = false;

  const body = (revision: string): UploadKnowledgeSourceFileMultipartRequest => ({
    metadata: { fileName: "manuals/availability.txt", metadata: { revision } },
    content: {
      contents: new TextEncoder().encode(
        `Revision ${revision}: monitor availability and use bounded retries for transient errors.`,
      ),
      contentType: "text/plain",
      filename: "availability.txt",
    },
  });

  try {
    await client.createKnowledgeSource({
      name: sourceName,
      kind: "file",
      fileParameters: {
        ingestionParameters: {
          embeddingModel: {
            kind: "azureOpenAI",
            azureOpenAIParameters: {
              resourceUrl,
              deploymentId,
              modelName,
              apiKey: process.env.AZURE_OPENAI_API_KEY,
            },
          },
        },
      },
    });
    created = true;

    const ingestionOptions = {
      updateIntervalInMs: 2000,
      abortSignal: AbortSignal.timeout(300_000),
    };
    // Do not await begin*: its thenable poller would wait for completion.
    const ingest = client.beginIngestKnowledgeSourceFile(sourceName, body("1"), ingestionOptions);
    ingest.onProgress((state) => console.log("Ingestion:", state.status));
    await ingest.poll();
    const ingestionState = await ingest.serialize();

    // Store serialized state securely for a real process restart; never log it.
    const resumedClient = new SearchIndexClient(endpoint, credential, options);
    const uploaded = await resumedClient
      .beginIngestKnowledgeSourceFile(sourceName, body("1"), {
        ...ingestionOptions,
        resumeFrom: ingestionState,
      })
      .pollUntilDone();
    assert(uploaded.fileId, "Ingestion must return a file ID.");
    assert.equal(uploaded.metadata?.revision, "1");

    const replacementOptions = {
      updateIntervalInMs: 2000,
      abortSignal: AbortSignal.timeout(300_000),
    };
    const replace = resumedClient.beginReplaceKnowledgeSourceFile(
      sourceName,
      uploaded.fileId,
      body("2"),
      replacementOptions,
    );
    replace.onProgress((state) => console.log("Replacement:", state.status));
    await replace.poll();
    const replacementState = await replace.serialize();
    const replacement = await new SearchIndexClient(endpoint, credential, options)
      .beginReplaceKnowledgeSourceFile(sourceName, uploaded.fileId, body("2"), {
        ...replacementOptions,
        resumeFrom: replacementState,
      })
      .pollUntilDone();
    assert.equal(replacement.fileId, uploaded.fileId, "Replacement preserves the file ID.");
    assert.equal(replacement.metadata?.revision, "2");

    let completed = 0;
    for await (const operation of client.listKnowledgeSourceFileIngestionOperations(sourceName)) {
      const details = await client.getKnowledgeSourceFileIngestionOperation(
        sourceName,
        operation.id,
      );
      console.log("Operation:", details.id, details.status, details.error?.code);
      if (details.status === "Succeeded" && details.result?.fileId === uploaded.fileId) completed++;
    }
    assert(completed >= 2, "Both completed operations should be available for diagnosis.");
    await client.deleteKnowledgeSourceFile(sourceName, uploaded.fileId);
  } finally {
    if (created) await client.deleteKnowledgeSource(sourceName);
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});
