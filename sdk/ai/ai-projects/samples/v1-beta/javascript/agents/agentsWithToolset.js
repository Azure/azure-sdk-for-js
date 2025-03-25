// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with toolset and iteration in streaming
 * from the Azure Agents service.
 *
 * @summary demonstrates how to use agent operations with toolset.
 */

const { AIProjectsClient, ToolSet } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("fs");

require("dotenv/config");

const connectionString =
  process.env["AZURE_AI_PROJECTS_CONNECTION_STRING"] || "<project connection string>";

async function main() {
  const client = AIProjectsClient.fromConnectionString(
    connectionString || "",
    new DefaultAzureCredential(),
  );

  // Upload file for code interpreter tool
  const filePath1 = "./data/nifty500QuarterlyResults.csv";
  const fileStream1 = fs.createReadStream(filePath1);
  const codeInterpreterFile = await client.agents.uploadFile(fileStream1, "assistants", {
    fileName: "myLocalFile",
  });

  console.log(`Uploaded local file, file ID : ${codeInterpreterFile.id}`);

  // Upload file for file search tool
  const filePath2 = "./data/sampleFileForUpload.txt";
  const fileStream2 = fs.createReadStream(filePath2);
  const fileSearchFile = await client.agents.uploadFile(fileStream2, "assistants", {
    fileName: "sampleFileForUpload.txt",
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
