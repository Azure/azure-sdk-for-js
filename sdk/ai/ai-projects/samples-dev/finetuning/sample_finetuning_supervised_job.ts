// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to obtain an OpenAI client and perform file operations.
 *
 * @summary Using an OpenAI client, this sample demonstrates how to perform files operations:
 * create, retrieve, content, list, and delete.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import type OpenAI from "openai";
import { fileURLToPath } from "url";
import * as fs from "fs";
import * as path from "path";
import "dotenv/config";

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const modelName = process.env["MODEL_NAME"] || "gpt-4.1";
const trainingFilePath = path.join(__dirname, "data", "sft_training_set.jsonl");
const validationFilePath = path.join(__dirname, "data", "sft_validation_set.jsonl");

// For Deployment and inferencing on model
const subscription_id = process.env["AZURE_AI_PROJECTS_AZURE_SUBSCRIPTION_ID"];
const resource_group = process.env["AZURE_AI_PROJECTS_AZURE_RESOURCE_GROUP"];
const account_name = process.env["AZURE_AI_PROJECTS_AZURE_AOAI_ACCOUNT"];

export async function retrieveJob(openAIClient: OpenAI, jobId: string): Promise<void> {
  console.log(`Retrieving fine-tuning job: ${jobId}`);
  const job = await openAIClient.fineTuning.jobs.retrieve(jobId);
  console.log(job);
}

export async function listJobs(openAIClient: OpenAI): Promise<void> {
  console.log("Listing fine-tuning jobs:");
  const jobs = await openAIClient.fineTuning.jobs.list();

  for (const job of jobs.data ?? []) {
    console.log(job);
  }
}

export async function main(): Promise<void> {
  const project = new AIProjectClient(projectEndpoint, new DefaultAzureCredential());

  const openAIClient = await project.getOpenAIClient();
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

  // 3) Create a supervised fine-tuning job
  const fineTuningJob = await openAIClient.fineTuning.jobs.create({
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
  console.log("Created fine-tuning job:\n", JSON.stringify(fineTuningJob));

  // Uncomment any of the following methods to test specific functionalities:

  retrieveJob(openAIClient, fineTuningJob.id);

  listJobs(openAIClient);

  // # pause_job(openai_client, fine_tuning_job.id)

  // # resume_job(openai_client, fine_tuning_job.id)

  // # list_events(openai_client, fine_tuning_job.id)

  // # list_checkpoints(openai_client, fine_tuning_job.id)

  // # deployment_name = deploy_model(openai_client, credential, fine_tuning_job.id)

  // # infer(openai_client, deployment_name)

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
    `Successfully deleted file: ${deletedTrainingFile?.id || trainingFile.id}, deleted=${String(
      deletedTrainingFile?.deleted ?? true,
    )}`,
  );
  console.log(`Deleting file with ID: ${validationFile.id}`);
  const deletedValidationFile = await openAIClient.files.delete(validationFile.id);
  console.log(
    `Successfully deleted file: ${deletedValidationFile?.id || validationFile.id}, deleted=${String(
      deletedValidationFile?.deleted ?? true,
    )}`,
  );
}

main().catch((err) => {
  console.error("The sample encountered an error:", err);
});
