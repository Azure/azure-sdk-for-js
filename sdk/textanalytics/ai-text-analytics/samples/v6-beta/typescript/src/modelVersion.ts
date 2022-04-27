// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample shows how to choose model versions to use with pre-built Text
 * Analytics models.
 *
 * @summary shows how to choose model versions for pre-built models.
 */

import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

const documents = ["This document is written in English."];

export async function main() {
  console.log("== Choosing Model Version Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

  await client.analyze("SentimentAnalysis", documents, "en", {
    /**
     * Specify the model version by setting this property. "latest" indicates
     * the latest generally availabe version of the model. When not specified,
     * latest will be assumed. Model versions are date based, e.g "2021-06-01".
     * See the documentation for a list of all model versions:
     * https://docs.microsoft.com/en-us/azure/cognitive-services/language-service/named-entity-recognition/how-to-call#specify-the-ner-model
     */
    modelVersion: "latest",
    /**
     * Access the model version on the HTTP response.
     */
    onResponse: (_rawResponse, flatResponse) => {
      const modelVersion = (flatResponse as any).results.modelVersion;
      console.log(
        `The result of sentiment analysis was computed using model version: ${modelVersion} `
      );
    },
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
