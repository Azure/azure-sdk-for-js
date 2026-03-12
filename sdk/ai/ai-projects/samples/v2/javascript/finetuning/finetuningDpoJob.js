// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to obtain an OpenAI client and perform Direct Preference Optimization (DPO) fine-tuning operations.
 * Supported OpenAI models: GPT-4o, GPT-4.1, GPT-4.1-mini, GPT-4.1-nano, and GPT-4o-mini.
 *
 * @summary Using an OpenAI client, this sample demonstrates how to create and cancel dpo fine-tuning jobs.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";
const modelName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4o";
const trainingFilePath = path.join(__dirname, "data", "dpo_training_set.jsonl");
const validationFilePath = path.join(__dirname, "data", "dpo_validation_set.jsonl");

async function main() {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const openAIClient = project.getOpenAIClient();
  console.log("Created OpenAI client.");

  // 1) Create the training and validation files
  const trainingFile = await openAIClient.files.create({
    file: fs.createReadStream(trainingFilePath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded file with ID: ${trainingFile.id}`);
  const validationFile = await openAIClient.files.create({
    file: fs.createReadStream(validationFilePath),
    purpose: "fine-tune",
  });
  console.log(`Uploaded file with ID: ${validationFile.id}`);

  // 2) Wait for the files to be processed
  await openAIClient.files.waitForProcessing(trainingFile.id);
  await openAIClient.files.waitForProcessing(validationFile.id);
  console.log("Files processed.");

  // 3) Create a DPO fine-tuning job
  // Recommended approach to set trainingType. Omitting this field may lead to unsupported behavior.
  const fineTuningJob = await openAIClient.fineTuning.jobs.create(
    {},
    {
      body: {
        trainingType: "Standard",
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
      },
    },
  );
  console.log("Created fine-tuning job:\n", JSON.stringify(fineTuningJob));

  // 4) Cancel the fine-tuning job
  console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
  const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
  console.log(
    `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
  );

  // 5) Delete the file
  console.log(`Deleting file with ID: ${trainingFile.id}`);
  const deletedTrainingFile = await openAIClient.files.delete(trainingFile.id);
  console.log(
    `Successfully deleted file: ${deletedTrainingFile?.id || trainingFile.id}, deleted=${String(deletedTrainingFile?.deleted ?? true)}`,
  );
  console.log(`Deleting file with ID: ${validationFile.id}`);
  const deletedValidationFile = await openAIClient.files.delete(validationFile.id);
  console.log(
    `Successfully deleted file: ${deletedValidationFile?.id || validationFile.id}, deleted=${String(deletedValidationFile?.deleted ?? true)}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});

module.exports = { main };
