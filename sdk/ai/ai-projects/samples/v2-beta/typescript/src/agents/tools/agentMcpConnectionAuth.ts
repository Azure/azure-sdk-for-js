// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run Prompt Agent operations using MCP (Model Context Protocol) tools.
 *
 * @summary This sample demonstrates how to create an agent with MCP tool capabilities using project connection authentication,
 * send requests that trigger MCP approval workflows, handle approval requests, and clean up resources.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import OpenAI from "openai";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const mcpProjectConnectionId =
  process.env["MCP_PROJECT_CONNECTION_ID"] || "<mcp project connection id>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with MCP tool using project connection...");

  // Define MCP tool that connects to GitHub Copilot API with project connection authentication
  // The project connection should have Authorization header configured with "Bearer <GitHub PAT token>"
  // Token can be created at https://github.com/settings/personal-access-tokens/new
  const agent = await project.agents.createVersion("agent-mcp-connection-auth", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Use MCP tools as needed",
    tools: [
      {
        type: "mcp",
        server_label: "api-specs",
        server_url: "https://api.githubcopilot.com/mcp",
        require_approval: "always",
        project_connection_id: mcpProjectConnectionId,
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create a conversation thread to maintain context across multiple interactions
  console.log("\nCreating conversation...");
  const conversation = await openAIClient.conversations.create();
  console.log(`Created conversation (id: ${conversation.id})`);

  // Send initial request that will trigger the MCP tool
  console.log("\nSending request that will trigger MCP approval...");
  const response = await openAIClient.responses.create(
    {
      conversation: conversation.id,
      input: "What is my username in Github profile?",
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  // Process any MCP approval requests that were generated
  const inputList: OpenAI.Responses.ResponseInputItem.McpApprovalResponse[] = [];
  for (const item of response.output) {
    if (item.type === "mcp_approval_request") {
      if (item.server_label === "api-specs" && item.id) {
        console.log(`\nReceived MCP approval request (id: ${item.id})`);
        console.log(`  Server: ${item.server_label}`);
        console.log(`  Tool: ${item.name}`);

        // Automatically approve the MCP request to allow the agent to proceed
        // In production, you might want to implement more sophisticated approval logic
        inputList.push({
          type: "mcp_approval_response",
          approval_request_id: item.id,
          approve: true,
        });
      }
    }
  }

  console.log(`\nProcessing ${inputList.length} approval request(s)`);
  console.log("Final input:");
  console.log(JSON.stringify(inputList, null, 2));

  // Send the approval response back to continue the agent's work
  // This allows the MCP tool to access the GitHub repository and complete the original request
  console.log("\nSending approval response...");
  const finalResponse = await openAIClient.responses.create(
    {
      input: inputList,
      previous_response_id: response.id,
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  console.log(`\nResponse: ${finalResponse.output_text}`);

  // Clean up resources by deleting the agent version and conversation
  // This prevents accumulation of unused resources in your project
  console.log("\nCleaning up resources...");
  await openAIClient.conversations.delete(conversation.id);
  console.log("Conversation deleted");

  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nMCP with project connection sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
