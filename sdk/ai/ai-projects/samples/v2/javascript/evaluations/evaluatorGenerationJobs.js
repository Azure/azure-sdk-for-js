// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create, inspect, list, cancel, and delete evaluator
 * generation jobs using the root evaluators API.
 *
 * Rubric evaluator generation jobs use `project.evaluators` without preview headers.
 * Set FOUNDRY_CANCEL_EVALUATOR_JOB=true to cancel a job that is still running.
 *
 * @summary Demonstrates evaluator generation job operations using the root evaluators API.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating evaluator generation job...");
  const displayName = `sample-evaluator-generation-job-${Date.now()}`;
  const generationPoller = project.evaluators.createGenerationJob({
    evaluator_display_name: displayName,
    evaluator_name: "sample-generated-evaluator",
    model: deploymentName,
    sources: [
      {
        type: "prompt",
        prompt:
          "Generate rubric criteria for evaluating whether responses are grounded, relevant, and complete.",
        description: "Prompt source for generating a rubric-based evaluator.",
      },
    ],
  });

  // Creating an evaluator generation job is a long-running operation. Once `submitted()`
  // resolves the job is queued and its id is available on the poller state, so it can be
  // inspected while it runs.
  await generationPoller.submitted();

  const jobId = generationPoller.operationState?.jobId;
  if (!jobId) {
    console.log("The service did not return a job id; nothing left to do.");
    return;
  }
  console.log(`Created evaluator generation job (id: ${jobId})`);

  console.log("Listing evaluator generation jobs...");
  for await (const job of project.evaluators.listGenerationJobs({
    limit: 5,
  })) {
    console.log(`  - ${job.id} (${job.status})`);
  }

  const fetchedJob = await project.evaluators.getGenerationJob(jobId);
  console.log(
    `Fetched evaluator generation job (id: ${fetchedJob.id}, status: ${fetchedJob.status})`,
  );

  if (
    process.env["FOUNDRY_CANCEL_EVALUATOR_JOB"] === "true" &&
    (fetchedJob.status === "queued" || fetchedJob.status === "in_progress")
  ) {
    const cancelledJob = await project.evaluators.cancelGenerationJob(jobId);
    console.log(
      `Cancelled evaluator generation job (id: ${cancelledJob.id}, status: ${cancelledJob.status})`,
    );
  } else {
    // Await the poller to get the generated evaluator version back.
    const evaluatorVersion = await generationPoller.pollUntilDone();
    console.log(
      `Generated evaluator version (name: ${evaluatorVersion.name}, version: ${evaluatorVersion.version})`,
    );
    console.log(`  Produced by generation job: ${evaluatorVersion.generation_job_id}`);
    for (const warningType of evaluatorVersion.warnings ?? []) {
      console.log(`  Warning category: ${warningType}`);
    }

    // Detailed, non-fatal input-quality advisories are persisted on the paired job.
    const completedJob = await project.evaluators.getGenerationJob(jobId);
    for (const advisory of completedJob.input_quality_warnings ?? []) {
      console.log(
        `  [${advisory.severity}] ${advisory.code} (${advisory.source}): ${advisory.message}`,
      );
    }
  }

  await project.evaluators.deleteGenerationJob(jobId);
  console.log("Evaluator generation job deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
