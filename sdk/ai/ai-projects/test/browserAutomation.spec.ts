// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { describe, expect, it } from "vitest";
import { AIProjectClient } from "../src/index.js";
import type { BrowserAutomationTool, BrowserAutomationToolboxTool } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";

describe("GA browser automation", () => {
  it.skip("creates an agent version with BrowserAutomationTool", async () => {
    // TODO(browser-automation): unskip after recording added.
    const project = new AIProjectClient(
      process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>",
      new DefaultAzureCredential(),
    );
    const tool: BrowserAutomationTool = {
      type: "browser_automation",
      browser_automation: {
        connection: {
          project_connection_id:
            process.env["BROWSER_AUTOMATION_PROJECT_CONNECTION_ID"] ||
            "<browser automation project connection id>",
        },
      },
    };
    const agent = await project.agents.createVersion("browser-automation-test", {
      kind: "prompt",
      model: process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>",
      tools: [tool],
    });
    try {
      const retrieved = await project.agents.getVersion(agent.name, agent.version);
      expect(retrieved.definition).toMatchObject({ tools: [tool] });
    } finally {
      await project.agents.deleteVersion(agent.name, agent.version);
    }
  });

  it.skip("creates a toolbox version with BrowserAutomationToolboxTool", async () => {
    // TODO(browser-automation-toolbox): unskip after recording added.
    const project = new AIProjectClient(
      process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>",
      new DefaultAzureCredential(),
    );
    const tool: BrowserAutomationToolboxTool = {
      type: "browser_automation",
      name: "browser",
      browser_automation: {
        connection: {
          project_connection_id:
            process.env["BROWSER_AUTOMATION_PROJECT_CONNECTION_ID"] ||
            "<browser automation project connection id>",
        },
      },
    };
    const toolbox = await project.toolboxes.createVersion("browser-automation-test", [tool]);
    try {
      const retrieved = await project.toolboxes.getVersion(toolbox.name, toolbox.version);
      expect(retrieved.tools).toMatchObject([tool]);
    } finally {
      await project.toolboxes.deleteVersion(toolbox.name, toolbox.version);
    }
  });
});
