// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with image generation capabilities
 * using the ImageGenTool and synchronous Azure AI Projects client. The agent can generate
 * images based on text prompts and save them to files.
 *
 * @summary This sample demonstrates how to create an agent with ImageGenTool configured for
 * image generation, make requests to generate images from text prompts, extract base64-encoded
 * image data from the response, decode and save the generated image to a local file, and clean
 * up created resources.
 *
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as fs from "node:fs/promises";
import * as path from "path";
import { fileURLToPath } from "node:url";
import "dotenv/config";
import { withAgentVersionEndpoint } from "../agentEndpointUtils.js";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const imageDeploymentName = process.env["IMAGE_GENERATION_MODEL_DEPLOYMENT_NAME"] || "gpt-image-1";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "gpt-4o";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating agent with image generation tool...");

  // Create Agent with image generation tool
  await withAgentVersionEndpoint(
    project,
    agentName,
    {
      kind: "prompt",
      model: deploymentName,
      instructions: "Generate images based on user prompts",
      tools: [
        {
          type: "image_generation",
          quality: "low",
          size: "1024x1024",
        },
      ],
    },
    async (agent) => {
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );
      const openAIClient = project.getOpenAIClient({
        azureConfig: { allowPreview: true, agentName },
      });

      // Generate image using the agent
      console.log("\nGenerating image...");
      const response = await openAIClient.responses.create(
        {
          input: "Generate an image of Microsoft logo.",
        },
        {
          headers: { "x-ms-oai-image-generation-deployment": imageDeploymentName },
        },
      );
      console.log(`Response created: ${response.id}`);

      // Extract and save the generated image
      const imageData = response.output?.filter(
        (output) => output.type === "image_generation_call",
      );

      if (imageData && imageData.length > 0 && imageData[0].result) {
        console.log("Downloading generated image...");

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filename = "microsoft.png";
        const filePath = path.join(__dirname, filename);

        // Decode base64 and save to file
        const imageBuffer = Buffer.from(imageData[0].result, "base64");
        await fs.writeFile(filePath, imageBuffer);

        console.log(`Image downloaded and saved to: ${path.resolve(filePath)}`);
      } else {
        console.log("No image data found in the response.");
      }
    },
  );
  console.log("\nImage generation sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
