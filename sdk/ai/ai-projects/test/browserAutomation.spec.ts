// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type {
  AIProjectClient,
  BrowserAutomationTool,
  BrowserAutomationToolboxTool,
} from "../src/index.js";
import {
  createProjectsClient,
  createRecorder,
  getToolConnectionId,
} from "./public/utils/createClient.js";

describe("GA browser automation", () => {
  let recorder: Recorder;
  let project: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    project = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("creates an agent version with BrowserAutomationTool", async () => {
    const tool: BrowserAutomationTool = {
      type: "browser_automation",
      browser_automation: {
        connection: {
          project_connection_id: getToolConnectionId("browser-automation"),
        },
      },
    };
    const agent = await project.agents.createVersion("browser-automation-test", {
      kind: "prompt",
      model: assertEnvironmentVariable("FOUNDRY_MODEL_NAME"),
      tools: [tool],
    });
    try {
      const retrieved = await project.agents.getVersion(agent.name, agent.version);
      expect(retrieved.definition).toMatchObject({ tools: [tool] });
    } finally {
      await project.agents.deleteVersion(agent.name, agent.version);
    }
  });

  it("creates a toolbox version with BrowserAutomationToolboxTool", async () => {
    const tool: BrowserAutomationToolboxTool = {
      type: "browser_automation",
      name: "browser",
      browser_automation: {
        connection: {
          project_connection_id: getToolConnectionId("browser-automation"),
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
