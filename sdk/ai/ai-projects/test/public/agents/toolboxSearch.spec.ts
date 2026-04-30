// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "../../../src/index.js";
import type { ToolboxSearchPreviewTool } from "../../../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it } from "vitest";

// TODO(ToolboxSearchPreviewTool): unskip after recording added.
describe.skip("agents - toolbox search tool", function () {
  let project: AIProjectClient;
  const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

  it("setup", async function () {
    const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint string>";
    project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  });

  it.skip("should create an agent with ToolboxSearchPreviewTool", async function () {
    // TODO(ToolboxSearchPreviewTool): unskip after recording added.
    const toolboxSearchTool: ToolboxSearchPreviewTool = {
      type: "toolbox_search_preview",
    };

    const agent = await project.agents.createVersion("ToolboxSearchAgent", {
      kind: "prompt",
      model: deploymentName,
      instructions:
        "You are a helpful assistant. Use the toolbox search tool to discover and invoke relevant tools.",
      tools: [toolboxSearchTool],
    });

    void agent;

    await project.agents.deleteVersion(agent.name, agent.version);
  });
});
