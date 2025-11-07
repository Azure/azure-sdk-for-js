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
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  console.log("Creating agent with image generation tool...");

  // Create Agent with image generation tool
  const agent = await project.agents.createVersion("agent-image-generation", {
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
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Generate image using the agent
  console.log("\nGenerating image...");
  const response = await openAIClient.responses.create(
    {
      input: "Generate an image of Microsoft logo.",
    },
    {
      headers: {
        "x-ms-oai-image-generation-deployment": "gpt-image-1", // required for image generation
      },
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response created: ${response.id}`);

  // Extract and save the generated image
  const imageData = response.output?.filter((output) => output.type === "image_generation_call");

  if (imageData && imageData.length > 0 && imageData[0].result) {
    console.log("Downloading generated image...");

    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const filename = "microsoft.png";
    const filePath = path.join(__dirname, filename);

    // Decode base64 and save to file
    const imageBuffer = Buffer.from(imageData[0].result, "base64");
    fs.writeFileSync(filePath, imageBuffer);

    console.log(`Image downloaded and saved to: ${path.resolve(filePath)}`);
  } else {
    console.log("No image data found in the response.");
  }

  // Clean up resources
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nImage generation sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
