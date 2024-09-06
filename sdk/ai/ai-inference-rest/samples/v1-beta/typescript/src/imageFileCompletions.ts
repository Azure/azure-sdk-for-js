// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to get chat completions using a local image file for a chat context.
 *
 * @summary Get chat completions with image file.
 */

import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { DefaultAzureCredential } from "@azure/identity";
import fs from 'fs';

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const modelName = process.env["MODEL_NAME"] || "<model_name>";
const imageFilePath = "<image_file_path>";
const imageFormat = "<image_format>"; //"jpeg", "png", etc.

export async function main() {
  console.log("== Chat Completions Sample ==");
  const credential = new DefaultAzureCredential();

  const client = ModelClient(endpoint, credential);

  const response = await client.path("/chat/completions").post({
    body: {
      messages: [
        { role: "system", content: "You are a helpful assistant that describes images in details." },
        { role: "user", content: [
            { type: "text", text: "What's in this image?"},
            { type: "image_url", image_url: {
                url: getImageDataUrl(imageFilePath, imageFormat)}}
          ]
        }
      ],
      model: modelName
    }
  });

  if (isUnexpected(response)) {
    throw response.body.error;
  }

  console.log(response.body.choices[0].message.content);
}

/**
 * Get the data URL of an image file.
 * @param {string} imageFile - The path to the image file.
 * @param {string} imageFormat - The format of the image file. For example: "jpeg", "png".
 * @returns {string} The data URL of the image.
 */
function getImageDataUrl(imageFile: string, imageFormat: string): string {
  try {
      const imageBuffer = fs.readFileSync(imageFile);
      const imageBase64 = imageBuffer.toString('base64');
      return `data:image/${imageFormat};base64,${imageBase64}`;
  } catch (error) {
      console.error(`Could not read '${imageFile}'.`);
      console.error('Set the correct path to the image file before running this sample.');
      process.exit(1);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
