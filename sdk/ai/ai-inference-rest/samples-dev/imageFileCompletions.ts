// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get chat completions using a local image file for a chat context.
 *
 * @summary Get chat completions with image file.
 */

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";
import { createRestError } from "@azure-rest/core-client";
import fs from "node:fs";

// Load the .env file if it exists
import "dotenv/config";
import { AzureKeyCredential } from "@azure/core-auth";
// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const key = process.env["KEY"];
const modelName = process.env["MODEL_NAME"];

const imageFilePath = "sample1.png";
const imageFormat = "png"; // "jpeg", "png", etc.

export async function main(): Promise<void> {
  console.log("== Image File Completions Sample ==");

  const client = createModelClient();

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that describes images in details.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "What's in this image?" },
            {
              type: "image_url",
              image_url: {
                url: getImageDataUrl(imageFilePath, imageFormat),
              },
            },
          ],
        },
      ],
      model: modelName,
    },
  });

  if (isUnexpected(response)) {
    throw createRestError(response);
  }

  console.log(response.body.choices[0].message.content);
}

/**
 * Get the data URL of an image file.
 * @param {string} imageFile - The path to the image file.
 * @param {string} imageFormatType - The format of the image file. For example: "jpeg", "png".
 * @returns {string} The data URL of the image.
 */
function getImageDataUrl(imageFile: string, imageFormatType: string): string {
  try {
    const imageBuffer = fs.readFileSync(imageFile);
    const imageBase64 = imageBuffer.toString("base64");
    return `data:image/${imageFormatType};base64,${imageBase64}`;
  } catch (error) {
    console.error(`Could not read '${imageFile}'.`);
    console.error("Set the correct path to the image file before running this sample.");
    process.exit(1);
  }
}

/*
 * This function creates a model client.
 */
function createModelClient(): ModelClient {
  // auth scope for AOAI resources is currently https://cognitiveservices.azure.com/.default
  // auth scope for MaaS and MaaP is currently https://ml.azure.com
  // (Do not use for Serverless API or Managed Computer Endpoints)
  if (key) {
    return ModelClient(endpoint, new AzureKeyCredential(key));
  } else {
    const scopes: string[] = [];
    if (endpoint.includes(".models.ai.azure.com")) {
      scopes.push("https://ml.azure.com");
    } else if (endpoint.includes(".openai.azure.com/openai/deployments/")) {
      scopes.push("https://cognitiveservices.azure.com");
    }

    const clientOptions = { credentials: { scopes } };
    return ModelClient(endpoint, new DefaultAzureCredential(), clientOptions);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
