// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and cancel reinforcement fine-tuning jobs.
 *
 * @summary Using an OpenAI client, this sample shows how to upload training and validation files
 * and perform reinforcement fine-tuning operations: create and cancel.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type OpenAI from "openai";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const modelName = process.env["MODEL_NAME"] || "o4-mini";
const trainingFilePath = path.join(__dirname, "data", "countdown_train_100.jsonl");
const validationFilePath = path.join(__dirname, "data", "countdown_valid_50.jsonl");

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

  // 2) Create a reinforcement fine-tuning job
  const grader: OpenAI.Graders.ScoreModelGrader = {
    name: "dummy",
    type: "score_model",
    model: "o3-mini",
    input: [
      {
        role: "user",
        content:
          "Evaluate the model's response based on correctness and quality. Rate from 0 to 10.",
      },
    ],
    range: [0.0, 10.0],
  };

  const fineTuningJob = await openAI.fineTuning.jobs.create({
    training_file: trainingFile.id,
    validation_file: validationFile.id,
    model: modelName,
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

  // 3) Cancel the fine-tuning job
  console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
  const cancelledJob = await openAI.fineTuning.jobs.cancel(fineTuningJob.id);
  await waitForJob(openAI, fineTuningJob.id, "cancelled");
  console.log(
    `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
  );

  // 4) Delete the uploaded files
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
