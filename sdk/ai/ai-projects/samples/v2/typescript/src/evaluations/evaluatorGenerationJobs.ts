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

import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential(), {
    apiVersion: "2025-11-15-preview" as any,
  });

  console.log("Creating evaluator generation job...");
  const generationJob = await project.beta.evaluators.createGenerationJob({
    inputs: {
      evaluator_display_name: "sample-evaluator-generation-job",
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
  console.log(
    `Evaluator generation job created (id: ${generationJob.id}, status: ${generationJob.status})`,
  );

  const fetchedJob = await project.beta.evaluators.getGenerationJob(generationJob.id!);
  console.log(
    `Fetched evaluator generation job (id: ${fetchedJob.id}, status: ${fetchedJob.status})`,
  );
  console.log(`  Inputs: ${JSON.stringify(fetchedJob)}`);

  console.log("Listing evaluator generation jobs...");
  for await (const job of project.beta.evaluators.listGenerationJobs({
    limit: 5,
  })) {
    console.log(`  - ${job.id} (${job.status})`);
  }

  if (generationJob.status === "queued" || generationJob.status === "in_progress") {
    const cancelledJob = await project.beta.evaluators.cancelGenerationJob(generationJob.id!);
    console.log(
      `Cancelled evaluator generation job (id: ${cancelledJob.id}, status: ${cancelledJob.status})`,
    );
  }

  await project.beta.evaluators.deleteGenerationJob(generationJob.id!);
  console.log("Evaluator generation job deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
