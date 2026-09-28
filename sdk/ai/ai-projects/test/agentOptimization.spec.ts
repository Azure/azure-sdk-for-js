// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { AIProjectClient } from "../src/index.js";
import { DefaultAzureCredential } from "@azure/identity";
import { describe, expect, it } from "vitest";

describe("agent optimization service scenarios", () => {
  // TODO(agent-optimization): add recorder setup and capture recordings before unskipping.
  it.skip("estimates an optimization job without submitting it", async () => {
    const project = new AIProjectClient(
      process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>",
      new DefaultAzureCredential(),
    );
    const model = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
    const estimate = await project.agents.estimateOptimizationJob({
      target_configuration: {
        type: "foundry_agent",
        name: process.env["FOUNDRY_AGENT_NAME"] || "<agent name>",
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
  });
});
