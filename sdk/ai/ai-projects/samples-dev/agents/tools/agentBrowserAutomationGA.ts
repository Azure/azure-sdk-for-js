// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the GA Browser Automation tool with an agent.
 *
 * @summary Create an agent with BrowserAutomationTool and ask it to browse a website.
 * @azsdk-weight 100
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type { BrowserAutomationTool } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const connectionId =
  process.env["BROWSER_AUTOMATION_PROJECT_CONNECTION_ID"] ||
  "<browser automation project connection id>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const tool: BrowserAutomationTool = {
    type: "browser_automation",
    browser_automation: {
      connection: { project_connection_id: connectionId },
    },
  };

  console.log("Creating an agent with the GA Browser Automation tool...");
  const agent = await project.agents.createVersion("BrowserAutomationSample", {
    kind: "prompt",
    model: deploymentName,
    instructions: "Use the Browser Automation tool to answer questions about websites.",
    tools: [tool],
  });

  try {
    console.log("Asking the agent to browse Microsoft Learn...");
    const response = await project.getOpenAIClient().responses.create(
      { input: "Visit https://learn.microsoft.com/azure/ and summarize the page." },
      {
        body: {
          agent_reference: {
            name: agent.name,
            version: agent.version,
            type: "agent_reference",
          },
          tool_choice: "required",
        },
      },
    );
    console.log(response.output_text);
  } finally {
    console.log("Deleting the agent version...");
    await project.agents.deleteVersion(agent.name, agent.version);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
