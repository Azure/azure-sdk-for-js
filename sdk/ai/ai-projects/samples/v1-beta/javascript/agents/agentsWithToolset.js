// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with toolset and iteration in streaming
 * from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with toolset.
 */

const { AIProjectClient, ToolSet } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("node:path");
const { fileURLToPath } = require("node:url");

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

async function main() {
  const client = AIProjectClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Upload file for code interpreter tool
  const filePath1 = path.resolve(__dirname, "../data/nifty500QuarterlyResults.csv");
  const fileBuffer1 = fs.readFileSync(filePath1);
  const codeInterpreterFile = await client.agents.uploadFile(fileBuffer1, "assistants", {
    filename: "myLocalFile",
  });

  console.log(`Uploaded local file, file ID : ${codeInterpreterFile.id}`);

  // Upload file for file search tool
  const filePath2 = path.resolve(__dirname, "../data/sampleFileForUpload.txt");
  const fileBuffer2 = fs.readFileSync(filePath2);
  const fileSearchFile = await client.agents.uploadFile(fileBuffer2, "assistants", {
    filename: "sampleFileForUpload.txt",
  });
  console.log(`Uploaded file, file ID: ${fileSearchFile.id}`);

  // Create vector store for file search tool
  const vectorStore = await client.agents
    .createVectorStoreAndPoll({
      fileIds: [fileSearchFile.id],
    })
    .pollUntilDone();

  // Create tool set
  const toolSet = new ToolSet();
  await toolSet.addFileSearchTool([vectorStore.id]);
  await toolSet.addCodeInterpreterTool([codeInterpreterFile.id]);

  // Create agent with tool set
  const agent = await client.agents.createAgent("gpt-4o", {
    name: "my-agent",
    instructions: "You are a helpful agent",
    tools: toolSet.toolDefinitions,
    toolResources: toolSet.toolResources,
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

module.exports = { main };
