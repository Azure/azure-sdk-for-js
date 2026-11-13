// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Configure seeded random scoring using additive November preview input types.
 * Creates and deletes a uniquely named index; requires permission to manage indexes.
 */

import { randomUUID } from "node:crypto";
import { DefaultAzureCredential } from "@azure/identity";
import { delay } from "@azure/core-util";
import { SearchIndexClient } from "@azure/search-documents";
import type { SearchIndexInput } from "@azure/search-documents";
import * as dotenv from "dotenv";
dotenv.config();

export async function main(): Promise<void> {
  const endpoint = process.env.ENDPOINT;
  if (!endpoint) throw new Error("Set ENDPOINT to an Azure AI Search endpoint.");
  const indexClient = new SearchIndexClient(endpoint, new DefaultAzureCredential(), {
    serviceVersion: "2026-11-01-preview",
  });
  const index: SearchIndexInput = {
    name: `random-scoring-${randomUUID()}`,
    fields: [{ name: "id", type: "Edm.String", key: true }],
    scoringProfiles: [
      {
        name: "shuffle",
        functions: [{ type: "random", parameters: { seedParameter: "seed" } }],
      },
    ],
  };
  let created = false;
  try {
    await indexClient.createIndex(index);
    created = true;
    const client = indexClient.getSearchClient<{ id: string }>(index.name);
    const documents = Array.from({ length: 10 }, (_, id) => ({ id: String(id) }));
    await client.uploadDocuments(documents);
    let attempts = 0;
    while ((await client.getDocumentsCount()) !== documents.length) {
      if (++attempts === 30) {
        throw new Error("Documents did not become searchable within 30 seconds.");
      }
      await delay(1000);
    }
    // The same seed repeats scores for an unchanged index; another seed changes the shuffle.
    for (const seed of [42, 42, 43]) {
      const result = await client.search("*", {
        scoringProfile: "shuffle",
        scoringParameters: [`seed-${seed}`],
      });
      const ranked = [];
      for await (const hit of result.results) {
        ranked.push({ id: hit.document.id, score: hit.score });
      }
      console.log(`Seed ${seed}:`, ranked);
    }
  } finally {
    if (created) await indexClient.deleteIndex(index.name);
  }
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
