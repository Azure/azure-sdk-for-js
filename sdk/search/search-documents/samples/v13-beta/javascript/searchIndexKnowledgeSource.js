// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates creating a `searchIndex` knowledge source that
 * references an existing Azure AI Search index. This is the simplest
 * knowledge source kind and is a good starting point when retrieval
 * should be backed by an index you already manage.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";

const INDEX_NAME = "example-index-for-search-index-ks-sample";
const KNOWLEDGE_SOURCE_NAME = "example-search-index-ks-sample";

async function main() {
  console.log(`Running Search Index Knowledge Source Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  // Search-index knowledge sources require the referenced index to exist.
  await client.createIndex({
    name: INDEX_NAME,
    fields: [
      { type: "Edm.String", name: "id", key: true },
      { type: "Edm.String", name: "content", searchable: true },
    ],
  });
  console.log(`Created index ${INDEX_NAME}`);

  try {
    const knowledgeSource = {
      name: KNOWLEDGE_SOURCE_NAME,
      kind: "searchIndex",
      description: "Search index knowledge source backed by a managed index.",
      searchIndexParameters: { searchIndexName: INDEX_NAME },
    };

    const created = await client.createKnowledgeSource(knowledgeSource);
    console.log(`Created knowledge source ${created.name} (kind=${created.kind})`);
  } finally {
    await client.deleteKnowledgeSource(KNOWLEDGE_SOURCE_NAME).catch(() => {});
    await client.deleteIndex(INDEX_NAME).catch(() => {});
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
