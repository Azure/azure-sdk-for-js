// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to store a cloud computer use preview tool in a
 * toolbox. The project must support this preview tool.
 *
 * @summary Create and retrieve a toolbox with the cloud computer use preview tool.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type { CloudComputerUsePreviewToolboxTool } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const tool: CloudComputerUsePreviewToolboxTool = {
    type: "cloud_computer_use_preview",
    name: "computer",
  };

  console.log("Creating a toolbox with the cloud computer use preview tool...");
  const toolbox = await project.toolboxes.createVersion("CloudComputerUseSample", [tool]);
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
