// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Configure seeded random scoring using additive November preview input types.
 * Creates and deletes a uniquely named index; requires permission to manage indexes.
 */

const { randomUUID } = require("node:crypto");
const { DefaultAzureCredential } = require("@azure/identity");
const { delay } = require("@azure/core-util");
const { SearchIndexClient } = require("@azure/search-documents");
require("dotenv").config();

async function main() {
  const endpoint = process.env.ENDPOINT;
  if (!endpoint) throw new Error("Set ENDPOINT to an Azure AI Search endpoint.");
  const indexClient = new SearchIndexClient(endpoint, new DefaultAzureCredential(), {
    serviceVersion: "2026-11-01-preview",
  });
  const index = {
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
    const client = indexClient.getSearchClient(index.name);
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

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

module.exports = { main };
