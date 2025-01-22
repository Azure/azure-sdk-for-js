// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with file searching from the Azure Agents service.
 *
 * @summary This sample demonstrates how to use agent operations with file searching.
 *
 */

import type {
  MessageContentOutput,
  MessageImageFileContentOutput,
  MessageTextContentOutput,
} from "@azure/ai-projects";
import { AIProjectsClient, isOutputOfType, ToolUtility } from "@azure/ai-projects";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
import * as fs from "fs";
import path from "node:path";
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Upload file
  const filePath = path.resolve(__dirname, "../data/sampleFileForUpload.txt");
  const localFileStream = fs.createReadStream(filePath);
  const file = await client.agents.uploadFile(localFileStream, "assistants", {
    fileName: "sampleFileForUpload.txt",
  });
  console.log(`Uploaded file, file ID: ${file.id}`);

  // Create vector store
  const vectorStore = await client.agents.createVectorStore({
    fileIds: [file.id],
    name: "myVectorStore",
  });
  console.log(`Created vector store, vector store ID: ${vectorStore.id}`);

  // Initialize file search tool
  const fileSearchTool = ToolUtility.createFileSearchTool([vectorStore.id]);

  // Create agent with files
  const agent = await client.agents.createAgent("gpt-4o", {
    name: "SDK Test Agent - Retrieval",
    instructions: "You are helpful agent that can help fetch data from files you know about.",
    tools: [fileSearchTool.definition],
    toolResources: fileSearchTool.resources,
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread
  const thread = await client.agents.createThread();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message
  const message = await client.agents.createMessage(thread.id, {
    role: "user",
    content: "Can you give me the documented codes for 'banana' and 'orange'?",
  });
  console.log(`Created message, message ID: ${message.id}`);

  // Create run
  let run = await client.agents.createRun(thread.id, agent.id);
  while (["queued", "in_progress"].includes(run.status)) {
    await delay(500);
    run = await client.agents.getRun(thread.id, run.id);
    console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);
  }

  console.log(`Current Run status - ${run.status}, run ID: ${run.id}`);
  const messages = await client.agents.listMessages(thread.id);
  await messages.data.forEach((threadMessage) => {
    console.log(
      `Thread Message Created at  - ${threadMessage.createdAt} - Role - ${threadMessage.role}`,
    );
    threadMessage.content.forEach((content: MessageContentOutput) => {
      if (isOutputOfType<MessageTextContentOutput>(content, "text")) {
        const textContent = content as MessageTextContentOutput;
        console.log(`Text Message Content - ${textContent.text.value}`);
      } else if (isOutputOfType<MessageImageFileContentOutput>(content, "image_file")) {
        const imageContent = content as MessageImageFileContentOutput;
        console.log(`Image Message Content - ${imageContent.imageFile.fileId}`);
      }
    });
  });

  // Delete agent
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
