// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to store a shell tool in a toolbox with an
 * automatically provisioned container and disabled outbound network access.
 *
 * @summary Demonstrates creating a toolbox version containing a shell tool.
 */

import type { ShellToolboxTool, ToolboxToolUnion } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const toolboxName = "shell-tool-sample";

  const shellTool: ShellToolboxTool = {
    type: "shell",
    name: "workspace_shell",
    description: "Run shell commands in an isolated toolbox container.",
    environment: {
      type: "container_auto",
      network_policy: { type: "disabled" },
    },
  };
  const tools: ToolboxToolUnion[] = [shellTool];

  const version = await project.toolboxes.createVersion(toolboxName, tools, {
    description: "Example toolbox with an isolated shell tool.",
  });
  console.log(`Toolbox version created: ${version.name}:${version.version}`);

  await project.toolboxes.deleteVersion(version.name, version.version);
  console.log("Toolbox version deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
