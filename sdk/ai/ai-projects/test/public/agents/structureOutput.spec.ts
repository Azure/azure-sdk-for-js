// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

const agentName = "structured-output-agent";
const agentInstructions = `
  You are a helpful assistant that extracts calendar event information from the input user messages,
  and returns it in the desired structured output format.
`;

/**
 * Define the JSON schema for calendar events
 */
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

describe("agents - structured output - basic", () => {
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

  it.skipIf(!isLiveMode())("should create agent with structured output", async () => {
    const agent = await agents.createVersion(agentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
      text: {
        format: {
          type: "json_schema",
          name: "CalendarEvent",
          schema: calendarEventSchema,
        },
      },
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, agentName);
    console.log(`Created agent with structured output, agent ID: ${agent.id}`);

    const deleted = await agents.delete(agent.name);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent name: ${agent.name}`);
  });
});

describe("agents - structured output - execution flow", () => {
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

  it.skipIf(!isLiveMode())("should return structured output with direct input", async function () {
    // Create agent with structured output configuration
    const agent = await agents.createVersion(agentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
      text: {
        format: {
          type: "json_schema",
          name: "CalendarEvent",
          schema: calendarEventSchema,
        },
      },
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.isNotNull(agent.name);
    assert.isNotNull(agent.version);
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Generate response with direct input
    const response = await openAIClient.responses.create(
      {
        input: [
          {
            type: "message",
            role: "user",
            content: "Alice and Bob are going to a science fair this Friday, November 7, 2025.",
          },
        ],
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    assert.isNotNull(response);
    assert.isNotNull(response.output_text);
    console.log(`Response output: ${response.output_text}`);

    // Validate structured output
    const parsedOutput = JSON.parse(response.output_text);
    assert.isNotNull(parsedOutput.name);
    assert.isNotNull(parsedOutput.date);
    assert.isArray(parsedOutput.participants);
    console.log(`Parsed event: ${parsedOutput.name} on ${parsedOutput.date}`);

    // Clean up
    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });

  it.skipIf(!isLiveMode())(
    "should return structured output in conversation context",
    async function () {
      // Create agent with structured output configuration
      const agent = await agents.createVersion(agentName, {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: agentInstructions,
        text: {
          format: {
            type: "json_schema",
            name: "CalendarEvent",
            schema: calendarEventSchema,
          },
        },
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
            content: "Alice and Bob are going to a science fair this Friday, November 7, 2025.",
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
          body: { agent: { name: agent.name, type: "agent_reference" } },
        },
      );
      assert.isNotNull(response);
      assert.isNotNull(response.output_text);
      console.log(`Response output: ${response.output_text}`);

      // Validate structured output
      const parsedOutput = JSON.parse(response.output_text);
      assert.isNotNull(parsedOutput.name);
      assert.isNotNull(parsedOutput.date);
      assert.isArray(parsedOutput.participants);
      console.log(`Parsed event: ${parsedOutput.name} on ${parsedOutput.date}`);

      // Clean up
      await openAIClient.conversations.delete(conversation.id);
      console.log("Conversation deleted");

      await agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    },
  );
});
