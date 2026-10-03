// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample estimates optimization costs, creates an optimization job for an
 * existing agent, waits for it to complete, and inspects its candidates.
 *
 * @summary Create an agent optimization job and inspect its candidates.
 * @azsdk-weight 50
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient, type AgentOptimizationEstimateInputs } from "@azure/ai-projects";
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
      candidate_search_configuration: { max_candidates: 3 },
      evaluation_configuration: {
        evaluation_model: { model: deploymentName },
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
  };

  console.log("Estimating optimization costs without submitting a job...");
  const estimate = await project.agents.estimateOptimizationJob(inputs);
  console.log("Estimated calls:", estimate.call_counts);
  console.log("Estimated cost:", estimate.cost);

  console.log("Creating an optimization job...");
  const poller = project.agents.createOptimizationJob({
    display_name: `sample-agent-optimization-${Date.now()}`,
    ...inputs,
  });
  await poller.submitted();

  const jobId = poller.operationState?.jobId;
  if (!jobId) {
    throw new Error("The service did not return an optimization job id.");
  }
  console.log(`Created optimization job (id: ${jobId})`);

  const result = await poller.pollUntilDone();
  console.log("Optimization result:", result);

  const completedJob = await project.agents.getOptimizationJob(jobId);
  console.log(`Optimization job ${completedJob.id}: ${completedJob.status}`);

  for await (const candidate of project.agents.listOptimizationCandidates(jobId, {
    expand: ["mutations"],
  })) {
    const detail = await project.agents.getOptimizationCandidate(jobId, candidate.candidate_id);
    console.log(`Candidate ${detail.candidate_id}: ${detail.status}`, detail.output);
  }

  await project.agents.deleteOptimizationJob(jobId);
  console.log("Optimization job deleted");
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
