// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to choose model versions to use with pre-built Text
 * Analytics models.
 *
 * @summary shows how to choose model versions for pre-built models.
 */

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

const documents = ["This document is written in English."];

export async function main() {
  console.log("== Choosing Model Version Sample ==");

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const recognizeEntitiesResults = await client.recognizeEntities(documents, "en", {
    /**
     * Specify the model version by setting this property. "latest" indicates
     * the latest generaly availability version of the model. When not specified,
     * latest will be assumed. Model versions are date based, e.g "2021-06-01".
     * See the documentation for a list of all model versions:
     * https://docs.microsoft.com//azure/cognitive-services/language-service/named-entity-recognition/how-to-call#specify-the-ner-model
     */
    modelVersion: "latest"
  });

  console.log(
    `The results of recognizeEntities has been computed using model version: ${recognizeEntitiesResults.modelVersion}`
  );

  const poller = await client.beginAnalyzeActions(
    documents,
    {
      recognizeEntitiesActions: [
        {
          /**
           * Specify the model version by setting this property. "latest" indicates
           * the latest generaly availability version of the model. When not specified,
           * latest will be assumed. Model versions are date based, e.g "2021-06-01".
           * See the documentation for a list of all model versions:
           * https://docs.microsoft.com//azure/cognitive-services/language-service/named-entity-recognition/how-to-call#specify-the-ner-model
           */
          modelVersion: "latest"
        }
      ]
    },
    "en"
  );

  const beginAnalyzeActionsResults = await poller.pollUntilDone();

  for await (const page of beginAnalyzeActionsResults) {
    const entitiesAction = page.recognizeEntitiesResults[0];
    if (!entitiesAction.error) {
      console.log(
        `The results of recognizeEntities action has been computed using model version: ${entitiesAction.results.modelVersion}`
      );
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
