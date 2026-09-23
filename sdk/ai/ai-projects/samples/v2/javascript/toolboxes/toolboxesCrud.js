// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to perform CRUD operations on Toolboxes
 * using the AIProjectClient.
 *
 * Toolboxes are currently a preview feature. In the JS SDK, you access
 * these operations via `project.toolboxes`.
 *
 * @summary Demonstrates CRUD operations on Toolboxes using the beta toolboxes API.
 */

const { RestError } = require("@azure/ai-projects");
const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const toolboxName = "mcp";

  // Clean up any existing toolbox with this name
  try {
    await project.toolboxes.delete(toolboxName);
    console.log(`Toolbox \`${toolboxName}\` deleted`);
  } catch (e) {
    if (!(e instanceof RestError && e.statusCode === 404)) {
      throw e;
    }
  }

  // Define tools for the toolbox
  const tools = [
    {
      type: "mcp",
      server_label: "api_specs",
      server_url: "https://gitmcp.io/Azure/azure-rest-api-specs",
      require_approval: "never",
    },
  ];

  // Create a new toolbox version
  const created = await project.toolboxes.createVersion(toolboxName, tools, {
    description: "Example toolbox created by the @azure/ai-projects sample.",
    metadata: { status: "created" },
  });
  const status = created.metadata?.["status"] ?? "unknown status";
  console.log(`Toolbox: ${created.name} (tools: ${created.tools.length}) (status: ${status})`);

  // Retrieve the toolbox
  const fetched = await project.toolboxes.get(toolboxName);
  console.log(`Retrieved toolbox: ${fetched.name} (${fetched.id})`);

  // List toolboxes
  const toolboxes = [];
  for await (const item of project.toolboxes.list({ limit: 10 })) {
    toolboxes.push(item);
  }
  console.log(`Found ${toolboxes.length} toolboxes`);
  for (const item of toolboxes) {
    console.log(`  - ${item.name} (${item.id})`);
  }

  // Delete the toolbox
  await project.toolboxes.delete(toolboxName);
  console.log("Toolbox deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
