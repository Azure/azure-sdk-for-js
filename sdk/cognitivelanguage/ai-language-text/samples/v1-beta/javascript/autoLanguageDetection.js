// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * In this sample, we use the complementary automatic language detection
 * with an abstractive summarization task to receive the detected
 * language of the input document.
 *
 * The abstractive summarization feature is part of a gated preview. Access can
 * be request in {@link https://aka.ms/applyforgatedsummarizationfeatures}.
 *
 * @summary return detected language with the task
 */

const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Mon amie vit à Seattle",
  "Ich besuchte Deutsch während Weihnachten",
];

async function main() {
  console.log("== Automatic Language Detection Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

  const actions = [
    {
      kind: "EntityRecognition",
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "auto");

  poller.onProgress(() => {
    console.log(
      `Last time the operation was updated was on: ${poller.getOperationState().modifiedOn}`
    );
  });
  console.log(`The operation was created on ${poller.getOperationState().createdOn}`);
  console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

  const results = await poller.pollUntilDone();
  for await (const actionResult of results) {
    if (actionResult.kind !== "EntityRecognition") {
      throw new Error(`Expected entity recognition results but got: ${actionResult.kind}`);
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

      if (result.detectedLanguage) {
        const { name, iso6391Name, confidenceScore } = result.detectedLanguage;
        console.log(
          "Document language identified as",
          name,
          "( ISO6391:",
          iso6391Name,
          ", Score:",
          confidenceScore,
          ")"
        );
      }

      console.log("\tRecognized Entities:");
      for (const entity of result.entities) {
        console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
