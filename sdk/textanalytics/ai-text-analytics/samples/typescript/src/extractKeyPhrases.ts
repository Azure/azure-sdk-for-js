// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * extracts key phrases from a piece of text
 */

import {
  TextAnalyticsClient,
  AzureKeyCredential
} from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

export async function main() {
  console.log(`Running extractKeyPhrases sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const [result] = await client.extractKeyPhrases([
    "I love living in Seattle! Seattle is always sunny."
  ]);

  if (!result.error) {
    for (const phrase of result.keyPhrases) {
      console.log(`Key phrase: ${phrase}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
