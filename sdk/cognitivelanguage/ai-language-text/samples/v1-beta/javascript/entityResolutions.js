// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Uses the entity recognition endpoint to detect entities in a document using
 * Named Entity Recognition (NER) and prints them along with their recognized
 * entity type and resolution.
 *
 * @summary detects entities in a piece of text
 */

const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

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

  const actions = [
    {
      kind: "EntityRecognition",
      modelVersion: "2022-10-01-preview",
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();
  for await (const actionResult of results) {
    if (actionResult.kind !== "EntityRecognition") {
      throw new Error(`Expected abstractive summarization results but got: ${actionResult.kind}`);
    }

    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }

    for (const result of actionResult.results) {
      console.log(`- Document ${result.id}`);
      if (result.error) {
        const { code, message } = result.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }

      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(`\t- Entity ${entity.text} of type ${entity.category}`);

        if (entity.resolutions) {
          console.log("\tRecognized Resolution:");
          for (const resolution of entity.resolutions) {
            const { resolutionKind, ...resolutionInfo } = resolution;
            console.log(`\t- Resolution of type ${resolutionKind}`);
            console.log(`\t- Resolution information ${JSON.stringify(resolutionInfo)}`);
          }
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
