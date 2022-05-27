// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to get statistics about the performed action.
 *
 * @summary access statistics about documents and transactions
 */

const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-text-analytics");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

const documents = [
  "Microsoft moved its headquarters to Bellevue, Washington in January 1979.",
  "Steve Ballmer stepped down as CEO of Microsoft and was succeeded by Satya Nadella.",
];

async function main() {
  console.log("== Statistics Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

  const results = await client.analyze("EntityLinking", documents, "en", {
    /**
     * Ask the service to return statistics.
     */
    includeStatistics: true,
    /**
     * Access general statistics information about the action from the HTTP
     * response.
     */
    onResponse: (_rawResponse, flatResponse) => {
      const stats = flatResponse.results.statistics;
      console.log(`\t- Documents count: ${stats.documentCount}`);
      console.log(`\t- Valid documents count: ${stats.validDocumentCount}`);
      console.log(`\t- Erroneous documents count: ${stats.erroneousDocumentCount}`);
      console.log(`\t- Transactions count: ${stats.transactionCount}`);
    },
  });

  /**
   * Access statistics per document
   */
  console.log("Statistics for analyze:");
  for (const result of results) {
    if (result.error) {
      throw new Error(`Unexpected document error: ${result.error.message}`);
    }
    const stats = result.statistics;
    if (!stats) {
      throw new Error("Expected statistics to be returned in the response");
    }
    console.log(`\t- Document ID: ${result.id}`);
    console.log(`\t\t-Character count: ${stats.characterCount}`);
    console.log(`\t\t-Transaction count: ${stats.transactionCount}`);
  }

  const poller = await client.beginAnalyzeBatch(
    [
      {
        kind: "Healthcare",
      },
    ],
    documents,
    "en",
    {
      includeStatistics: true,
    }
  );
  const actions = await poller.pollUntilDone();
  console.log("Statistics for beginAnalyzeActions:");
  for await (const action of actions) {
    const stats = action.statistics;
    if (!stats) {
      throw new Error("statistics are missing");
    }
    console.log("\tAction statistics: ");
    console.log(`\t\t- Documents count: ${stats.documentCount}`);
    console.log(`\t\t- Valid documents count: ${stats.validDocumentCount}`);
    console.log(`\t\t- Erroneous documents count: ${stats.erroneousDocumentCount}`);
    console.log(`\t\t- Transactions count: ${stats.transactionCount}`);
    if (!action.error) {
      for (const doc of action.results) {
        if (!doc.error) {
          console.log(`\t\t- Document ID: ${doc.id}`);
          const stats = doc.statistics;
          console.log(`\t\t\t- Character count: ${stats.characterCount}`);
          console.log(`\t\t\t- Transaction count: ${stats.transactionCount}`);
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
