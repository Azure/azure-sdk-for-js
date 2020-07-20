// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects entites in a piece of text and prints them along with the entity type
 */

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "I had a wonderful trip to Seattle last week.",
  "I visited the Space Needle 2 times."
];

async function main() {
  console.log("== Recognize Entities Sample ==");

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const results = await client.recognizeEntities(documents);

  for (const result of results) {
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log("  Recognized Entities:");
      for (const entity of result.entities) {
        console.log(`    - Entity ${entity.text} of type ${entity.category}`);
      }
    } else console.error("  Error:", result.error);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
