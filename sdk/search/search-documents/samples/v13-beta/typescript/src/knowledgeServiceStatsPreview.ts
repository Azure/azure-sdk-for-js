// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates the preview-only knowledge resource counters
 * returned by `getServiceStatistics()` in the 2026-08-01-preview data
 * plane:
 *   - `knowledgeBaseCounter` — number of `KnowledgeBase` resources.
 *   - `knowledgeSourceCounter` — number of `KnowledgeSource` resources.
 *
 * Both counters expose `usage` and (when the service plan defines one)
 * `quota`, allowing customers to track KR adoption against
 * service-level limits.
 *
 * The August preview also reports `maxVectorIndexSizePerIndexInBytes`.
 * This is a per-index limit, not current vector usage and not the
 * service/partition vector quota.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { SearchIndexClient } from "@azure/search-documents";

import * as dotenv from "dotenv";
dotenv.config();

const endpoint = process.env.ENDPOINT || "";

async function main(): Promise<void> {
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

  const perIndexLimit = stats.limits.maxVectorIndexSizePerIndexInBytes;
  const vectorUsage = stats.counters.vectorIndexSizeCounter.usage;
  const vectorQuota = stats.counters.vectorIndexSizeCounter.quota;
  if (perIndexLimit === undefined) {
    console.log(`Vector index size: this service tier did not report a per-index limit.`);
  } else {
    console.log(`Vector index size per-index limit: ${perIndexLimit} bytes`);
  }
  console.log(`Current vector index usage across the service: ${vectorUsage} bytes`);
  console.log(
    `Service/partition vector quota: ${vectorQuota === undefined ? "not reported" : `${vectorQuota} bytes`}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
