// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to analyze sentiment in documents.
 * An overall and per-sentence sentiment is returned.
 */

import { TextAnalyticsClient, AzureKeyCredential } from "@azure/ai-text-analytics";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

const documents = [
  "I had the best day of my life.",
  "This was a waste of my time. The speaker put me to sleep.",
];

export async function main() {
  console.log("=== Analyze Sentiment Sample ===");

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const results = await client.analyzeSentiment(documents);

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log(`  Document text: ${documents[i]}`);
      console.log(`  Overall Sentiment: ${result.sentiment}`);
      console.log("  Sentiment confidence scores:", result.confidenceScores);
      console.log("  Sentences");
      for (const { sentiment, confidenceScores } of result.sentences) {
        console.log(`  - Sentence sentiment: ${sentiment}`);
        console.log("    Confidence scores:", confidenceScores);
      }
    } else {
      console.error(`  Error: ${result.error}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
