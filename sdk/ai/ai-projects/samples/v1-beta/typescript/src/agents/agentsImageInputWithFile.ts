// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary This sample demonstrates how to use basic agent operations using image file input for the
 * Azure Agents service.
 */

import { AIProjectsClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import * as fs from "fs";

// Load environment variables
const connectionString = process.env.AZURE_AI_PROJECTS_CONNECTION_STRING || "<connection-string>";
const modelDeployment = process.env.MODEL_DEPLOYMENT_NAME || "<model-deployment-name>";
const imagePath = "./data/image_file.png";

export async function main(): Promise<void> {
  console.log("== AI Projects Agent with Image Input Sample ==");

  // Create the client
  const client = AIProjectsClient.fromConnectionString(
    connectionString,
    new DefaultAzureCredential(),
  );

  // Create an agent
  console.log(`Creating agent with model ${modelDeployment}...`);
  const agent = await client.agents.createAgent(modelDeployment, {
    name: "my-agent",
    instructions: "You are helpful agent",
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create a thread
  console.log("Creating thread...");
  const thread = await client.agents.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Upload an image file
  console.log("Uploading image file...");
  const fileStream = fs.createReadStream(imagePath);
  const imageFile = await client.agents.uploadFile(fileStream, "assistants", {
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
      image_file: {
        file_id: imageFile.id,
        detail: "high",
      },
    },
  ];
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: content,
  });
  console.log(`Created message, message ID: ${message.id}`);

  // Create and poll a run
  console.log("Creating run...");
  let run = await client.agents.createRun(thread.id, agent.id);

  // Poll the run as long as run status is queued or in progress
  while (
    run.status === "queued" ||
    run.status === "in_progress" ||
    run.status === "requires_action"
  ) {
    // Wait for a second
    console.log(`Run status: ${run.status}, waiting...`);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    run = await client.agents.getRun(thread.id, run.id);
  }
  console.log(`Run complete with status: ${run.status}`);

  // Delete the agent
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);

  // List messages
  const messages = await client.agents.listMessages(thread.id, {
    order: "asc",
  });

  for (const dataPoint of messages.data) {
    const textContent = dataPoint.content.find((item) => item.type === "text");
    if (textContent && "text" in textContent) {
      console.log(`${dataPoint.role}: ${textContent.text.value}`);
    }
  }

  console.log("Messages: ", messages);
}

main().catch((error) => {
  console.error("An error occurred:", error);
});
