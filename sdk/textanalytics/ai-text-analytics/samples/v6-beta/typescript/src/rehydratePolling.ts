// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to create a poller using the serialized state of
 * another poller. This is useful for scenarios where polling needs to happen
 * on a different host or on multiple hosts.
 *
 * @summary creates a poller using the serialized state of another
 */

import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

const documents = [
  "Patient does not suffer from high blood pressure.",
  "Prescribed 100mg ibuprofen, taken twice daily.",
];

export async function main() {
  console.log("== Rehydrated Polling Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

  const poller = await client.beginAnalyzeBatch(
    [
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
    ],
    documents,
    "en"
  );

  poller.onProgress(() => {
    console.log(
      `Number of actions still in progress: ${poller.getOperationState().actionInProgressCount}`
    );
  });

  console.log(`The operation created on ${poller.getOperationState().createdOn}`);

  console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

  /** Get the serialized state of the poller */
  const serializedState = poller.toString();

  /** Create a new poller from the serialized state */
  const rehydratedPoller = await client.restoreAnalyzeBatchPoller(serializedState);

  /** Use the new poller to get the operation results */
  const actionResults = await rehydratedPoller.pollUntilDone();

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
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
