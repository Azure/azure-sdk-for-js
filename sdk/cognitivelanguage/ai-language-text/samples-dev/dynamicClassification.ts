// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * On the fly classification of the input documents into one or multiple
 * categories. Assigns either one or multiple categories per document. The
 * dynamic classification feature is part of a gated preview. Access can be
 * requested in {@link https://aka.ms/applyforgatedlanguagefeature}
 *
 *
 * @summary assigns either one or multiple categories per document.
 * @azsdk-weight 100
 */

import { TextAnalysisClient, AzureKeyCredential } from "@azure/ai-language-text";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<cognitive language service endpoint>";
const apiKey = process.env["LANGUAGE_API_KEY"] || "<api key>";

const documents = [
  "The plot begins with a large group of characters where everyone thinks that the two main ones should be together but foolish things keep them apart. Misunderstandings, miscommunication, and confusion cause a series of humorous situations.",
];

export async function main() {
  console.log("== Dynamic Classification Sample ==");

  const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));

  const results = await client.analyze("DynamicClassification", documents, "en", {
    categories: ["Romance", "Comedy", "Drama"],
    classificationType: "Single",
  });

  for (const result of results) {
    console.log(`- Document ${result.id}`);
    if (!result.error) {
      console.log("\tClassifications:");
      for (const category of result.classifications) {
        console.log(`\t- ${category.category}`);
      }
    } else {
      console.error("  Error:", result.error);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
