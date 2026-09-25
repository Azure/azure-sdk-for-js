// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Generate an evaluation dataset from an uploaded reference document and an inline prompt.
 * The generated dataset and uploaded input file are deleted after inspection.
 *
 * Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_MODEL_NAME to a project endpoint and a model
 * deployment that supports the Responses API. Optional DATASET_NAME supplies the output
 * name prefix (default: simpleqna-file); a unique suffix is appended, with a 50-character limit.
 * Optional POLL_INTERVAL_SECONDS controls SDK polling (default: 10).
 *
 * @summary Generate SimpleQnA evaluation data from file and prompt sources.
 */

import type { DataGenerationJobResult, JobPoller } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { toFile } from "openai";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const model = process.env["FOUNDRY_MODEL_NAME"];
  if (!endpoint || !model) {
    throw new Error(
      "Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_MODEL_NAME before running this sample.",
    );
  }
  const pollIntervalInMs = Number(process.env["POLL_INTERVAL_SECONDS"] ?? "10") * 1_000;
  if (!Number.isFinite(pollIntervalInMs) || pollIntervalInMs <= 0) {
    throw new Error("POLL_INTERVAL_SECONDS must be a positive number.");
  }
  const runId = randomUUID().slice(0, 8);
  const outputName = `${process.env["DATASET_NAME"] ?? "simpleqna-file"}-${runId}`;
  if (outputName.length > 50) {
    throw new Error(
      "Shorten DATASET_NAME so the output name, including its suffix, fits 50 characters.",
    );
  }
  const reference = await readFile(new URL("../agents/assets/product_info.md", import.meta.url));
  if (reference.byteLength < 1_024) {
    throw new Error("The reference document must contain at least 1 KB of content.");
  }

  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const openAIClient = project.getOpenAIClient();
  let inputFileId: string | undefined;
  let jobId: string | undefined;
  let poller: JobPoller<DataGenerationJobResult> | undefined;
  let result: DataGenerationJobResult | undefined;
  try {
    console.log("Uploading the product reference document...");
    const input = await openAIClient.files.create({
      file: await toFile(reference, `product-reference-${runId}.md`),
      purpose: "user_data",
    });
    inputFileId = input.id;
    const processed = await openAIClient.files.waitForProcessing(input.id);
    if (processed.status !== "processed") {
      throw new Error(`Input file ${input.id} did not process successfully: ${processed.status}.`);
    }

    console.log("Generating evaluation questions from the file and prompt...");
    poller = project.beta.datasets.createGenerationJob(
      {
        inputs: {
          name: `simpleqna-file-${runId}`,
          scenario: "evaluation",
          sources: [
            {
              type: "file",
              id: input.id,
              description: "Product features, warranty, and return policy.",
            },
            {
              type: "prompt",
              prompt:
                "Generate challenging questions that combine facts from the reference document.",
              description: "Guidance on question difficulty.",
            },
          ],
          options: { type: "simple_qna", max_samples: 15, model_options: { model } },
          output_options: {
            name: outputName,
            description: "Challenging product questions generated from a reference document.",
            tags: { sample: "simpleqna-file-source", difficulty: "advanced" },
          },
        },
      },
      { updateIntervalInMs: pollIntervalInMs },
    );
    await poller.submitted();
    jobId = poller.operationState?.jobId;
    if (!jobId) {
      throw new Error("The service did not return a data generation job id.");
    }
    console.log(`Submitted data generation job: ${jobId}`);
    poller.onProgress((state) => console.log(`Generation status: ${state.status}`));
    result = await poller.pollUntilDone();
    console.log(`Generated samples: ${result.generated_samples}`);

    let foundDataset = false;
    for (const output of result.outputs ?? []) {
      if (output.type === "dataset" && "name" in output && output.name && output.version) {
        foundDataset = true;
        const dataset = await project.datasets.get(output.name, output.version);
        console.log(`Generated dataset: ${dataset.name}, version: ${dataset.version}`);
        console.log("Description:", dataset.description);
        console.log("Tags:", dataset.tags);
      }
    }
    if (!foundDataset) {
      throw new Error("The job did not return a dataset name and version.");
    }
  } finally {
    // A failed polling request does not mean the service has stopped using the input file.
    let canCleanUp = !poller || poller.isDone;
    result ??= poller?.result;
    if (!canCleanUp && jobId) {
      try {
        const job = await project.beta.datasets.getGenerationJob(jobId);
        canCleanUp = ["succeeded", "failed", "cancelled"].includes(job.status ?? "");
        result ??= job.result;
      } catch (error) {
        console.warn(`Could not check job ${jobId} before cleanup:`, error);
      }
    }
    if (canCleanUp) {
      const cleanup: Array<{ resource: string; action: Promise<unknown> }> = [];
      for (const output of result?.outputs ?? []) {
        if (output.type === "dataset" && "name" in output && output.name && output.version) {
          // Deleting the generated dataset also removes its associated generation job.
          cleanup.push({
            resource: `dataset ${output.name}/${output.version}`,
            action: project.datasets.delete(output.name, output.version),
          });
        }
      }
      if (inputFileId) {
        cleanup.push({
          resource: `input file ${inputFileId}`,
          action: openAIClient.files.delete(inputFileId),
        });
      }
      const outcomes = await Promise.allSettled(cleanup.map(({ action }) => action));
      outcomes.forEach((outcome, index) => {
        if (outcome.status === "rejected") {
          console.warn(`Could not delete ${cleanup[index].resource}:`, outcome.reason);
        } else {
          console.log(`Deleted ${cleanup[index].resource}.`);
        }
      });
    } else {
      console.warn(
        `Job ${jobId ?? "with an unknown id"} may still be running. Retained input file ${inputFileId}; clean up after the job stops.`,
      );
    }
  }
}

main().catch((err) => {
  console.error("Sample failed: ", err);
});
