// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * extracts key phrases, entities, and pii entities from a piece of text
 */

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
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
  const poller = await client.beginAnalyzeBatchActions(documents, actions);
  const resultPages = await poller.pollUntilDone();
  console.log(
    `The analyze batch actions operation created on ${
      poller.getOperationState().createdOn
    } finished process`
  );
  console.log(
    `The analyze batch actions operation results will expire on ${
      poller.getOperationState().expiresOn
    }`
  );

  for await (const page of resultPages) {
    const keyPhrasesResults = page.extractKeyPhrasesResults![0];
    for (const doc of keyPhrasesResults) {
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

    const entitiesResults = page.recognizeEntitiesResults![0];
    for (const doc of entitiesResults) {
      console.log(`- Document ${doc.id}`);
      if (!doc.error) {
        console.log("\tEntities:");
        for (const entity of doc.entities) {
          console.log(`\t- Entity ${entity.text} of type ${entity.category}`);
        }
      } else {
        console.error("  Error:", doc.error);
      }
    }

    const piiEntitiesResults = page.recognizePiiEntitiesResults![0];
    for (const doc of piiEntitiesResults) {
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
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
