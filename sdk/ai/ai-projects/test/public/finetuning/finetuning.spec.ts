// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { createProjectsClient } from "../utils/createClient.js";
import { assert, beforeEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../src/index.js";
import type OpenAI from "openai";

const testMode = (process.env.TEST_MODE ?? "playback").toLowerCase();
const isLiveOrRecord = testMode === "live" || testMode === "record";

// OpenAI SDK tests don't work with test recorder
// Skip in playback mode (only run in live/record mode)
describe.skipIf(!isLiveOrRecord)("finetuning - basic", () => {
  let projectsClient: AIProjectClient;
  let openAIClient: OpenAI;

  beforeEach(async function () {
    projectsClient = createProjectsClient();
    openAIClient = await projectsClient.getOpenAIClient();
  });

  async function uploadFile(
    fileName: string,
  ): Promise<Awaited<ReturnType<typeof openAIClient.files.retrieve>>> {
    const dataUrl = new URL(`./data/${fileName}`, import.meta.url);
    const fs = await import("fs");
    console.log(`Uploading file`);
    const created = await openAIClient.files.create({
      file: fs.createReadStream(dataUrl),
      purpose: "fine-tune",
    });
    console.log(`Uploaded file with ID: ${created.id}`);

    return openAIClient.files.retrieve(created.id);
  }

  async function uploadFilesAndWait(
    fileNames: string[],
  ): Promise<Awaited<ReturnType<typeof openAIClient.files.retrieve>>[]> {
    const results: Awaited<ReturnType<typeof openAIClient.files.retrieve>>[] = [];
    for (const fileName of fileNames) {
      const file = await uploadFile(fileName);
      results.push(file);
    }

    console.log("\nWaiting for files to be processed...");
    await new Promise((resolve) => setTimeout(resolve, 5000));

    for (const file of results) {
      assert.isNotNull(file);
      assert.isString(file.id);
      console.log(`Uploaded and processed file ID: ${file.id}`);
    }

    return results;
  }

  async function deleteFiles(fileIds: string[]): Promise<void> {
    for (const fileId of fileIds) {
      console.log(`Deleting file ID: ${fileId}`);
      const deleted = await openAIClient.files.delete(fileId);
      assert.isTrue(deleted?.deleted === true, "expected file to be deleted");
      console.log(`Deleted file with ID: ${fileId}`);
    }
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

  async function createSupervisedFineTuningJob(
    trainingFileId: string,
    validationFileId: string,
    model: string,
  ): Promise<OpenAI.FineTuning.FineTuningJob> {
    console.log("\nCreating supervised fine-tuning job...");
    const fineTuningJob = await openAIClient.fineTuning.jobs.create({
      training_file: trainingFileId,
      validation_file: validationFileId,
      model: model,
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

    return fineTuningJob;
  }

  async function createDPOFineTuningJob(
    trainingFileId: string,
    validationFileId: string,
    model: string,
  ): Promise<OpenAI.FineTuning.FineTuningJob> {
    console.log("\nCreating DPO fine-tuning job...");
    const fineTuningJob = await openAIClient.fineTuning.jobs.create({
      training_file: trainingFileId,
      validation_file: validationFileId,
      model: model,
      method: {
        type: "dpo",
        dpo: {
          hyperparameters: {
            n_epochs: 3,
            batch_size: 1,
            learning_rate_multiplier: 1.0,
          },
        },
      },
    });
    console.log("Created fine-tuning job:\n", JSON.stringify(fineTuningJob));

    return fineTuningJob;
  }

  async function createRFTFineTuningJob(
    trainingFileId: string,
    validationFileId: string,
    model: string,
    graderModel: string,
  ): Promise<OpenAI.FineTuning.FineTuningJob> {
    console.log("\nCreating RFT fine-tuning job...");
    const grader: OpenAI.Graders.ScoreModelGrader = {
      name: "dummy",
      type: "score_model",
      model: graderModel,
      input: [
        {
          role: "user",
          content:
            "Evaluate the model's response based on correctness and quality. Rate from 0 to 10.",
        },
      ],
      range: [0.0, 10.0],
    };

    const fineTuningJob = await openAIClient.fineTuning.jobs.create({
      training_file: trainingFileId,
      validation_file: validationFileId,
      model: model,
      method: {
        type: "reinforcement",
        reinforcement: {
          grader,
          hyperparameters: {
            n_epochs: 1,
            batch_size: 4,
            learning_rate_multiplier: 2,
            eval_interval: 5,
            eval_samples: 2,
            reasoning_effort: "medium",
          },
        },
      },
    });
    console.log("Created reinforcement fine-tuning job:\n", JSON.stringify(fineTuningJob, null, 2));

    return fineTuningJob;
  }

  it("test_sft_finetuning_create_job", async function () {
    // 1) Upload training and validation files
    const [trainingFile, validationFile] = await uploadFilesAndWait([
      "training_set.jsonl",
      "validation_set.jsonl",
    ]);

    // 2) Create a supervised fine-tuning job
    const fineTuningJob = await createSupervisedFineTuningJob(
      trainingFile.id,
      validationFile.id,
      "gpt-4.1",
    );

    // 3) Cancel the fine-tuning job
    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
    await waitForJob(openAIClient, fineTuningJob.id, "cancelled");
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
    );

    // 4) Delete the uploaded files
    await deleteFiles([trainingFile.id, validationFile.id]);
  }, 30_000);

  it("test_sft_finetuning_create_job_oss_model", async function () {
    // 1) Upload training and validation files
    const [trainingFile, validationFile] = await uploadFilesAndWait([
      "training_set.jsonl",
      "validation_set.jsonl",
    ]);

    // 2) Create a supervised fine-tuning job
    const fineTuningJob = await createSupervisedFineTuningJob(
      trainingFile.id,
      validationFile.id,
      "ministral-3b",
    );

    // 3) Cancel the fine-tuning job
    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
    await waitForJob(openAIClient, fineTuningJob.id, "cancelled");
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
    );

    // 4) Delete the uploaded files
    await deleteFiles([trainingFile.id, validationFile.id]);
  }, 30_000);

  it("test_rft_finetuning_create_job", async function () {
    // 1) Upload training and validation files
    const [trainingFile, validationFile] = await uploadFilesAndWait([
      "countdown_train_100.jsonl",
      "countdown_valid_50.jsonl",
    ]);

    // 2) Create a RFT fine-tuning job
    const fineTuningJob = await createRFTFineTuningJob(
      trainingFile.id,
      validationFile.id,
      "o4-mini",
      "o3-mini",
    );

    // 3) Cancel the fine-tuning job
    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
    await waitForJob(openAIClient, fineTuningJob.id, "cancelled");
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
    );

    // 4) Delete the uploaded files
    await deleteFiles([trainingFile.id, validationFile.id]);
  }, 30_000);

  it("test_dpo_finetuning_create_job", async function () {
    // 1) Upload training and validation files
    const [trainingFile, validationFile] = await uploadFilesAndWait([
      "dpo_training_set.jsonl",
      "dpo_validation_set.jsonl",
    ]);

    // 2) Create a DPO fine-tuning job
    const fineTuningJob = await createDPOFineTuningJob(
      trainingFile.id,
      validationFile.id,
      "gpt-4o-mini",
    );

    // 3) Cancel the fine-tuning job
    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
    await waitForJob(openAIClient, fineTuningJob.id, "cancelled");
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
    );

    // 4) Delete the uploaded files
    await deleteFiles([trainingFile.id, validationFile.id]);
  }, 30_000);

  it("test_finetuning_retrieve_job", async function () {
    // 1) Upload training and validation files
    const [trainingFile, validationFile] = await uploadFilesAndWait([
      "training_set.jsonl",
      "validation_set.jsonl",
    ]);

    // 2) Create a supervised fine-tuning job
    const fineTuningJob = await createSupervisedFineTuningJob(
      trainingFile.id,
      validationFile.id,
      "gpt-4.1",
    );

    // 3) Retrieve the fine-tuning job by ID
    console.log(`\nRetrieving fine-tuning job with ID: ${fineTuningJob.id}`);
    const retrievedJob = await openAIClient.fineTuning.jobs.retrieve(fineTuningJob.id);
    console.log("Retrieved job:\n", JSON.stringify(retrievedJob, null, 2));
    assert.equal(retrievedJob.id, fineTuningJob.id, "Retrieved job ID should match created job ID");

    // 4) Cancel the fine-tuning job
    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
    await waitForJob(openAIClient, fineTuningJob.id, "cancelled");
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
    );

    // 5) Delete the uploaded files
    await deleteFiles([trainingFile.id, validationFile.id]);
  }, 30_000);

  it("test_finetuning_list_jobs", async function () {
    // 1) Upload training and validation files
    const [trainingFile, validationFile] = await uploadFilesAndWait([
      "training_set.jsonl",
      "validation_set.jsonl",
    ]);

    // 2) Create a supervised fine-tuning job
    const fineTuningJob = await createSupervisedFineTuningJob(
      trainingFile.id,
      validationFile.id,
      "gpt-4.1",
    );

    // 3) List all fine-tuning jobs
    console.log("\nListing all fine-tuning jobs:");
    const jobsList = await openAIClient.fineTuning.jobs.list();
    for (const job of jobsList.data ?? []) {
      console.log(JSON.stringify(job, null, 2));
    }
    assert.isTrue(
      jobsList.data?.some((job) => job.id === fineTuningJob.id),
      "Created fine-tuning job should be in the list of jobs",
    );

    // 4) Cancel the fine-tuning job
    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
    await waitForJob(openAIClient, fineTuningJob.id, "cancelled");
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
    );

    // 5) Delete the uploaded files
    await deleteFiles([trainingFile.id, validationFile.id]);
  }, 30_000);

  it("test_finetuning_cancel_job", async function () {
    // 1) Upload training and validation files
    const [trainingFile, validationFile] = await uploadFilesAndWait([
      "training_set.jsonl",
      "validation_set.jsonl",
    ]);

    // 2) Create a supervised fine-tuning job
    const fineTuningJob = await createSupervisedFineTuningJob(
      trainingFile.id,
      validationFile.id,
      "gpt-4.1",
    );

    // 3) Cancel the fine-tuning job
    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
    await waitForJob(openAIClient, fineTuningJob.id, "cancelled");
    assert.equal(
      cancelledJob.status,
      "cancelled",
      "Fine-tuning job status should be 'cancelled' after cancellation",
    );
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
    );

    // 4) Delete the uploaded files
    await deleteFiles([trainingFile.id, validationFile.id]);
  }, 30_000);

  it("test_finetuning_list_events", async function () {
    // 1) Upload training and validation files
    const [trainingFile, validationFile] = await uploadFilesAndWait([
      "training_set.jsonl",
      "validation_set.jsonl",
    ]);

    // 2) Create a supervised fine-tuning job
    const fineTuningJob = await createSupervisedFineTuningJob(
      trainingFile.id,
      validationFile.id,
      "gpt-4.1",
    );

    // 3) List events for the fine-tuning job (limit 10)
    console.log(`\nListing events for fine-tuning job: ${fineTuningJob.id}`);
    const events = await openAIClient.fineTuning.jobs.listEvents(fineTuningJob.id, { limit: 10 });
    console.log(JSON.stringify(events, null, 2));
    assert.isArray(events.data, "Events data should be an array");

    // 4) Cancel the fine-tuning job
    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
    await waitForJob(openAIClient, fineTuningJob.id, "cancelled");
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
    );

    // 5) Delete the uploaded files
    await deleteFiles([trainingFile.id, validationFile.id]);
  }, 30_000);

  it("test_finetuning_pause_resume_job", async function () {
    // 1) Upload training and validation files
    const [trainingFile, validationFile] = await uploadFilesAndWait([
      "training_set.jsonl",
      "validation_set.jsonl",
    ]);

    // 2) Create a supervised fine-tuning job
    const fineTuningJob = await createSupervisedFineTuningJob(
      trainingFile.id,
      validationFile.id,
      "gpt-4.1",
    );

    // 3) Wait for training to start
    console.log("\n-- Waiting for training to start --");
    await waitForJob(openAIClient, fineTuningJob.id, "trainingStarted");
    console.log("-- Training started --");

    // 4) Pause the fine-tuning job
    console.log(`\nPausing fine-tuning job with ID: ${fineTuningJob.id}`);
    const pausedJob = await openAIClient.fineTuning.jobs.pause(fineTuningJob.id);
    console.log("Paused job:\n", JSON.stringify(pausedJob, null, 2));
    await waitForJob(openAIClient, fineTuningJob.id, "paused");
    assert.equal(
      pausedJob.status,
      "paused",
      "Fine-tuning job status should be 'paused' after pausing",
    );

    // 5) Resume the fine-tuning job
    console.log(`\nResuming fine-tuning job with ID: ${fineTuningJob.id}`);
    const resumedJob = await openAIClient.fineTuning.jobs.resume(fineTuningJob.id);
    console.log("Resumed job:\n", JSON.stringify(resumedJob, null, 2));
    await waitForJob(openAIClient, fineTuningJob.id, "running");
    assert.equal(
      resumedJob.status,
      "running",
      "Fine-tuning job status should be 'running' after resuming",
    );

    // 6) Cancel the fine-tuning job
    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
    await waitForJob(openAIClient, fineTuningJob.id, "cancelled");
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
    );

    // 7) Delete the uploaded files
    await deleteFiles([trainingFile.id, validationFile.id]);
  }, 30_000);
});
