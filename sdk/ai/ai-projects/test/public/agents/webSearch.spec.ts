// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

const agentName = "web-search-agent";
const agentInstructions = "You are a helpful assistant that can search the web";

/**
 * Define Web Search tool configuration
 */
const webSearchTool = {
  type: "web_search_preview" as const,
  user_location: {
    type: "approximate" as const,
    country: "GB",
    city: "London",
    region: "London",
  },
};

describe("agents - web search - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let agents: AgentsOperations;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    agents = projectsClient.agents;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it.skipIf(!isLiveMode())("should create agent with Web Search tool", async () => {
    const agent = await agents.createVersion(agentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
      tools: [webSearchTool],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, agentName);
    console.log(`Created agent with Web Search tool, agent ID: ${agent.id}`);

    const deleted = await agents.delete(agent.name);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent name: ${agent.name}`);
  });
});

describe("agents - web search - execution flow", () => {
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

  it.skipIf(!isLiveMode())("should execute Web Search query and return result", async function () {
    // Create agent with Web Search tool
    const agent = await agents.createVersion(agentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
      tools: [webSearchTool],
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.isNotNull(agent.name);
    assert.isNotNull(agent.version);
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Send a query that should trigger Web Search
    const response = await openAIClient.responses.create(
      {
        input: [
          {
            type: "message",
            role: "user",
            content: "What is the current weather in London?",
          },
        ],
      },
      {
        body: {
          agent: { name: agent.name, type: "agent_reference" },
          tool_choice: "required",
        },
      },
    );

    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(`Response output: ${response.output_text}`);

    // Clean up
    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });

  it.skipIf(!isLiveMode())(
    "should handle Web Search query with streaming response",
    async function () {
      // Create agent with Web Search tool
      const agent = await agents.createVersion(agentName, {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: agentInstructions,
        tools: [webSearchTool],
      });
      assert.isNotNull(agent);
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );

      // Send a streaming query
      const streamResponse = await openAIClient.responses.create(
        {
          input: "Show me the latest London Underground service updates",
          stream: true,
        },
        {
          body: {
            agent: { name: agent.name, type: "agent_reference" },
            tool_choice: "required",
          },
        },
      );

      let responseText = "";
      let responseCreated = false;
      let responseCompleted = false;

      // Process the streaming response
      for await (const event of streamResponse) {
        if (event.type === "response.created") {
          responseCreated = true;
          console.log(`Response created with ID: ${event.response.id}`);
        } else if (event.type === "response.output_text.delta") {
          responseText += event.delta;
        } else if (event.type === "response.completed") {
          responseCompleted = true;
          console.log("Response completed!");
        }
      }

      assert.isTrue(responseCreated, "Expected response.created event");
      assert.isTrue(responseCompleted, "Expected response.completed event");
      assert.isNotEmpty(responseText, "Expected response text from streaming");
      console.log(`Streaming response text: ${responseText}`);

      // Clean up
      await agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    },
  );

  it.skipIf(!isLiveMode())(
    "should handle Web Search query in conversation context",
    async function () {
      // Create agent with Web Search tool
      const agent = await agents.createVersion(agentName, {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: agentInstructions,
        tools: [webSearchTool],
      });
      assert.isNotNull(agent);
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );

      // Create conversation with initial user message
      const conversation = await openAIClient.conversations.create({
        items: [
          {
            type: "message",
            role: "user",
            content: "What are the latest news headlines today?",
          },
        ],
      });
      assert.isNotNull(conversation);
      assert.isNotNull(conversation.id);
      console.log(`Created conversation (id: ${conversation.id})`);

      // Generate response using the agent
      const response = await openAIClient.responses.create(
        {
          conversation: conversation.id,
        },
        {
          body: {
            agent: { name: agent.name, type: "agent_reference" },
            tool_choice: "required",
          },
        },
      );

      assert.isNotNull(response);
      assert.isNotNull(response.output_text);
      console.log(`Response output: ${response.output_text}`);

      // Clean up
      await openAIClient.conversations.delete(conversation.id);
      console.log("Conversation deleted");

      await agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    },
  );
});
