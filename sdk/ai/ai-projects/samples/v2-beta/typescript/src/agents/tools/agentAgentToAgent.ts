// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Agent-to-Agent (A2A) capabilities
 * using the A2APreviewTool and synchronous Azure AI Projects client. The agent can communicate
 * with other agents and provide responses based on inter-agent interactions using the
 * A2A protocol (https://a2a-protocol.org/latest/).
 *
 * @summary This sample demonstrates how to create an agent with A2A tool capabilities,
 * enable inter-agent communication, and process streaming responses.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import * as readline from "readline";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const a2aProjectConnectionId =
  process.env["A2A_PROJECT_CONNECTION_ID"] || "<a2a project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with A2A tool...");

  const agent = await project.agents.createVersion("MyA2AAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant.",
    // Define A2A tool for agent-to-agent communication
    tools: [
      {
        type: "a2a_preview",
        project_connection_id: a2aProjectConnectionId,
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Prompt user for input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await new Promise<string>((resolve) => {
    rl.question("Enter your question (Default: 'What can the secondary agent do?'): \n", (answer) => {
      rl.close();
      resolve(answer);
    });
  });

  console.log("\nSending request to A2A agent with streaming...");
  const streamResponse = await openAIClient.responses.create(
    {
      input: userInput || "What can the secondary agent do?",
      stream: true,
    },
    {
      body: {
        agent: { name: agent.name, type: "agent_reference" },
        tool_choice: "required",
      },
    },
  );

  // Process the streaming response
  for await (const event of streamResponse) {
    if (event.type === "response.created") {
      console.log(`Follow-up response created with ID: ${event.response.id}`);
    } else if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_text.done") {
      console.log("\n\nFollow-up response done!");
    } else if (event.type === "response.output_item.done") {
      const item = event.item as any;
      if (item.type === "remote_function_call") {
        // TODO: support remote_function_call schema
        const callId = item.call_id;
        const label = item.label;
        console.log(`Call ID: ${callId ?? "None"}`);
        console.log(`Label: ${label ?? "None"}`);
      }
    } else if (event.type === "response.completed") {
      console.log("\nFollow-up completed!");
    }
  }

  // Clean up resources by deleting the agent version
  // This prevents accumulation of unused resources in your project
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");

  console.log("\nAgent-to-Agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
