// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * In this sample, we use the sentiment analysis endpoint to retrieve
 * estimations of document sentiment (positive, negative, or mixed) within some
 * example text. The endpoint allows us to analyze sentiment on a per-sentence
 * or overall (per-document) basis.
 *
 * @summary analyzes the sentiment of a piece of text
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
      console.log(`\tDocument text: ${documents[i]}`);
      console.log(`\tOverall Sentiment: ${result.sentiment}`);
      console.log("\tSentiment confidence scores: ", result.confidenceScores);
      console.log("\tSentences");
      for (const { sentiment, confidenceScores, text } of result.sentences) {
        console.log(`\t- Sentence text: ${text}`);
        console.log(`\t  Sentence sentiment: ${sentiment}`);
        console.log("\t  Confidence scores:", confidenceScores);
      }
    } else {
      console.error(`  Error: ${result.error}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
