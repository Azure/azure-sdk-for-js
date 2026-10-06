// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to store a Browser Automation tool in a toolbox.
 *
 * @summary Create and retrieve a toolbox version containing BrowserAutomationToolboxTool.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const connectionId =
  process.env["BROWSER_AUTOMATION_PROJECT_CONNECTION_ID"] ||
  "<browser automation project connection id>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const tool = {
    type: "browser_automation",
    name: "browser",
    browser_automation: {
      connection: { project_connection_id: connectionId },
    },
  };

  console.log("Creating a toolbox version with Browser Automation...");
  const toolbox = await project.toolboxes.createVersion("BrowserAutomationSample", [tool]);
  try {
    console.log("Retrieving the toolbox version...");
    const retrieved = await project.toolboxes.getVersion(toolbox.name, toolbox.version);
    console.log(
      "Tool types:",
      retrieved.tools.map((item) => item.type),
    );
  } finally {
    console.log("Deleting the toolbox version...");
    await project.toolboxes.deleteVersion(toolbox.name, toolbox.version);
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});

module.exports = { main };
