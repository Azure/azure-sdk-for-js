// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create, inspect, list, cancel, and delete evaluator
 * generation jobs using the beta evaluators API.
 *
 * Evaluator generation jobs are currently a preview feature. In the JS SDK, you access
 * these operations via `project.beta.evaluators`.
 *
 * @summary Demonstrates evaluator generation job operations using the beta evaluators API.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential(), {
    apiVersion: "2025-11-15-preview",
  });

  console.log("Creating evaluator generation job...");
  const displayName = `sample-evaluator-generation-job-${Date.now()}`;
  const generationPoller = project.beta.evaluators.createGenerationJob({
    inputs: {
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
    },
  });

  // Creating an evaluator generation job is a long-running operation. The job is queued as
  // soon as the initial request is accepted, so look it up by listing to inspect it while
  // it runs.
  await generationPoller.submitted();

  console.log("Listing evaluator generation jobs...");
  let jobId;
  for await (const job of project.beta.evaluators.listGenerationJobs({
    limit: 5,
  })) {
    console.log(`  - ${job.id} (${job.status})`);
    if (job.inputs?.evaluator_display_name === displayName) {
      jobId = job.id;
    }
  }

  if (!jobId) {
    console.log("No evaluator generation job was found; nothing left to do.");
    return;
  }

  const fetchedJob = await project.beta.evaluators.getGenerationJob(jobId);
  console.log(
    `Fetched evaluator generation job (id: ${fetchedJob.id}, status: ${fetchedJob.status})`,
  );

  if (fetchedJob.status === "queued" || fetchedJob.status === "in_progress") {
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
    const completedJob = await project.beta.evaluators.getGenerationJob(jobId);
    for (const advisory of completedJob.input_quality_warnings ?? []) {
      console.log(
        `  [${advisory.severity}] ${advisory.code} (${advisory.source}): ${advisory.message}`,
      );
    }
  } else {
    const cancelledJob = await project.beta.evaluators.cancelGenerationJob(jobId);
    console.log(
      `Cancelled evaluator generation job (id: ${cancelledJob.id}, status: ${cancelledJob.status})`,
    );
  }

  await project.beta.evaluators.deleteGenerationJob(jobId);
  console.log("Evaluator generation job deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
