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
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const fs = require("node:fs/promises");
const path = require("path");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const imageDeploymentName = process.env["IMAGE_GENERATION_MODEL_DEPLOYMENT_NAME"] || "gpt-image-1";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

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
      body: {
        agent: { name: agent.name, type: "agent_reference" },
      },
      headers: { "x-ms-oai-image-generation-deployment": imageDeploymentName },
    },
  );
  console.log(`Response created: ${response.id}`);

  // Extract and save the generated image
  const imageData = response.output?.filter((output) => output.type === "image_generation_call");

  if (imageData && imageData.length > 0 && imageData[0].result) {
    console.log("Downloading generated image...");

    const filename = "microsoft.png";
    const filePath = path.join(__dirname, filename);

    // Decode base64 and save to file
    const imageBuffer = Buffer.from(imageData[0].result, "base64");
    await fs.writeFile(filePath, imageBuffer);

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

module.exports = { main };
