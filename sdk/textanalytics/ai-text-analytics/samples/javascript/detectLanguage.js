// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects the language of a piece of text
 */

const { TextAnalyticsClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
const dotenv = require("dotenv");
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

const documents = [
  "This document is written in English.",
  "Este es un document escrito en Español.",
  "这是一个用中文写的文件",
  "Dies ist ein Dokument in deutsche Sprache.",
  "Detta är ett dokument skrivet på engelska."
];

async function main() {
  console.log("== Detect Language Sample ==");

  const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(apiKey));

  const results = await client.detectLanguage(documents);

  for (const result of results) {
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      const primaryLanguage = result.primaryLanguage;
      console.log(
        `  Detected language: ${primaryLanguage.name} (ISO 6391 code: ${primaryLanguage.iso6391Name})`
      );
    } else {
      console.error("  Error:", result.error);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
