// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt and parse output for content filter result.
 *
 * @summary get completions.
 * @azsdk-weight 100
 */

import { OpenAIClient, AzureKeyCredential, ContentFilterResult } from "@azure/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

const prompt = ["What is Azure OpenAI?"];

export async function main() {
  console.log("== Get completions Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "text-davinci-003";
  const result = await client.getCompletions(deploymentId, prompt, { maxTokens: 128 });

  for (const choice of result.choices) {
    console.log(choice.text);
    if (choice.contentFilterResults) {
      if (choice.contentFilterResults.error){
        console.log(
          `Content filter ran into the error ${choice.contentFilterResults.error.code}: ${choice.contentFilterResults.error.message}`
        )
      }
      else {
        for (const [category, details] of Object.entries(choice.contentFilterResults)){
          const filterResult = details as ContentFilterResult
          console.log(`Category ${category} is filtered: ${filterResult.filtered} with ${filterResult.severity} severity`)
        }
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
