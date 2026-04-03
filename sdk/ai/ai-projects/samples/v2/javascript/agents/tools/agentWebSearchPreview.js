// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to run Prompt Agent operations
 * using the Web Search Preview Tool.
 *
 * @summary This sample demonstrates how to create an agent with the WebSearchPreviewTool,
 * send a query to search the web with streaming, and clean up resources.
 *
 * @warning Web Search tool uses Grounding with Bing, which has additional costs and terms:
 * [terms of use](https://www.microsoft.com/bing/apis/grounding-legal-enterprise) and
 * [privacy statement](https://go.microsoft.com/fwlink/?LinkId=521839&clcid=0x409).
 * Customer data will flow outside the Azure compliance boundary. Learn more
 * [here](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/web-search?view=foundry&pivots=rest-api)
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with web search preview tool...");

  // Create agent with WebSearchPreviewTool
  const agent = await project.agents.createVersion("agent-web-search-preview", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that can search the web",
    tools: [
      {
        type: "web_search_preview",
        user_location: {
          type: "approximate",
          country: "GB",
          city: "London",
          region: "London",
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Send a query to search the web using streaming
  console.log("\nSending web search preview query with streaming...");
  const stream = openAIClient.responses.stream(
    {
      input: "Show me the latest London Underground service updates",
      tool_choice: "required",
    },
    {
      body: { agent: { name: agent.name, type: "agent_reference" } },
    },
  );

  // Process streaming events as they arrive
  for await (const event of stream) {
    if (event.type === "response.created") {
      console.log(`Stream response created with ID: ${event.response.id}`);
    } else if (event.type === "response.output_text.delta") {
      process.stdout.write(event.delta);
    } else if (event.type === "response.output_item.done") {
      if (event.item.type === "message" && event.item.content) {
        const lastContent = event.item.content[event.item.content.length - 1];
        if (lastContent.type === "output_text" && lastContent.annotations) {
          for (const annotation of lastContent.annotations) {
            if (annotation.type === "url_citation") {
              console.log(
                `\nURL Citation: ${annotation.url}, Start index: ${annotation.start_index}, End index: ${annotation.end_index}`,
              );
            }
          }
        }
      }
    } else if (event.type === "response.completed") {
      console.log(`\n\nResponse completed!`);
      console.log(`Full response: ${event.response.output_text}`);
    }
  }

  // Clean up
  console.log("\nCleaning up...");
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log("Agent deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
