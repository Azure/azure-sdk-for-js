// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create, inspect, list, cancel, and delete data
 * generation jobs using the datasets API.
 *
 * In the JS SDK, you access these operations via `project.datasets`. Data generation for the
 * `evaluation` scenario is generally available. The supervised and reinforcement fine-tuning
 * scenarios (`supervised_finetuning_preview` / `reinforcement_finetuning_preview`), together with
 * `question_types` and file outputs, are preview features that require the
 * `DataGenerationJobs=V1Preview` opt-in. The client sends this opt-in for you on every data
 * generation job request.
 *
 * @summary Demonstrates data generation job operations using the datasets API.
 * @azsdk-weight 50
 */

import { AIProjectClient } from "@azure/ai-projects";
import type { FileDataGenerationJobOutput } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating data generation job...");
  const jobName = `sample-data-generation-job-${Date.now()}`;
  const generationPoller = project.datasets.createGenerationJob({
    name: jobName,
    scenario: "supervised_finetuning_preview",
    sources: [
      {
        type: "prompt",
        prompt: "Generate short question-and-answer pairs about Azure AI Foundry projects.",
        description: "Prompt source for generating sample supervised fine-tuning data.",
      },
    ],
    generation_configuration: {
      type: "simple_qna",
      max_samples: 15,
      model_options: {
        model: deploymentName,
      },
      question_types: ["short_answer"],
    },
    output_configuration: {
      name: `${jobName}.jsonl`,
      write_mode: "overwrite",
    },
  });

  // Creating a data generation job is a long-running operation. Once `submitted()` resolves the
  // job is queued and its id is available on the poller state, so it can be inspected while it runs.
  await generationPoller.submitted();

  const jobId = generationPoller.operationState?.jobId;
  if (!jobId) {
    console.log("The service did not return a job id; nothing left to do.");
    return;
  }
  console.log(`Created data generation job (id: ${jobId})`);

  console.log("Listing data generation jobs...");
  for await (const job of project.datasets.listGenerationJobs({
    limit: 5,
  })) {
    console.log(`  - ${job.id} (${job.status})`);
  }

  const fetchedJob = await project.datasets.getGenerationJob(jobId);
  console.log(`Fetched data generation job (id: ${fetchedJob.id}, status: ${fetchedJob.status})`);

  if (fetchedJob.status === "queued" || fetchedJob.status === "in_progress") {
    const cancelledJob = await project.datasets.cancelGenerationJob(jobId);
    console.log(
      `Cancelled data generation job (id: ${cancelledJob.id}, status: ${cancelledJob.status})`,
    );
  } else {
    // Await the poller instead of cancelling when you want the generated output.
    const generationResult = await generationPoller.pollUntilDone();
    console.log(
      `Data generation job completed (${generationResult.generated_samples} sample(s) generated)`,
    );
    for (const output of generationResult.outputs ?? []) {
      if (output.type === "file") {
        const file = output as FileDataGenerationJobOutput;
        console.log(`  - Output file: ${file.filename} (id: ${file.id})`);
      }
    }
  }

  await project.datasets.deleteGenerationJob(jobId);
  console.log("Data generation job deleted");
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
