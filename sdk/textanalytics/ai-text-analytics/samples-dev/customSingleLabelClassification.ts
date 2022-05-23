// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample program demonstrates how to classify documents using custom
 * single-label models built using Azure Language Studio.
 *
 * @summary single-label classification of pieces of text
 * @azsdk-weight 50
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
  "The plot begins with a large group of characters where everyone thinks that the two main ones should be together but foolish things keep them apart. Misunderstandings, miscommunication, and confusion cause a series of humorous situations.",
];

export async function main() {
  console.log("== Custom Entity Recognition Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
  const actions: AnalyzeBatchAction[] = [
    {
      kind: "CustomSingleLabelClassification",
      deploymentName,
      projectName,
    },
  ];
  const poller = await client.beginAnalyzeBatch(actions, documents, "en");
  const results = await poller.pollUntilDone();

  for await (const actionResult of results) {
    if (actionResult.kind !== "CustomSingleLabelClassification") {
      throw new Error(
        `Expected a CustomSingleLabelClassification results but got: ${actionResult.kind}`
      );
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
      console.log(`\tClassification: ${result.classifications[0].category}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
