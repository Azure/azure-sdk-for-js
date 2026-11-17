// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Persist scoped knowledge-base tools and retrieve through their singular
 * toolName. Demonstrates source selection and stored filters using a tiny owned corpus.
 *
 * Set ENDPOINT. Authenticate with DefaultAzureCredential or AZURE_SEARCH_API_KEY.
 * The sample uses minimal reasoning and extractive output, so no chat model is needed.
 * Each run creates and removes its own index, knowledge sources, and knowledge base.
 * Tool filters are retrieval configuration, not a substitute for document-level authorization.
 */

import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";
import { AzureKeyCredential, SearchIndexClient } from "@azure/search-documents";
import type { KnowledgeBaseSearchIndexReference } from "@azure/search-documents";
import { SearchIndexClient as ProtocolIndexClient } from "@azure/search-documents/searchIndex";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env.ENDPOINT;
  assert(endpoint, "Set ENDPOINT.");
  const credential = process.env.AZURE_SEARCH_API_KEY
    ? new AzureKeyCredential(process.env.AZURE_SEARCH_API_KEY)
    : new DefaultAzureCredential();
  const options = { serviceVersion: "2026-11-01-preview" };
  const client = new SearchIndexClient(endpoint, credential, options);
  const protocol = new ProtocolIndexClient(endpoint, credential, {
    apiVersion: options.serviceVersion,
  });
  const indexName = `sample-tools-${randomUUID()}`;
  const hrSource = `hr-${indexName}`;
  const productSource = `product-${indexName}`;
  const baseName = `kb-${indexName}`;
  const cleanup: (() => Promise<unknown>)[] = [];

  try {
    await client.createIndex({
      name: indexName,
      fields: [
        { name: "id", type: "Edm.String", key: true },
        { name: "content", type: "Edm.String", searchable: true },
        { name: "category", type: "Edm.String", filterable: true },
        { name: "country", type: "Edm.String", filterable: true },
      ],
      semanticSearch: {
        defaultConfigurationName: "content",
        configurations: [
          { name: "content", prioritizedFields: { contentFields: [{ name: "content" }] } },
        ],
      },
    });
    cleanup.push(() => client.deleteIndex(indexName));
    const documents = client.getSearchClient<{
      id: string;
      content: string;
      category: string;
      country: string;
    }>(indexName);
    await documents.uploadDocuments(
      [
        {
          id: "hr-ca",
          content: "Canadian employees receive twenty days of annual leave.",
          category: "HR",
          country: "CA",
        },
        {
          id: "hr-us",
          content: "US employees receive fifteen days of annual leave.",
          category: "HR",
          country: "US",
        },
        {
          id: "product",
          content: "The Trail camera is waterproof and includes a two-year warranty.",
          category: "Product",
          country: "CA",
        },
      ],
      { throwOnAnyFailure: true },
    );
    for (let attempt = 0; ; attempt++) {
      if ((await documents.getDocumentsCount()) === 3) break;
      assert(attempt < 30, "Timed out waiting for the sample documents.");
      await delay(1000);
    }
    for (const name of [hrSource, productSource]) {
      await client.createKnowledgeSource({
        name,
        kind: "searchIndex",
        searchIndexParameters: {
          searchIndexName: indexName,
          searchFields: [{ name: "content" }],
          semanticConfigurationName: "content",
        },
      });
      cleanup.push(() => client.deleteKnowledgeSource(name));
    }
    await client.createKnowledgeBase({
      name: baseName,
      knowledgeSources: [{ name: hrSource }, { name: productSource }],
      retrievalReasoningEffort: { kind: "minimal" },
      outputMode: "extractiveData",
      tools: [
        {
          name: "canada-hr",
          description: "Find HR policies for Canadian employees.",
          knowledgeSources: [
            {
              name: hrSource,
              alwaysQuerySource: true,
              failOnError: true,
              filterAddOn: "category eq 'HR' and country eq 'CA'",
            },
          ],
        },
        {
          name: "product-search",
          description: "Find camera specifications and warranties.",
          knowledgeSources: [
            {
              name: productSource,
              alwaysQuerySource: true,
              failOnError: true,
              filterAddOn: "category eq 'Product'",
            },
          ],
        },
      ],
    });
    cleanup.push(() => client.deleteKnowledgeBase(baseName));
    // The protocol response exposes all preview fields without widening GA response types.
    const stored = await protocol.getKnowledgeBase(baseName);
    assert.equal(stored.tools?.length, 2);
    assert.equal(
      stored.tools[0].knowledgeSources[0].filterAddOn,
      "category eq 'HR' and country eq 'CA'",
    );

    const retrieval = client.getKnowledgeRetrievalClient(baseName);
    for (const { toolName, query, expectedId } of [
      {
        toolName: "canada-hr",
        query: "How much annual leave do employees receive?",
        expectedId: "hr-ca",
      },
      {
        toolName: "product-search",
        query: "What warranty does the Trail camera include?",
        expectedId: "product",
      },
    ]) {
      const result = await retrieval.retrieve({
        toolName,
        intents: [{ type: "semantic", search: query }],
        includeActivity: true,
      });
      assert(result.references?.length, "The selected tool must return source references.");
      for (const reference of result.references) {
        assert.equal(reference.type, "searchIndex");
        const key = (reference as KnowledgeBaseSearchIndexReference).docKey;
        assert.equal(
          key,
          expectedId,
          "The tool must not retrieve outside its source/filter scope.",
        );
      }
      console.log(toolName, result.response, result.activity);
    }
    // alwaysQuerySource:false is not exclusion. A full KB PUT replaces its tools list.
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
