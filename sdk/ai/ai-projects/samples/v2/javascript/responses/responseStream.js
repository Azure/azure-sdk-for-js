// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to stream through responses using the
 * responses.stream method that returns a responses stream manager.
 *
 * @summary This sample demonstrates how to create a non-streaming response
 * and then use streaming for a follow-up response with conversation context.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

async function main() {
  // Create OpenAI client with Azure credentials
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // First, create a non-streaming response
  console.log("Creating initial response...");
  const response = await openAIClient.responses.create({
    model: deploymentName,
    input: "What is the size of France in square miles?",
    stream: false,
  });

  console.log(`Initial response: ${response.output_text}`);
  console.log(`Response ID: ${response.id}`);

  // Now create a streaming response using the conversation context from the previous response
  console.log("\nCreating streaming response with conversation context...");
  const stream = openAIClient.responses.stream({
    model: deploymentName,
    input: "Now tell me about the capital city of France.",
    previous_response_id: response.id, // Continue the conversation
  });

  // Process streaming events as they arrive
  for await (const event of stream) {
    // Handle different event types
    if (event.type === "response.created") {
      console.log(`\nStream response created with ID: ${event.response.id}`);
    } else if (event.type === "response.output_text.delta") {
      // Print delta text as it arrives (without newlines to show streaming effect)
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_text.done") {
      console.log(`\n\nResponse done with full text: ${event.text}`);
    } else if (event.type === "response.completed") {
      console.log(`Response completed with full message: ${event.response.output_text}`);
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
