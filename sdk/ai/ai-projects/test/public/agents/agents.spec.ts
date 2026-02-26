// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

const firstAgentName = "firstAgent";
const agentInstructions = "You are a helpful agent";

describe("agents - basic", () => {
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

  it("should create and delete an agent version", async () => {
    const agent = await agents.createVersion(firstAgentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, firstAgentName);
    console.log(`Created agent, agent ID: ${agent.id}`);

    const deleted = await agents.delete(agent.name);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent name: ${agent.name}`);
  });
});

describe("agents - conversation flow", () => {
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

  it.skipIf(!isLiveMode())(
    "should create agent, generate responses in conversation, and clean up",
    async function () {
      // Create agent
      const agent = await agents.createVersion("my-agent-basic", {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: "You are a helpful assistant that answers general questions",
      });
      assert.isNotNull(agent);
      assert.isNotNull(agent.id);
      assert.isNotNull(agent.name);
      assert.isNotNull(agent.version);
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );

      // Create conversation with initial user message
      const conversation = await openAIClient.conversations.create({
        items: [
          { type: "message", role: "user", content: "What is the size of France in square miles?" },
        ],
      });
      assert.isNotNull(conversation);
      assert.isNotNull(conversation.id);
      console.log(`Created conversation with initial user message (id: ${conversation.id})`);

      // Generate response using the agent
      const franceResponse = await openAIClient.responses.create(
        {
          conversation: conversation.id,
        },
        {
          body: { agent: { name: agent.name, type: "agent_reference" } },
        },
      );
      assert.isNotNull(franceResponse);
      assert.isNotNull(franceResponse.output_text);
      console.log(`Response output: ${franceResponse.output_text}`);

      // Add a second user message to the conversation
      await openAIClient.conversations.items.create(conversation.id, {
        items: [{ type: "message", role: "user", content: "And what is the capital city?" }],
      });
      console.log("Added a second user message to the conversation");

      // Generate second response
      const capitalResponse = await openAIClient.responses.create(
        {
          conversation: conversation.id,
        },
        {
          body: { agent: { name: agent.name, type: "agent_reference" } },
        },
      );
      assert.isNotNull(capitalResponse);
      assert.isNotNull(capitalResponse.output_text);
      console.log(`Response output: ${capitalResponse.output_text}`);

      // Clean up
      await openAIClient.conversations.delete(conversation.id);
      console.log("Conversation deleted");

      await agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    },
  );
});
