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

const modelName = process.env["MODEL_NAME"] || "gpt-4o";
const trainingFilePath = path.join(__dirname, "data", "dpo_training_set.jsonl");
const validationFilePath = path.join(__dirname, "data", "dpo_validation_set.jsonl");

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

  // Create a DPO fine-tuning job
  const fineTuningJob = await openAI.fineTuning.jobs.create({
    training_file: trainingFile.id,
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

  // 5) Cancel the fine-tuning job
  console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
  const cancelledJob = await openAI.fineTuning.jobs.cancel(fineTuningJob.id);
  console.log(
    `Successfully cancelled fine-tuning job: ${cancelledJob?.id || fineTuningJob.id}, Status: ${cancelledJob.status}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
