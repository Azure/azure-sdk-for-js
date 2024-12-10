// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectsClient, ToolSet } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

const connectionString = process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<endpoint>>;<subscription>;<resource group>;<project>";

export async function main(): Promise<void> {
  const client = AIProjectsClient.fromConnectionString(connectionString || "", new DefaultAzureCredential());

  // Upload file for code interpreter tool
  const fileStream1 = fs.createReadStream("samples-dev/agents/nifty_500_quarterly_results.csv");
  const codeInterpreterFile = await client.agents.uploadFile(fileStream1, "assistants", "my-local-file");

  console.log(`Uploaded local file, file ID : ${codeInterpreterFile.id}`);

  // Upload file for file search tool
  const fileStream2 = fs.createReadStream("./samples-dev/agents/sample_file_for_upload.txt");
  const fileSearchFile = await client.agents.uploadFile(fileStream2, "assistants", "sample_file_for_upload.txt");
  console.log(`Uploaded file, ID: ${fileSearchFile.id}`);

  // Create vector store for file search tool
  const vectorStore = await client.agents.createVectorStoreAndPoll({file_ids: [fileSearchFile.id]});

  // Create tool set
  const toolSet = new ToolSet();
  toolSet.addFileSearchTool([vectorStore.id]);
  toolSet.addCodeInterpreterTool([codeInterpreterFile.id]);

  // Create agent with tool set
  const agent = await client.agents.createAgent("gpt-4o", {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: toolSet.toolDefinitions,
    tool_resources: toolSet.toolResources
  });
  console.log(`Created agent, agent ID: ${agent.id}`);

  // Create threads, messages, and runs to interact with agent as desired

  // Delete agent
  await client.agents.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
