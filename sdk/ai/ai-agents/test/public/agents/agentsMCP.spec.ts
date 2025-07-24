// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import type {
  AgentsClient,
  SubmitToolApprovalAction,
  RequiredMcpToolCall,
  ToolApproval,
} from "../../../src/index.js";
import { ToolUtility, isOutputOfType } from "../../../src/index.js";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe("Agents - MCP", () => {
  let recorder: Recorder;
  let projectsClient: AgentsClient;
  const modelDeploymentName = "gpt-4o";
  const searchApiCode = "search_azure_rest_api_code";
  const mcpServerUrl = "https://gitmcp.io/Azure/azure-rest-api-specs";
  const mcpServerLabel = "github";
  const mcpTool = ToolUtility.createMCPTool({
    serverLabel: mcpServerLabel,
    serverUrl: mcpServerUrl,
    allowedTools: [],
  });

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("client and projectsClient operations are accessible", async function () {
    assert.isNotNull(projectsClient);
    assert.isNotNull(mcpTool);
    assert.equal(mcpTool.serverLabel, mcpServerLabel);
    assert.equal(mcpTool.serverUrl, mcpServerUrl);
  });

  it("should manage allowed tools dynamically", async function () {
    
    // Initially no tools allowed
    assert.equal(mcpTool.allowedTools.length, 0);

    // Allow a tool
    mcpTool.allowTool(searchApiCode);
    assert.include(mcpTool.allowedTools, searchApiCode);
    assert.equal(mcpTool.allowedTools.length, 1);

    // Disallow the tool
    mcpTool.disallowTool(searchApiCode);
    assert.notInclude(mcpTool.allowedTools, searchApiCode);
    assert.equal(mcpTool.allowedTools.length, 0);
  });


  it("should update MCP tool headers", async function () {
    // Update headers
    mcpTool.updateHeaders("Authorization", "Bearer token123");
    assert.isNotNull(mcpTool.headers);
    assert.equal(mcpTool.headers["Authorization"], "Bearer token123");
  });

  it("should create and run thread with MCP agent", async function () {
    mcpTool.allowTool(searchApiCode);

    // Create agent with MCP tool
    const agent = await projectsClient.createAgent(modelDeploymentName, {
      name: "test-mcp-agent",
      instructions:
        "You are a helpful agent that can use MCP tools to assist users.",
      tools: mcpTool.definitions,
    });
    assert.isNotNull(agent);
    assert.isString(agent.id);

    // Create thread
    const thread = await projectsClient.threads.create();
    assert.isNotNull(thread);
    assert.isString(thread.id);

    // Create message
    const message = await projectsClient.messages.create(
      thread.id,
      "user",
      "Hello, please help me with a simple task."
    );
    assert.isNotNull(message);
    assert.isString(message.id);

    // Create run
    let run = await projectsClient.runs.create(thread.id, agent.id, {
      toolResources: mcpTool.resources,
    });
    assert.isNotNull(run);
    assert.isString(run.id);

    // Poll until completion or timeout
    let pollCount = 0;
    const maxPolls = 30;

    while (
      (run.status === "queued" ||
        run.status === "in_progress" ||
        run.status === "requires_action") &&
      pollCount < maxPolls
    ) {
      await sleep(1000);
      run = await projectsClient.runs.get(thread.id, run.id);
      pollCount++;

      // Handle tool approval if required
      if (
        run.status === "requires_action" &&
        run.requiredAction &&
        isOutputOfType<SubmitToolApprovalAction>(run.requiredAction, "submit_tool_approval")
      ) {
        const toolCalls = run.requiredAction.submitToolApproval.toolCalls;

        if (toolCalls?.length) {
          const toolApprovals: ToolApproval[] = [];

          for (const toolCall of toolCalls) {
            if (isOutputOfType<RequiredMcpToolCall>(toolCall, "mcp")) {
              toolApprovals.push({
                toolCallId: toolCall.id,
                approve: true,
                headers: mcpTool.headers,
              });
            }
          }

          if (toolApprovals.length > 0) {
            await projectsClient.runs.submitToolOutputs(thread.id, run.id, [], {
              toolApprovals: toolApprovals,
            });
          }
        }
      }
    }

    // Verify run completed
    assert.include(["completed", "failed", "cancelled", "expired"], run.status);

    // Check run steps
    const runStepsIterator = projectsClient.runSteps.list(thread.id, run.id);
    const runSteps = [];
    for await (const step of runStepsIterator) {
      if (step.id) {
        runSteps.push(step.id);
      }
    }
    assert.isAtLeast(runSteps.length, 1); // At least the initial step

    // Check messages
    const messagesIterator = projectsClient.messages.list(thread.id);
    const messages: string[] = [];
    for await (const msg of messagesIterator) {
      if (msg.id) {
        messages.push(msg.id);
      }
    }
    assert.isAtLeast(messages.length, 1); // At least the original message

    // Clean up
    await projectsClient.deleteAgent(agent.id);
  });
});
