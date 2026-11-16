// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the GA Browser Automation tool with an agent.
 * The agent shares a live-view URL at the start of the run so you can watch the browser
 * session. Treat that URL as sensitive and do not share it.
 *
 * @summary Create an agent with BrowserAutomationTool, browse a website, and process streaming events.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "BrowserAutomationSample";
const connectionId =
  process.env["BROWSER_AUTOMATION_PROJECT_CONNECTION_ID"] ||
  "<browser automation project connection id>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const tool = {
    type: "browser_automation",
    browser_automation: {
      connection: { project_connection_id: connectionId },
    },
  };

  console.log("Creating an agent with the GA Browser Automation tool...");
  const agent = await project.agents.createVersion(agentName, {
    kind: "prompt",
    model: deploymentName,
    instructions: `You are an Agent helping with browser automation tasks.
        You can answer questions, provide information, and assist with various tasks
        related to web browsing using the Browser Automation tool available to you.`,
    tools: [tool],
  });

  try {
    const originalAgentEndpoint = (await project.agents.get(agent.name)).agent_endpoint;
    try {
      await project.agents.updateAgent(agent.name, {
        agentEndpoint: {
          version_selector: {
            version_selection_rules: [
              {
                type: "FixedRatio",
                agent_version: agent.version,
                traffic_percentage: 100,
              },
            ],
          },
          protocol_configuration: { responses: {} },
        },
      });
      const openAIClient = project.getOpenAIClient({
        azureConfig: { allowPreview: true, agentName: agent.name },
      });

      console.log("Asking the agent to browse example.com with streaming...");
      const streamResponse = await openAIClient.responses.create({
        input: `Use the Browser Automation tool to visit https://example.com.
        Read the page and report its title and the visible description paragraph.
        Base your answer on the browser results, not on prior knowledge.`,
        stream: true,
      });

      for await (const event of streamResponse) {
        if (event.type === "response.created") {
          console.log(`Response created with ID: ${event.response.id}`);
        } else if (event.type === "response.output_item.done") {
          // Remote function calls are not yet included in the OpenAI output item types.
          const item = event.item;
          if (item.type === "remote_function_call") {
            if (typeof item.name !== "string" || typeof item.call_id !== "string") {
              throw new Error("Browser actions must include a name and call ID.");
            }
            const argumentsString = item.arguments ?? "{}";
            if (typeof argumentsString !== "string") {
              throw new Error("Browser action arguments must be a JSON string.");
            }
            const argumentsObject = JSON.parse(argumentsString || "{}");
            if (
              typeof argumentsObject !== "object" ||
              argumentsObject === null ||
              Array.isArray(argumentsObject)
            ) {
              throw new Error("Browser action arguments must be a JSON object.");
            }
            if ("browserSessionId" in argumentsObject) {
              delete argumentsObject.browserSessionId;
            }
            console.log(
              `Browser action: ${item.name} (call ID: ${item.call_id}), arguments:`,
              argumentsObject,
            );
          }
        } else if (event.type === "response.output_text.done") {
          console.log(`\nAgent message: ${event.text}`);
        } else if (event.type === "response.completed") {
          console.log("\nResponse completed!");
        } else if (event.type === "response.failed") {
          throw new Error(event.response.error?.message || "Browser automation response failed.");
        } else if (event.type === "error") {
          throw new Error(event.message);
        }
      }
    } finally {
      if (originalAgentEndpoint !== undefined) {
        console.log("Restoring the agent endpoint...");
        await project.agents.updateAgent(agent.name, { agentEndpoint: originalAgentEndpoint });
      }
    }
  } finally {
    console.log("Deleting the agent version...");
    await project.agents.deleteVersion(agent.name, agent.version);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});

module.exports = { main };
