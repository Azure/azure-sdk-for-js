// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

const agentName = "function-tool-agent";
const agentInstructions = "You are a helpful assistant that can use function tools.";

/**
 * Define a function tool for the model to use
 */
const funcTool = {
  type: "function" as const,
  name: "get_horoscope",
  description: "Get today's horoscope for an astrological sign.",
  strict: true,
  parameters: {
    type: "object",
    properties: {
      sign: {
        type: "string",
        description: "An astrological sign like Taurus or Aquarius",
      },
    },
    required: ["sign"],
    additionalProperties: false,
  },
};

/**
 * Generate a horoscope for the given astrological sign.
 */
function getHoroscope(sign: string): string {
  return `${sign}: Next Tuesday you will befriend a baby otter.`;
}

describe("agents - function tool - basic", () => {
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

  it.skipIf(!isLiveMode())("should create agent with function tools", async () => {
    const agent = await agents.createVersion(agentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
      tools: [funcTool],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, agentName);
    console.log(`Created agent with function tools, agent ID: ${agent.id}`);

    const deleted = await agents.delete(agent.name);
    assert.isNotNull(deleted);
    console.log(`Deleted agent, agent name: ${agent.name}`);
  });
});

describe("agents - function tool - execution flow", () => {
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

  it.skipIf(!isLiveMode())("should handle function call and return result", async function () {
    // Create agent with function tools
    const agent = await agents.createVersion(agentName, {
      kind: "prompt",
      model: "gpt-5-mini",
      instructions: agentInstructions,
      tools: [funcTool],
    });
    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.isNotNull(agent.name);
    assert.isNotNull(agent.version);
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    // Generate initial response that should trigger function call
    const response = await openAIClient.responses.create(
      {
        input: [
          {
            type: "message",
            role: "user",
            content: "What is my horoscope? I am an Aquarius.",
          },
        ],
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );
    assert.isNotNull(response);
    console.log(`Response output: ${response.output_text}`);

    // Process function calls
    const inputList: Array<{
      type: "function_call_output";
      call_id: string;
      output: string;
    }> = [];

    for (const item of response.output) {
      if (item.type === "function_call") {
        assert.equal(item.name, "get_horoscope");
        const args = JSON.parse(item.arguments);
        const horoscope = getHoroscope(args.sign);
        inputList.push({
          type: "function_call_output",
          call_id: item.call_id,
          output: JSON.stringify({ horoscope }),
        });
      }
    }

    assert.isNotEmpty(inputList, "Expected at least one function call");
    console.log(`Processed ${inputList.length} function call(s)`);

    // Submit function results to get final response
    const finalResponse = await openAIClient.responses.create(
      {
        input: inputList,
        previous_response_id: response.id,
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );

    assert.isNotNull(finalResponse);
    assert.isNotNull(finalResponse.output_text);
    console.log(`Final output: ${finalResponse.output_text}`);

    // Clean up
    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });

  it.skipIf(!isLiveMode())(
    "should handle function call in conversation context",
    async function () {
      // Create agent with function tools
      const agent = await agents.createVersion(agentName, {
        kind: "prompt",
        model: "gpt-5-mini",
        instructions: agentInstructions,
        tools: [funcTool],
      });
      assert.isNotNull(agent);
      console.log(
        `Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`,
      );

      // Create conversation with initial user message
      const conversation = await openAIClient.conversations.create({
        items: [{ type: "message", role: "user", content: "What is my horoscope? I am a Taurus." }],
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
      console.log(`Response output: ${response.output_text}`);

      // Process function calls
      const inputList: Array<{
        type: "function_call_output";
        call_id: string;
        output: string;
      }> = [];

      for (const item of response.output) {
        if (item.type === "function_call") {
          assert.equal(item.name, "get_horoscope");
          const args = JSON.parse(item.arguments);
          const horoscope = getHoroscope(args.sign);
          inputList.push({
            type: "function_call_output",
            call_id: item.call_id,
            output: JSON.stringify({ horoscope }),
          });
        }
      }

      assert.isNotEmpty(inputList, "Expected at least one function call");
      console.log(`Processed ${inputList.length} function call(s)`);

      // Submit function results if there were function calls
      const finalResponse = await openAIClient.responses.create(
        {
          conversation: conversation.id,
          input: inputList,
        },
        {
          body: { agent: { name: agent.name, type: "agent_reference" } },
        },
      );

      assert.isNotNull(finalResponse);
      assert.isNotNull(finalResponse.output_text);
      console.log(`Final output: ${finalResponse.output_text}`);

      // Clean up
      await openAIClient.conversations.delete(conversation.id);
      console.log("Conversation deleted");

      await agents.deleteVersion(agent.name, agent.version);
      console.log("Agent deleted");
    },
  );
});
