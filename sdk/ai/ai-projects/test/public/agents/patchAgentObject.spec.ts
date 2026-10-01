// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { createProjectsClient, createRecorder } from "../utils/createClient.js";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";

describe("agents - patch agent object", function () {
  let recorder: Recorder;
  let project: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    project = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // TODO(patchAgentObject): unskip after recording added.
  it.skip("patches an agent endpoint configuration", async function () {
    const agentName = assertEnvironmentVariable("FOUNDRY_HOSTED_AGENT_NAME");
    const agent = await project.agents.patchAgentObject(agentName, {
      agentEndpoint: {
        protocol_configuration: { responses: {} },
      },
    });

    assert.equal(agent.name, agentName);
  });
});
