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

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

const documents = [
  "Microsoft was founded by Bill Gates and Paul Allen.",
  "Redmond is a city in King County, Washington, United States, located 15 miles east of Seattle.",
  "I need to take my cat to the veterinarian.",
  "The employee's SSN is 555-55-5555.",
  "We went to Contoso Steakhouse located at midtown NYC last week for a dinner party, and we adore the spot! They provide marvelous food and they have a great menu. The chief cook happens to be the owner (I think his name is John Doe) and he is super nice, coming out of the kitchen and greeted us all. We enjoyed very much dining in the place! The Sirloin steak I ordered was tender and juicy, and the place was impeccably clean. You can even pre-order from their online menu at www.contososteakhouse.com, call 312-555-0176 or send email to order@contososteakhouse.com! The only complaint I have is the food didn't come fast enough. Overall I highly recommend it!"
];

export async function main() {
  console.log("== Analyze Sample ==");

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const actions = {
    recognizeEntitiesActions: [{ modelVersion: "latest" }],
    recognizePiiEntitiesActions: [{ modelVersion: "latest" }],
    extractKeyPhrasesActions: [{ modelVersion: "latest" }]
  };
  const poller = await client.beginAnalyzeActions(documents, actions, "en", {
    includeStatistics: true
  });

  poller.onProgress(() => {
    console.log(
      `Number of actions still in progress: ${poller.getOperationState().actionsInProgressCount}`
    );
  });

  console.log(`The analyze actions operation created on ${poller.getOperationState().createdOn}`);

  console.log(
    `The analyze actions operation results will expire on ${poller.getOperationState().expiresOn}`
  );

  const resultPages = await poller.pollUntilDone();

  for await (const page of resultPages) {
    const keyPhrasesAction = page.extractKeyPhrasesResults[0];
    if (!keyPhrasesAction.error) {
      for (const doc of keyPhrasesAction.results) {
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
      console.log("Action statistics: ");
      console.log(JSON.stringify(keyPhrasesAction.results.statistics));
    }

    const entitiesAction = page.recognizeEntitiesResults[0];
    if (!entitiesAction.error) {
      for (const doc of entitiesAction.results) {
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
      console.log("Action statistics: ");
      console.log(JSON.stringify(entitiesAction.results.statistics));
    }

    const piiEntitiesAction = page.recognizePiiEntitiesResults[0];
    if (!piiEntitiesAction.error) {
      for (const doc of piiEntitiesAction.results) {
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
      console.log("Action statistics: ");
      console.log(JSON.stringify(piiEntitiesAction.results.statistics));
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
