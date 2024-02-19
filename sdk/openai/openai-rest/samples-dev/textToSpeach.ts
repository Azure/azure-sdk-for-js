// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to convert text to speech.
 *
 * @summary text to speech.
 * @azsdk-weight 100
 */

import createClient, { AzureKeyCredential } from "@azure-rest/openai";
import { writeFile } from "fs/promises";

// Load the .env file if it exists
import dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

export async function main() {
  console.log("== Text to Speech Sample ==");

  const client = createClient(endpoint, new AzureKeyCredential(azureApiKey));
  const deploymentName = "tts";
  const response = await client
    .path("/deployments/{deploymentId}/audio/speech", deploymentName)
    .post({
      body: {
        input: "One, two, three, four, five.",
        voice: "alloy",
        model: deploymentName,
      },
    })
    .asNodeStream();

  if (!response.body) {
    throw new Error("The response body is undefined");
  }

  if (response.status !== "200") {
    throw new Error(`Failed to get speech for text: ${await streamToString(response.body)}`);
  }

  console.log(`Saving speech to speech.mp3 ...`);
  await writeFile("speech.mp3", response.body);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

async function streamToString(stream: NodeJS.ReadableStream) {
  // lets have a ReadableStream as a stream variable
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(Buffer.from(chunk));
  }

  return Buffer.concat(chunks).toString("utf-8");
}
