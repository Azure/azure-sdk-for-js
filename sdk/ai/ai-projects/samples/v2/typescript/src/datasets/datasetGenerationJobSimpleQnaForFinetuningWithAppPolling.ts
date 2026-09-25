// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * Generate training and validation files from an uploaded product reference document.
 * The application controls the polling cadence while the SDK manages the long-running operation.
 * The uploaded input and generated output files are deleted after inspection.
 *
 * Set FOUNDRY_PROJECT_ENDPOINT and FOUNDRY_MODEL_NAME to a project endpoint and a model
 * deployment that supports Chat Completions. Optional DATASET_NAME supplies the output
 * filename prefix (default: simpleqna-finetuning); a unique suffix is appended, with a
 * 50-character limit. Optional POLL_INTERVAL_SECONDS controls application polling (default: 10).
 *
 * @summary Generate SimpleQnA fine-tuning files using application-controlled SDK polling.
 */

import type { DataGenerationJobResult, JobPoller } from "@azure/ai-projects";
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";
import { readFile } from "node:fs/promises";
import { randomUUID } from "node:crypto";
import { setTimeout as delay } from "node:timers/promises";
import { toFile } from "openai";
import "dotenv/config";

export async function main(): Promise<void> {
  const endpoint = process.env["FOUNDRY_PROJECT_ENDPOINT"];
  const model = process.env["FOUNDRY_MODEL_NAME"];
  const pollIntervalInMs = Number(process.env["POLL_INTERVAL_SECONDS"] ?? "10") * 1_000;
  if (!Number.isFinite(pollIntervalInMs) || pollIntervalInMs <= 0) {
    throw new Error("POLL_INTERVAL_SECONDS must be a positive number.");
  }
  const runId = randomUUID().slice(0, 8);
  const outputName = `${process.env["DATASET_NAME"] ?? "simpleqna-finetuning"}-${runId}`;
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

    console.log("Submitting a fine-tuning data generation job...");
    poller = project.beta.datasets.createGenerationJob({
      inputs: {
        name: `simpleqna-finetuning-${runId}`,
        scenario: "supervised_finetuning",
        sources: [
          {
            type: "file",
            id: input.id,
            description: "Product features, warranty, and return policy.",
          },
        ],
        options: {
          type: "simple_qna",
          max_samples: 15,
          model_options: { model },
          train_split: 0.8,
          question_types: ["short_answer", "long_answer"],
        },
        output_options: { name: outputName },
      },
    });
    await poller.submitted();
    jobId = poller.operationState?.jobId;
    if (!jobId) {
      throw new Error("The service did not return a data generation job id.");
    }
    console.log(`Submitted data generation job: ${jobId}`);

    // poll() performs one SDK-managed update; only the delay is controlled by the application.
    while (!poller.isDone) {
      const state = await poller.poll();
      console.log(`Generation status: ${state.status}`);
      if (!poller.isDone) {
        await delay(pollIntervalInMs);
      }
    }
    // The poller is already done, so this returns the result or propagates its terminal error.
    result = await poller.pollUntilDone();
    console.log(`Generated samples: ${result.generated_samples}`);

    let foundFile = false;
    for (const output of result.outputs ?? []) {
      if (output.type === "file" && "id" in output && output.id) {
        foundFile = true;
        const file = await openAIClient.files.retrieve(output.id);
        console.log(`Generated file: ${file.filename}, id: ${file.id}, bytes: ${file.bytes}`);
      }
    }
    if (!foundFile) {
      throw new Error("The job did not return any generated fine-tuning files.");
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
      // Delete only files created by this run; leave the generation job record in the service.
      const fileIds = new Set<string>();
      if (inputFileId) fileIds.add(inputFileId);
      for (const output of result?.outputs ?? []) {
        if (output.type === "file" && "id" in output && output.id) fileIds.add(output.id);
      }
      const ids = [...fileIds];
      const outcomes = await Promise.allSettled(ids.map((id) => openAIClient.files.delete(id)));
      outcomes.forEach((outcome, index) => {
        if (outcome.status === "rejected") {
          console.warn(`Could not delete file ${ids[index]}:`, outcome.reason);
        } else {
          console.log(`Deleted file ${ids[index]}.`);
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
