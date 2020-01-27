// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * detects the language of a piece of text
 */

const { TextAnalyticsClient, TextAnalyticsApiKeyCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
require("dotenv").config();

async function main() {
  console.log(`Running detectLanguages sample`);

  // You will need to set these environment variables or edit the following values
  const endpoint = process.env["ENDPOINT"] || "<cognitive services endpoint>";
  const apiKey = process.env["TEXT_ANALYTICS_API_KEY"] || "<api key>";

  const client = new TextAnalyticsClient(endpoint, new TextAnalyticsApiKeyCredential(apiKey));

  const [result] = await client.detectLanguages(["hello world"]);

  if (!result.error) {
    console.log(`Primary language detected as ${result.primaryLanguage.name}`);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
