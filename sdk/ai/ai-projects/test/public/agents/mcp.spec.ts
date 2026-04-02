// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import {
  createRecorder,
  createProjectsClient,
  getToolConnectionId,
} from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AgentsOperations, AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

describe("agents - mcp tool", () => {
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

  it("should create agent with MCP tool and handle approval workflow", async function () {
    const agent = await agents.createVersion("agent-mcp", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions:
        "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
      tools: [
        {
          type: "mcp",
          server_label: "api-specs",
          server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
          require_approval: "always",
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "agent-mcp");
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    const conversation = await openAIClient.conversations.create();
    assert.isNotNull(conversation.id);
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send initial request that will trigger MCP approval
    const response = await openAIClient.responses.create(
      {
        conversation: conversation.id,
        input: "Please summarize the Azure REST API specifications Readme",
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );

    assert.isNotNull(response);

    // Process MCP approval requests
    const inputList: OpenAI.Responses.ResponseInputItem.McpApprovalResponse[] = [];
    for (const item of response.output) {
      if (item.type === "mcp_approval_request") {
        if (item.server_label === "api-specs" && item.id) {
          console.log(`Received MCP approval request (id: ${item.id})`);
          inputList.push({
            type: "mcp_approval_response",
            approval_request_id: item.id,
            approve: true,
          });
        }
      }
    }

    console.log(`Processing ${inputList.length} approval request(s)`);

    // Send approval response
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
    console.log(`Response: ${finalResponse.output_text}`);

    // Clean up
    await openAIClient.conversations.delete(conversation.id);
    console.log("Conversation deleted");

    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });

  it("should create agent with MCP tool using project connection authentication", async function () {
    const agent = await agents.createVersion("agent-mcp-connection-auth", {
      kind: "prompt",
      model: "gpt-5.2",
      instructions: "Use MCP tools as needed",
      tools: [
        {
          type: "mcp",
          server_label: "api-specs",
          server_url: "https://api.githubcopilot.com/mcp",
          require_approval: "always",
          project_connection_id: getToolConnectionId("mcp-connection"),
        },
      ],
    });

    assert.isNotNull(agent);
    assert.isNotNull(agent.id);
    assert.equal(agent.name, "agent-mcp-connection-auth");
    console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

    const conversation = await openAIClient.conversations.create();
    assert.isNotNull(conversation.id);
    console.log(`Created conversation (id: ${conversation.id})`);

    // Send initial request that will trigger MCP approval
    const response = await openAIClient.responses.create(
      {
        conversation: conversation.id,
        input: "What is my username in Github profile?",
      },
      {
        body: { agent: { name: agent.name, type: "agent_reference" } },
      },
    );

    assert.isNotNull(response);

    // Process MCP approval requests
    const inputList: OpenAI.Responses.ResponseInputItem.McpApprovalResponse[] = [];
    for (const item of response.output) {
      if (item.type === "mcp_approval_request") {
        if (item.server_label === "api-specs" && item.id) {
          console.log(`Received MCP approval request (id: ${item.id})`);
          inputList.push({
            type: "mcp_approval_response",
            approval_request_id: item.id,
            approve: true,
          });
        }
      }
    }

    console.log(`Processing ${inputList.length} approval request(s)`);

    // Send approval response
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
    console.log(`Response: ${finalResponse.output_text}`);

    // Clean up
    await openAIClient.conversations.delete(conversation.id);
    console.log("Conversation deleted");

    await agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  });
});
