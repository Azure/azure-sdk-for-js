// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and manage supervised fine-tuning jobs.
 *
 * @summary Using an OpenAI client, this sample shows how to upload training and validation files
 * and perform fine-tuning operations: create, retrieve, list, pause, resume, list events, cancel, and list checkpoints.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
// The following OSS models are supported for supervised fine-tuning:
// "ministral-3b"
// "llama-3.3-70b"
// "qwen3-32b"
// "gpt-oss-20b"
const modelName = process.env["MODEL_NAME"] || "ministral-3b";
const trainingFilePath = path.join(__dirname, "data", "training_set.jsonl");
const validationFilePath = path.join(__dirname, "data", "validation_set.jsonl");

async function waitForJob(
  client,
  jobId,
  target,
  {
    timeoutMs = 24 * 60 * 60_000, // 24 hours default; bump higher for busy regions/large jobs
    pollMs = 60_000, // poll every 1 minute
  } = {},
) {
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

async function main() {
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
    `Successfully deleted file: ${deletedTrainingFile?.id || trainingFile.id}, deleted=${String(deletedTrainingFile?.deleted ?? true)}`,
  );
  console.log(`Deleting file with ID: ${validationFile.id}`);
  const deletedValidationFile = await openAI.files.delete(validationFile.id);
  console.log(
    `Successfully deleted file: ${deletedValidationFile?.id || validationFile.id}, deleted=${String(deletedValidationFile?.deleted ?? true)}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
