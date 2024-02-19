// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Demonstrates how to use vision capabilities of chat models.
 *
 * @summary vision in chat completions.
 * @azsdk-weight 100
 */

import createClient, { AzureKeyCredential, isUnexpected } from "@azure-rest/openai";

// Load the .env file if it exists
import * as dotenv from "dotenv";
dotenv.config();

// You will need to set these environment variables or edit the following values
const endpoint = process.env["ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";

export async function main() {
  console.log("== Vision Sample ==");

  const client = createClient(endpoint, new AzureKeyCredential(azureApiKey));
  const url =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg";
  const deploymentName = "gpt-4-vision-preview";
  const response = await client
    .path("/deployments/{deploymentId}/chat/completions", deploymentName)
    .post({
      body: {
        messages: [
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url,
                  detail: "auto",
                },
              },
            ],
          },
        ],
      },
    });

  if (isUnexpected(response)) {
    throw new Error(`Failed to get chat completions: ${JSON.stringify(response.body)}`);
  }

  for (const choice of response.body.choices) {
    console.log(choice.message);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
