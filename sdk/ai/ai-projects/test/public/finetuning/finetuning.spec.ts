// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import type { OpenAI } from "openai/client";

const testMode = (process.env.TEST_MODE ?? "playback").toLowerCase();
const isLive = testMode === "live";

describe("finetuning - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let openai: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    openai = await projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  async function uploadFileAndWait(
    fileName: string,
  ): Promise<Awaited<ReturnType<typeof openai.files.retrieve>>> {
    const dataUrl = new URL(`./data/${fileName}`, import.meta.url);
    const fs = await import("fs");
    console.log(`Uploading file`);
    const created = await openai.files.create({
      file: fs.createReadStream(dataUrl),
      purpose: "fine-tune",
    });

    console.log(`Uploaded file with ID: ${created.id}`);

    return openai.files.retrieve(created.id);
  }

  async function waitForJob(
    client: OpenAI,
    jobId: string,
    target: string,
    {
      timeoutMs = 24 * 60 * 60_000, // 24 hours default; bump higher for busy regions/large jobs
      pollMs = 60_000, // poll every 1 minute
    }: { timeoutMs?: number; pollMs?: number } = {},
  ): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      const job = await client.fineTuning.jobs.retrieve(jobId);
      console.log(`[waitForJob] job=${jobId} status=${job.status} target=${target}`);
      if (job.status === target) {
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, pollMs));
    }

    throw new Error(
      `Timed out after ${Math.round(timeoutMs / 1000)}s waiting for '${target}' on job ${jobId}.`,
    );
  }

  it.skipIf(!isLive)(
    "should create, retrieve, list, pause, resume, list events, cancel, and list checkpoints.",
    async () => {
      // 1) Upload training and validation files
      console.log(`Starting file upload.`);
      const trainingFile = await uploadFileAndWait("training_set.jsonl");
      assert.isNotNull(trainingFile);
      assert.isString(trainingFile.id);
      console.log(`Uploaded and processed file ID: ${trainingFile.id}`);

      console.log(`Starting file upload.`);
      const validationFile = await uploadFileAndWait("validation_set.jsonl");
      assert.isNotNull(validationFile);
      assert.isString(validationFile.id);
      console.log(`Uploaded and processed file ID: ${validationFile.id}`);

      // 2) Create a supervised fine-tuning job
      console.log("\nCreating supervised fine-tuning job...");
      const fineTuningJob = await openai.fineTuning.jobs.create({
        training_file: trainingFile.id,
        validation_file: validationFile.id,
        model: "gpt-4.1",
        method: {
          type: "supervised",
          supervised: {
            hyperparameters: {
              n_epochs: 3,
              batch_size: 1,
              learning_rate_multiplier: 1.0,
            },
          },
        },
      });
      console.log("Created fine-tuning job:\n", JSON.stringify(fineTuningJob, null, 2));

      // 3) Retrieve the fine-tuning job by ID
      console.log(`\nRetrieving fine-tuning job with ID: ${fineTuningJob.id}`);
      const retrievedJob = await openai.fineTuning.jobs.retrieve(fineTuningJob.id);
      console.log("Retrieved job:\n", JSON.stringify(retrievedJob, null, 2));

      // 4) List all fine-tuning jobs
      console.log("\nListing all fine-tuning jobs:");
      const jobsList = await openai.fineTuning.jobs.list();
      for (const job of jobsList.data ?? []) {
        console.log(JSON.stringify(job, null, 2));
      }

      console.log("\n-- Waiting for training to start --");
      await waitForJob(openai, fineTuningJob.id, "trainingStarted");
      console.log("-- Training started --");

      // 5) Pause the fine-tuning job
      console.log(`\nPausing fine-tuning job with ID: ${fineTuningJob.id}`);
      const pausedJob = await openai.fineTuning.jobs.pause(fineTuningJob.id);
      console.log("Paused job:\n", JSON.stringify(pausedJob, null, 2));

      await waitForJob(openai, fineTuningJob.id, "paused");

      // 6) Resume the fine-tuning job
      console.log(`\nResuming fine-tuning job with ID: ${fineTuningJob.id}`);
      const resumedJob = await openai.fineTuning.jobs.resume(fineTuningJob.id);
      console.log("Resumed job:\n", JSON.stringify(resumedJob, null, 2));

      await waitForJob(openai, fineTuningJob.id, "running");

      // 7) List events for the fine-tuning job (limit 10)
      console.log(`\nListing events for fine-tuning job: ${fineTuningJob.id}`);
      const events = await openai.fineTuning.jobs.listEvents(fineTuningJob.id, { limit: 10 });
      console.log(JSON.stringify(events, null, 2));

      // 8) Cancel the fine-tuning job
      console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
      const cancelledJob = await openai.fineTuning.jobs.cancel(fineTuningJob.id);
      await waitForJob(openai, fineTuningJob.id, "canceled");
      console.log(
        `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
      );

      // 9) List checkpoints for the fine-tuning job (limit 10)
      // Note: job typically needs to be in a terminal state to have checkpoints.
      console.log(`\nListing checkpoints for fine-tuning job: ${fineTuningJob.id}`);
      const checkpoints = await openai.fineTuning.jobs.checkpoints.list(fineTuningJob.id, {
        limit: 10,
      });
      console.log(JSON.stringify(checkpoints, null, 2));

      // 10) Delete the uploaded files
      console.log(`Deleting file ID: ${trainingFile.id}`);
      const deleted = await openai.files.delete(trainingFile.id);
      assert.isTrue(deleted?.deleted === true, "expected file to be deleted");
      console.log(`Deleted file with ID: ${trainingFile.id}`);
      console.log(`Deleting file ID: ${validationFile.id}`);
      const deletedValidation = await openai.files.delete(validationFile.id);
      assert.isTrue(deletedValidation?.deleted === true, "expected file to be deleted");
      console.log(`Deleted file with ID: ${validationFile.id}`);
    },
  );
});
