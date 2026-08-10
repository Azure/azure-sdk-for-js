// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run Prompt Agent operations using the File
 * Search Tool with structured inputs.
 *
 * It is intentionally very similar to `agentFileSearch.ts`, but shows how to use
 * structured inputs to pass a vector store id and file id at runtime. The key
 * idea is that a structured input acts as a placeholder in the tool definition
 * and is later bound to actual data in the response call.
 *
 * @summary Demonstrates a file search agent whose vector store id and file id
 * are supplied at runtime via structured inputs.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

async function main() {
  // Load the file to be indexed for search
  const assetFilePath = path.join(__dirname, "../assets/product_info.md");

  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create vector store for file search
  console.log("Creating vector store...");
  const vectorStore = await openAIClient.vectorStores.create({ name: "ProductInfoStore" });
  console.log(`Vector store created (id: ${vectorStore.id})`);

  let agent;
  try {
    // Upload file to vector store
    console.log("\nUploading file to vector store...");
    const fileStream = fs.createReadStream(assetFilePath);
    const file = await openAIClient.vectorStores.files.uploadAndPoll(vectorStore.id, fileStream);
    console.log(`File uploaded to vector store (id: ${file.id})`);

    // Tool resources are templated and resolved at runtime via structured inputs.
    const structuredInputs = {
      vector_store_id: {
        description: "Vector store id used by the file_search tool",
        required: true,
        schema: { type: "string" },
      },
      vector_store_file_id: {
        description: "File id uploaded into the vector store",
        required: true,
        schema: { type: "string" },
      },
    };

    // Create agent with file search tool
    console.log("\nCreating agent with file search tool...");
    agent = await project.agents.createVersion(
      agentName,
      {
        kind: "prompt",
        model: deploymentName,
        instructions:
          "You are a helpful assistant that can search through product information. " +
          "The indexed source file id is {{vector_store_file_id}}.",
        tools: [{ type: "file_search", vector_store_ids: ["{{vector_store_id}}"] }],
        structured_inputs: structuredInputs,
      },
      { description: "File search agent for product information queries." },
    );
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Create a conversation for the agent interaction
    const conversation = await openAIClient.conversations.create();
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send a query to search through the uploaded file, binding the structured
    // inputs to the created vector store and file ids.
    const response = await openAIClient.responses.create(
      {
        conversation: conversation.id,
        input: "Tell me about Contoso products",
      },
      {
        body: {
          agent_reference: { name: agent.name, type: "agent_reference" },
          structured_inputs: { vector_store_id: vectorStore.id, vector_store_file_id: file.id },
        },
      },
    );
    console.log(`Agent response: ${response.output_text}`);

    await openAIClient.conversations.delete(conversation.id);
    console.log("Conversation deleted");
  } finally {
    console.log("\nCleaning up...");
    if (agent) {
      await project.agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    }

    await openAIClient.vectorStores.delete(vectorStore.id);
    console.log("Vector store deleted");
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
