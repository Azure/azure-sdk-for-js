// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with file searching from the Azure Agents service.
 *
 * @summary This sample demonstrates how to use agent operations with file searching.
 */

import type { MessageContent, MessageImageFileContent, MessageTextContent } from "@azure/ai-agents";
import { AgentsClient, isOutputOfType, ToolUtility } from "@azure/ai-agents";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";

import * as fs from "fs";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project connection string>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Upload file
  const filePath = "./data/sampleFileForUpload.txt";
  const localFileStream = fs.createReadStream(filePath);
  const file = await client.files.upload(localFileStream, "assistants", {
    fileName: "sampleFileForUpload.txt",
  });
  console.log(`Uploaded file, file ID: ${file.id}`);

  // Create vector store
  const vectorStore = await client.vectorStores.create({
    fileIds: [file.id],
    name: "myVectorStore",
  });
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // Initialize file search tool
  const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);

  // Create agent with files
  const agent = await client.createAgent(modelDeploymentName, {
    name: "SDK Test Agent - Retrieval",
    instructions: "You are helpful agent that can help fetch data from files you know about.",
    tools: [fileSearchTool.definition],
    toolResources: fileSearchTool.resources,
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message
  const message = await client.messages.create(
    thread.id,
    "user",
    "Can you give me the documented codes for 'banana' and 'orange'?",
  );
  console.log(`Created message, message ID: ${message.id}`);

  // Create run
  let run = await client.runs.create(thread.id, agent.id);
  while (["queued", "in_progress"].includes(run.status)) {
    await delay(500);
    run = await client.runs.get(thread.id, run.id);
    console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);
  }

  console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);
  const messages = await client.messages.list(thread.id);
  for await (const threadMessage of messages) {
    console.log(
      `Thread Message Created at  - ${threadMessage.createdAt} - Role - ${threadMessage.role}`,
    );
    threadMessage.content.forEach((content: MessageContent) => {
      if (isOutputOfType<MessageTextContent>(content, "text")) {
        const textContent = content as MessageTextContent;
        console.log(`Text Message Content - ${textContent.text.value}`);
      } else if (isOutputOfType<MessageImageFileContent>(content, "image_file")) {
        const imageContent = content as MessageImageFileContent;
        console.log(`Image Message Content - ${imageContent.imageFile.fileId}`);
      }
    });
  }

  // Delete agent
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
