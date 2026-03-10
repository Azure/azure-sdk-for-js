// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run a responses operation with image input
 * using the AIProjectClient and OpenAI client. The sample shows how to
 * send both text and image content to a model for analysis.
 *
 * @summary This sample demonstrates how to create a response with image input.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as fs from "node:fs/promises";
import * as path from "path";
import { fileURLToPath } from "node:url";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

async function imageToBase64(imagePath: string): Promise<string> {
  try {
    const fileData = await fs.readFile(imagePath);
    return fileData.toString("base64");
  } catch (err) {
    throw new Error(`Error reading file '${imagePath}': ${err}`);
  }
}

export async function main(): Promise<void> {
  // Create OpenAI client with Azure credentials
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  const imageFilePath = path.resolve(__dirname, "../assets/image_input.png");

  console.log("Creating response with image input...");
  const response = await openAIClient.responses.create({
    model: deploymentName,
    input: [
      {
        type: "message",
        role: "user",
        content: [
          { type: "input_text", text: "what's in this image?" },
          {
            type: "input_image",
            detail: "auto",
            image_url: `data:image/png;base64,${await imageToBase64(imageFilePath)}`,
          },
        ],
      },
    ],
  });

  console.log(`Response output: ${response.output_text}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
