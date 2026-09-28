// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { assertEnvironmentVariable, isPlaybackMode } from "@azure-tools/test-recorder";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import type { AIProjectClient, AgentOptimizationEstimateInputs } from "../../src/index.js";
import { createProjectsClient, createRecorder } from "./utils/createClient.js";

// TODO(agent-optimization): unskip after recordings and a suitable target agent are added.
describe.skip("GA agent optimization", () => {
  let recorder: Recorder;
  let project: AIProjectClient;

  beforeEach(async (context) => {
    recorder = await createRecorder(context);
    project = createProjectsClient(recorder);
  });

  afterEach(async () => {
    await recorder.stop();
  });

  // TODO(agent-optimization): unskip after recording added.
  it.skip("estimates, runs, lists, and promotes optimization candidates", async () => {
    const model = assertEnvironmentVariable("FOUNDRY_MODEL_NAME");
    const inputs: AgentOptimizationEstimateInputs = {
      target_configuration: {
        type: "foundry_agent",
        name: assertEnvironmentVariable("FOUNDRY_AGENT_NAME"),
      },
      optimization_model_configuration: { model },
      optimization_configuration: {
        type: "agent_optimization",
        agent_optimization_space: { target_attributes: ["instructions"] },
        candidate_search_configuration: { max_candidates: 2 },
        evaluation_configuration: {
          evaluation_model: { model },
          evaluators: [{ name: "builtin.coherence" }],
          training_set: {
            type: "target_completion",
            source: {
              type: "inline",
              test_cases: [{ query: "What is the capital of France?", ground_truth: "Paris" }],
            },
          },
        },
      },
    };
    const estimate = await project.agents.estimateOptimizationJob(inputs);
    expect(estimate).toBeDefined();
    const poller = project.agents.createOptimizationJob(inputs, {
      updateIntervalInMs: isPlaybackMode() ? 0 : 5000,
    });
    await poller.submitted();
    const jobId = poller.operationState?.jobId;
    if (!jobId) throw new Error("Missing optimization job id.");
    let promotedVersion: string | undefined;
    try {
      expect((await project.agents.getOptimizationJob(jobId)).id).toBe(jobId);
      const result = await poller.pollUntilDone();
      const bestId = result.candidate_summary?.best_id;
      if (!bestId) throw new Error("No best optimization candidate.");
      const candidates = [];
      for await (const candidate of project.agents.listOptimizationCandidates(jobId)) {
        candidates.push(candidate.candidate_id);
      }
      expect(candidates).toContain(bestId);
      expect((await project.agents.getOptimizationCandidate(jobId, bestId)).candidate_id).toBe(
        bestId,
      );
      const promoted = await project.agents.promoteOptimizationCandidate(jobId, bestId);
      promotedVersion = promoted.promotion?.promoted_agent.version;
      expect(promotedVersion).toBeDefined();
    } finally {
      await project.agents.deleteOptimizationJob(jobId);
      if (promotedVersion) {
        await project.agents.deleteVersion(
          assertEnvironmentVariable("FOUNDRY_AGENT_NAME"),
          promotedVersion,
        );
      }
    }
  });
});
