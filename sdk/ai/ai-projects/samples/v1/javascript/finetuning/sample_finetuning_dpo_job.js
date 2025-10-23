// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to use the fine_tuning.jobs methods to create and retrieve DPO (Direct Preference Optimization) fine-tuning jobs.
 * @summary Given an AIProjectClient, this sample shows how to upload training/validation files and create/retrieve a DPO fine-tuning job.
 */

const { AIProjectClient } = require("@azure/ai-projects");
const { DefaultAzureCredential } = require("@azure/identity");
const fs = require("fs");
require("dotenv/config");

const endpoint = process.env["PROJECT_ENDPOINT"];
const modelName = process.env["MODEL_NAME"] || "gpt-4o";
const trainingFilePath = "finetuning/data/dpo_training_set.jsonl";
const validationFilePath = "finetuning/data/dpo_validation_set.jsonl";

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

  // Create a DPO fine-tuning job
  const fineTuningJob = await openAiClient.fineTuning.jobs.create({
    training_file: trainFile.id,
    validation_file: validationFile.id,
    model: modelName,
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

  // Get the fine-tuning job by ID
  console.log(`\nGetting fine-tuning job with ID: ${fineTuningJob.id}`);
  const retrievedJob = await openAiClient.fineTuning.jobs.retrieve(fineTuningJob.id);
  console.log("Retrieved job:\n", JSON.stringify(retrievedJob));

  // List all fine-tuning jobs
  console.log("\nListing all fine-tuning jobs:");
  const jobsPage = await openAiClient.fineTuning.jobs.list();
  for (const job of jobsPage.data) {
    console.log(JSON.stringify(job));
  }

  // Cancel the fine-tuning job
  console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
  const cancelledJob = await openAiClient.fineTuning.jobs.cancel(fineTuningJob.id);
  console.log(
    `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
