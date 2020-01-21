// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * extracts key phrases from a piece of text
 */

const { TextAnalyticsClient, CognitiveServicesCredential } = require("@azure/ai-text-analytics");

async function main() {
  console.log(`Running extractKeyPhrases sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICES_ENDPOINT"] || "<cognitive services endpoint>";
  const subscriptionKey = process.env["SUBSCRIPTION_KEY"] || "<subscription key>";

  const client = new TextAnalyticsClient(
    endpoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.extractKeyPhrases([
    "I love living in Seattle! Seattle is always sunny."
  ]);

  if (!result.error) {
    for (const phrase of result.keyPhrases) {
      console.log(`Key phrase: ${phrase}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

