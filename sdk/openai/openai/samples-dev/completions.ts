// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get completions for the provided prompt.
 *
 * @summary get completions.
 * @azsdk-weight 100
 */

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
import { parseOpenAIError } from "./parseOpenAIError.js";
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
  }
}

main().catch((err) => {
  parseOpenAIError(err);
});
