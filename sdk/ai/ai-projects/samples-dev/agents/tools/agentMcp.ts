// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run Prompt Agent operations using MCP (Model Context Protocol) tools.
 *
 * @summary This sample demonstrates how to create an agent with MCP tool capabilities,
 * send requests that trigger MCP approval workflows, handle approval requests, and clean up resources.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import OpenAI from "openai";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with MCP tool...");

  // Define MCP tool that connects to Azure REST API specifications GitHub repository
  // The tool requires approval for each operation to ensure user control over external requests
  const agent = await project.agents.createVersion("agent-mcp", {
    kind: "prompt",
    model: deploymentName,
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
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Create a conversation thread to maintain context across multiple interactions
  console.log("\nCreating conversation...");
  const conversation = await openAIClient.conversations.create();
  console.log(`Created conversation (id: ${conversation.id})`);

  // Send initial request that will trigger the MCP tool to access Azure REST API specs
  // This will generate an approval request since requireApproval="always"
  console.log("\nSending request that will trigger MCP approval...");
  const response = await openAIClient.responses.create(
    {
      conversation: conversation.id,
      input: "Please summarize the Azure REST API specifications Readme",
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  // Process any MCP approval requests that were generated
  // When requireApproval="always", the agent will request permission before accessing external resources
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

  console.log("\nMCP sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
