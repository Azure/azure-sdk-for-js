// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample program demonstrates how to detect entities using custom models
 * built using Azure Language Studio.
 *
 * @summary detects custom text in a piece of text
 */

import {
  AnalyzeBatchAction,
  AzureKeyCredential,
  TextAnalysisClient,
} from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";
const deploymentName =
  process.env["LANGUAGE_CUSTOM_ENTITY_RECOGNITION_DEPLOYMENT_NAME"] || "deployment name";
const projectName =
  process.env["LANGUAGE_CUSTOM_ENTITY_RECOGNITION_PROJECT_NAME"] || "deployment name";

const documents = [
  "We love this trail and make the trip every year. The views are breathtaking and well worth the hike! Yesterday was foggy though, so we missed the spectacular views. We tried again today and it was amazing. Everyone in my family liked the trail although it was too challenging for the less athletic among us.",
  "Last week we stayed at Hotel Foo to celebrate our anniversary. The staff knew about our anniversary so they helped me organize a little surprise for my partner. The room was clean and with the decoration I requested. It was perfect!",
];

export async function main() {
  console.log("== Custom Entity Recognition Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const actions: AnalyzeBatchAction[] = [
    {
      kind: "CustomEntityRecognition",
      deploymentName,
      projectName,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "CustomEntityRecognition") {
      throw new Error(`Expected a CustomEntityRecognition results but got: ${actionResult.kind}`);
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
        console.log(`\t- Entity "${entity.text}" of type ${entity.category}`);
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
