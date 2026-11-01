// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Browser Automation capabilities
 * using the GA BrowserAutomationTool and Azure AI Projects client. The agent can
 * perform automated web browsing tasks and provide responses based on web interactions.
 * The agent shares a live-view URL so you can watch the browser session.
 * Treat that URL as sensitive and do not share it.
 *
 * @summary This sample demonstrates how to create an agent with Browser Automation tool,
 * perform web browsing tasks, and process completed text and remote function call events.
 *
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";
const browserAutomationProjectConnectionId =
  process.env["BROWSER_AUTOMATION_PROJECT_CONNECTION_ID"] ||
  "<browser automation project connection id>";

// Foundry remote function items are not part of OpenAI's ResponseOutputItem union.
const handleBrowserCall = (item: unknown): void => {
  if (typeof item !== "object" || item === null || !("type" in item)) {
    return;
  }
  if (item.type === "remote_function_call") {
    if (
      !("name" in item) ||
      typeof item.name !== "string" ||
      !("call_id" in item) ||
      typeof item.call_id !== "string" ||
      !("arguments" in item) ||
      typeof item.arguments !== "string"
    ) {
      throw new Error("Invalid Browser Automation remote function call.");
    }
    const argumentsObj: unknown = JSON.parse(item.arguments);
    const argumentsStr = JSON.stringify(argumentsObj, (key, value: unknown) =>
      key === "browserSessionId" ? undefined : value,
    );
    console.log(
      `Browser action: ${item.name} (call ID: ${item.call_id}), arguments: ${argumentsStr}`,
    );
  } else if (item.type === "remote_function_call_output") {
    if (!("call_id" in item) || typeof item.call_id !== "string") {
      throw new Error("Invalid Browser Automation remote function call output.");
    }
    console.log(`Browser action output received for call ID: ${item.call_id}`);
  }
};

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with Browser Automation tool...");

  const agent = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: deploymentName,
    instructions: `You are an Agent helping with browser automation tasks. 
            You can answer questions, provide information, and assist with various tasks 
            related to web browsing using the Browser Automation tool available to you.`,
    // Define Browser Automation tool
    tools: [
      {
        type: "browser_automation",
        browser_automation: {
          connection: {
            project_connection_id: browserAutomationProjectConnectionId,
          },
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  try {
    console.log("\nSending browser automation request with streaming...");
    const streamResponse = await openAIClient.responses.create(
      {
        input:
          "Use the Browser Automation tool to visit https://example.com. Read the page and report its title and the visible description paragraph. Base your answer on the browser results, not on prior knowledge.",
        stream: true,
      },
      {
        body: {
          agent_reference: { name: agent.name, version: agent.version, type: "agent_reference" },
        },
      },
    );

    console.log(
      "The browser live-view URL is sensitive. Do not share it or commit it to source control.",
    );
    let responseCompleted = false;
    for await (const event of streamResponse) {
      if (event.type === "response.created") {
        console.log(`Response created with ID: ${event.response.id}`);
      } else if (event.type === "response.output_text.done") {
        console.log(`\nAgent message: ${event.text}`);
      } else if (event.type === "response.output_item.done") {
        handleBrowserCall(event.item);
      } else if (event.type === "response.failed") {
        throw new Error(event.response.error?.message ?? "Browser Automation response failed.");
      } else if (event.type === "response.incomplete") {
        throw new Error(
          `Browser Automation response incomplete: ${event.response.incomplete_details?.reason}`,
        );
      } else if (event.type === "error") {
        throw new Error(event.message);
      } else if (event.type === "response.completed") {
        responseCompleted = true;
        console.log("\nResponse completed!");
      }
    }
    if (!responseCompleted) {
      throw new Error("Browser Automation stream ended without a completed response.");
    }
  } finally {
    console.log("\nCleaning up resources...");
    await project.agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  }

  console.log("\nBrowser Automation sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
  process.exitCode = 1;
});
