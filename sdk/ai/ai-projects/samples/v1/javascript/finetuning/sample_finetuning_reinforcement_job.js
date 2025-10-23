// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the fine_tuning.jobs methods to create, pause, resume,
 * list events, and list checkpoints for reinforcement fine-tuning jobs.
 * @summary Given an AIProjectClient, this sample shows how to upload training/validation files and manage
 * reinforcement fine-tuning jobs (pause/resume/events/checkpoints).
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("fs");
require("dotenv/config");

const endpoint = process.env["PROJECT_ENDPOINT"];
const modelName = process.env["MODEL_NAME"] || "o4-mini";
const trainingFilePath = "finetuning/data/countdown_train_100.jsonl";
const validationFilePath = "finetuning/data/countdown_valid_50.jsonl";

// helper: wait until the uploaded file is "processed"
async function waitForFileReady(openAiClient, fileId, { pollMs = 2000, timeoutMs = 5 * 60 * 1000 } = {}) {
  const start = Date.now();
  while (true) {
    const file = await openAiClient.files.retrieve(fileId);
    // Typical statuses: uploaded | processing | processed | failed
    if (file.status === "processed") return file;
    if (file.status === "failed") {
      throw new Error(`File ${fileId} import failed: ${file.status_details || "Unknown reason"}`);
    }
    if (Date.now() - start > timeoutMs) {
      throw new Error(`File ${fileId} import did not complete within ${timeoutMs / 1000}s. Last status: ${file.status}`);
    }
    await new Promise(r => setTimeout(r, pollMs));
  }
}

async function main() {
  const project = new AIProjectClient(endpoint, new DefaultAzureCredential());

  const openAiClient = await project.getAzureOpenAIClient({
    // The API version should match the version of the Azure OpenAI resource.
    apiVersion: "2025-04-01-preview",
  });

  // Upload training and validation files
  console.log("Uploading training file...");
  const trainFile = await openAiClient.files.create({
    file: fs.createReadStream(trainingFilePath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded training file with ID: ${trainFile.id}`);

  console.log("Uploading validation file...");
  const validationFile = await openAiClient.files.create({
    file: fs.createReadStream(validationFilePath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded validation file with ID: ${validationFile.id}`);

  // Wait until both files are processed
  await waitForFileReady(openAiClient, trainFile.id);
  await waitForFileReady(openAiClient, validationFile.id);
  console.log("Both training and validation files are processed.");

  // Create a reinforcement fine-tuning job
  const grader = {
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

  const fineTuningJob = await openAiClient.fineTuning.jobs.create({
    training_file: trainFile.id,
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

  // Pause the fine-tuning job
  console.log(`\nPausing fine-tuning job with ID: ${fineTuningJob.id}`);
  const pausedJob = await openAiClient.fineTuning.jobs.pause(fineTuningJob.id);
  console.log("Paused job:\n", JSON.stringify(pausedJob, null, 2));

  // Resume the fine-tuning job
  console.log(`\nResuming fine-tuning job with ID: ${fineTuningJob.id}`);
  const resumedJob = await openAiClient.fineTuning.jobs.resume(fineTuningJob.id);
  console.log("Resumed job:\n", JSON.stringify(resumedJob, null, 2));

  // List events for the fine-tuning job (limit 10)
  console.log(`\nListing events for fine-tuning job: ${fineTuningJob.id}`);
  const events = await openAiClient.fineTuning.jobs.listEvents(fineTuningJob.id, { limit: 10 });
  console.log(JSON.stringify(events, null, 2));

  // List checkpoints for the fine-tuning job (limit 10)
  // Note: job typically needs to be in a terminal state to have checkpoints.
  console.log(`\nListing checkpoints for fine-tuning job: ${fineTuningJob.id}`);
  const checkpoints = await openAiClient.fineTuning.jobs.checkpoints.list(fineTuningJob.id, {
    limit: 10,
  });
  console.log(JSON.stringify(checkpoints, null, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
