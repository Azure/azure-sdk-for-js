// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Estimate and run an optimization job for an existing Foundry agent, inspect its
 * candidates, and optionally promote the best candidate to a new agent version.
 * Set FOUNDRY_AGENT_NAME to the agent to optimize. Set PROMOTE_OPTIMIZATION_CANDIDATE
 * to "true" only when you want to create a new version of that agent.
 *
 * @summary Demonstrates GA agent optimization jobs, estimates, and candidates.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type { AgentOptimizationEstimateInputs } from "@azure/ai-projects";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "<agent name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());
  const inputs: AgentOptimizationEstimateInputs = {
    target_configuration: { type: "foundry_agent", name: agentName },
    optimization_model_configuration: { model: deploymentName },
    optimization_configuration: {
      type: "agent_optimization",
      agent_optimization_space: { target_attributes: ["instructions"] },
      candidate_search_configuration: { max_candidates: 2 },
      evaluation_configuration: {
        evaluation_model: { model: deploymentName },
        evaluators: [{ name: "builtin.coherence" }],
        training_set: {
          type: "target_completion",
          source: {
            type: "inline",
            test_cases: [
              { query: "What is the capital of France?", ground_truth: "Paris" },
              { query: "What is the capital of Japan?", ground_truth: "Tokyo" },
            ],
          },
        },
      },
    },
  };

  console.log("Estimating optimization cost without submitting a job...");
  const estimate = await project.agents.estimateOptimizationJob(inputs);
  console.log("Cost estimate:", estimate.cost);

  console.log("Creating an optimization job...");
  const poller = project.agents.createOptimizationJob(inputs);
  await poller.submitted();
  const jobId = poller.operationState?.jobId;
  if (!jobId) {
    throw new Error("The service did not return an optimization job id.");
  }

  try {
    const job = await project.agents.getOptimizationJob(jobId);
    console.log(`Job ${job.id}: ${job.status}`);
    // To stop active work instead of waiting, call:
    // await project.agents.cancelOptimizationJob(jobId);
    const result = await poller.pollUntilDone();
    console.log("Completed candidates:", result.candidate_summary?.completed_candidate_count);

    console.log("Listing optimization jobs...");
    for await (const page of project.agents.listOptimizationJobs().byPage({ maxPageSize: 5 })) {
      console.log(page.map((item) => ({ id: item.id, status: item.status })));
      break;
    }

    console.log("Listing candidates with their mutations...");
    for await (const candidate of project.agents.listOptimizationCandidates(jobId, {
      expand: ["mutations"],
    })) {
      console.log(candidate.candidate_id, candidate.output, candidate.evaluation);
    }

    const bestId = result.candidate_summary?.best_id;
    if (bestId) {
      const best = await project.agents.getOptimizationCandidate(jobId, bestId);
      console.log("Best candidate:", best);
      if (process.env["PROMOTE_OPTIMIZATION_CANDIDATE"] === "true") {
        const promoted = await project.agents.promoteOptimizationCandidate(jobId, bestId);
        console.log("Promoted agent version (retained after cleanup):", promoted.promotion);
      }
    }
  } finally {
    // Deletion cancels active work and removes the job and its candidate artifacts.
    await project.agents.deleteOptimizationJob(jobId);
    console.log("Optimization job deleted.");
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
