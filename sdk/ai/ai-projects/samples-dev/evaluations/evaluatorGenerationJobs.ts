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

import type { EvaluatorGenerationJob } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import "dotenv/config";

const projectEndpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"] || "<project endpoint>";
const deploymentName = process.env["FOUNDRY_MODEL_NAME"] || "<model deployment name>";

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  console.log("Creating evaluator generation job...");
  const generationJob = await project.beta.evaluators.createGenerationJob(
    {
      inputs: {
        name: "sample-evaluator-generation-job",
        evaluator_name: "sample-generated-evaluator",
        model: deploymentName,
        category: "quality",
        sources: [
          {
            type: "prompt",
            prompt:
              "Generate rubric criteria for evaluating whether responses are grounded, relevant, and complete.",
            description: "Prompt source for generating a rubric-based evaluator.",
          },
        ],
      },
    } as EvaluatorGenerationJob,
    { foundryFeatures: "Evaluations=V1Preview" },
  );
  console.log(
    `Evaluator generation job created (id: ${generationJob.id}, status: ${generationJob.status})`,
  );

  const fetchedJob = await project.beta.evaluators.getGenerationJob(generationJob.id, {
    foundryFeatures: "Evaluations=V1Preview",
  });
  console.log(
    `Fetched evaluator generation job (id: ${fetchedJob.id}, status: ${fetchedJob.status})`,
  );

  console.log("Listing evaluator generation jobs...");
  for await (const job of project.beta.evaluators.listGenerationJobs({
    limit: 5,
    foundryFeatures: "Evaluations=V1Preview",
  })) {
    console.log(`  - ${job.id} (${job.status})`);
  }

  if (generationJob.status === "queued" || generationJob.status === "in_progress") {
    const cancelledJob = await project.beta.evaluators.cancelGenerationJob(generationJob.id, {
      foundryFeatures: "Evaluations=V1Preview",
    });
    console.log(
      `Cancelled evaluator generation job (id: ${cancelledJob.id}, status: ${cancelledJob.status})`,
    );
  }

  await project.beta.evaluators.deleteGenerationJob(generationJob.id, {
    foundryFeatures: "Evaluations=V1Preview",
  });
  console.log("Evaluator generation job deleted");
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
