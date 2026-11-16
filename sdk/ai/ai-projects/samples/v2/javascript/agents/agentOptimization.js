// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample estimates optimization costs for an existing agent and inspects
 * candidates from its optimization jobs without submitting or promoting changes.
 *
 * @summary Estimate agent optimization costs and inspect optimization candidates.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";
const agentName = process.env["FOUNDRY_AGENT_NAME"] || "<agent name>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Estimating optimization costs without submitting a job...");
  const estimate = await project.agents.estimateOptimizationJob({
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
  });
  console.log("Estimated calls:", estimate.call_counts);
  console.log("Estimated cost:", estimate.cost);

  console.log("Listing existing optimization jobs for the agent...");
  for await (const job of project.agents.listOptimizationJobs({ agentName })) {
    if (!job.id) {
      continue;
    }
    const details = await project.agents.getOptimizationJob(job.id);
    console.log(`Job ${details.id}: ${details.status}`);
    for await (const candidate of project.agents.listOptimizationCandidates(job.id, {
      expand: ["mutations"],
    })) {
      const detail = await project.agents.getOptimizationCandidate(job.id, candidate.candidate_id);
      console.log(`Candidate ${detail.candidate_id}: ${detail.status}`, detail.output);
    }
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});

module.exports = { main };
