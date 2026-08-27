// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, it } from "vitest";

// TODO(generateAgent): unskip after recording added.
describe.skip("generateAgent", function () {
  const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint string>";
  const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  it.skip("generates a voice agent", async function () {
    const agent = await project.agents.generateAgent({
      kind: "voice",
      name: "voice-agent-test",
      goal: "Help users create concise meeting agendas.",
      model_type: "self_deployed",
      model: deploymentName,
    });

    await project.agents.delete(agent.name);
  });
});
