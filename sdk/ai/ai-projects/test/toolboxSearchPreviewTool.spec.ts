// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { AIProjectClient } from "../src/index.js";
import type { MCPTool, ToolboxToolUnion } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";

describe("toolbox search preview tool", function () {
  it.skip("creates a toolbox with ToolboxSearchPreviewToolboxTool and invokes it from an agent", async function () {
    // TODO(toolbox-search-preview): unskip after recording added.
    const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
    const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
    const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
    const credential = new DefaultAzureCredential();

    const toolboxName = "toolbox-search-test";
    const innerMcpLabel = "github";
    const innerMcpUrl = "https://api.githubcopilot.com/mcp";

    const tools: ToolboxToolUnion[] = [
      {
        type: "mcp",
        server_label: innerMcpLabel,
        server_url: innerMcpUrl,
        require_approval: "never",
      },
      {
        type: "toolbox_search_preview",
      },
    ];

    const version = await project.toolboxes.createVersion(toolboxName, tools, {
      description: `Toolbox with \`${innerMcpLabel}\` MCP server and tool search enabled.`,
    });

    const toolboxMcpUrl = `${projectEndpoint}/toolboxes/${toolboxName}/versions/${version.version}/mcp?api-version=v1`;
    const token = (await credential.getToken("https://ai.azure.com/.default")).token;

    const toolboxMcpTool: MCPTool = {
      type: "mcp",
      server_label: "search-tool",
      server_url: toolboxMcpUrl,
      authorization: token,
      require_approval: "never",
    };

    const agent = await project.agents.createVersion("toolbox-search-test-agent", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "Always use the toolbox search tool to answer questions and perform tasks. " +
        "Use `tool_search` to discover a relevant tool, then `call_tool` " +
        "with the tool name returned by the search.",
      tools: [toolboxMcpTool],
    });

    await project.agents.deleteVersion(agent.name, agent.version);
    await project.toolboxes.deleteVersion(version.name, version.version);
  });
});
