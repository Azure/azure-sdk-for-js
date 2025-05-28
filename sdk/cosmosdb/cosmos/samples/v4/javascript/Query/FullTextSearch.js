// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates full text search queries.
 */

require("dotenv/config");
const { finish, handleError, logSampleHeader } = require("./../Shared/handleError.js");
const { CosmosClient } = require("@azure/cosmos");

const key = process.env.COSMOS_KEY || "<cosmos key>";
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Full Text Search Queries");

// Establish a new instance of the CosmosClient to be used throughout this demo
const client = new CosmosClient({ endpoint, key });

async function run() {
  // create a database
  const { database } = await client.databases.createIfNotExists({ id: databaseId });

  // Create a container with full text policy and full text indexes
  const indexingPolicy = {
    automatic: true,
    includedPaths: [{ path: "/*" }],
    excludedPaths: [{ path: '/"_etag"/?' }],
    fullTextIndexes: [{ path: "/text1" }],
  };

  const fullTextPolicy = {
    defaultLanguage: "en-US",
    fullTextPaths: [{ path: "/text1", language: "en-US" }],
  };

  const { container } = await database.containers.createIfNotExists({
    id: containerId,
    partitionKey: { paths: ["/id"] },
    fullTextPolicy: fullTextPolicy,
    indexingPolicy: indexingPolicy,
  });

  const sample_texts = [
    "Common popular pop music artists include Taylor Swift and The Weekend.",
    "The weekend is coming up soon, do you have any plans?",
    "Depending on the artist, their music can be very different.",
    "Mozart and Beethoven are some of the most recognizable names in classical music.",
    "Taylor acts in many movies, and is considered a great artist.",
  ];

  // Create some items to use with full text search
  for (let i = 0; i < 10; i++) {
    await container.items.create({ id: "full_text_item" + i, text1: "some-text" });
  }
  for (let i = 10; i < 15; i++) {
    await container.items.create({
      id: "full_text_item" + i,
      text1: sample_texts[i - 10],
      vector: [1, 2, 3],
    });
  }

  //  Run full text search queries using full text score ranking
  let query = "SELECT TOP 3 c.text1 FROM c ORDER BY RANK FullTextScore(c.text1, 'artist')";
  let response = await container.items.query(query, { forceQueryPlan: true }).fetchAll();
  console.log("Response: ", response.resources);

  //  Run full text search queries with full text contains
  query =
    "SELECT TOP 3 c.text1 FROM c WHERE FullTextContains(c.text1, 'artist') ORDER BY RANK RRF (FullTextScore(c.text1, 'movies'),FullTextScore(c.text1, 'music'))";
  response = await container.items.query(query, { forceQueryPlan: true }).fetchAll();
  console.log("Response: ", response.resources);

  // Run hybrid search queries using RRF ranking wth vector distances
  query =
    "SELECT TOP 3 c.text1 FROM c ORDER BY RANK RRF(FullTextScore(c.text1, 'music'), VectorDistance(c.vector, [1, 2, 3]))";
  response = await container.items.query(query, { forceQueryPlan: true }).fetchAll();
  console.log("Response: ", response.resources);

  // Run hybrid search queries using Weighted RRF ranking
  query =
    "SELECT TOP 3 c.text1 FROM c WHERE FullTextContains(c.text1, 'artist') ORDER BY RANK RRF (FullTextScore(c.text1, 'movies'),FullTextScore(c.text1, 'music'), [0.1, 0.2])";
  response = await container.items.query(query, { forceQueryPlan: true }).fetchAll();
  console.log("Response: ", response.resources);

  // Run hybrid search queries using RRF ranking without query plan optimization
  query =
    "SELECT TOP 3 c.text1 FROM c WHERE FullTextContains(c.text1, 'artist') ORDER BY RANK RRF (FullTextScore(c.text1, 'movies'),FullTextScore(c.text1, 'music'))";
  response = await container.items
    .query(query, { forceQueryPlan: true, disableHybridSearchQueryPlanOptimization: true })
    .fetchAll();
  console.log("Response: ", response.resources);

  await finish();
}

run().catch(handleError);
