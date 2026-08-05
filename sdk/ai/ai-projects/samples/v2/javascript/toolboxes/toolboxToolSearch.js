// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to add the generally available toolbox search tool
 * (`toolbox_search`) to a toolbox, and how to let an agent discover and call the
 * toolbox's tools through it.
 *
 * A toolbox exposes its tools over an MCP endpoint. Adding the `toolbox_search` tool
 * lets an agent search that toolbox for a relevant tool instead of having every tool
 * declared up front. In the JS SDK, you access these operations via `project.toolboxes`.
 *
 * @summary Demonstrates the toolbox search tool for agent-driven tool discovery.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

async function main() {
  const credential = new DefaultAzureCredential();
  const project = new AIProjectClient(projectEndpoint, credential);

  const toolboxName = "toolbox-search-sample";

  // A toolbox holds the tools an agent can reach. Adding `toolbox_search` alongside them
  // lets the agent search the toolbox at run time rather than binding every tool up front.
  const tools = [
    {
      type: "mcp",
      server_label: "api_specs",
      server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
      require_approval: "never",
    },
    {
      type: "toolbox_search",
    },
  ];

  const version = await project.toolboxes.createVersion(toolboxName, tools, {
    description: "Example toolbox with tool search enabled.",
  });
  console.log(`Toolbox version created: ${version.name}:${version.version}`);

  // Point the agent at the toolbox's MCP endpoint. The agent calls `tool_search` to find a
  // tool, then `call_tool` to invoke the one it picked.
  const toolboxMcpUrl = `${projectEndpoint}/toolboxes/${version.name}/versions/${version.version}/mcp?api-version=v1`;
  const token = (await credential.getToken("https://ai.azure.com/.default")).token;

  const toolboxMcpTool = {
    type: "mcp",
    server_label: "toolbox_search",
    server_url: toolboxMcpUrl,
    authorization: token,
    require_approval: "never",
  };

  const agent = await project.agents.createVersion("toolbox-search-sample-agent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "Always use the toolbox search tool to answer questions. " +
      "Call `tool_search` to discover a relevant tool, then `call_tool` " +
      "with the tool name returned by the search.",
    tools: [toolboxMcpTool],
  });
  console.log(`Agent created: ${agent.name}:${agent.version}`);

  // Ask the agent a question it can only answer by searching the toolbox for a tool.
  const openAIClient = project.getOpenAIClient();
  console.log("\nGenerating response...");
  const response = await openAIClient.responses.create(
    {
      input: "Which Azure REST API specs describe the Foundry data plane?",
    },
    {
      body: { agent_reference: { name: agent.name, type: "agent_reference" } },
    },
  );
  console.log(`Response output: ${response.output_text}`);

  // Clean up
  console.log("\nCleaning up resources...");
  await project.agents.deleteVersion(agent.name, agent.version);
  await project.toolboxes.deleteVersion(version.name, version.version);
  console.log("Agent and toolbox version deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
