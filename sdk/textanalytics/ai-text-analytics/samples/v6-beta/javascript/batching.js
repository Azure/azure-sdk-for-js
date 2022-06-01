// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample extracts key phrases, entities, and pii entities from several documents
 *  using a long-running operation. This functionality uses the generic analysis
 * endpoint, which provides a way to group several different Text Analytics actions
 * into a single request.
 *
 * @summary applies multiple Text Analytics actions per document
 */

const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "I need to take my cat to the veterinarian.",
  "The employee's SSN is 555-55-5555.",
  "We went to Contoso Steakhouse located at midtown NYC last week for a dinner party, and we adore the spot! They provide marvelous food and they have a great menu. The chief cook happens to be the owner (I think his name is John Doe) and he is super nice, coming out of the kitchen and greeted us all. We enjoyed very much dining in the place! The Sirloin steak I ordered was tender and juicy, and the place was impeccably clean. You can even pre-order from their online menu at www.contososteakhouse.com, call 312-555-0176 or send email to order@contososteakhouse.com! The only complaint I have is the food didn't come fast enough. Overall I highly recommend it!",
];

async function main() {
  console.log("== Batch Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const actions = [
    {
      kind: "EntityRecognition",
      modelVersion: "latest",
    },
    {
      kind: "PiiEntityRecognition",
      modelVersion: "latest",
    },
    {
      kind: "KeyPhraseExtraction",
      modelVersion: "latest",
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");

  poller.onProgress(() => {
    console.log(
      `Number of actions still in progress: ${poller.getOperationState().actionInProgressCount}`
    );
  });

  console.log(`The operation was created on ${poller.getOperationState().createdOn}`);

  console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

  const actionResults = await poller.pollUntilDone();

  for await (const actionResult of actionResults) {
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    switch (actionResult.kind) {
      case "KeyPhraseExtraction": {
        for (const doc of actionResult.results) {
          console.log(`- Document ${doc.id}`);
          if (!doc.error) {
            console.log("\tKey phrases:");
            for (const phrase of doc.keyPhrases) {
              console.log(`\t- ${phrase}`);
            }
          } else {
            console.error("\tError:", doc.error);
          }
        }
        break;
      }
      case "EntityRecognition": {
        for (const doc of actionResult.results) {
          console.log(`- Document ${doc.id}`);
          if (!doc.error) {
            console.log("\tEntities:");
            for (const entity of doc.entities) {
              console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
            }
          } else {
            console.error("\tError:", doc.error);
          }
        }
        break;
      }
      case "PiiEntityRecognition": {
        for (const doc of actionResult.results) {
          console.log(`- Document ${doc.id}`);
          if (!doc.error) {
            console.log("\tPii Entities:");
            for (const entity of doc.entities) {
              console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
            }
          } else {
            console.error("\tError:", doc.error);
          }
        }
        break;
      }
      default: {
        throw new Error(`Unexpected action results: ${actionResult.kind}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
