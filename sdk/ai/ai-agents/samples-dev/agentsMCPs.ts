// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with the
 * Model Context Protocol (MCP) tool from the Azure Agents service.
 * To learn more about Model Context Protocol, visit https://modelcontextprotocol.io/
 *
 * @summary demonstrates how to use agent operations with the MCP tool.
 *
 */

import type {
  MessageContent,
  MessageTextContent,
  SubmitToolApprovalAction,
  RequiredMcpToolCall,
  ToolApproval,
  RunStepToolCallDetails,
} from "@azure/ai-agents";
import { AgentsClient, ToolUtility, isOutputOfType } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

// Get MCP server configuration from environment variables
const mcpServerUrl =
  process.env["MCP_SERVER_URL"] || "https://gitmcp.io/Azure/azure-rest-api-specs";
const mcpServerLabel = process.env["MCP_SERVER_LABEL"] || "github";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());

  // Initialize agent MCP tool
  const mcpTool = ToolUtility.createMCPTool({
    serverLabel: mcpServerLabel,
    serverUrl: mcpServerUrl,
    allowedTools: [], // Optional: specify allowed tools
  });

  // You can also add or remove allowed tools dynamically
  const searchApiCode = "search_azure_rest_api_code";
  mcpTool.allowTool(searchApiCode);
  console.log(`Allowed tools: ${mcpTool.allowedTools}`);

  // Create agent with MCP tool
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-mcp-agent",
    instructions:
      "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
    tools: mcpTool.definitions,
  });
  console.log(`Created agent, agent ID : ${agent.id}`);
  console.log(`MCP Server: ${mcpTool.serverLabel} at ${mcpTool.serverUrl}`);

  // Create thread for communication
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.messages.create(
    thread.id,
    "user",
    "Please summarize the Azure REST API specifications Readme",
  );
  console.log(`Created message, message ID: ${message.id}`);

  // Create and process agent run in thread with MCP tools
  mcpTool.updateHeaders("SuperSecret", "123456");
  // mcpTool.setApprovalMode("never"); // Uncomment to disable approval requirement

  console.log("Creating run...");
  let run = await client.runs.create(thread.id, agent.id, {
    toolResources: mcpTool.resources,
  });
  console.log(`Created run, run ID: ${run.id}`);

  // Poll the run status
  while (
    run.status === "queued" ||
    run.status === "in_progress" ||
    run.status === "requires_action"
  ) {
    await sleep(1000);
    run = await client.runs.get(thread.id, run.id);

    if (
      run.status === "requires_action" &&
      run.requiredAction &&
      isOutputOfType<SubmitToolApprovalAction>(run.requiredAction, "submit_tool_approval")
    ) {
      const toolCalls = run.requiredAction.submitToolApproval.toolCalls;

      if (!toolCalls?.length) {
        console.log("No tool calls provided - cancelling run");
        await client.runs.cancel(thread.id, run.id);
        break;
      }

      const toolApprovals: ToolApproval[] = [];

      for (const toolCall of toolCalls) {
        if (isOutputOfType<RequiredMcpToolCall>(toolCall, "mcp")) {
          console.log(`Approving tool call: ${JSON.stringify(toolCall)}`);
          toolApprovals.push({
            toolCallId: toolCall.id,
            approve: true,
            headers: mcpTool.headers,
          });
        }
      }

      console.log(`Tool approvals: ${JSON.stringify(toolApprovals)}`);
      if (toolApprovals.length > 0) {
        await client.runs.submitToolOutputs(thread.id, run.id, [], {
          toolApprovals: toolApprovals,
        });
      }
    }

    console.log(`Current run status: ${run.status}`);
  }

  console.log(`Run completed with status: ${run.status}`);
  if (run.status === "failed") {
    console.log(`Run failed: ${run.lastError}`);
  }

  // Display run steps and tool calls
  const runStepsIterator = client.runSteps.list(thread.id, run.id);
  console.log("\nRun Steps:");

  for await (const step of runStepsIterator) {
    console.log(`Step ${step.id} status: ${step.status}`);

    // Check if there are tool calls in the step details
    // if (step.stepDetails && step.stepDetails.type === "tool_calls") {
    if (isOutputOfType<RunStepToolCallDetails>(step.stepDetails, "tool_calls")) {
      const toolCalls = step.stepDetails.toolCalls;

      console.log("  MCP Tool calls:");
      for (const call of toolCalls) {
        console.log(`Tool Call ID: ${call.id}`);
        console.log(`Type: ${call.type}`);
      }
    }
  }

  // Fetch and log all messages
  console.log("\nConversation:");
  console.log("-".repeat(50));

  const messagesIterator = client.messages.list(thread.id);
  const messages: any[] = [];

  for await (const msg of messagesIterator) {
    messages.unshift(msg); // Add to beginning to maintain chronological order
  }

  for (const msg of messages) {
    const messageContent: MessageContent = msg.content[0];
    if (isOutputOfType<MessageTextContent>(messageContent, "text")) {
      console.log(`${msg.role.toUpperCase()}: ${messageContent.text.value}`);
      console.log("-".repeat(50));
    }
  }

  // Example of dynamic tool management
  console.log("\nDemonstrating dynamic tool management:");
  console.log(`Current allowed tools: ${mcpTool.allowedTools}`);

  // Remove a tool
  try {
    mcpTool.disallowTool(searchApiCode);
    console.log(`After removing ${searchApiCode}: ${mcpTool.allowedTools}`);
  } catch (error) {
    console.log(`Error removing tool: ${error}`);
  }

  // Delete the agent when done
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
