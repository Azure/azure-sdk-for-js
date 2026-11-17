// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Retrieve from an owned search-index knowledge source using native Azure
 * OpenAI GPT-6 or OpenAI-compatible/APIM models. Compatible mode also indexes real
 * embeddings and exercises the gateway-backed query vectorizer.
 *
 * Set ENDPOINT and KNOWLEDGE_MODEL_PROVIDER to "azureOpenAI" or "openAICompatible".
 * Native mode requires AZURE_OPENAI_ENDPOINT, AZURE_OPENAI_CHAT_DEPLOYMENT_NAME and
 * AZURE_OPENAI_CHAT_MODEL_NAME (a supported GPT-6 profile, such as gpt-6-sol).
 * Search's identity needs model access; AZURE_OPENAI_API_KEY is an alternative.
 *
 * Compatible mode requires OPENAI_COMPATIBLE_CHAT_URI, OPENAI_COMPATIBLE_CHAT_MODEL_NAME,
 * OPENAI_COMPATIBLE_EMBEDDINGS_URI, OPENAI_COMPATIBLE_EMBEDDING_MODEL_NAME,
 * OPENAI_COMPATIBLE_EMBEDDING_DIMENSIONS, and OPENAI_COMPATIBLE_API_KEY.
 * OPENAI_COMPATIBLE_AUTH_HEADER defaults to api-key; for APIM it can be
 * Ocp-Apim-Subscription-Key. URIs are complete HTTPS POST URLs, including paths and
 * query strings. The gateway must select deployments: Search's KB/vectorization requests
 * omit model. GPT-6 chat profiles use Responses (including stateless tool continuation);
 * older chat profiles use Chat Completions. Embeddings require an embeddings endpoint.
 *
 * This incurs model usage. Creates/removes only its own Search index, source, and KB.
 */

import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential, SearchIndexClient } from "@azure/search-documents";
import type {
  KnowledgeBaseModelInput,
  OpenAICompatibleVectorizerInput,
} from "@azure/search-documents";
import { SearchIndexClient as ProtocolIndexClient } from "@azure/search-documents/searchIndex";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env.ENDPOINT;
  const provider = process.env.KNOWLEDGE_MODEL_PROVIDER;
  assert(
    endpoint && (provider === "azureOpenAI" || provider === "openAICompatible"),
    "Set ENDPOINT and KNOWLEDGE_MODEL_PROVIDER.",
  );
  let chat: KnowledgeBaseModelInput;
  let vectorizer: OpenAICompatibleVectorizerInput | undefined;
  const documents = [
    {
      id: "alpine",
      content: "The Alpine hotel has an indoor pool, family rooms, free parking, and breakfast.",
    },
    {
      id: "central",
      content: "The Central hotel has a restaurant but no swimming pool or family rooms.",
    },
  ];
  let vectors: number[][] | undefined;
  if (provider === "openAICompatible") {
    const chatUri = process.env.OPENAI_COMPATIBLE_CHAT_URI;
    const modelName = process.env.OPENAI_COMPATIBLE_CHAT_MODEL_NAME;
    const embeddingUri = process.env.OPENAI_COMPATIBLE_EMBEDDINGS_URI;
    const embeddingModel = process.env.OPENAI_COMPATIBLE_EMBEDDING_MODEL_NAME;
    const dimensions = Number(process.env.OPENAI_COMPATIBLE_EMBEDDING_DIMENSIONS);
    const apiKey = process.env.OPENAI_COMPATIBLE_API_KEY;
    assert(
      chatUri &&
        modelName &&
        embeddingUri &&
        embeddingModel &&
        apiKey &&
        Number.isInteger(dimensions) &&
        dimensions > 0,
      "Set the compatible chat/embedding settings.",
    );
    for (const uri of [chatUri, embeddingUri]) assert.equal(new URL(uri).protocol, "https:");
    const headers = { [process.env.OPENAI_COMPATIBLE_AUTH_HEADER || "api-key"]: apiKey };
    chat = {
      kind: "openAICompatible",
      openAICompatibleParameters: { uri: chatUri, modelName, headers },
    };
    vectorizer = {
      vectorizerName: "compatible",
      kind: "openAICompatible",
      openAICompatibleParameters: {
        uri: embeddingUri,
        modelName: embeddingModel,
        dimensions,
        headers,
      },
    };
    const response = await fetch(embeddingUri, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      redirect: "error",
      signal: AbortSignal.timeout(30_000),
      // The deployment is selected by the complete URI, not a model property in the body.
      body: JSON.stringify({
        input: documents.map((document) => document.content),
        encoding_format: "float",
        ...(embeddingModel === "text-embedding-ada-002" ? {} : { dimensions }),
      }),
    });
    assert(response.ok, `Embedding endpoint returned HTTP ${response.status}.`);
    const payload = (await response.json()) as { data?: { index: number; embedding: number[] }[] };
    assert(
      Array.isArray(payload.data) && payload.data.length === documents.length,
      "Expected one embedding per document.",
    );
    const byIndex = new Map(payload.data.map((item) => [item.index, item.embedding]));
    vectors = documents.map((_, index) => {
      const vector = byIndex.get(index);
      assert(
        Array.isArray(vector) && vector.length === dimensions && vector.every(Number.isFinite),
        "Embedding dimensions and indices must match the sample documents.",
      );
      return vector;
    });
  } else {
    const resourceUrl = process.env.AZURE_OPENAI_ENDPOINT;
    const deploymentId = process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME;
    const modelName = process.env.AZURE_OPENAI_CHAT_MODEL_NAME;
    assert(resourceUrl && deploymentId && modelName, "Set the native GPT-6 chat model settings.");
    assert(
      /^gpt-6(?:[.-]|$)/.test(modelName),
      "Use a deployed, supported GPT-6 model profile for native mode.",
    );
    const apiKey = process.env.AZURE_OPENAI_API_KEY;
    chat = {
      kind: "azureOpenAI",
      azureOpenAIParameters: { resourceUrl, deploymentId, modelName, apiKey },
    };
  }
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const client = new SearchIndexClient(endpoint, credential, {
    serviceVersion: "2026-11-01-preview",
  });
  const indexName = `sample-provider-${randomUUID()}`;
  const sourceName = `ks-${indexName}`;
  const baseName = `kb-${indexName}`;
  const cleanup: (() => Promise<unknown>)[] = [];
  try {
    await client.createIndex({
      name: indexName,
      fields: [
        { name: "id", type: "Edm.String", key: true },
        { name: "content", type: "Edm.String", searchable: true },
        ...(vectors
          ? [
              {
                name: "contentVector",
                type: "Collection(Edm.Single)" as const,
                searchable: true,
                hidden: true,
                vectorSearchDimensions: vectors[0].length,
                vectorSearchProfileName: "content",
              },
            ]
          : []),
      ],
      semanticSearch: {
        defaultConfigurationName: "content",
        configurations: [
          { name: "content", prioritizedFields: { contentFields: [{ name: "content" }] } },
        ],
      },
      vectorSearch: vectorizer
        ? {
            algorithms: [{ name: "hnsw", kind: "hnsw" }],
            profiles: [
              { name: "content", algorithmConfigurationName: "hnsw", vectorizerName: "compatible" },
            ],
            vectorizers: [vectorizer],
          }
        : undefined,
    });
    cleanup.push(() => client.deleteIndex(indexName));
    const search = client.getSearchClient<{
      id: string;
      content: string;
      contentVector?: number[];
    }>(indexName);
    await search.uploadDocuments(
      documents.map((document, index) => ({
        ...document,
        ...(vectors ? { contentVector: vectors[index] } : {}),
      })),
      { throwOnAnyFailure: true },
    );
    for (let attempt = 0; ; attempt++) {
      if ((await search.getDocumentsCount()) === documents.length) break;
      assert(attempt < 30, "Timed out waiting for the sample documents.");
      await delay(1000);
    }
    if (vectorizer) {
      const matches = await search.search("*", {
        vectorSearchOptions: {
          queries: [
            {
              kind: "text",
              text: "Which hotel has a pool for families?",
              fields: ["contentVector"],
              kNearestNeighborsCount: 2,
            },
          ],
        },
        select: ["id", "content"],
        top: 2,
      });
      let found = 0;
      for await (const match of matches.results) {
        found++;
        console.log("Gateway-vectorized result:", match.document);
      }
      assert(found > 0, "The configured query vectorizer must return matches.");
    }
    await client.createKnowledgeSource({
      name: sourceName,
      kind: "searchIndex",
      searchIndexParameters: {
        searchIndexName: indexName,
        searchFields: [{ name: "content" }],
        semanticConfigurationName: "content",
      },
    });
    cleanup.push(() => client.deleteKnowledgeSource(sourceName));
    await client.createKnowledgeBase({
      name: baseName,
      knowledgeSources: [{ name: sourceName }],
      models: [chat],
      retrievalReasoningEffort: { kind: "low" },
      outputMode: "answerSynthesis",
    });
    cleanup.push(() => client.deleteKnowledgeBase(baseName));
    const protocol = new ProtocolIndexClient(endpoint, credential, {
      apiVersion: "2026-11-01-preview",
    });
    const stored = await protocol.getKnowledgeBase(baseName);
    const storedModel = stored.models?.[0];
    assert(storedModel);
    assert.equal(storedModel.kind, chat.kind);
    if ("openAICompatibleParameters" in storedModel) {
      assert.equal(
        storedModel.openAICompatibleParameters.headers,
        undefined,
        "Stored authentication headers are secret.",
      );
    }
    const result = await client.getKnowledgeRetrievalClient(baseName).retrieve({
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Which amenities does the Alpine hotel offer families?" },
          ],
        },
      ],
      includeActivity: true,
    });
    assert(
      result.response?.length && result.references?.length,
      "The configured provider must produce a grounded answer.",
    );
    assert(
      !result.activity?.some((activity) => activity.error),
      "A model failure must not be reported as success.",
    );
    console.log("Grounded answer:", result.response);
    console.log("References and model activity:", result.references, result.activity);
  } finally {
    for (const remove of cleanup.reverse()) {
      await remove().catch((error: unknown) => {
        console.error(
          "Owned-resource cleanup failed:",
          error instanceof Error ? error.message : "Unknown error",
        );
        process.exitCode = 1;
      });
    }
  }
}

main().catch((error: unknown) => {
  console.error("Sample failed:", error instanceof Error ? error.message : "Unknown error");
  process.exitCode = 1;
});
