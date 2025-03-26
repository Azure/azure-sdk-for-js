// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with file searching from the Azure Agents service.
 *
 * @summary This sample demonstrates how to use agent operations with file searching.
 *
 */

import type {
  MessageContent,
  MessageImageFileContent,
  MessageTextContent,
} from "@azure/ai-projects";
import { AIProjectClient, isOutputOfType, ToolUtility } from "@azure/ai-projects";
import { delay } from "@azure/core-util";
import { DefaultAzureCredential } from "@azure/identity";

import * as dotenv from "dotenv";
import * as fs from "fs";
import path from "node:path";
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

export async function main(): Promise<void> {
  const client = AIProjectClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Upload file
  const filePath = path.resolve(__dirname, "../data/sampleFileForUpload.txt");
  const localFileBuffer = fs.readFileSync(filePath);
  const file = await client.agents.uploadFile(localFileBuffer, "assistants", {
    filename: "sampleFileForUpload.txt",
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
    threadMessage.content.forEach((content: MessageContent) => {
      if (isOutputOfType<MessageTextContent>(content, "text")) {
        const textContent = content as MessageTextContent;
        console.log(`Text Message Content - ${textContent.text.value}`);
      } else if (isOutputOfType<MessageImageFileContent>(content, "image_file")) {
        const imageContent = content as MessageImageFileContent;
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
