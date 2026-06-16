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

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating data generation job...");
  const generationJob = await project.beta.datasets.createGenerationJob(
    {
      inputs: {
        name: "sample-data-generation-job",
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
    },
    { foundryFeatures: "DataGenerationJobs=V1Preview" },
  );
  console.log(
    `Data generation job created (id: ${generationJob.id}, status: ${generationJob.status})`,
  );

  const fetchedJob = await project.beta.datasets.getGenerationJob(generationJob.id!, {
    foundryFeatures: "DataGenerationJobs=V1Preview",
  });
  console.log(`Fetched data generation job (id: ${fetchedJob.id}, status: ${fetchedJob.status})`);

  console.log("Listing data generation jobs...");
  for await (const job of project.beta.datasets.listGenerationJobs({
    limit: 5,
    foundryFeatures: "DataGenerationJobs=V1Preview",
  })) {
    console.log(`  - ${job.id} (${job.status})`);
  }

  if (generationJob.status === "queued" || generationJob.status === "in_progress") {
    const cancelledJob = await project.beta.datasets.cancelGenerationJob(generationJob.id!, {
      foundryFeatures: "DataGenerationJobs=V1Preview",
    });
    console.log(
      `Cancelled data generation job (id: ${cancelledJob.id}, status: ${cancelledJob.status})`,
    );
  }

  await project.beta.datasets.deleteGenerationJob(generationJob.id!, {
    foundryFeatures: "DataGenerationJobs=V1Preview",
  });
  console.log("Data generation job deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
