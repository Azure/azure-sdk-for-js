// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to translate the content of an audio file.
 *
 * @summary audio translation.
 */

const { AzureOpenAI } = require("openai");
const { DefaultAzureCredential, getBearerTokenProvider } = require("@azure/identity");
const { createReadStream } = require("fs");

// Set AZURE_OPENAI_ENDPOINT to the endpoint of your
// OpenAI resource. You can find this in the Azure portal.
// Load the .env file if it exists
require("dotenv/config");

// You will need to set these environment variables or edit the following values
const audioFilePath = process.env["AUDIO_FILE_PATH"] || "<audio file path>";

async function main() {
  console.log("== Translate Audio Sample ==");

  const scope = "https://cognitiveservices.azure.com/.default";
  const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);
  const deployment = "whisper-deployment";
  const apiVersion = "2024-04-01-preview";
  const client = new AzureOpenAI({ azureADTokenProvider, deployment, apiVersion });
  const result = await client.audio.translations.create({
    model: "",
    file: createReadStream(audioFilePath),
  });

  console.log(`Translation: ${result.text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
