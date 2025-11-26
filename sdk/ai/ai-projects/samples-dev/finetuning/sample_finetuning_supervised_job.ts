// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to obtain an OpenAI client and perform sft operations.
 *
 * @summary Using an OpenAI client, this sample demonstrates how to perform sft operations:
 * create, retrieve, list, pause, resume, list events, list checkpoints, deploy, infer, and cancel.
 */

import { DefaultAzureCredential } from "@azure/identity";
import { AIProjectClient } from "@azure/ai-projects";
import { CognitiveServicesManagementClient } from "@azure/arm-cognitiveservices";
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
  console.log(`\nGetting fine-tuning job with ID: ${jobId}`);
  const retrievedJob = await openAIClient.fineTuning.jobs.retrieve(jobId);
  console.log("Retrieved job:\n", JSON.stringify(retrievedJob));
}

export async function listJobs(openAIClient: OpenAI): Promise<void> {
  console.log("\nListing all fine-tuning jobs:");
  const jobsPage = await openAIClient.fineTuning.jobs.list();
  for (const job of jobsPage.data) {
    console.log(JSON.stringify(job));
  }
}

export async function waitForEvent(
  client: OpenAI,
  jobId: string,
  expectedMessages: string[],
  pollIntervalMs = 60_000,
): Promise<void> {
  console.log(`Waiting for job ${jobId} to emit message: ${expectedMessages.join(", ")}`);

  while (true) {
    const events = await client.fineTuning.jobs.listEvents(jobId);
    const logs =
      events.data?.map((e) => ({
        id: e.id,
        created_at: e.created_at,
        level: e.level,
        message: e.message,
      })) ?? [];

    console.log(`Polled following events for job ${jobId}:`, JSON.stringify(logs));

    for (const event of events.data ?? []) {
      if (event.message && expectedMessages.some((msg) => event.message.includes(msg))) {
        console.log(`Matching message detected: "${event.message}"`);
        return;
      }
    }

    await new Promise((resolve) => setTimeout(resolve, pollIntervalMs));
  }
}

export async function pauseJob(openAIClient: OpenAI, jobId: string): Promise<void> {
  console.log(`Pausing fine-tuning job with ID: ${jobId}`);
  const pausedJob = await openAIClient.fineTuning.jobs.pause(jobId);
  console.log(pausedJob);
}

export async function resumeJob(openAIClient: OpenAI, jobId: string): Promise<void> {
  console.log(`Resuming fine-tuning job with ID: ${jobId}`);
  const resumedJob = await openAIClient.fineTuning.jobs.resume(jobId);
  console.log(resumedJob);
}

export async function listEvents(openAIClient: OpenAI, jobId: string): Promise<void> {
  console.log(`\nListing events with limit: 10 for fine-tuning job: ${jobId}`);
  const events = await openAIClient.fineTuning.jobs.listEvents(jobId, { limit: 10 });
  console.log(JSON.stringify(events, null, 2));
}

export async function listCheckpoints(openAIClient: OpenAI, jobId: string): Promise<void> {
  console.log(`\nListing checkpoints with limit: 10 for fine-tuning job: ${jobId}`);
  const checkpoints = await openAIClient.fineTuning.jobs.checkpoints.list(jobId, {
    limit: 10,
  });
  console.log(JSON.stringify(checkpoints, null, 2));
}

export async function deployModel(openAIClient: OpenAI, jobId: string): Promise<string> {
  console.log(`Retrieving fine-tuning job with ID: ${jobId}`);
  const fineTunedModelName = (await openAIClient.fineTuning.jobs.retrieve(jobId)).fine_tuned_model;
  const deploymentName = "gpt-4-1-fine-tuned";

  const deploymentConfig = {
    sku: { name: "GlobalStandard", capacity: 100 },
    properties: {
      model: {
        format: "OpenAI",
        name: fineTunedModelName,
        version: "1",
      },
    },
  };

  console.log(
    `Deploying fine-tuned model: ${fineTunedModelName} with deployment name: ${deploymentName}`,
  );
  const cognitiveClient = new CognitiveServicesManagementClient(
    new DefaultAzureCredential(),
    subscription_id as string,
  );
  const deployment = await cognitiveClient.deployments.beginCreateOrUpdate(
    resource_group as string,
    account_name as string,
    deploymentName,
    deploymentConfig as any,
  );

  while (
    deployment.getOperationState().status !== "succeeded" &&
    deployment.getOperationState().status !== "failed"
  ) {
    console.log(`Deployment status: ${deployment.getOperationState().status}`);
    await new Promise((resolve) => setTimeout(resolve, 60_000));
  }

  console.log(`Model deployment completed: ${deploymentName}`);
  return deploymentName;
}

export async function infer(openAIClient: OpenAI, deploymentName: string): Promise<void> {
  console.log(`Testing fine-tuned model via deployment: ${deploymentName}`);

  const response = await openAIClient.responses.create({
    model: deploymentName,
    input: [{ role: "user", content: "Who invented the telephone?" }],
  });

  console.log(`Model response: ${response.output_text}`);
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
  const fineTuningJob = await openAIClient.fineTuning.jobs.create(null as any, {
    body: {
      trainingType: "Standard",
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
    },
  });
  console.log("Created fine-tuning job:\n", JSON.stringify(fineTuningJob));

  // 4) Retrieve a supervised fine-tuning job
  await retrieveJob(openAIClient, fineTuningJob.id);

  // 5) List all fine-tuning jobs
  await listJobs(openAIClient);

  // Uncomment any of the commented methods to test specific functionalities.

  // await waitForEvent(openAIClient, fineTuningJob.id, ["Training started"]);
  // 6) Pause the fine-tuning job
  // await pauseJob(openAIClient, fineTuningJob.id);
  // await waitForEvent(openAIClient, fineTuningJob.id, ["Training paused"]);
  // 7) Resume the fine-tuning job
  // await resumeJob(openAIClient, fineTuningJob.id);
  // await waitForEvent(openAIClient, fineTuningJob.id, ["Training resumed"]);

  // 8) List events for the fine-tuning job
  await listEvents(openAIClient, fineTuningJob.id);

  await waitForEvent(openAIClient, fineTuningJob.id, ["Training completed"]);
  // 9) Deploy the model
  const deploymentName = await deployModel(openAIClient, fineTuningJob.id);

  // 10) Infer using the deployed model
  await infer(openAIClient, deploymentName);

  // 11) Cancel the fine-tuning job
  console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
  const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
  console.log(
    `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
  );

  // 12) List checkpoints for the fine-tuning job
  await listCheckpoints(openAIClient, fineTuningJob.id);

  // 13) Delete the training and validation files
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
