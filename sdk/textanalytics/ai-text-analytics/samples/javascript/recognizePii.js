// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects personally-identifiable information
 */

const { TextAnalyticsClient, CognitiveServicesCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running recognizePii sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["COGNITIVE_SERVICES_ENDPOINT"] || "<cognitive services endpoint>";
  const subscriptionKey = process.env["SUBSCRIPTION_KEY"] || "<subscription key>";

  const client = new TextAnalyticsClient(
    endpoint,
    new CognitiveServicesCredential(subscriptionKey)
  );

  const [result] = await client.recognizePiiEntities(["My phone number is 555-5555"]);

  if (!result.error) {
    for (const entity of result.entities) {
      console.log(`Found PII entity ${entity.text} of type ${entity.type}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

