// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list completions for the provided prompt.
 *
 * @summary list completions.
 * @azsdk-weight 100
 */

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import * as fs from "fs";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

const prompt = "What is Azure OpenAI?";

export async function main() {
  console.log("== Stream Speech From Text Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "tts-1-hd";
  const result = await client.streamSpeechFromText(deploymentId, prompt, "onyx");

  for await (const chunk of result) {
    fs.writeFile(`audioFile.mp3`, chunk, (err: any) => {
      if (err) {
        throw new Error(err);
      }
    });
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
