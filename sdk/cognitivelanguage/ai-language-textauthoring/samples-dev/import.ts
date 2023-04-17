// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Imports a dataset into a new single lable classification project.
 * You can start training jobs after importing the dataset.
 *
 * @summary imports a dataset into a project
 * @azsdk-weight 100
 */

import createAuthoringClient from "@azure/ai-language-textauthoring";
import { AzureKeyCredential } from "@azure/core-auth";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";
const projectName = process.env["PROJECT_NAME"] || "<project name>";

export async function main() {
  console.log("== Single Label Classification Sample ==");

  const client = createAuthoringClient(endpoint, new AzureKeyCredential(apiKey));
  await client.path("/authoring/analyze-text/projects/{projectName}/:import", projectName).post({
    body: {
      metadata: {
        projectKind: "CustomEntityRecognition",
        storageInputContainerName: "container",
        projectName,
        language: "en-us",
        multilingual: false,
        settings: {},
      },
      projectFileVersion: "2022-05-01",
      stringIndexType: "Utf16CodeUnit",
      assets: {
        projectKind: "CustomSingleLabelClassification",
        classes: [
          {
            category: "Mechanical_engineering",
          },
          {
            category: "Civil_engineering",
          },
        ],
        documents: [
          {
            location: "1.txt",
            language: "en-us",
            class: {
              category: "Mechanical_engineering",
            },
          },
          {
            location: "2.txt",
            language: "en-us",
            class: {
              category: "Civil_engineering",
            },
          },
        ],
      },
    },
  });
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
