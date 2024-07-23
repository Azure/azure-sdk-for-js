// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to convert text into speech.
 *
 * @summary text to speech.
 */

import 'openai/shims/node';
import { AzureOpenAI } from "openai";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { writeFile } from 'fs/promises';

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
import "dotenv/config";

// You will need to set these environment variables or edit the following values
const speechFilePath = process.env["SPEECH_FILE_PATH"] || "<path to save the speech file>";

// Corresponds to your Model deployment within your OpenAI resource
// Navigate to the Azure OpenAI Studio to deploy a model.
const deployment = 'tts';
const apiVersion = "2024-05-01-preview";
const credential = new DefaultAzureCredential();
const scope = 'https://cognitiveservices.azure.com/.default';
const azureADTokenProvider = getBearerTokenProvider(credential, scope);

export async function main() {
  console.log("== Text to Speech Sample ==");

  const openai = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion, });
  const response = await openai.audio.speech.create({
    model: deployment,
    voice: 'alloy',
    input: 'the quick brown chicken jumped over the lazy dogs',
  });

  const stream = response.body;
  console.log(`Streaming response to ${speechFilePath}`);
  await writeFile(speechFilePath, stream);
  console.log('Finished streaming');
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
