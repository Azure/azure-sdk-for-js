// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to choose model versions to use with pre-built Text
 * Analytics models.
 *
 * @summary shows how to choose model versions for pre-built models.
 */

import { TextAnalysisClient } from "@azure/ai-language-text";
import { DefaultAzureCredential } from "@azure/identity";

// Load the .env file if it exists
import "dotenv/config";

// You will need to set these environment variables or edit the following values
const endpoint = process.env["LANGUAGE_ENDPOINT"] || "<cognitive language service endpoint>";

const documents = ["This document is written in English."];

export async function main(): Promise<void> {
  console.log("== Choosing Model Version Sample ==");

  const client = new TextAnalysisClient(endpoint, new DefaultAzureCredential());

  await client.analyze("SentimentAnalysis", documents, "en", {
    /**
     * Specify the model version by setting this property. "latest" indicates
     * the latest generally availabe version of the model. When not specified,
     * latest will be assumed. Model versions are date based, e.g "2021-06-01".
     * See the documentation for a list of all model versions:
     * https://learn.microsoft.com/azure/cognitive-services/language-service/concepts/model-lifecycle
     */
    modelVersion: "latest",
    /**
     * Access the model version on the HTTP response.
     */
    onResponse: (_rawResponse, flatResponse) => {
      const modelVersion = (flatResponse as any).results.modelVersion;
      console.log(
        `The result of the sentiment analysis was computed using model version: ${modelVersion}`,
      );
    },
  });

  const poller = await client.beginAnalyzeBatch(
    [
      {
        kind: "Healthcare",
        /**
         * Specify the model version by setting this property. "latest" indicates
         * the latest generally availabe version of the model. When not specified,
         * latest will be assumed. Model versions are date based, e.g "2022-03-01".
         * See the documentation for a list of all model versions:
         * https://learn.microsoft.com/azure/cognitive-services/language-service/concepts/model-lifecycle
         */
        modelVersion: "latest",
      },
    ],
    documents,
    "en",
  );
  const results = await poller.pollUntilDone();
  for await (const actionResult of results) {
    if (actionResult.kind !== "Healthcare") {
      throw new Error(`Expected a healthcare results but got: ${actionResult.kind}`);
    }
    if (actionResult.error) {
      const { code, message } = actionResult.error;
      throw new Error(`Unexpected error (${code}): ${message}`);
    }
    console.log(
      `The result of the healthcare analysis was computed using model version: ${actionResult.modelVersion} `,
    );
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
