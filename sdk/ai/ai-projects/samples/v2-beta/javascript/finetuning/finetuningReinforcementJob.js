// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to obtain an OpenAI client and perform Reinforcement fine-tuning (RFT) operations.
 * Supported OpenAI models: o4-mini
 *
 * @summary Using an OpenAI client, this sample demonstrates how to create and cancel reinforcement fine-tuning jobs.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";
const modelName = process.env["MODEL_DEPLOYMENT_NAME"] || "o4-mini";
const trainingFilePath = path.join(__dirname, "data", "rft_training_set.jsonl");
const validationFilePath = path.join(__dirname, "data", "rft_validation_set.jsonl");

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

  const grader = {
    name: "Response Quality Grader",
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

  // 3) Create a reinforcement fine-tuning job
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
      },
    },
  );
  console.log("Created reinforcement fine-tuning job:\n", JSON.stringify(fineTuningJob, null, 2));

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
