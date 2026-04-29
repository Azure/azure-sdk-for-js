// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to perform CRUD operations on Toolboxes
 * using the AIProjectClient.
 *
 * Toolboxes are currently a preview feature. In the JS SDK, you access
 * these operations via `project.beta.toolboxes`.
 *
 * @summary Demonstrates CRUD operations on Toolboxes using the beta toolboxes API.
 */

import type { MCPTool, ToolUnion } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { RestError } from "@azure/core-rest-pipeline";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const toolboxName = "mcp";

  // Clean up any existing toolbox with this name
  try {
    await project.beta.toolboxes.delete(toolboxName);
    console.log(`Toolbox \`${toolboxName}\` deleted`);
  } catch (e) {
    if (!(e instanceof RestError && e.statusCode === 404)) {
      throw e;
    }
  }

  // Define tools for the toolbox
  const tools: ToolUnion[] = [
    {
      type: "mcp",
      server_label: "api_specs",
      server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
      require_approval: "never",
    } satisfies MCPTool,
  ];

  // Create a new toolbox version
  const created = await project.beta.toolboxes.createVersion(toolboxName, tools, {
    description: "Example toolbox created by the @azure/ai-projects sample.",
    metadata: { status: "created" },
  });
  const status = created.metadata?.["status"] ?? "unknown status";
  console.log(`Toolbox: ${created.name} (tools: ${created.tools.length}) (status: ${status})`);

  // Retrieve the toolbox
  const fetched = await project.beta.toolboxes.get(toolboxName);
  console.log(`Retrieved toolbox: ${fetched.name} (${fetched.id})`);

  // List toolboxes
  const toolboxes = [];
  for await (const item of project.beta.toolboxes.list({ limit: 10 })) {
    toolboxes.push(item);
  }
  console.log(`Found ${toolboxes.length} toolboxes`);
  for (const item of toolboxes) {
    console.log(`  - ${item.name} (${item.id})`);
  }

  // Delete the toolbox
  await project.beta.toolboxes.delete(toolboxName);
  console.log("Toolbox deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
