// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and manage supervised fine-tuning jobs.
 *
 * @summary Using an OpenAI client, this sample shows how to upload training and validation files
 * and perform fine-tuning operations: create, retrieve, list, pause, resume, list events, cancel, and list checkpoints.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const modelName = process.env["MODEL_NAME"] || "gpt-4.1";
const trainingFilePath = path.join(__dirname, "data", "training_set.jsonl");
const validationFilePath = path.join(__dirname, "data", "validation_set.jsonl");

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

async function main(): Promise<void> {
  console.log("Getting Azure OpenAI client from AI Project.");
  const projectClient = new AIProjectClient(endpoint, new DefaultAzureCredential());
  const openAI = await projectClient.getOpenAIClient();
  console.log("Created OpenAI client.");

  // 1) Upload training and validation files
  console.log("\nUploading training file...");
  const trainingFile = await openAI.files.create({
    file: fs.createReadStream(trainingFilePath),
    purpose: "fine-tune",
  });
  console.log("Training file processed successfully.");

  console.log("\nUploading validation file...");
  const validationFile = await openAI.files.create({
    file: fs.createReadStream(validationFilePath),
    purpose: "fine-tune",
  });
  console.log("Validation file processed successfully.");

  // Wait 5 seconds for files to be processed
  console.log("\nWaiting for training file to be processed...");
  await new Promise((resolve) => setTimeout(resolve, 5000));

  // 2) Create a supervised fine-tuning job
  console.log("\nCreating supervised fine-tuning job...");
  const fineTuningJob = await openAI.fineTuning.jobs.create({
    training_file: trainingFile.id,
    validation_file: validationFile.id,
    model: modelName,
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
  const retrievedJob = await openAI.fineTuning.jobs.retrieve(fineTuningJob.id);
  console.log("Retrieved job:\n", JSON.stringify(retrievedJob, null, 2));

  // 4) List all fine-tuning jobs
  console.log("\nListing all fine-tuning jobs:");
  const jobsList = await openAI.fineTuning.jobs.list();
  for (const job of jobsList.data ?? []) {
    console.log(JSON.stringify(job, null, 2));
  }

  console.log("\n-- Waiting for training to start --");
  await waitForJob(openAI, fineTuningJob.id, "trainingStarted");
  console.log("-- Training started --");

  // 5) Pause the fine-tuning job
  console.log(`\nPausing fine-tuning job with ID: ${fineTuningJob.id}`);
  const pausedJob = await openAI.fineTuning.jobs.pause(fineTuningJob.id);
  console.log("Paused job:\n", JSON.stringify(pausedJob, null, 2));

  await waitForJob(openAI, fineTuningJob.id, "paused");

  // 6) Resume the fine-tuning job
  console.log(`\nResuming fine-tuning job with ID: ${fineTuningJob.id}`);
  const resumedJob = await openAI.fineTuning.jobs.resume(fineTuningJob.id);
  console.log("Resumed job:\n", JSON.stringify(resumedJob, null, 2));

  await waitForJob(openAI, fineTuningJob.id, "running");

  // 7) List events for the fine-tuning job (limit 10)
  console.log(`\nListing events for fine-tuning job: ${fineTuningJob.id}`);
  const events = await openAI.fineTuning.jobs.listEvents(fineTuningJob.id, { limit: 10 });
  console.log(JSON.stringify(events, null, 2));

  // 8) Cancel the fine-tuning job
  console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
  const cancelledJob = await openAI.fineTuning.jobs.cancel(fineTuningJob.id);
  await waitForJob(openAI, fineTuningJob.id, "cancelled");
  console.log(
    `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
  );

  // 9) List checkpoints for the fine-tuning job (limit 10)
  // Note: job typically needs to be in a terminal state to have checkpoints.
  console.log(`\nListing checkpoints for fine-tuning job: ${fineTuningJob.id}`);
  const checkpoints = await openAI.fineTuning.jobs.checkpoints.list(fineTuningJob.id, {
    limit: 10,
  });
  console.log(JSON.stringify(checkpoints, null, 2));

  // 10) Delete the uploaded files
  console.log(`Deleting file with ID: ${trainingFile.id}`);
  const deletedTrainingFile = await openAI.files.delete(trainingFile.id);
  console.log(
    `Successfully deleted file: ${deletedTrainingFile?.id || trainingFile.id}, deleted=${String(
      deletedTrainingFile?.deleted ?? true,
    )}`,
  );
  console.log(`Deleting file with ID: ${validationFile.id}`);
  const deletedValidationFile = await openAI.files.delete(validationFile.id);
  console.log(
    `Successfully deleted file: ${deletedValidationFile?.id || validationFile.id}, deleted=${String(
      deletedValidationFile?.deleted ?? true,
    )}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
