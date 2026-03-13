// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run basic Prompt Agent operations
 * using the AIProjectClient, while defining a desired JSON schema
 * for the response ("structured output").
 *
 * The Responses and Conversations calls in this sample are made using
 * the OpenAI client. See https://platform.openai.com/docs/api-reference
 * for more information.
 *
 * This sample is inspired by the OpenAI example here:
 * https://platform.openai.com/docs/guides/structured-outputs/supported-schemas
 *
 * @summary This sample demonstrates how to create an agent with structured output,
 * create a conversation, generate responses using the agent, and clean up resources.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  // Create agent with structured output configuration
  console.log("Creating agent...");
  // Define the JSON schema for calendar events
  const calendarEventSchema = {
    type: "object",
    properties: {
      name: { type: "string" },
      date: { type: "string", description: "Date in YYYY-MM-DD format" },
      participants: { type: "array", items: { type: "string" } },
    },
    required: ["name", "date", "participants"],
    additionalProperties: false,
  };

  const agent = await project.agents.createVersion("my-agent-structured-output", {
    kind: "prompt",
    model: deploymentName,
    text: {
      format: {
        type: "json_schema",
        name: "CalendarEvent",
        schema: calendarEventSchema,
      },
    },
    instructions: `
      You are a helpful assistant that extracts calendar event information from the input user messages,
      and returns it in the desired structured output format.
    `,
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create conversation with initial user message
  console.log("\nCreating conversation with initial user message...");
  const conversation = await openAIClient.conversations.create({
    items: [
      {
        type: "message",
        role: "user",
        content: "Alice and Bob are going to a science fair this Friday, November 7, 2025.",
      },
    ],
  });
  console.log(`Created conversation with initial user message (id: ${conversation.id})`);

  // Generate response using the agent
  console.log("\nGenerating response...");
  const response = await openAIClient.responses.create(
    {
      conversation: conversation.id,
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response output: ${response.output_text}`);

  // Clean up
  console.log("\nCleaning up resources...");
  await openAIClient.conversations.delete(conversation.id);
  console.log("Conversation deleted");

  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
