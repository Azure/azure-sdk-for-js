// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to translate the content of an audio file.
 *
 * @summary audio translation.
 * @azsdk-weight 100
 */

import { OpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { createReadStream } from "node:fs";
import "dotenv/config";

// You will need to set these environment variables or edit the following values
const audioFilePath = process.env["AUDIO_FILE_PATH"];
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"];

export async function main(): Promise<void> {
  console.log("== Translate Audio Sample ==");

  if (!endpoint) {
    throw new Error("Please set the AZURE_OPENAI_ENDPOINT environment variable.");
  }
  if (!audioFilePath) {
    throw new Error("Please set the AUDIO_FILE_PATH environment variable.");
  }
  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "whisper";
  const client = new OpenAI({ baseURL: endpoint + "/openai/v1", apiKey: azureADTokenProvider });
  const result = await client.audio.translations.create({
    model: deployment,
    file: createReadStream(audioFilePath),
  });

  console.log(`Translation: ${result.text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
