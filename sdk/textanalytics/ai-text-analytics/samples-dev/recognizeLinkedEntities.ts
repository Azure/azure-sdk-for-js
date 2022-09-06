// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample uses the linked entity recognition endpoint to detect
 * well-known entities in a document and connect (link) them to entries in an
 * external knowledge base (such as Wikipedia) that contain information about
 * the entity.
 *
 * @summary detects entities that have links to more information on the web
 * @azsdk-weight 100
 */

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

const documents = [
  "Microsoft moved its headquarters to Bellevue, Washington in January 1979.",
  "Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.",
];

export async function main() {
  console.log("== Recognize Linked Entities Sample ==");

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const results = await client.recognizeLinkedEntities(documents);

  for (const result of results) {
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log("\tEntities:");
      for (const entity of result.entities) {
        console.log(
          `\t- Entity ${entity.name}; link ${entity.url}; datasource: ${entity.dataSource}`
        );
        console.log("\t\tMatches:");
        for (const match of entity.matches) {
          console.log(
            `\t\t- Entity appears as "${match.text}" (confidence: ${match.confidenceScore}`
          );
        }
      }
    } else {
      console.error("  Error:", result.error);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
