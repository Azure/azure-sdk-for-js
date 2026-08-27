// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it } from "vitest";

describe("voice agent generation", function () {
  // TODO(voice-agent): unskip after recording added.
  it.skip("generates a voice agent", async function () {
    const projectEndpoint =
      process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint string>";
    const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
    const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

    const agent = await project.agents.generateAgent({
      kind: "voice",
      name: "voice-agent-test",
      model_type: "self_deployed",
      model: deploymentName,
      goal: "Answer customer questions clearly.",
    });

    await project.agents.deleteVersion(agent.name, agent.versions.latest.version);
  });
});
