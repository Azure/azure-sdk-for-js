// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to add conversational memory to an agent by using the
 * Memory Search tool. The agent stores memories in a memory store and can recall them
 * in later conversations.
 *
 * @summary Create an agent with Memory Search, capture memories from a conversation,
 * and retrieve them in a new conversation.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const agentModelDeployment =
  process.env["MODEL_DEPLOYMENT_NAME"] || "<agent model deployment name>";
const chatModelDeployment =
  process.env["AZURE_AI_CHAT_MODEL_DEPLOYMENT_NAME"] || "<memory chat model deployment name>";
const embeddingModelDeployment =
  process.env["AZURE_AI_EMBEDDING_MODEL_DEPLOYMENT_NAME"] ||
  "<memory embedding model deployment name>";

const memoryStoreName = "my_memory_store_123";
const scope = "user_123";

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  let conversationId;
  let followUpConversationId;
  let agentVersion;

  try {
    // Clean up an existing memory store if it already exists
    try {
      await project.beta.memoryStores.delete(memoryStoreName);
      console.log(`Memory store '${memoryStoreName}' deleted`);
    } catch (error) {
      if (error?.statusCode !== 404) {
        throw error;
      }
    }

    // Create a memory store with chat and embedding models
    const memoryStore = await project.beta.memoryStores.create(
      memoryStoreName,
      {
        kind: "default",
        chat_model: chatModelDeployment,
        embedding_model: embeddingModelDeployment,
        options: {
          user_profile_enabled: true,
          chat_summary_enabled: true,
        },
      },
      {
        description: "Memory store for agent conversations",
      },
    );
    console.log(
      `Created memory store: ${memoryStore.name} (${memoryStore.id}) using chat model '${chatModelDeployment}'`,
    );

    // Configure Memory Search tool to attach to the agent
    const memorySearchTool = {
      type: "memory_search_preview",
      memory_store_name: memoryStore.name,
      scope,
      update_delay: 1, // wait briefly after conversation inactivity before updating memories
    };

    // Create an agent that will use the Memory Search tool
    const agent = await project.agents.createVersion("MemorySearchAgent", {
      kind: "prompt",
      model: agentModelDeployment,
      instructions:
        "You are a helpful assistant that remembers user preferences using the memory search tool.",
      tools: [memorySearchTool],
    });
    agentVersion = {
      name: agent.name,
      version: agent.version,
    };
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Start a conversation and provide details the agent should remember
    const conversation = await openAIClient.conversations.create();
    conversationId = conversation.id;
    console.log(`Conversation started (${conversation.id}). Sending a message to seed memories...`);

    const firstResponse = await openAIClient.responses.create(
      {
        input: "I prefer dark roast coffee and usually drink it in the morning.",
        conversation: conversation.id,
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    console.log(`Initial response: ${firstResponse.output_text}`);

    // Allow time for the memory store to update from this conversation
    console.log("Waiting for the memory store to capture the new memory...");
    await delay(60000);

    // Create a follow-up conversation and ask the agent to recall the stored memory
    const followUpConversation = await openAIClient.conversations.create();
    followUpConversationId = followUpConversation.id;
    console.log(`Follow-up conversation started (${followUpConversation.id}).`);

    const followUpResponse = await openAIClient.responses.create(
      {
        input: "Can you remind me of my usual coffee order?",
        conversation: followUpConversation.id,
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    console.log(`Follow-up response: ${followUpResponse.output_text}`);
  } finally {
    console.log("\nCleaning up resources...");
    if (conversationId) {
      await openAIClient.conversations.delete(conversationId);
      console.log(`Conversation ${conversationId} deleted`);
    }
    if (followUpConversationId) {
      await openAIClient.conversations.delete(followUpConversationId);
      console.log(`Conversation ${followUpConversationId} deleted`);
    }
    if (agentVersion) {
      await project.agents.deleteVersion(agentVersion.name, agentVersion.version);
      console.log("Agent deleted");
    }
    try {
      await project.beta.memoryStores.delete(memoryStoreName);
      console.log("Memory store deleted");
    } catch (error) {
      if (error?.statusCode !== 404) {
        throw error;
      }
    }
  }

  console.log("\nMemory Search agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
