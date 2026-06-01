// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the preview-only knowledge resource counters
 * added to `getServiceStatistics()` by the 2026-05-01-preview data
 * plane:
 *   - `knowledgeBaseCounter` — number of `KnowledgeBase` resources.
 *   - `knowledgeSourceCounter` — number of `KnowledgeSource` resources.
 *
 * Both counters expose `usage` and (when the service plan defines one)
 * `quota`, allowing customers to track KR adoption against
 * service-level limits.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { SearchIndexClient } = require("@azure/search-documents");

require("dotenv").config();

const endpoint = process.env.ENDPOINT || "";

async function main() {
  console.log(`Running Knowledge Service Stats Preview Sample....`);
  if (!endpoint) {
    console.log("Be sure to set a valid ENDPOINT with proper authorization.");
    return;
  }

  const client = new SearchIndexClient(endpoint, new DefaultAzureCredential());

  const stats = await client.getServiceStatistics();
  const { knowledgeBaseCounter, knowledgeSourceCounter } = stats.counters;

  console.log(`Knowledge resource counters:`);
  console.log(
    `  knowledgeBases:   usage=${knowledgeBaseCounter.usage}` +
      (knowledgeBaseCounter.quota !== undefined ? `, quota=${knowledgeBaseCounter.quota}` : ""),
  );
  console.log(
    `  knowledgeSources: usage=${knowledgeSourceCounter.usage}` +
      (knowledgeSourceCounter.quota !== undefined ? `, quota=${knowledgeSourceCounter.quota}` : ""),
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
