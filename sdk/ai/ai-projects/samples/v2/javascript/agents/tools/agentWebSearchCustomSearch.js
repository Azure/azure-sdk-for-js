// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates Prompt Agent operations that use the Web Search Tool configured
 * with a Bing Custom Search connection. The agent uses streaming and pulls results from your
 * specified custom search instance.
 *
 * @summary This sample demonstrates how to create an agent with a WebSearchTool configured
 * with Bing Custom Search, send a query with streaming, and clean up resources.
 *
 * @warning Web Search tool uses Grounding with Bing, which has additional costs and terms:
 * [terms of use](https://www.microsoft.com/bing/apis/grounding-legal-enterprise) and
 * [privacy statement](https://go.microsoft.com/fwlink/?LinkId=521839&clcid=0x409).
 * Customer data will flow outside the Azure compliance boundary. Learn more
 * [here](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/web-search?view=foundry)
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const bingCustomSearchConnectionId =
  process.env["BING_CUSTOM_SEARCH_PROJECT_CONNECTION_ID"] ||
  "<bing custom search project connection id>";
const bingCustomSearchInstanceName =
  process.env["BING_CUSTOM_SEARCH_INSTANCE_NAME"] || "<bing custom search instance name>";

async function main() {
  // Create AI Project client
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();

  console.log("Creating agent with web search tool (Bing Custom Search)...");

  // Create agent with WebSearchTool configured with custom search
  const agent = await project.agents.createVersion("agent-web-search-custom", {
    kind: "prompt",
    model: deploymentName,
    instructions: "You are a helpful assistant that can search the web and bing",
    tools: [
      {
        type: "web_search",
        custom_search_configuration: {
          project_connection_id: bingCustomSearchConnectionId,
          instance_name: bingCustomSearchInstanceName,
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Send a query to search the web using streaming
  const userInput = "What are the latest technology trends?";
  console.log(`\nSending query: "${userInput}"`);

  const stream = openAIClient.responses.stream(
    {
      input: userInput,
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
