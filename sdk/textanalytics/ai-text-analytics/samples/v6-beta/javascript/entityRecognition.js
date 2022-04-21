// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Uses the entity recognition endpoint to detect entities in a document using
 * Named Entity Recognition (NER) and prints them along with their recognized
 * entity type.
 *
 * @summary detects entities in a piece of text
 */

const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "I had a wonderful trip to Seattle last week.",
  "I visited the Space Needle 2 times.",
];

async function main() {
  console.log("== Recognize Entities Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

  const results = await client.analyze("EntityRecognition", documents);

  for (const result of results) {
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
      }
    } else console.error("\tError:", result.error);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
