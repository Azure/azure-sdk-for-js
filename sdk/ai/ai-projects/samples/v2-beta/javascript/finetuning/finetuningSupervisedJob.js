// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * This sample demonstrates how to obtain an OpenAI client and perform Supervised Fine-Tuning (SFT) operations.
 * It also shows how to deploy the fine-tuned model using Azure Cognitive Services Management Client
 * and perform inference on the deployed model.
 * Supported OpenAI models: GPT 4o, 4o-mini, 4.1, 4.1-mini
 *
 * @summary Using an OpenAI client, this sample demonstrates how to perform sft operations:
 * create, retrieve, list, pause, resume, list events, list checkpoints, deploy, infer, and cancel.
 */

const { DefaultAzureCredential } = require("@azure/identity");
const { AIProjectClient } = require("@azure/ai-projects");
const { CognitiveServicesManagementClient } = require("@azure/arm-cognitiveservices");
const fs = require("fs");
const path = require("path");
require("dotenv/config");

const projectEndpoint = process.env["AZURE_AI_PROJECT_ENDPOINT"] || "<project endpoint string>";
const modelName = process.env["MODEL_DEPLOYMENT_NAME"] || "gpt-4.1";
const trainingFilePath = path.join(__dirname, "data", "sft_training_set.jsonl");
const validationFilePath = path.join(__dirname, "data", "sft_validation_set.jsonl");

// For Deployment and inferencing on model
const subscription_id =
  process.env["AZURE_AI_PROJECTS_AZURE_SUBSCRIPTION_ID"] || "<subscription id string>";
const resource_group =
  process.env["AZURE_AI_PROJECTS_AZURE_RESOURCE_GROUP"] || "<resource group string>";
const account_name = process.env["AZURE_AI_PROJECTS_AZURE_AOAI_ACCOUNT"] || "<AOAI account string>";

async function retrieveJob(openAIClient, jobId) {
  console.log(`\nGetting fine-tuning job with ID: ${jobId}`);
  const retrievedJob = await openAIClient.fineTuning.jobs.retrieve(jobId);
  console.log("Retrieved job:\n", JSON.stringify(retrievedJob));
}

async function listJobs(openAIClient) {
  console.log("\nListing all fine-tuning jobs:");
  const jobsPage = await openAIClient.fineTuning.jobs.list();
  for (const job of jobsPage.data) {
    console.log(JSON.stringify(job));
  }
}

async function pauseJob(openAIClient, jobId) {
  // Note: Job needs to be in running state in order to pause.
  console.log(`Pausing fine-tuning job with ID: ${jobId}`);
  const pausedJob = await openAIClient.fineTuning.jobs.pause(jobId);
  console.log(pausedJob);
}

async function resumeJob(openAIClient, jobId) {
  // Note: Job needs to be in paused state in order to resume.
  console.log(`Resuming fine-tuning job with ID: ${jobId}`);
  const resumedJob = await openAIClient.fineTuning.jobs.resume(jobId);
  console.log(resumedJob);
}

async function listEvents(openAIClient, jobId) {
  console.log(`\nListing events with limit: 10 for fine-tuning job: ${jobId}`);
  const events = await openAIClient.fineTuning.jobs.listEvents(jobId, { limit: 10 });
  console.log(JSON.stringify(events, null, 2));
}

async function listCheckpoints(openAIClient, jobId) {
  //  Note: To retrieve the checkpoints, job needs to be in terminal state.
  console.log(`\nListing checkpoints with limit: 10 for fine-tuning job: ${jobId}`);
  const checkpoints = await openAIClient.fineTuning.jobs.checkpoints.list(jobId, {
    limit: 10,
  });
  console.log(JSON.stringify(checkpoints, null, 2));
}

async function deployModel(openAIClient, jobId) {
  // Deploy model using Azure Management SDK (azure-mgmt-cognitiveservices).
  // Note: Deployment can only be started after the fine-tuning job completes successfully.
  console.log(`Retrieving fine-tuning job with ID: ${jobId}`);
  const job = await openAIClient.fineTuning.jobs.retrieve(jobId);
  if (!job.fine_tuned_model) {
    throw new Error("Fine-tuned model not found on the job object.");
  }
  const fineTunedModelName = job.fine_tuned_model;
  const deploymentName = "gpt-4-1-fine-tuned";

  const deploymentConfig = {
    sku: { name: "GlobalStandard", capacity: 50 },
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
  // Check for required environment variables
  if (!subscription_id || !resource_group || !account_name) {
    throw new Error(
      "Please set AZURE_AI_PROJECTS_AZURE_SUBSCRIPTION_ID, \
      AZURE_AI_PROJECTS_AZURE_RESOURCE_GROUP, and \
      AZURE_AI_PROJECTS_AZURE_AOAI_ACCOUNT environment variables.",
    );
  }
  const cognitiveClient = new CognitiveServicesManagementClient(
    new DefaultAzureCredential(),
    subscription_id,
  );
  await cognitiveClient.deployments.beginCreateOrUpdate(
    resource_group,
    account_name,
    deploymentName,
    deploymentConfig,
  );

  return deploymentName;
}

async function infer(openAIClient, deploymentName) {
  // Note: Deployment needs to be in succeeded state in order to infer.
  console.log(`Testing fine-tuned model via deployment: ${deploymentName}`);

  const response = await openAIClient.responses.create({
    model: deploymentName,
    input: [{ role: "user", content: "Who invented the telephone?" }],
  });

  console.log(`Model response: ${response.output_text}`);
}

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

  // 3) Create a supervised fine-tuning job
  const fineTuningJob = await openAIClient.fineTuning.jobs.create(
    {},
    {
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
    },
  );
  console.log("Created fine-tuning job:\n", JSON.stringify(fineTuningJob));

  // 4) Retrieve a supervised fine-tuning job
  console.log(`Retrieving fine-tuning job with ID: ${fineTuningJob.id}`);
  await retrieveJob(openAIClient, fineTuningJob.id);

  // 5) List all fine-tuning jobs
  console.log("\nListing all fine-tuning jobs:");
  await listJobs(openAIClient);

  // Uncomment the commented methods to test specific functionalities.
  // 6) Pause the fine-tuning job
  // console.log(`\nPausing fine-tuning job with ID: ${fineTuningJob.id}`);
  // await pauseJob(openAIClient, fineTuningJob.id);
  // 7) Resume the fine-tuning job
  // console.log(`\nResuming fine-tuning job with ID: ${fineTuningJob.id}`);
  // await resumeJob(openAIClient, fineTuningJob.id);

  // 8) List events for the fine-tuning job
  console.log(`\nListing events for fine-tuning job with ID: ${fineTuningJob.id}`);
  await listEvents(openAIClient, fineTuningJob.id);

  // Uncomment the commented methods to test specific functionalities.
  // 9) Deploy the model
  // console.log(`\nDeploying fine-tuned model for job ID: ${fineTuningJob.id}`);
  // const deploymentName = await deployModel(openAIClient, fineTuningJob.id);
  // 10) Infer using the deployed model
  // console.log(`\nInferring using deployed model for job ID: ${fineTuningJob.id}`);
  // await infer(openAIClient, deploymentName);

  // 11) Cancel the fine-tuning job
  console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
  const cancelledJob = await openAIClient.fineTuning.jobs.cancel(fineTuningJob.id);
  console.log(
    `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
  );

  // 12) List checkpoints for the fine-tuning job
  console.log(`Listing checkpoints for fine-tuning job with ID: ${fineTuningJob.id}`);
  await listCheckpoints(openAIClient, fineTuningJob.id);

  // 13) Delete the training and validation files
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

module.exports = {
  retrieveJob,
  listJobs,
  pauseJob,
  resumeJob,
  listEvents,
  listCheckpoints,
  deployModel,
  infer,
  main,
};
