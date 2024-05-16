// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to translate the content of an audio file.
 *
 * @summary audio translation.
 */

import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { readFile } from "fs/promises";

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import dotenv from "dotenv";
import { parseOpenAIError } from "./parseOpenAIError.js";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";
const audioFilePath = process.env["AUDIO_FILE_PATH"] || "<audio file path>";

export async function main() {
  console.log("== Translate Audio Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentName = "whisper";
  const audio = await readFile(audioFilePath);
  const result = await client.getAudioTranslation(deploymentName, audio);

  console.log(`Translation: ${result.text}`);
}

main().catch((err) => {
  parseOpenAIError(err)
});
