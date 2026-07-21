// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create a Toolbox in tool-search mode and
 * invoke it from a Prompt Agent using the AIProjectClient and the
 * OpenAI-compatible client.
 *
 * A toolbox version that includes `ToolboxSearchPreviewToolboxTool` exposes
 * only two meta tools at its `/mcp` endpoint -- `tool_search` and `call_tool`
 * -- and defers every other tool behind them. The agent uses an `MCPTool`
 * pointed at the toolbox's versioned `/mcp` URL to discover and invoke
 * those inner tools.
 *
 * Toolboxes are accessed via `project.toolboxes`.
 *
 * @summary Demonstrates creating a toolbox with search preview and invoking it via a Prompt Agent.
 */

import type { MCPTool, MCPToolboxTool } from "@azure/ai-projects";
import { AIProjectClient, RestError } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const mcpConnectionId = process.env["MCP_PROJECT_CONNECTION_ID"] || "<mcp connection id>";

const TOOLBOX_NAME = "toolbox_with_mcp_tool";
const INNER_MCP_LABEL = "github";
const INNER_MCP_URL = "https://api.githubcopilot.com/mcp";
const TOOLBOX_MCP_LABEL = "search-tool";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const project = new AIProjectClient(projectEndpoint, credential);
  const openAIClient = project.getOpenAIClient();

  // Clean up any leftover toolbox from a prior run
  try {
    await project.toolboxes.delete(TOOLBOX_NAME);
  } catch (e) {
    if (!(e instanceof RestError && e.statusCode === 404)) throw e;
  }

  // Create a toolbox version with an inner MCP tool and search-preview enabled
  const innerMcpTool: MCPToolboxTool = {
    type: "mcp",
    server_label: INNER_MCP_LABEL,
    server_url: INNER_MCP_URL,
    require_approval: "never",
    project_connection_id: mcpConnectionId,
  };

  const toolboxVersion = await project.toolboxes.createVersion(
    TOOLBOX_NAME,
    [innerMcpTool, { type: "toolbox_search_preview" }],
    {
      description: `Toolbox with \`${INNER_MCP_LABEL}\` MCP server and tool search enabled.`,
    },
  );
  console.log(`Created toolbox \`${TOOLBOX_NAME}\` (version ${toolboxVersion.version}).`);

  // Build the MCP tool reference to the toolbox endpoint
  const toolboxMcpUrl = `${projectEndpoint}/toolboxes/${TOOLBOX_NAME}/versions/${toolboxVersion.version}/mcp?api-version=v1`;
  const token = (await credential.getToken("https://ai.azure.com/.default"))!.token;

  const toolboxMcpTool: MCPTool = {
    type: "mcp",
    server_label: TOOLBOX_MCP_LABEL,
    server_url: toolboxMcpUrl,
    authorization: token,
    require_approval: "never",
  };

  // Create a prompt agent that uses the toolbox
  const agent = await project.agents.createVersion("MyAgent", {
    kind: "prompt",
    model: deploymentName,
    instructions:
      "Always use the toolbox search tool to answer questions and perform tasks. " +
      "Use `tool_search` to discover a relevant tool, then `call_tool` " +
      "with the tool name returned by the search.",
    tools: [toolboxMcpTool],
  });
  console.log(`Agent created (id: ${agent.id}, name: ${agent.name}, version: ${agent.version}).`);

  // Send a query
  const response = await openAIClient.responses.create(
    { input: "What is my username in Github profile?" },
    { body: { agent_reference: { name: agent.name, type: "agent_reference" } } },
  );

  for (const item of response.output) {
    if (item.type === "mcp_approval_request") {
      console.log(`mcp_approval_request server_label=${item.server_label} name=${item.name}`);
    } else if (item.type === "mcp_list_tools") {
      console.log(
        `mcp_list_tools server_label=${item.server_label} tools=${(item.tools || []).map((t: any) => t.name)}`,
      );
    } else if (item.type === "mcp_call") {
      console.log(
        `mcp_call server_label=${item.server_label} name=${item.name} error=${item.error}`,
      );
    } else {
      console.log(`output item type=${item.type}`);
    }
  }

  console.log(`Response: ${response.output_text}`);

  // Clean up
  await project.agents.deleteVersion(agent.name, agent.version);
  console.log(`Agent version ${agent.version} deleted.`);
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
