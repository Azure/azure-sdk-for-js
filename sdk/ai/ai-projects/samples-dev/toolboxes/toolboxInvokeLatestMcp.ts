// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates sending an MCP initialization request to the latest toolbox version.
 *
 * @summary Invoke the latest toolbox MCP endpoint without selecting a version.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import "dotenv/config";

export async function main(): Promise<void> {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const toolboxName = process.env["FOUNDRY_TOOLBOX_NAME"];
  if (!projectEndpoint || !toolboxName) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_TOOLBOX_NAME before running this sample.",
    );
  }
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Initializing MCP against the latest toolbox version...");
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
