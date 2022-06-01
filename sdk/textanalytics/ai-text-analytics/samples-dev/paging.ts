// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to control paging for the results of `beginAnalyzeActions`.
 * Mainly, shows how to specify the maximum number of processed documents in
 * each page and how to store references to specific pages of results.
 *
 * @summary controls paging for the results of `beginAnalyzeActions`
 * @azsdk-weight 40
 */

import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

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

export async function main() {
  console.log("== Paging Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

  let nextContinuationToken: string | undefined = undefined;
  let continuationToken: string | undefined = undefined;
  let stopOverwrite = false;

  const poller = await client.beginAnalyzeBatch(
    [
      {
        kind: "EntityRecognition",
        modelVersion: "latest",
      },
    ],
    documents,
    "en",
    {
      onResponse: (_rawResponse, response: unknown) => {
        const nextLink = (response as { nextLink?: string }).nextLink;
        if (!stopOverwrite && nextLink) {
          continuationToken = nextContinuationToken;
          nextContinuationToken = nextLink;
        }
      },
    }
  );

  poller.onProgress(() => {
    console.log(
      `Number of actions still in progress: ${poller.getOperationState().actionInProgressCount}`
    );
  });

  console.log(`The analyze actions operation created on ${poller.getOperationState().createdOn}`);

  console.log(
    `The analyze actions operation results will expire on ${poller.getOperationState().expiresOn}`
  );

  const actionResults = await poller.pollUntilDone();
  for await (const page of actionResults.byPage({
    maxPageSize: 1,
  })) {
    console.log("Starting a page --------------------------------------------");
    for (const actionResult of page) {
      if (actionResult.error) {
        const { code, message } = actionResult.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      switch (actionResult.kind) {
        case "EntityRecognition": {
          for (const doc of actionResult.results) {
            console.log(`- Document ${doc.id}`);
            if (!doc.error) {
              console.log("\tEntities:");
              for (const entity of doc.entities) {
                if (entity.text === "veterinarian") {
                  stopOverwrite = true;
                }
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
  console.log("Starting looping from page#3");
  /**
   * Start looping from a specific page using a specific continuationToken
   */
  for await (const page of actionResults.byPage({
    maxPageSize: 1,
    continuationToken,
  })) {
    console.log("Starting a page --------------------------------------------");
    for (const actionResult of page) {
      if (actionResult.error) {
        const { code, message } = actionResult.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      switch (actionResult.kind) {
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
        default: {
          throw new Error(`Unexpected action results: ${actionResult.kind}`);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
