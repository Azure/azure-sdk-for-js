// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";
import type {
  MemoryStoreDefaultDefinition,
  MemoryStoreDefaultOptions,
  MemorySearchPreviewTool,
} from "../../../src/index.js";

describe("agents - memory search tool", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;
  let openAIClient: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
    openAIClient = projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create memory store and agent with memory search tool", async function () {
    const chatModelDeployment = assertEnvironmentVariable(
      "MEMORY_STORE_CHAT_MODEL_DEPLOYMENT_NAME",
    );
    const embeddingModelDeployment = assertEnvironmentVariable(
      "MEMORY_STORE_EMBEDDING_MODEL_DEPLOYMENT_NAME",
    );

    const memoryStoreName = "my-memory-store-test";
    const scope = "user_test_123";

    // Clean up existing memory store if present
    try {
      await projectsClient.beta.memoryStores.delete(memoryStoreName);
      console.log(`Deleted existing memory store '${memoryStoreName}'`);
    } catch (error: any) {
      if (error?.statusCode !== 404) {
        throw error;
      }
    }

    // Create a memory store
    const memoryStore = await projectsClient.beta.memoryStores.create(
      memoryStoreName,
      {
        kind: "default",
        chat_model: chatModelDeployment,
        embedding_model: embeddingModelDeployment,
        options: {
          user_profile_enabled: true,
          chat_summary_enabled: true,
        } satisfies MemoryStoreDefaultOptions,
      } satisfies MemoryStoreDefaultDefinition,
      {
        description: "Memory store for agent conversations",
      },
    );

    assert.isNotNull(memoryStore);
    assert.equal(memoryStore.name, memoryStoreName);
    console.log(`Created memory store: ${memoryStore.name} (${memoryStore.id})`);

    // Configure Memory Search tool
    const memorySearchTool: MemorySearchPreviewTool = {
      type: "memory_search_preview",
      memory_store_name: memoryStore.name,
      scope,
      update_delay: 1,
    };

    // Create agent with memory search tool
    const agent = await agents.createVersion("MemorySearchAgent", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions:
        "You are a helpful assistant that remembers user preferences using the memory search tool.",
      tools: [memorySearchTool],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "MemorySearchAgent");
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Start a conversation and provide details the agent should remember
    const conversation = await openAIClient.conversations.create();
    assert.isNotNull(conversation.id);
    console.log(`Conversation started (${conversation.id})`);

    const firstResponse = await openAIClient.responses.create(
      {
        input: "I prefer dark roast coffee and usually drink it in the morning.",
        conversation: conversation.id,
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );

    assert.isNotNull(firstResponse);
    assert.isNotNull(firstResponse.output_text);
    console.log(`Initial response: ${firstResponse.output_text}`);

    // Clean up
    await openAIClient.conversations.delete(conversation.id);
    console.log("Conversation deleted");

    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");

    await projectsClient.beta.memoryStores.delete(memoryStoreName);
    console.log("Memory store deleted");
  });
});
