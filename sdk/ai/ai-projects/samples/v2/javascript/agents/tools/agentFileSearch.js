// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run Prompt Agent operations using the File Search Tool.
 *
 * @summary This sample demonstrates how to create a vector store, upload a file,
 * create an agent with file search capabilities, generate responses, and clean up resources.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

async function main() {
  // Load the file to be indexed for search
  const assetFilePath = path.join(__dirname, "../assets/product_info.md");

  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create vector store for file search
  console.log("Creating vector store...");
  const vectorStore = await openAIClient.vectorStores.create({
    name: "ProductInfoStore",
  });
  console.log(`Vector store created (id: ${vectorStore.id})`);

  // Upload file to vector store
  console.log("\nUploading file to vector store...");
  const fileStream = fs.createReadStream(assetFilePath);
  const file = await openAIClient.vectorStores.files.uploadAndPoll(vectorStore.id, fileStream);
  console.log(`File uploaded to vector store (id: ${file.id})`);

  // Create agent with file search tool
  console.log("\nCreating agent with file search tool...");
  const agent = await project.agents.createVersion("agent-file-search", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that can search through product information.",
    tools: [
      {
        type: "file_search",
        vector_store_ids: [vectorStore.id],
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create a conversation for the agent interaction
  console.log("\nCreating conversation...");
  const conversation = await openAIClient.conversations.create();
  console.log(`Created conversation (id: ${conversation.id})`);

  // Send a query to search through the uploaded file
  console.log("\nGenerating response...");
  const response = await openAIClient.responses.create(
    {
      conversation: conversation.id,
      input: "Tell me about Contoso products",
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response: ${response.output_text}`);

  // Clean up
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  await openAIClient.vectorStores.delete(vectorStore.id);
  console.log("Vector store deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
