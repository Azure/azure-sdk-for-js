// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to analyze sentiment on a more granular level,
 * mining individual opinions from reviews (also known as aspect-based 
 * sentiment analysis). This feature is only available for clients with api 
 * version v3.1-preview.1.
 * 
 * In this sample, a bunch of reviews about a hotel are being analyzed for
 * sentiment and different opinions about aspects in the reviews are shown.
 */

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

const documents = [
  {
    text: "The food and service were unacceptable, but the concierge were nice",
    id: "0",
    language: "en"
  },
  {
    text:
      "The rooms were beautiful but dirty. The AC was good and quiet, but the elevator was broken",
    id: "1",
    language: "en"
  },
  {
    text: "The breakfast was good, but the toilet was smelly",
    id: "2",
    language: "en"
  },
  {
    text: "Loved this hotel - good breakfast - nice shuttle service.",
    id: "3",
    language: "en"
  },
  {
    text: "I had a great unobstructed view of the Microsoft campus",
    id: "4",
    language: "en"
  }
];

async function main() {
  console.log("=== Opinion Mining Sample ===");

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const results = await client.analyzeSentiment(documents, { includeOpinionMining: true });

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log(`  Document text: ${documents[i]}`);
      console.log(`  Overall Sentiment: ${result.sentiment}`);
      console.log("  Sentiment confidence scores:", result.confidenceScores);
      console.log("  Sentences");
      for (const { sentiment, confidenceScores, minedOpinions } of result.sentences) {
        console.log(`  - Sentence sentiment: ${sentiment}`);
        console.log("    Confidence scores:", confidenceScores);
        console.log("    Mined opinions");
        for (const { aspect, opinions } of minedOpinions) {
          console.log(`      - Aspect text: ${aspect.text}`);
          console.log(`        Aspect sentiment: ${aspect.sentiment}`);
          console.log("        Aspect confidence scores:", aspect.confidenceScores);
          console.log("        Aspect opinions");
          for (const { text, sentiment } of opinions) {
            console.log(`        - Text: ${text}`);
            console.log(`          Sentiment: ${sentiment}`);
          }
        }
      }
    } else {
      console.error(`  Error: ${result.error}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
