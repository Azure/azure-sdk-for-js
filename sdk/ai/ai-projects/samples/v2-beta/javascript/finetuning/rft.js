// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to create and cancel reinforcement fine-tuning jobs.
 *
 * @summary Using an OpenAI client, this sample shows how to upload training and validation files
 * and perform reinforcement fine-tuning operations: create and cancel.
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
  });
}

async function uploadFileAndWait(openAiClient, filePath) {
  console.log(`Uploading file from path: ${filePath}`);
  const created = await openAiClient.files.create({
    file: fs.createReadStream(filePath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded file with ID: ${created.id}`);

  return openAiClient.files.retrieve(created.id);
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

  // 3) Cancel the fine-tuning job
  console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
  const cancelledJob = await openAI.fineTuning.jobs.cancel(fineTuningJob.id);
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
