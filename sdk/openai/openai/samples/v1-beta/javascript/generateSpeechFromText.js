// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to list completions for the provided prompt.
 *
 * @summary list completions.
 */

const { OpenAIClient, AzureKeyCredential } = require("@azure/openai");
const { writeFile } = require("fs/promises");

// Load the .env file if it exists
require("dotenv").config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

const prompt = "What is Azure OpenAI?";

async function main() {
  console.log("== Stream Speech From Text Sample ==");

  const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentId = "tts-1-hd";
  const result = await client.generateSpeechFromText(deploymentId, prompt, "onyx");
  await writeFile(`audioFile.mp3`, result);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
