// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and manage supervised fine-tuning jobs.
 *
 * @summary Using an OpenAI client, this sample shows how to upload training and validation files
 * and perform fine-tuning operations: create, retrieve, list, and cancel.
 */

const { DefaultAzureCredential, getBearerTokenProvider } = require("@azure/identity");
const OpenAI = require("openai").default;
const fs = require("fs");
const path = require("path");
require("dotenv/config");

const endpoint = process.env["AZURE_AI_PROJECT_ENDPOINT_STRING"] || "<project endpoint string>";
const openAiBaseUrl = `${endpoint}/openai`;

const modelName = process.env["MODEL_NAME"] || "o4-mini";
const trainingFilePath = path.join(__dirname, "data", "countdown_train_100.jsonl");
const validationFilePath = path.join(__dirname, "data", "countdown_valid_50.jsonl");

async function createOpenAI() {
  const credential = new DefaultAzureCredential();
  const scope = "https://ai.azure.com/.default";
  const azureADTokenProvider = await getBearerTokenProvider(credential, scope);

  return new OpenAI({
    apiKey: azureADTokenProvider,
    baseURL: openAiBaseUrl,
    defaultQuery: { "api-version": "2025-11-15-preview" },
    defaultHeaders: { "accept-encoding": "deflate" },
  });
}

async function uploadFileAndWait(openAiClient, filePath) {
  const pollMs = 2000;
  const timeoutMs = 5 * 60 * 1000; // 5 minutes
  const start = Date.now();

  console.log(`Uploading file from path: ${filePath}`);
  const created = await openAiClient.files.create({
    file: fs.createReadStream(filePath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded file with ID: ${created.id}`);

  while (true) {
    const retrieved = await openAiClient.files.retrieve(created.id);
    if (retrieved.status === "processed") {
      return retrieved;
    }
    if (retrieved.status === "error") {
      throw new Error(
        `File ${retrieved.id} import failed: ${retrieved.status_details || "Unknown reason"}`,
      );
    }
    if (Date.now() - start > timeoutMs) {
      throw new Error(
        `File ${retrieved.id} import did not complete within ${timeoutMs / 1000}s. Last status: ${retrieved.status}`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, pollMs));
  }
}

async function waitForJob(
  client,
  jobId,
  target,
  {
    timeoutMs = 24 * 60 * 60_000, // 24 hours default; bump higher for busy regions/large jobs
    pollMs = 60_000, // poll every 1 minute
  } = {},
) {
  // Target-specific predicates
  const predicates = {
    trainingStarted: async (job) => {
      if (job.status === "trainingStarted") return true;
    },

    paused: async (job) => {
      if (job.status === "paused") return true;
    },

    running: async (job) => {
      if (job.status === "running") return true;
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

async function main() {
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

  // 2) Create a reinforcement fine-tuning job
  const grader = {
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

  // 4) Pause the fine-tuning job
  console.log(`\nPausing fine-tuning job with ID: ${fineTuningJob.id}`);
  const pausedJob = await openAI.fineTuning.jobs.pause(fineTuningJob.id);
  console.log("Paused job:\n", JSON.stringify(pausedJob, null, 2));

  await waitForJob(openAI, fineTuningJob.id, "paused");

  // 5) Resume the fine-tuning job
  console.log(`\nResuming fine-tuning job with ID: ${fineTuningJob.id}`);
  const resumedJob = await openAI.fineTuning.jobs.resume(fineTuningJob.id);
  console.log("Resumed job:\n", JSON.stringify(resumedJob, null, 2));

  await waitForJob(openAI, fineTuningJob.id, "running");

  // 6) List events for the fine-tuning job (limit 10)
  console.log(`\nListing events for fine-tuning job: ${fineTuningJob.id}`);
  const events = await openAI.fineTuning.jobs.listEvents(fineTuningJob.id, { limit: 10 });
  console.log(JSON.stringify(events, null, 2));

  // 7) Cancel the fine-tuning job
  console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
  const cancelledJob = await openAI.fineTuning.jobs.cancel(fineTuningJob.id);
  console.log(
    `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
  );

  // 8) List checkpoints for the fine-tuning job (limit 10)
  // Note: job typically needs to be in a terminal state to have checkpoints.
  console.log(`\nListing checkpoints for fine-tuning job: ${fineTuningJob.id}`);
  const checkpoints = await openAI.fineTuning.jobs.checkpoints.list(fineTuningJob.id, {
    limit: 10,
  });
  console.log(JSON.stringify(checkpoints, null, 2));
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
