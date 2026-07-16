// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run basic Prompt Agent operations
 * using the AIProjectClient.
 *
 * @summary This sample demonstrates how to create an agent, create a conversation,
 * generate responses using the agent, and clean up resources.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  let createdVersion;
  let originalAgentEndpoint;
  let originalAgentEndpointLoaded = false;

  try {
    // Create agent
    console.log("Creating agent...");
    createdVersion = await project.agents.createVersion(agentName, {
      kind: "prompt",
      model: deploymentName,
      instructions: "You are a helpful assistant that answers general questions",
    });
    console.log(
      `Agent created (id: ${createdVersion.id}, name: ${createdVersion.name}, version: ${createdVersion.version})`,
    );

    originalAgentEndpoint = (await project.agents.get(agentName)).agent_endpoint;
    originalAgentEndpointLoaded = true;
    await project.agents.updateAgent(agentName, {
      agentEndpoint: {
        version_selector: {
          version_selection_rules: [
            {
              type: "FixedRatio",
              agent_version: createdVersion.version,
              traffic_percentage: 100,
            },
          ],
        },
        protocol_configuration: { responses: {} },
      },
    });
    console.log(`Agent endpoint configured for version ${createdVersion.version}`);

    const openAIClient = project.getOpenAIClient({
      azureConfig: { allowPreview: true, agentName },
    });

    // Create conversation with initial user message
    console.log("\nCreating conversation with initial user message...");
    const conversation = await openAIClient.conversations.create({
      items: [
        { type: "message", role: "user", content: "What is the size of France in square miles?" },
      ],
    });
    console.log(`Created conversation with initial user message (id: ${conversation.id})`);

    // Generate response using the agent
    console.log("\nGenerating response...");
    const franceResponse = await openAIClient.responses.create({
      conversation: conversation.id,
    });
    console.log(`Response output: ${franceResponse.output_text}`);

    // Add a second user message to the conversation
    console.log("\nAdding a second user message to the conversation...");
    await openAIClient.conversations.items.create(conversation.id, {
      items: [{ type: "message", role: "user", content: "And what is the capital city?" }],
    });
    console.log("Added a second user message to the conversation");

    // Generate second response
    console.log("\nGenerating second response...");
    const capitalResponse = await openAIClient.responses.create({
      conversation: conversation.id,
    });
    console.log(`Response output: ${capitalResponse.output_text}`);

    // Clean up
    console.log("\nCleaning up resources...");
    await openAIClient.conversations.delete(conversation.id);
    console.log("Conversation deleted");
  } finally {
    try {
      if (originalAgentEndpointLoaded) {
        // JSON Merge Patch requires null to remove fields added by this sample.
        const clearAgentEndpointOptions = {};
        Object.assign(clearAgentEndpointOptions, { agentEndpoint: null });
        await project.agents.patchAgentObject(agentName, clearAgentEndpointOptions);
        if (originalAgentEndpoint) {
          await project.agents.patchAgentObject(agentName, {
            agentEndpoint: originalAgentEndpoint,
          });
        }
      }
    } finally {
      if (createdVersion) {
        await project.agents.deleteVersion(agentName, createdVersion.version, { force: true });
      }
    }
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
