// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * analyzes the sentiment of a piece of text
 */

const { TextAnalyticsClient, CognitiveServicesCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running analyzeSentiment sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICES_ENDPOINT"] || "<cognitive services endpoint>";
  const subscriptionKey = process.env["SUBSCRIPTION_KEY"] || "<subscription key>";

  const client = new TextAnalyticsClient(
    endpoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.analyzeSentiment(["I love living in Seattle!"]);

  if (!result.error) {
    console.log(`Sentiment of statement is ${result.sentiment}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

