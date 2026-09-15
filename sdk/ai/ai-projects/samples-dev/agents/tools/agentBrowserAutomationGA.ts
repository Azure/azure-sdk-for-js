// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates the non-preview Browser Automation tool.
 *
 * @summary Create an agent with BrowserAutomationTool and summarize a public web page.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  // Set these values in .env, including a configured Browser Automation connection.
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const deploymentName = process.env["FOUNDRY_MODEL_NAME"];
  const connectionId = process.env["BROWSER_AUTOMATION_PROJECT_CONNECTION_ID"];
  if (!projectEndpoint || !deploymentName || !connectionId) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT, FOUNDRY_MODEL_NAME, and BROWSER_AUTOMATION_PROJECT_CONNECTION_ID.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating an agent with the non-preview Browser Automation tool...");
  const agent = await project.agents.createVersion(`sample-browser-${Date.now()}`, {
    kind: "prompt",
    model: deploymentName,
    instructions: "Use the browser to read public pages. Do not sign in or submit forms.",
    tools: [
      {
        type: "browser_automation",
        browser_automation: { connection: { project_connection_id: connectionId } },
      },
    ],
  });
  try {
    console.log("Asking the agent to read example.com...");
    const response = await openAIClient.responses.create(
      { input: "Open https://example.com and summarize what the page says." },
      {
        body: {
          agent_reference: { type: "agent_reference", name: agent.name, version: agent.version },
          tool_choice: "required",
        },
      },
    );
    console.log("Response:", response.output_text);
  } finally {
    console.log("Deleting the sample agent...");
    await project.agents.delete(agent.name);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
