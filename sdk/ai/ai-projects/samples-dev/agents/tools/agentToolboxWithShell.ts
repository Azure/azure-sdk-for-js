// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to put a shell tool in a Toolbox and invoke it
 * from a Prompt Agent. The agent receives a natural-language request to
 * report the Python version and working-directory contents of the shell tool's
 * auto-provisioned, network-isolated container.
 *
 * The agent reaches the toolbox through an `MCPTool` pointed at the toolbox's
 * versioned `/mcp` URL. The sample prints the tools exposed by the MCP server,
 * each shell command's arguments and output, and the agent's final response.
 *
 * @summary Create an agent that uses a shell tool from a Foundry Toolbox.
 *
 * @azsdk-weight 100
 */

import type {
  MCPTool,
  ShellToolboxTool,
  ToolboxShellContainerAutoEnvironment,
} from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const modelName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "MyAgent";

const TOOLBOX_NAME = "toolbox_with_shell_tool";
const TOOLBOX_MCP_LABEL = "shell-toolbox";

export async function main(): Promise<void> {
  const credential = new DefaultAzureCredential();
  const project = new AIProjectClient(projectEndpoint, credential);
  const openAIClient = project.getOpenAIClient();

  // Clean up any pre-existing toolbox with the same name
  try {
    await project.toolboxes.delete(TOOLBOX_NAME);
    console.log(`Deleted pre-existing toolbox \`${TOOLBOX_NAME}\``);
  } catch {
    // Toolbox didn't exist — nothing to clean up
  }

  const shellTool: ShellToolboxTool = {
    type: "shell",
    description: "Runs shell commands in a sandboxed container.",
    environment: {
      type: "container_auto",
    } as ToolboxShellContainerAutoEnvironment,
  };

  const toolboxVersion = await project.toolboxes.createVersion(TOOLBOX_NAME, [shellTool], {
    description: "Toolbox with a shell tool running in an auto-provisioned container.",
  });
  console.log(`Created toolbox \`${TOOLBOX_NAME}\` (version ${toolboxVersion.version}).`);

  const toolboxMcpUrl = `${projectEndpoint}/toolboxes/${TOOLBOX_NAME}/versions/${toolboxVersion.version}/mcp?api-version=v1`;
  const token = (await credential.getToken("https://ai.azure.com/.default"))!.token;

  const toolboxMcpTool: MCPTool = {
    type: "mcp",
    server_label: TOOLBOX_MCP_LABEL,
    server_url: toolboxMcpUrl,
    authorization: token,
    require_approval: "never",
  };

  try {
    const agent = await project.agents.createVersion(agentName, {
      kind: "prompt",
      model: modelName,
      instructions:
        "You have a shell tool that runs commands in a sandboxed container with no " +
        "network access. Use it to answer questions about that environment, and report " +
        "the exact command output back to the user.",
      tools: [toolboxMcpTool],
    });
    console.log(`Agent created (name: ${agent.name}, version: ${agent.version})`);

    const response = await openAIClient.responses.create(
      {
        input: "Which Python version is installed, and what is in the working directory?",
      },
      {
        body: { agent_reference: { name: agent.name, type: "agent_reference" } },
      },
    );

    for (const item of response.output) {
      if (item.type === "mcp_list_tools") {
        const toolNames = (item.tools ?? []).map((t: { name: string }) => t.name);
        console.log(`server_label=${item.server_label}, tools=${JSON.stringify(toolNames)}`);
      } else if (item.type === "mcp_call") {
        console.log(`server_label=${item.server_label}, name=${item.name}, error=${item.error}`);
        console.log(`  arguments: ${item.arguments}`);
        console.log(`  output: ${item.output}`);
      }
    }

    console.log(`\nResponse: ${response.output_text}`);

    await project.agents.deleteVersion(agent.name, agent.version);
    console.log("Agent deleted");
  } finally {
    await project.toolboxes.delete(TOOLBOX_NAME);
    console.log(`\nDeleted toolbox \`${TOOLBOX_NAME}\``);
  }
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
