// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create, inspect, list, cancel, and delete data
 * generation jobs using the beta datasets API.
 *
 * Data generation jobs are currently a preview feature. In the JS SDK, you access these
 * operations via `project.beta.datasets`.
 *
 * @summary Demonstrates data generation job operations using the beta datasets API.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
require("dotenv/config");

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating data generation job...");
  const jobName = `sample-data-generation-job-${Date.now()}`;
  const generationPoller = project.beta.datasets.createGenerationJob({
    inputs: {
      name: jobName,
      scenario: "supervised_finetuning",
      sources: [
        {
          type: "prompt",
          prompt: "Generate short question-and-answer pairs about Azure AI Foundry projects.",
          description: "Prompt source for generating sample supervised fine-tuning data.",
        },
      ],
      options: {
        type: "simple_qna",
        max_samples: 15,
        model_options: {
          model: deploymentName,
        },
        question_types: ["short_answer"],
      },
    },
  });

  // Creating a data generation job is a long-running operation. The job is queued as soon
  // as the initial request is accepted, so look it up by listing to inspect it while it runs.
  await generationPoller.submitted();

  console.log("Listing data generation jobs...");
  let jobId;
  for await (const job of project.beta.datasets.listGenerationJobs({
    limit: 5,
  })) {
    console.log(`  - ${job.id} (${job.status})`);
    if (job.inputs?.name === jobName) {
      jobId = job.id;
    }
  }

  if (!jobId) {
    console.log("No data generation job was found; nothing left to do.");
    return;
  }

  const fetchedJob = await project.beta.datasets.getGenerationJob(jobId);
  console.log(`Fetched data generation job (id: ${fetchedJob.id}, status: ${fetchedJob.status})`);

  if (fetchedJob.status === "queued" || fetchedJob.status === "in_progress") {
    const cancelledJob = await project.beta.datasets.cancelGenerationJob(jobId);
    console.log(
      `Cancelled data generation job (id: ${cancelledJob.id}, status: ${cancelledJob.status})`,
    );
  } else {
    // Await the poller instead of cancelling when you want the generated output.
    const generationResult = await generationPoller.pollUntilDone();
    console.log(
      `Data generation job completed (${generationResult.generated_samples} sample(s) generated)`,
    );
  }

  await project.beta.datasets.deleteGenerationJob(jobId);
  console.log("Data generation job deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
