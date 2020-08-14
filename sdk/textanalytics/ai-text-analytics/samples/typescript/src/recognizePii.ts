// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects personally-identifiable information
 */

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running recognizePii sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const [result] = await client.recognizePiiEntities(["My phone number is 555-5555"]);

  if (!result.error) {
    for (const entity of result.entities) {
      console.log(`Found PII entity ${entity.text} of type ${entity.category}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
