// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Browser Automation capabilities
 * using the BrowserAutomationPreviewTool and synchronous Azure AI Projects client. The agent can
 * perform automated web browsing tasks and provide responses based on web interactions.
 *
 * @summary This sample demonstrates how to create an agent with Browser Automation tool,
 * perform web browsing tasks, and process streaming responses with browser automation events.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const browserAutomationProjectConnectionId =
  process.env["BROWSER_AUTOMATION_PROJECT_CONNECTION_ID"] ||
  "<browser automation project connection id>";

const handleBrowserCall = (item) => {
  // TODO: support browser_automation_preview_call schema
  const callId = item.call_id;
  const argumentsStr = item.arguments;

  // Parse the arguments string into a dictionary
  let query = null;
  if (argumentsStr && typeof argumentsStr === "string") {
    try {
      const argumentsObj = JSON.parse(argumentsStr);
      query = argumentsObj.query;
    } catch (e) {
      console.error("Failed to parse arguments:", e);
    }
  }

  console.log(`Call ID: ${callId ?? "None"}`);
  console.log(`Query arguments: ${query ?? "None"}`);
};

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with Browser Automation tool...");

  const agent = await project.agents.createVersion("MyAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions: `You are an Agent helping with browser automation tasks. 
            You can answer questions, provide information, and assist with various tasks 
            related to web browsing using the Browser Automation tool available to you.`,
    // Define Browser Automation tool
    tools: [
      {
        type: "browser_automation_preview",
        browser_automation_preview: {
          connection: {
            project_connection_id: browserAutomationProjectConnectionId,
          },
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  console.log("\nSending browser automation request with streaming...");
  const streamResponse = await openAIClient.responses.create(
    {
      input: `Your goal is to report the percent of Microsoft year-to-date stock price change.
            To do that, go to the website finance.yahoo.com.
            At the top of the page, you will find a search bar.
            Enter the value 'MSFT', to get information about the Microsoft stock price.
            At the top of the resulting page you will see a default chart of Microsoft stock price.
            Click on 'YTD' at the top of that chart, and report the percent value that shows up just below it.`,
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
    } else if (
      event.type === "response.output_item.done" ||
      event.type === "response.output_item.added"
    ) {
      const item = event.item;
      if (item.type === "browser_automation_preview_call") {
        handleBrowserCall(item);
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

  console.log("\nBrowser Automation sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
