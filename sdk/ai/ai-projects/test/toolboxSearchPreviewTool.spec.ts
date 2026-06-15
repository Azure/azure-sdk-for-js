// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, it } from "vitest";
import { AIProjectClient } from "../src/index.js";
import type { ToolUnion } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";

describe("toolbox search preview tool", function () {
  it.skip("creates an agent with ToolboxSearchPreviewTool", async function () {
    // TODO(toolbox-search-preview): unskip after recording added.
    const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
    const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
    const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

    const tools: ToolUnion[] = [
      {
        type: "toolbox_search_preview",
        name: "project-toolbox-search",
        description: "Search project toolboxes for tools that can help answer the request.",
      },
    ];

    const agent = await project.agents.createVersion("toolbox-search-test-agent", {
      kind: "prompt",
      model: deploymentName,
      instructions: "Use toolbox search to discover available tools.",
      tools,
    });

    await project.agents.deleteVersion(agent.name, agent.version);
  });
});
