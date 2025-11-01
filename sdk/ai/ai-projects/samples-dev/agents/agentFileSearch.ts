// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the File Search Tool with streaming responses.
 * It combines file search capabilities with response streaming to provide real-time
 * search results from uploaded documents.
 *
 * @summary This sample demonstrates how to create an agent with file search capabilities,
 * upload documents to a vector store, and stream responses that include file search results.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetFilePath = path.resolve(__dirname, "assets", "product_info.md");

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  console.log("Setting up file search with streaming responses...");

  // Create vector store for file search
  const vectorStore = await openAIClient.vectorStores.create({
    name: "ProductInfoStreamStore",
  });
  console.log(`Vector store created (id: ${vectorStore.id})`);

  // Upload file to vector store
  try {
    const fileStream = fs.createReadStream(assetFilePath);
    const uploadedFile = await openAIClient.vectorStores.files.uploadAndPoll(
      vectorStore.id,
      fileStream,
    );
    console.log(`File uploaded to vector store (id: ${uploadedFile.id})`);
    console.log("File processing completed");
  } catch (error: any) {
    console.log(`Warning: Could not upload file at ${assetFilePath}`);
    console.log(`Error: ${error.message}`);
    console.log("Creating vector store without file for demonstration...");
  }

  // Create agent with file search tool
  const agent = await project.agents.createVersion("StreamingFileSearchAgent", {
    kind: "prompt",
    model: modelDeploymentName,
    instructions:
      "You are a helpful assistant that can search through product information and provide detailed responses. Use the file search tool to find relevant information before answering.",
    tools: [
      {
        type: "file_search",
        vectorStoreIds: [vectorStore.id],
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create a conversation for the agent interaction
  const conversation = await openAIClient.conversations.create();
  console.log(`Created conversation (id: ${conversation.id})`);

  console.log("\n" + "=".repeat(60));
  console.log("Starting file search with streaming response...");
  console.log("=".repeat(60));

  // Create a streaming response with file search capabilities
  const stream = openAIClient.responses.stream(
    {
      model: modelDeploymentName,
      conversation: conversation.id,
      input: [
        {
          role: "user",
          content:
            "Tell me about Contoso products and their features in detail. Please search through the available documentation.",
          type: "message",
        },
      ],
      tools: [{ type: "file_search", vector_store_ids: [vectorStore.id] }],
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  console.log("Processing streaming file search results...\n");

  // Process streaming events as they arrive
  for await (const event of stream) {
    if (event.type === "response.created") {
      console.log(`Stream response created with ID: ${event.response.id}`);
    } else if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_text.done") {
      console.log(`\n\nResponse done with full message: ${event.text}`);
    } else if (event.type === "response.completed") {
      console.log(`\nResponse completed!`);
      console.log(`Full response: ${event.response.output_text}`);
    }
  }

  console.log("\n" + "=".repeat(60));
  console.log("Demonstrating follow-up query with streaming...");
  console.log("=".repeat(60));

  // Demonstrate a follow-up query in the same conversation
  const followUpStream = openAIClient.responses.stream(
    {
      model: modelDeploymentName,
      conversation: conversation.id,
      input: [
        {
          role: "user",
          content: "Can you provide more specific details about pricing and availability?",
          type: "message",
        },
      ],
      tools: [{ type: "file_search", vector_store_ids: [vectorStore.id] }],
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  console.log("Processing follow-up streaming response...\n");

  // Process streaming events for the follow-up
  for await (const event of followUpStream) {
    if (event.type === "response.created") {
      console.log(`Follow-up response created with ID: ${event.response.id}`);
    } else if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_text.done") {
      console.log(`\n\nFollow-up response done!`);
    } else if (event.type === "response.completed") {
      console.log(`\nFollow-up completed!`);
      console.log(`Full response: ${event.response.output_text}`);
    }
  }

  // Clean up resources
  console.log("\n" + "=".repeat(60));
  console.log("Cleaning up resources...");
  console.log("=".repeat(60));

  // Delete the conversation
  await openAIClient.conversations.delete(conversation.id);
  console.log("Conversation deleted");

  // Delete the agent
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  // Clean up vector store
  try {
    await openAIClient.vectorStores.delete(vectorStore.id);
    console.log("Vector store deleted");
  } catch (error: any) {
    console.log(`Warning: Could not delete vector store: ${error.message}`);
  }

  console.log("\nFile search streaming sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
