// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create an AI agent with Bing Custom Search capabilities
 * using the BingCustomSearchPreviewTool and synchronous Azure AI Projects client. The agent can search
 * custom search instances and provide responses with relevant results.
 *
 * @summary This sample demonstrates how to create an agent with Bing Custom Search tool capabilities,
 * search custom search instances, and process streaming responses with citations.
 * 
 * @warning Grounding with Bing Custom Search tool uses Grounding with Bing, which has additional costs and terms: [terms of use](https://www.microsoft.com/bing/apis/grounding-legal-enterprise) and [privacy statement](https://go.microsoft.com/fwlink/?LinkId=521839&clcid=0x409). Customer data will flow outside the Azure compliance boundary. Learn more [here](https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/bing-tools?view=foundry&pivots=rest-api).
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const readline = require("readline");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["MODEL_DEPLOYMENT_NAME"] || "<model deployment name>";
const bingCustomSearchProjectConnectionId =
  process.env["BING_CUSTOM_SEARCH_PROJECT_CONNECTION_ID"] ||
  "<bing custom search project connection id>";
const bingCustomSearchInstanceName =
  process.env["BING_CUSTOM_SEARCH_INSTANCE_NAME"] || "<bing custom search instance name>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const openAIClient = await project.getOpenAIClient();

  console.log("Creating agent with Bing Custom Search tool...");

  const agent = await project.agents.createVersion("MyAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "You are a helpful agent that can use Bing Custom Search tools to assist users. Use the available Bing Custom Search tools to answer questions and perform tasks.",
    tools: [
      {
        type: "bing_custom_search_preview",
        bing_custom_search_preview: {
          search_configurations: [
            {
              project_connection_id: bingCustomSearchProjectConnectionId,
              instance_name: bingCustomSearchInstanceName,
            },
          ],
        },
      },
    ],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version})`);

  // Prompt user for input
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const userInput = await new Promise((resolve) => {
    rl.question(
      "Enter your question for the Bing Custom Search agent (e.g., 'Tell me more about foundry agent service'): \n",
      (answer) => {
        rl.close();
        resolve(answer);
      },
    );
  });

  // Send initial request that will trigger the Bing Custom Search tool
  console.log("\nSending request to Bing Custom Search agent with streaming...");
  const streamResponse = await openAIClient.responses.create(
    {
      input: userInput,
      stream: true,
    },
    {
      body: {
        agent: { name: agent.name, type: "agent_reference" },
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
      if (event.item.type === "message") {
        const item = event.item;
        if (item.content && item.content.length > 0) {
          const lastContent = item.content[item.content.length - 1];
          if (lastContent.type === "output_text" && lastContent.annotations) {
            for (const annotation of lastContent.annotations) {
              if (annotation.type === "url_citation") {
                console.log(
                  `URL Citation: ${annotation.url}, Start index: ${annotation.start_index}, End index: ${annotation.end_index}`,
                );
              }
            }
          }
        }
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

  console.log("\nBing Custom Search agent sample completed!");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
