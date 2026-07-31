// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Demonstrates semantic reranking of query results using the Cosmos DB Inference Service.
 */

require("dotenv/config");
const { logSampleHeader, logStep } = require("./Shared/handleError.js");
const { DefaultAzureCredential } = require("@azure/identity");
const { CosmosClient } = require("@azure/cosmos");

// Semantic rerank requires AAD authentication and an inference endpoint registered for the account.
const endpoint = process.env.COSMOS_ENDPOINT || "<cosmos endpoint>";
const inferenceEndpoint =
  process.env.AZURE_COSMOS_SEMANTIC_RERANKER_INFERENCE_ENDPOINT ||
  "https://<account>.<region>.dbinference.azure.com";

// A pre-existing database and container are expected, and the container must be partitioned by
// `/category`: the sample items carry a `category` value that is used as the partition key,
// including during cleanup. The inference service itself is container-agnostic; the container only
// stages the documents this sample reranks.
const databaseId = process.env.COSMOS_DATABASE || "<cosmos database>";
const containerId = process.env.COSMOS_CONTAINER || "<cosmos container>";

logSampleHeader("Semantic Rerank");

async function run() {
  logStep("Create a CosmosClient with AAD credentials and the semantic rerank inference endpoint");
  // Semantic rerank is a preview feature enabled through `enablePreviewFeatures.semanticRerank`.
  const client = new CosmosClient({
    endpoint,
    aadCredentials: new DefaultAzureCredential(),
    enablePreviewFeatures: {
      semanticRerank: {
        inferenceEndpoint,
      },
    },
  });

  const container = client.database(databaseId).container(containerId);

  // Sample catalog items partitioned by `/category`. Descriptions are what the reranker scores.
  const sampleItems = [
    {
      id: "sr-1",
      category: "fitness",
      name: "ProFit Power Tower",
      description:
        "Professional power tower with integrated pull-up bar, dip station, and vertical knee raise. Heavy-duty steel frame supports up to 300 lbs.",
    },
    {
      id: "sr-2",
      category: "fitness",
      name: "FlexForce Cable Machine",
      description:
        "Compact cable crossover machine with multiple pulley adjustments and a 200 lb weight stack. Great for chest flys, lat pulldowns, and cable rows.",
    },
    {
      id: "sr-3",
      category: "fitness",
      name: "IronGrip Adjustable Dumbbells",
      description:
        "Quick-change adjustable dumbbell set ranging from 5 to 52.5 lbs per hand. Replaces 15 sets of weights with a space-saving design.",
    },
    {
      id: "sr-4",
      category: "fitness",
      name: "EnduraRun Treadmill",
      description:
        "Folding treadmill with a cushioned running deck, 12 incline levels, and speeds up to 12 mph. Compact folding design for apartment living.",
    },
    {
      id: "sr-5",
      category: "fitness",
      name: "BudgetFlex Home Gym",
      description:
        "Most economical home gym system with an integrated pull-up bar and multiple pulley adjustments. Affordable yet sturdy, ideal for home gyms.",
    },
  ];

  try {
    logStep(`Insert ${sampleItems.length} sample items into '${databaseId}/${containerId}'`);
    for (const item of sampleItems) {
      await container.items.upsert(item);
    }

    logStep("Query the items to produce the candidate document set for reranking");
    const { resources: queryResults } = await container.items
      .query("SELECT c.id, c.name, c.description FROM c WHERE c.category = 'fitness'")
      .fetchAll();

    // The reranker takes documents as strings; serialize each query result to JSON.
    const documents = queryResults.map((item) => JSON.stringify(item));
    console.log(`Reranking ${documents.length} documents.`);

    logStep("Rerank the documents against a natural-language context");
    const context = "most economical with multiple pulley adjustments and ideal for home gyms";
    const result = await container.semanticRerank(context, documents, {
      return_documents: true, // include the reranked document text in the response
      top_k: 10, // return up to 10 top-ranked documents
      sort: true, // sort results by descending relevance score
    });

    logStep(`Reranked results for context: "${context}"`);
    result.rerankScores.forEach((scored, rank) => {
      // `index` is the document's original position in the input list before reranking.
      console.log(
        `  #${rank + 1}  score=${scored.score.toFixed(4)}  originalIndex=${scored.index}`,
      );
      if (scored.document) {
        console.log(`      ${scored.document}`);
      }
    });

    // `latency` and `tokenUsage` carry service-side timing and token accounting for the call.
    console.log("\nLatency:", result.latency);
    console.log("Token usage:", result.tokenUsage);
  } finally {
    logStep("Clean up the inserted items");
    for (const item of sampleItems) {
      try {
        await container.item(item.id, item.category).delete();
      } catch {
        // Ignore cleanup errors so a partial insert still cleans up what it can.
      }
    }
    console.log("\nEnd of demo.");
  }
}

run().catch((error) => {
  console.error("\nSemantic rerank sample failed:", error);
  process.exitCode = 1;
});
