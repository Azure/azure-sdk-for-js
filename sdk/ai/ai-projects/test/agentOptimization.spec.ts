// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable } from "@azure-tools/test-recorder";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { AIProjectClient } from "../src/index.js";
import { createProjectsClient, createRecorder } from "./public/utils/createClient.js";

describe("agent optimization service scenarios", () => {
  let recorder: Recorder;
  let project: AIProjectClient;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    project = createProjectsClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("estimates an optimization job without submitting it", async () => {
    const model = assertEnvironmentVariable("FOUNDRY_MODEL_NAME");
    // The estimate targets an existing agent, so create one rather than depend on external state.
    const agent = await project.agents.createVersion("agent-optimization-test", {
      kind: "prompt",
      model,
      instructions: "You are a helpful assistant that answers geography questions.",
    });
    try {
      const estimate = await project.agents.estimateOptimizationJob({
        target_configuration: {
          type: "foundry_agent",
          name: agent.name,
        },
        optimization_model_configuration: { model },
        optimization_configuration: {
          type: "agent_optimization",
          agent_optimization_space: { target_attributes: ["instructions"] },
          candidate_search_configuration: { max_candidates: 3 },
          evaluation_configuration: {
            evaluation_model: { model },
            evaluators: [{ name: "builtin.fluency" }],
            training_set: {
              type: "target_completion",
              source: {
                type: "inline",
                test_cases: [{ query: "What is the capital of France?", ground_truth: "Paris" }],
              },
            },
          },
        },
      });
      expect(estimate).toBeDefined();
    } finally {
      await project.agents.deleteVersion(agent.name, agent.version);
    }
  });
});
