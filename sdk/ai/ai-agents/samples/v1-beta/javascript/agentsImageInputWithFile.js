// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use basic agent operations using image file input for the
 * Azure Agents service.
 */

const { AgentsClient } = require("@azure/ai-agents");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("fs");

// Load environment variables
const projectEndpoint = process.env.PROJECT_ENDPOINT || "<connection-string>";
const modelDeployment = process.env.MODEL_DEPLOYMENT_NAME || "<model-deployment-name>";
const imagePath = "./data/image_file.png";

async function main() {
  console.log("== AI Projects Agent with Image Input Sample ==");

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

  // Upload an image file
  console.log("Uploading image file...");
  const fileStream = fs.createReadStream(imagePath);
  const imageFile = await client.files.upload(fileStream, "assistants", {
    fileName: "image_file.png",
  });
  console.log(`Uploaded file, file ID: ${imageFile.id}`);

  // Create a message with both text and image content
  console.log("Creating message with image content...");
  const inputMessage = "Hello, what is in the image?";
  const content = [
    {
      type: "text",
      text: inputMessage,
    },
    {
      type: "image_file",
      imageFile: {
        fileId: imageFile.id,
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
  const messages = await client.messages.list(thread.id, {
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
