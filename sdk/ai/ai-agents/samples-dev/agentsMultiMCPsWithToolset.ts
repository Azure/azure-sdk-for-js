// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use agent operations with multiple Model Context Protocol (MCP) servers from the Azure Agents service using a synchronous client.
 * To learn more about Model Context Protocol, visit https://modelcontextprotocol.io/
 *
 * @summary demonstrates how to use agent operations with multiple MCP servers.
 *
 */

import type {
  MessageContent,
  MessageTextContent,
  SubmitToolApprovalAction,
  RequiredMcpToolCall,
  ThreadMessage,
  ToolApproval,
  RunStepToolCallDetails,
} from "@azure/ai-agents";
import { AgentsClient, ToolSet, isOutputOfType } from "@azure/ai-agents";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["PROJECT_ENDPOINT"] || "<project endpoint>";
const modelDeploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";

// Get MCP server configuration from environment variables
const mcpServerUrl1 =
  process.env["MCP_SERVER_URL"] || "https://gitmcp.io/Azure/azure-rest-api-specs";
const mcpServerLabel1 = process.env["MCP_SERVER_LABEL"] || "github";

const mcpServerUrl2 = process.env["MCP_SERVER_URL_2"] || "https://learn.microsoft.com/api/mcp";
const mcpServerLabel2 = process.env["MCP_SERVER_LABEL_2"] || "microsoft_learn";

async function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function main(): Promise<void> {
  // Create an Azure AI Client
  const client = new AgentsClient(projectEndpoint, new DefaultAzureCredential());
  const toolSet = new ToolSet();
  toolSet.addMCPTool({
    serverLabel: mcpServerLabel1,
    serverUrl: mcpServerUrl1,
    allowedTools: ["search_azure_rest_api_code"], // Optional: specify allowed tools
  });
  // You can also add or remove allowed tools dynamically

  toolSet.addMCPTool({
    serverLabel: mcpServerLabel2,
    serverUrl: mcpServerUrl2,
    allowedTools: ["microsoft_docs_search"], // Optional: specify allowed tools
  });

  // Create agent with MCP tool
  const agent = await client.createAgent(modelDeploymentName, {
    name: "my-mcp-agent",
    instructions:
      "You are a helpful agent that can use MCP tools to assist users. Use the available MCP tools to answer questions and perform tasks.",
    // tools: mcpTools.map((tool) => tool.definition),
    tools: toolSet.toolDefinitions,
  });
  console.log(`Created agent, agent ID : ${agent.id}`);

  // Create thread for communication
  const thread = await client.threads.create();
  console.log(`Created thread, thread ID: ${thread.id}`);

  // Create message to thread
  const message = await client.messages.create(
    thread.id,
    "user",
    "Please summarize the Azure REST API specifications Readme and Give me the Azure CLI commands to create an Azure Container App with a managed identity",
  );
  console.log(`Created message, message ID: ${message.id}`);
  let run = await client.runs.create(thread.id, agent.id, {
    toolResources: toolSet.toolResources,
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
        console.log(`Approving tool call: ${JSON.stringify(toolCall)}`);
        if (isOutputOfType<RequiredMcpToolCall>(toolCall, "mcp")) {
          toolApprovals.push({
            toolCallId: toolCall.id,
            approve: true,
            headers: {
              SuperSecret: "123456",
            },
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
  }

  console.log(`Current run status: ${run.status}`);
  if (run.status === "failed") {
    console.log(`Run failed: ${run.lastError}`);
  }

  // Display run steps and tool calls
  const runStepsIterator = client.runSteps.list(thread.id, run.id);
  console.log("\nRun Steps:");

  for await (const step of runStepsIterator) {
    console.log(`Step ${step.id} status: ${step.status}`);

    // Check if there are tool calls in the step details
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
  const messages: ThreadMessage[] = [];

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

  // Delete the agent when done
  await client.deleteAgent(agent.id);
  console.log(`Deleted agent, agent ID: ${agent.id}`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exit(1);
});
