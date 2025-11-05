// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and manage supervised fine-tuning jobs.
 *
 * @summary Using an OpenAI client, this sample shows how to upload training and validation files
 * and perform fine-tuning operations: create, retrieve, list, pause, resume, list events, cancel, and list checkpoints.
 */

import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const openAiBaseUrl = `${endpoint}/openai`;

const modelName = process.env["MODEL_NAME"] || "gpt-4.1";
const trainingFilePath = path.join(__dirname, "data", "training_set.jsonl");
const validationFilePath = path.join(__dirname, "data", "validation_set.jsonl");

type WaitForJobTarget = "trainingStarted" | "paused" | "running";
interface FineTuningJobStatus {
  status: string;
}
type JobStatusPredicate = (job: FineTuningJobStatus) => Promise<boolean | void>;

async function createOpenAI(): Promise<OpenAI> {
  const credential = new DefaultAzureCredential();
  const scope = "https://ai.azure.com/.default";
  const azureADTokenProvider = await getBearerTokenProvider(credential, scope);

  return new OpenAI({
    apiKey: azureADTokenProvider,
    baseURL: openAiBaseUrl,
    defaultQuery: { "api-version": "2025-11-15-preview" },
  });
}

async function uploadFileAndWait(
  openAiClient: OpenAI,
  filePath: string,
): Promise<OpenAI.Files.FileObject> {
  console.log(`Uploading file from path: ${filePath}`);
  const created = await openAiClient.files.create({
    file: fs.createReadStream(filePath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded file with ID: ${created.id}`);

  return openAiClient.files.retrieve(created.id);
}

async function waitForJob(
  client: OpenAI,
  jobId: string,
  target: WaitForJobTarget,
  {
    timeoutMs = 24 * 60 * 60_000, // 24 hours default; bump higher for busy regions/large jobs
    pollMs = 60_000, // poll every 1 minute
  }: { timeoutMs?: number; pollMs?: number } = {},
): Promise<void> {
  // Target-specific predicates
  const predicates: Record<WaitForJobTarget, JobStatusPredicate> = {
    trainingStarted: async (job) => {
      if (job.status === "trainingStarted") return true;
      return false;
    },

    paused: async (job) => {
      if (job.status === "paused") return true;
      return false;
    },

    running: async (job) => {
      if (job.status === "running") return true;
      return false;
    },
  };
  if (!predicates[target]) {
    throw new Error(
      `Unsupported target '${target}'. Use 'trainingStarted' | 'paused' | 'running'.`,
    );
  }

  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const job = await client.fineTuning.jobs.retrieve(jobId);

    console.log(`[waitForJob] job=${jobId} status=${job.status} target=${target}`);

    if (await predicates[target](job)) {
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }

  throw new Error(
    `Timed out after ${Math.round(timeoutMs / 1000)}s waiting for '${target}' on job ${jobId}.`,
  );
}

async function main(): Promise<void> {
  console.log("Getting Azure OpenAI client from AI Project (via AAD token)...");
  const openAI = await createOpenAI();
  console.log("Created OpenAI client.");

  // 1) Upload training and validation files
  console.log("\nUploading training file...");
  const trainingFile = await uploadFileAndWait(openAI, trainingFilePath);
  console.log("Training file processed successfully.");

  console.log("\nUploading validation file...");
  const validationFile = await uploadFileAndWait(openAI, validationFilePath);
  console.log("Validation file processed successfully.");

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
