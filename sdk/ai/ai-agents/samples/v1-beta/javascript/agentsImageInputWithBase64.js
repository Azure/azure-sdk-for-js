// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use basic agent operations with image input (base64 encoded) for the Azure Agents service.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("fs");

// Load environment variables
const projectEndpoint = process.env.PROJECT_ENDPOINT || "<connection-string>";
const modelDeployment = process.env.MODEL_DEPLOYMENT_NAME || "<model-deployment-name>";
const filePath = "./data/image_file.png";

/**
 * Convert an image file to a Base64-encoded data URL.
 * @param imagePath - The path to the image file
 * @param mimeType - The MIME type of the image (e.g., 'image/png', 'image/jpeg')
 * @returns A data URL with the Base64-encoded image
 */
function imageToBase64DataUrl(imagePath, mimeType) {
  try {
    // Read the image file as binary
    const imageBuffer = fs.readFileSync(imagePath);
    // Convert to base64
    const base64Data = imageBuffer.toString("base64");
    // Format as a data URL
    return `data:${mimeType};base64,${base64Data}`;
  } catch (error) {
    console.error(`Error reading image file at ${imagePath}:`, error);
    throw error;
  }
}

async function main() {
  console.log("== AI Projects Agent with Base64 Image Input Sample ==");

  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Create an agent
  console.log(`Creating agent with model ${modelDeployment}...`);
  const agent = await client.createAgent(modelDeployment, {
    name: "my-agent",
    instructions: "You are helpful agent",
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create a thread
  console.log("Creating thread...");
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create a message with text and image content using base64
  console.log("Converting image to base64...");
  const imageDataUrl = imageToBase64DataUrl(filePath, "image/png");

  // Create a message with both text and image content
  console.log("Creating message with image content...");
  const inputMessage = "Hello, what is in the image?";
  const content = [
    {
      type: "text",
      text: inputMessage,
    },
    {
      type: "image_url",
      imageUrl: {
        url: imageDataUrl,
        detail: "high",
      },
    },
  ];

  const message = await client.messages.create(thread.id, "user", content);
  console.log(`Created message, message ID: ${message.id}`);

  // Create and poll a run
  console.log("Creating run...");
  const run = await client.runs.createAndPoll(thread.id, agent.id, {
    pollingOptions: {
      intervalInMs: 2000,
    },
  });
  console.log(`Run finished with status: ${run.status}`);

  // Delete the agent
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // List messages
  const messages = client.messages.list(thread.id, {
    order: "asc",
  });

  for await (const dataPoint of messages) {
    const textContent = dataPoint.content.find((item) => item.type === "text");
    if (textContent && "text" in textContent) {
      console.log(`${dataPoint.role}: ${textContent.text.value}`);
    }
  }

  const messagesIterator = client.messages.list(thread.id);
  for await (const m of messagesIterator) {
    console.log(`Role: ${m.role}, Content: ${m.content}`);
  }
}

main().catch((error) => {
  console.error("An error occurred:", error);
});

module.exports = { main };
