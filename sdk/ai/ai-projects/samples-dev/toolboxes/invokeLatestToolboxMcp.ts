// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to initialize an MCP connection to the latest
 * version of an existing toolbox using the AIProjectClient.
 *
 * Set FOUNDRY_TOOLBOX_NAME to the name of a toolbox in your project.
 *
 * @summary Invoke the latest toolbox MCP endpoint and inspect toolbox version metadata.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const toolboxName = process.env["FOUNDRY_TOOLBOX_NAME"] || "<toolbox name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Retrieving toolbox metadata...");
  const toolbox = await project.toolboxes.get(toolboxName);
  console.log(`Latest version: ${toolbox.versions.latest.version}`);
  console.log(`Last updated: ${toolbox.updated_at.toISOString()}`);

  console.log("Initializing MCP through the latest toolbox endpoint...");
  const response = await project.toolboxes.invokeLatestToolboxMcp(
    toolboxName,
    "application/json",
    {
      jsonrpc: "2.0",
      id: 1,
      method: "initialize",
      params: {
        protocolVersion: "2025-03-26",
        capabilities: {},
        clientInfo: { name: "ai-projects-sample", version: "1.0.0" },
      },
    },
    { requestOptions: { headers: { accept: "application/json, text/event-stream" } } },
  );
  console.log("MCP initialization response:", response.body);
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
