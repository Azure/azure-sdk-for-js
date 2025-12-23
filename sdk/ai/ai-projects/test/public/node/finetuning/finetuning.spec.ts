// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { DefaultAzureCredential } from "@azure/identity";
import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../../src/index.js";
import { CognitiveServicesManagementClient, type Deployment } from "@azure/arm-cognitiveservices";
import type { FineTuningJob, JobCreateParams } from "openai/resources/fine-tuning/jobs";
import type { ScoreModelGrader } from "openai/resources/graders/grader-models";
import type { OpenAI } from "openai/client";
import { TrainingType, FineTuningJobType, testFinetuningParams } from "./finetuningHelper.js";
import fs from "fs";

const isLive = isLiveMode();

describe("finetuning - basic", () => {
  let recorder: Recorder;
  let projectsClient: AIProjectClient;
  let openai: OpenAI;

  beforeEach(async function (context: VitestTestContext) {
    recorder = await createRecorder(context);
    projectsClient = createProjectsClient(recorder);
    openai = await projectsClient.getOpenAIClient();
  });

  afterEach(async function () {
    await recorder.stop();
  });

  function validateFineTuningJob(
    jobObj: FineTuningJob,
    expectedJobId?: string,
    expectedModel?: string,
    expectedStatus?: string,
  ): void {
    assert.isNotNull(jobObj);
    assert.isNotNull(jobObj.id);
    assert.isNotNull(jobObj.model);
    assert.isNotNull(jobObj.created_at);
    assert.isNotNull(jobObj.status);
    assert.isNotNull(jobObj.training_file);

    if (expectedJobId !== undefined) {
      assert.equal(jobObj.id, expectedJobId);
    }
    if (expectedModel !== undefined) {
      assert.equal(jobObj.model, expectedModel);
    }
    if (expectedStatus !== undefined) {
      assert.equal(jobObj.status, expectedStatus);
    }
  }

  async function uploadTestFiles(jobType: FineTuningJobType): Promise<{
    trainingFile: OpenAI.Files.FileObject;
    validationFile: OpenAI.Files.FileObject;
  }> {
    const trainingFilePath: string = testFinetuningParams[jobType].trainingFileName;
    const validationFilePath: string = testFinetuningParams[jobType].validationFileName;
    const trainingFileUrl: URL = new URL(`./data/${trainingFilePath}`, import.meta.url);
    const validationFileUrl: URL = new URL(`./data/${validationFilePath}`, import.meta.url);

    console.log(`Uploading file`);
    const trainingFile: OpenAI.Files.FileObject = await openai.files.create({
      file: fs.createReadStream(trainingFileUrl),
      purpose: "fine-tune",
    });
    console.log(`Uploaded file with ID: ${trainingFile.id}`);
    const validationFile: OpenAI.Files.FileObject = await openai.files.create({
      file: fs.createReadStream(validationFileUrl),
      purpose: "fine-tune",
    });
    console.log(`Uploaded file with ID: ${validationFile.id}`);

    const trainingProcessedFile: OpenAI.Files.FileObject = await openai.files.waitForProcessing(
      trainingFile.id,
    );
    const validationProcessedFile: OpenAI.Files.FileObject = await openai.files.waitForProcessing(
      validationFile.id,
    );
    console.log("Files processed.");

    assert.isNotNull(trainingProcessedFile);
    assert.isNotNull(validationProcessedFile);

    assert.isNotNull(trainingProcessedFile.id);
    assert.isNotNull(validationProcessedFile.id);

    return { trainingFile: trainingProcessedFile, validationFile: validationProcessedFile };
  }

  async function cleanupTestFile(fileId: string): Promise<void> {
    console.log(`Deleting file with ID: ${fileId}`);
    const deletedFile = await openai.files.delete(fileId);
    console.log(`Successfully deleted file: ${deletedFile?.id}`);
  }

  async function createSftFinetuningJob(
    trainingFileId: string,
    validationFileId: string,
    trainingType: TrainingType,
    modelType: "openai" | "oss",
  ): Promise<FineTuningJob> {
    return openai.fineTuning.jobs.create({} as JobCreateParams, {
      body: {
        trainingType: trainingType,
        training_file: trainingFileId,
        validation_file: validationFileId,
        model: testFinetuningParams[FineTuningJobType.SFT_JOB_TYPE][modelType]!.modelName,
        method: {
          type: "supervised",
          supervised: {
            hyperparameters: {
              n_epochs: testFinetuningParams.nEpochs,
              batch_size: testFinetuningParams.batchSize,
              learning_rate_multiplier: testFinetuningParams.learningRateMultiplier,
            },
          },
        },
      },
    });
  }

  async function createDpoFinetuningJob(
    trainingFileId: string,
    validationFileId: string,
    trainingType: TrainingType,
    modelType: "openai" | "oss",
  ): Promise<FineTuningJob> {
    return openai.fineTuning.jobs.create({} as JobCreateParams, {
      body: {
        trainingType: trainingType,
        training_file: trainingFileId,
        validation_file: validationFileId,
        model: testFinetuningParams[FineTuningJobType.DPO_JOB_TYPE][modelType]!.modelName,
        method: {
          type: "dpo",
          dpo: {
            hyperparameters: {
              n_epochs: testFinetuningParams.nEpochs,
              batch_size: testFinetuningParams.batchSize,
              learning_rate_multiplier: testFinetuningParams.learningRateMultiplier,
            },
          },
        },
      },
    });
  }

  async function createRftFinetuningJob(
    trainingFileId: string,
    validationFileId: string,
    trainingType: TrainingType,
    modelType: "openai" | "oss",
  ): Promise<FineTuningJob> {
    const grader: ScoreModelGrader = {
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

    return openai.fineTuning.jobs.create({} as JobCreateParams, {
      body: {
        trainingType: trainingType,
        training_file: trainingFileId,
        validation_file: validationFileId,
        model: testFinetuningParams[FineTuningJobType.RFT_JOB_TYPE][modelType]!.modelName,
        method: {
          type: "reinforcement",
          reinforcement: {
            grader,
            hyperparameters: {
              n_epochs: testFinetuningParams.nEpochs,
              batch_size: testFinetuningParams.batchSize,
              learning_rate_multiplier: testFinetuningParams.learningRateMultiplier,
              eval_interval: 5,
              eval_samples: 2,
              reasoning_effort: "medium",
            },
          },
        },
      },
    });
  }

  async function sftCreateJobHelper(
    modelType: "openai" | "oss",
    trainingType: TrainingType,
  ): Promise<void> {
    const { trainingFile, validationFile } = await uploadTestFiles(FineTuningJobType.SFT_JOB_TYPE);
    const fineTuningJob = await createSftFinetuningJob(
      trainingFile.id,
      validationFile.id,
      trainingType,
      modelType,
    );
    console.log(
      `Created fine-tuning SFT ${modelType} ${trainingType} job with ID:`,
      fineTuningJob.id,
    );

    validateFineTuningJob(fineTuningJob);
    if (fineTuningJob.training_file !== undefined) {
      assert.equal(fineTuningJob.training_file, trainingFile.id);
    }
    if (fineTuningJob.validation_file !== undefined) {
      assert.equal(fineTuningJob.validation_file, validationFile.id);
    }
    assert.isNotNull(fineTuningJob.method);
    if (fineTuningJob.method?.type !== undefined) {
      assert.equal(fineTuningJob.method?.type, "supervised");
    }
    console.log(
      `Created fine-tuning SFT ${modelType} ${trainingType} job SFT method validation passed - type: ${fineTuningJob.method?.type}`,
    );

    if (modelType === "oss") {
      validateFineTuningJob(
        fineTuningJob,
        undefined,
        testFinetuningParams[FineTuningJobType.SFT_JOB_TYPE].oss!.modelName,
      );
    }

    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openai.fineTuning.jobs.cancel(fineTuningJob.id);
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
    );
    await cleanupTestFile(trainingFile.id);
    await cleanupTestFile(validationFile.id);
  }

  async function dpoCreateJobHelper(
    modelType: "openai" | "oss",
    trainingType: TrainingType,
  ): Promise<void> {
    const { trainingFile, validationFile } = await uploadTestFiles(FineTuningJobType.DPO_JOB_TYPE);
    const fineTuningJob = await createDpoFinetuningJob(
      trainingFile.id,
      validationFile.id,
      trainingType,
      modelType,
    );
    console.log(
      `Created fine-tuning DPO ${modelType} ${trainingType} job with ID:`,
      fineTuningJob.id,
    );

    validateFineTuningJob(fineTuningJob);
    if (fineTuningJob.training_file !== undefined) {
      assert.equal(fineTuningJob.training_file, trainingFile.id);
    }
    if (fineTuningJob.validation_file !== undefined) {
      assert.equal(fineTuningJob.validation_file, validationFile.id);
    }
    assert.isNotNull(fineTuningJob.method);
    if (fineTuningJob.method?.type !== undefined) {
      assert.equal(fineTuningJob.method?.type, "dpo");
    }
    console.log(
      `Created fine-tuning DPO ${modelType} ${trainingType} job DPO method validation passed - type: ${fineTuningJob.method?.type}`,
    );

    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openai.fineTuning.jobs.cancel(fineTuningJob.id);
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
    );
    await cleanupTestFile(trainingFile.id);
    await cleanupTestFile(validationFile.id);
  }

  async function rftCreateJobHelper(
    modelType: "openai" | "oss",
    trainingType: TrainingType,
  ): Promise<void> {
    const { trainingFile, validationFile } = await uploadTestFiles(FineTuningJobType.RFT_JOB_TYPE);
    const fineTuningJob = await createRftFinetuningJob(
      trainingFile.id,
      validationFile.id,
      trainingType,
      modelType,
    );
    console.log(
      `Created fine-tuning RFT ${modelType} ${trainingType} job with ID:`,
      fineTuningJob.id,
    );

    validateFineTuningJob(fineTuningJob);
    if (fineTuningJob.training_file !== undefined) {
      assert.equal(fineTuningJob.training_file, trainingFile.id);
    }
    if (fineTuningJob.validation_file !== undefined) {
      assert.equal(fineTuningJob.validation_file, validationFile.id);
    }
    assert.isNotNull(fineTuningJob.method);
    if (fineTuningJob.method?.type !== undefined) {
      assert.equal(fineTuningJob.method?.type, "reinforcement");
    }
    console.log(
      `Created fine-tuning RFT ${modelType} ${trainingType} job RFT method validation passed - type: ${fineTuningJob.method?.type}`,
    );

    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openai.fineTuning.jobs.cancel(fineTuningJob.id);
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
    );
    await cleanupTestFile(trainingFile.id);
    await cleanupTestFile(validationFile.id);
  }

  async function cancelJobHelper(
    jobType: FineTuningJobType,
    modelType: "openai" | "oss",
    trainingType: TrainingType,
    expectedMethodType: string,
  ): Promise<void> {
    const { trainingFile, validationFile } = await uploadTestFiles(jobType);

    let fineTuningJob: FineTuningJob;
    switch (jobType) {
      case FineTuningJobType.SFT_JOB_TYPE:
        fineTuningJob = await createSftFinetuningJob(
          trainingFile.id,
          validationFile.id,
          trainingType,
          modelType,
        );
        break;
      case FineTuningJobType.DPO_JOB_TYPE:
        fineTuningJob = await createDpoFinetuningJob(
          trainingFile.id,
          validationFile.id,
          trainingType,
          modelType,
        );
        break;
      case FineTuningJobType.RFT_JOB_TYPE:
        fineTuningJob = await createRftFinetuningJob(
          trainingFile.id,
          validationFile.id,
          trainingType,
          modelType,
        );
        break;
      default:
        throw new Error(`Unsupported job type: ${jobType}`);
    }
    console.log(
      `Created fine-tuning ${jobType} ${modelType} ${trainingType} job with ID:`,
      fineTuningJob.id,
    );

    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openai.fineTuning.jobs.cancel(fineTuningJob.id);
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
    );

    // Validate the cancelled job
    validateFineTuningJob(cancelledJob, fineTuningJob.id);
    assert.equal(cancelledJob.status, "cancelled");
    if (cancelledJob.training_file !== undefined) {
      assert.equal(cancelledJob.training_file, trainingFile.id);
    }
    if (cancelledJob.validation_file !== undefined) {
      assert.equal(cancelledJob.validation_file, validationFile.id);
    }

    // Validate method type
    assert.isNotNull(cancelledJob.method, `Method should not be None for ${jobType} job`);
    if (cancelledJob.method?.type !== undefined) {
      assert.equal(cancelledJob.method?.type, expectedMethodType);
    }
    console.log(
      `finetuning cancel ${jobType} ${modelType} ${trainingType} method validation passed - type: ${cancelledJob.method?.type}`,
    );

    // Verify cancellation persisted by retrieving the job
    const retrievedJob = await openai.fineTuning.jobs.retrieve(fineTuningJob.id);
    console.log(
      `finetuning cancel ${jobType} ${modelType} ${trainingType} verified cancellation persisted for job: ${retrievedJob.id}`,
    );
    validateFineTuningJob(retrievedJob, fineTuningJob.id, undefined, "cancelled");

    await cleanupTestFile(trainingFile.id);
    await cleanupTestFile(validationFile.id);
  }

  async function deployJobHelper(
    completedJobIdEnvVar: string,
    deploymentFormat: string,
    deploymentCapacity: number,
    testPrefix: string,
  ): Promise<void> {
    const completedJobId = process.env[completedJobIdEnvVar];
    if (!completedJobId) {
      console.warn(`Environment variable ${completedJobIdEnvVar} is not set. Skipping test.`);
      return;
    }

    const subscriptionId: string = process.env["AZURE_AI_PROJECTS_TESTS_AZURE_SUBSCRIPTION_ID"]!;
    const resourceGroup: string = process.env["AZURE_AI_PROJECTS_TESTS_AZURE_RESOURCE_GROUP"]!;
    const projectEndpoint: string = process.env["AZURE_AI_PROJECTS_TESTS_PROJECT_ENDPOINT"]!;
    if (!subscriptionId || !resourceGroup || !projectEndpoint) {
      console.warn(`One or more required environment variables are not set. Skipping test.`);
      return;
    }

    const accountName = extractAccountNameFromEndpoint(projectEndpoint);
    console.log(`${testPrefix} Account Name: ${accountName}`);

    console.log(`Test deployment for completed job ID: ${completedJobId}`);

    const job = await openai.fineTuning.jobs.retrieve(completedJobId);
    console.log(`${testPrefix} Retrieved job with status: ${job.status}`);

    const finetunedModelName: string = job.fine_tuned_model!!;
    const deploymentName = `test-${completedJobId.slice(-8)}`;

    console.log(`${testPrefix} Deploying model: ${finetunedModelName} as ${deploymentName}`);
    const deploymentConfig: Deployment = {
      sku: { name: "GlobalStandard", capacity: deploymentCapacity },
      properties: {
        model: {
          format: deploymentFormat,
          name: finetunedModelName,
          version: "1",
        },
      },
    };

    console.log(
      `Deploying fine-tuned model: ${finetunedModelName} with deployment name: ${deploymentName}`,
    );
    const cognitiveClient = new CognitiveServicesManagementClient(
      new DefaultAzureCredential(),
      subscriptionId,
    );
    await cognitiveClient.deployments.beginCreateOrUpdate(
      resourceGroup,
      accountName,
      deploymentName,
      deploymentConfig,
    );

    console.log(`Successfully completed deployment test for job: ${completedJobId}`);
  }

  async function inferJobHelper(
    deploymentNameEnvVar: string,
    testPrefix: string,
    inference_content: string,
  ): Promise<void> {
    const deploymentName = process.env[deploymentNameEnvVar];
    if (!deploymentName) {
      console.warn(`Environment variable ${deploymentNameEnvVar} is not set. Skipping test.`);
      return;
    }

    console.log(`Testing inference on deployment: ${deploymentName}`);
    const response = await openai.responses.create({
      model: deploymentName,
      input: [{ role: "user", content: inference_content }],
    });
    console.log(`Model response: ${response.output_text}`);

    assert.isNotNull(response, "Response should not be null");
    assert.isNotNull(response.output_text, "Response output_text should not be null");
    assert.isString(response.output_text, "Response output_text should be a string");
    console.log(`[${testPrefix}] Successfully validated inference response`);

    console.log(`Successfully completed inference test for deployment: ${deploymentName}`);
  }

  function extractAccountNameFromEndpoint(projectEndpoint: string): string {
    const endpointClean = projectEndpoint.replace("https://", "").replace("http://", "");
    if (!endpointClean.includes(".services.ai.azure.com")) {
      throw new Error(
        `Invalid project endpoint format: ${projectEndpoint} - expected format with .services.ai.azure.com`,
      );
    }
    return endpointClean.split(".services.ai.azure.com")[0];
  }

  it.skipIf(!isLive)("should test sft finetuning create job openai standard", async () => {
    await sftCreateJobHelper("openai", TrainingType.STANDARD_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test sft finetuning create job openai globalstandard", async () => {
    await sftCreateJobHelper("openai", TrainingType.GLOBAL_STANDARD_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test sft finetuning create job openai developer", async () => {
    await sftCreateJobHelper("openai", TrainingType.DEVELOPER_TIER_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test sft finetuning create job oss globalstandard", async () => {
    await sftCreateJobHelper("oss", TrainingType.GLOBAL_STANDARD_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test dpo finetuning create job openai standard", async () => {
    await dpoCreateJobHelper("openai", TrainingType.STANDARD_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test dpo finetuning create job openai globalstandard", async () => {
    await dpoCreateJobHelper("openai", TrainingType.GLOBAL_STANDARD_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test dpo finetuning create job openai developer", async () => {
    await dpoCreateJobHelper("openai", TrainingType.DEVELOPER_TIER_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test rft finetuning create job openai standard", async () => {
    await rftCreateJobHelper("openai", TrainingType.STANDARD_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test rft finetuning create job openai globalstandard", async () => {
    await rftCreateJobHelper("openai", TrainingType.GLOBAL_STANDARD_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test rft finetuning create job openai developer", async () => {
    await rftCreateJobHelper("openai", TrainingType.DEVELOPER_TIER_TRAINING_TYPE);
  });

  it.skipIf(!isLive)("should test sft finetuning retrieve job", async () => {
    const { trainingFile, validationFile } = await uploadTestFiles(FineTuningJobType.SFT_JOB_TYPE);
    const fineTuningJob = await createSftFinetuningJob(
      trainingFile.id,
      validationFile.id,
      TrainingType.STANDARD_TRAINING_TYPE,
      "openai",
    );

    console.log(`Retrieving fine-tuning job with ID: ${fineTuningJob.id}`);
    const retrievedJob = await openai.fineTuning.jobs.retrieve(fineTuningJob.id);
    console.log("Retrieved job:\n", JSON.stringify(retrievedJob));

    validateFineTuningJob(retrievedJob, fineTuningJob.id);
    if (retrievedJob.training_file !== undefined) {
      assert.equal(retrievedJob.training_file, trainingFile.id);
    }
    if (retrievedJob.validation_file !== undefined) {
      assert.equal(retrievedJob.validation_file, validationFile.id);
    }
    assert.isNotNull(retrievedJob.method);
    if (retrievedJob.method?.type !== undefined) {
      assert.equal(retrievedJob.method?.type, "supervised");
    }
    assert.isTrue(
      retrievedJob.model.includes(
        testFinetuningParams[FineTuningJobType.SFT_JOB_TYPE]["openai"]!.modelName,
      ),
    );

    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openai.fineTuning.jobs.cancel(fineTuningJob.id);
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
    );
    await cleanupTestFile(trainingFile.id);
    await cleanupTestFile(validationFile.id);
  });

  it.skipIf(!isLive)("should test dpo finetuning retrieve job", async () => {
    const { trainingFile, validationFile } = await uploadTestFiles(FineTuningJobType.DPO_JOB_TYPE);
    const fineTuningJob = await createDpoFinetuningJob(
      trainingFile.id,
      validationFile.id,
      TrainingType.STANDARD_TRAINING_TYPE,
      "openai",
    );

    console.log(`Retrieving fine-tuning job with ID: ${fineTuningJob.id}`);
    const retrievedJob = await openai.fineTuning.jobs.retrieve(fineTuningJob.id);
    console.log("Retrieved job:\n", JSON.stringify(retrievedJob));

    validateFineTuningJob(retrievedJob, fineTuningJob.id);
    if (retrievedJob.training_file !== undefined) {
      assert.equal(retrievedJob.training_file, trainingFile.id);
    }
    if (retrievedJob.validation_file !== undefined) {
      assert.equal(retrievedJob.validation_file, validationFile.id);
    }
    assert.isNotNull(retrievedJob.method);
    if (retrievedJob.method?.type !== undefined) {
      assert.equal(retrievedJob.method?.type, "dpo");
    }
    assert.isTrue(
      retrievedJob.model.includes(
        testFinetuningParams[FineTuningJobType.DPO_JOB_TYPE]["openai"]!.modelName,
      ),
    );

    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openai.fineTuning.jobs.cancel(fineTuningJob.id);
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
    );
    await cleanupTestFile(trainingFile.id);
    await cleanupTestFile(validationFile.id);
  });

  it.skipIf(!isLive)("should test rft finetuning retrieve job", async () => {
    const { trainingFile, validationFile } = await uploadTestFiles(FineTuningJobType.RFT_JOB_TYPE);
    const fineTuningJob = await createRftFinetuningJob(
      trainingFile.id,
      validationFile.id,
      TrainingType.STANDARD_TRAINING_TYPE,
      "openai",
    );

    console.log(`Retrieving fine-tuning job with ID: ${fineTuningJob.id}`);
    const retrievedJob = await openai.fineTuning.jobs.retrieve(fineTuningJob.id);
    console.log("Retrieved job:\n", JSON.stringify(retrievedJob));

    validateFineTuningJob(retrievedJob, fineTuningJob.id);
    if (retrievedJob.training_file !== undefined) {
      assert.equal(retrievedJob.training_file, trainingFile.id);
    }
    if (retrievedJob.validation_file !== undefined) {
      assert.equal(retrievedJob.validation_file, validationFile.id);
    }
    assert.isNotNull(retrievedJob.method);
    if (retrievedJob.method?.type !== undefined) {
      assert.equal(retrievedJob.method?.type, "reinforcement");
    }
    assert.isTrue(
      retrievedJob.model.includes(
        testFinetuningParams[FineTuningJobType.RFT_JOB_TYPE]["openai"]!.modelName,
      ),
    );

    console.log(`\nCancelling fine-tuning job with ID: ${fineTuningJob.id}`);
    const cancelledJob = await openai.fineTuning.jobs.cancel(fineTuningJob.id);
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
    );
    await cleanupTestFile(trainingFile.id);
    await cleanupTestFile(validationFile.id);
  });

  it.skipIf(!isLive)("should test finetuning list jobs", async () => {
    const jobsPage = await openai.fineTuning.jobs.list();
    const jobsList: FineTuningJob[] = [];
    for await (const job of jobsPage) {
      jobsList.push(job);
    }
    console.log(`finetuning list listed ${jobsList.length} jobs`);

    assert.isArray(jobsList, "Jobs list should be a list");

    for (const job of jobsList) {
      assert.isNotNull(job.id, "Job should have an ID");
      assert.isNotNull(job.created_at, "Job should have a creation timestamp");
      assert.isNotNull(job.status, "Job should have a status");
      console.log(`finetuning list validated job ${job.id} with status ${job.status}`);
    }
    console.log(
      `finetuning list successfully validated list functionality with ${jobsList.length} jobs`,
    );
  });

  it.skipIf(!isLive)("should test sft finetuning cancel job openai standard", async () => {
    await cancelJobHelper(
      FineTuningJobType.SFT_JOB_TYPE,
      "openai",
      TrainingType.STANDARD_TRAINING_TYPE,
      "supervised",
    );
  });

  it.skipIf(!isLive)("should test sft finetuning cancel job openai developer", async () => {
    await cancelJobHelper(
      FineTuningJobType.SFT_JOB_TYPE,
      "openai",
      TrainingType.DEVELOPER_TIER_TRAINING_TYPE,
      "supervised",
    );
  });

  it.skipIf(!isLive)("should test sft finetuning cancel job openai globalstandard", async () => {
    await cancelJobHelper(
      FineTuningJobType.SFT_JOB_TYPE,
      "openai",
      TrainingType.GLOBAL_STANDARD_TRAINING_TYPE,
      "supervised",
    );
  });

  it.skipIf(!isLive)("should test sft finetuning cancel job oss globalstandard", async () => {
    await cancelJobHelper(
      FineTuningJobType.SFT_JOB_TYPE,
      "oss",
      TrainingType.GLOBAL_STANDARD_TRAINING_TYPE,
      "supervised",
    );
  });

  it.skipIf(!isLive)("should test dpo finetuning cancel job openai standard", async () => {
    await cancelJobHelper(
      FineTuningJobType.DPO_JOB_TYPE,
      "openai",
      TrainingType.STANDARD_TRAINING_TYPE,
      "dpo",
    );
  });

  it.skipIf(!isLive)("should test dpo finetuning cancel job openai developer", async () => {
    await cancelJobHelper(
      FineTuningJobType.DPO_JOB_TYPE,
      "openai",
      TrainingType.DEVELOPER_TIER_TRAINING_TYPE,
      "dpo",
    );
  });

  it.skipIf(!isLive)("should test dpo finetuning cancel job openai globalstandard", async () => {
    await cancelJobHelper(
      FineTuningJobType.DPO_JOB_TYPE,
      "openai",
      TrainingType.GLOBAL_STANDARD_TRAINING_TYPE,
      "dpo",
    );
  });

  it.skipIf(!isLive)("should test rft finetuning cancel job openai standard", async () => {
    await cancelJobHelper(
      FineTuningJobType.RFT_JOB_TYPE,
      "openai",
      TrainingType.STANDARD_TRAINING_TYPE,
      "reinforcement",
    );
  });

  it.skipIf(!isLive)("should test rft finetuning cancel job openai developer", async () => {
    await cancelJobHelper(
      FineTuningJobType.RFT_JOB_TYPE,
      "openai",
      TrainingType.DEVELOPER_TIER_TRAINING_TYPE,
      "reinforcement",
    );
  });

  it.skipIf(!isLive)("should test rft finetuning cancel job openai globalstandard", async () => {
    await cancelJobHelper(
      FineTuningJobType.RFT_JOB_TYPE,
      "openai",
      TrainingType.GLOBAL_STANDARD_TRAINING_TYPE,
      "reinforcement",
    );
  });

  it.skipIf(!isLive)("should test finetuning list events", async () => {
    const { trainingFile, validationFile } = await uploadTestFiles(FineTuningJobType.SFT_JOB_TYPE);
    const fineTuningJob = await createSftFinetuningJob(
      trainingFile.id,
      validationFile.id,
      TrainingType.STANDARD_TRAINING_TYPE,
      "openai",
    );

    validateFineTuningJob(fineTuningJob);
    if (fineTuningJob.training_file !== undefined) {
      assert.equal(fineTuningJob.training_file, trainingFile.id);
    }
    if (fineTuningJob.validation_file !== undefined) {
      assert.equal(fineTuningJob.validation_file, validationFile.id);
    }
    assert.isNotNull(fineTuningJob.method);
    if (fineTuningJob.method?.type !== undefined) {
      assert.equal(fineTuningJob.method?.type, "supervised");
    }

    const cancelledJob = await openai.fineTuning.jobs.cancel(fineTuningJob.id);
    console.log(
      `Successfully cancelled fine-tuning job: ${cancelledJob.id}, Status: ${cancelledJob.status}`,
    );

    const eventsPage = await openai.fineTuning.jobs.listEvents(fineTuningJob.id);
    const eventsList = [];
    for await (const event of eventsPage) {
      eventsList.push(event);
    }
    console.log(
      `finetuning list events listed ${eventsList.length} events for job: ${fineTuningJob.id}`,
    );

    assert.isAbove(eventsList.length, 0, "Fine-tuning job should have at least one event");

    for (const event of eventsList) {
      assert.isNotNull(event.id, "Event should have an ID");
      assert.isNotNull(event.object, "Event should have an object type");
      assert.isNotNull(event.created_at, "Event should have a creation timestamp");
      assert.isNotNull(event.level, "Event should have a level");
      assert.isNotNull(event.message, "Event should have a message");
      assert.isNotNull(event.type, "Event should have a type");
    }
    console.log(`finetuning list events successfully validated ${eventsList.length} events`);

    await cleanupTestFile(trainingFile.id);
    await cleanupTestFile(validationFile.id);
  });

  it.skipIf(!isLive)("should test finetuning pause job", async () => {
    const runningJobId = process.env["AZURE_AI_PROJECTS_TESTS_RUNNING_FINE_TUNING_JOB_ID"];
    if (!runningJobId) {
      console.warn(
        "Skipping finetuning pause job test because AZURE_AI_PROJECTS_TESTS_RUNNING_FINE_TUNING_JOB_ID is not set.",
      );
      return;
    }

    console.log(`Retrieving fine-tuning job with ID: ${runningJobId}`);
    const retrievedJob = await openai.fineTuning.jobs.retrieve(runningJobId);
    console.log("Retrieved job:\n", JSON.stringify(retrievedJob));

    console.log(`Job status before pausing: ${retrievedJob.status}`);
    if (retrievedJob.status !== "running") {
      console.warn(
        `Skipping pause test because job status is ${retrievedJob.status}, expected 'running'.`,
      );
      return;
    }

    console.log(`Pausing fine-tuning job with ID: ${runningJobId}`);
    const pausedJob = await openai.fineTuning.jobs.pause(runningJobId);
    console.log(pausedJob);

    validateFineTuningJob(pausedJob, runningJobId);
    if (pausedJob.status !== undefined) {
      assert.equal(pausedJob.status, "paused");
    }
    console.log(`Job status after pausing: ${pausedJob.status}`);
    console.log(`finetuning pause job successfully paused and verified job: ${pausedJob.id}`);
  });

  it.skipIf(!isLive)("should test finetuning resume job", async () => {
    const pausedJobId = process.env["AZURE_AI_PROJECTS_TESTS_PAUSED_FINE_TUNING_JOB_ID"];
    if (!pausedJobId) {
      console.warn(
        "Skipping finetuning resume job test because AZURE_AI_PROJECTS_TESTS_PAUSED_FINE_TUNING_JOB_ID is not set.",
      );
      return;
    }

    console.log(`Retrieving fine-tuning job with ID: ${pausedJobId}`);
    const retrievedJob = await openai.fineTuning.jobs.retrieve(pausedJobId);
    console.log("Retrieved job:\n", JSON.stringify(retrievedJob));

    console.log(`Job status before resuming: ${retrievedJob.status}`);

    console.log(`Resuming fine-tuning job with ID: ${pausedJobId}`);
    const resumedJob = await openai.fineTuning.jobs.resume(pausedJobId);

    validateFineTuningJob(resumedJob, pausedJobId);
    if (resumedJob.status !== undefined) {
      assert.equal(resumedJob.status, "running");
    }
    console.log(`Job status after resuming: ${resumedJob.status}`);
    console.log(`finetuning resume job successfully resumed and verified job: ${resumedJob.id}`);
  });

  it.skipIf(!isLive)("should test finetuning list checkpoints", async () => {
    const completedJobId =
      process.env["AZURE_AI_PROJECTS_TESTS_COMPLETED_OAI_MODEL_SFT_FINE_TUNING_JOB_ID"];
    if (!completedJobId) {
      console.warn(
        "Skipping finetuning list checkpoints test because AZURE_AI_PROJECTS_TESTS_COMPLETED_OAI_MODEL_SFT_FINE_TUNING_JOB_ID is not set.",
      );
      return;
    }

    console.log(`Retrieving fine-tuning job with ID: ${completedJobId}`);
    const retrievedJob = await openai.fineTuning.jobs.retrieve(completedJobId);
    console.log("Retrieved job:\n", JSON.stringify(retrievedJob));

    const checkpointsList = [];
    for await (const checkpoint of openai.fineTuning.jobs.checkpoints.list(completedJobId)) {
      checkpointsList.push(checkpoint);
    }
    console.log(
      `finetuning list checkpoints listed ${checkpointsList.length} checkpoints for job: ${completedJobId}`,
    );

    for (const checkpoint of checkpointsList) {
      assert.isNotNull(checkpoint.id, "Checkpoint should have an ID");
      assert.isNotNull(checkpoint.created_at, "Checkpoint should have a creation timestamp");
      assert.equal(
        checkpoint.fine_tuning_job_id,
        completedJobId,
        `Checkpoint should belong to job ${completedJobId}`,
      );
      assert.isNotNull(checkpoint.step_number, "Checkpoint should have a step number");
      console.log(
        `finetuning list checkpoints validated checkpoint ${checkpoint.id} at step ${checkpoint.step_number}`,
      );
    }

    console.log(
      `finetuning list checkpoints successfully validated ${checkpointsList.length} checkpoints for job: ${completedJobId}`,
    );
  });

  it.skipIf(!isLive)("should test finetuning deploy openai model sft job", async () => {
    await deployJobHelper(
      "AZURE_AI_PROJECTS_TESTS_COMPLETED_OAI_MODEL_SFT_FINE_TUNING_JOB_ID",
      "OpenAI",
      50,
      "testFinetuningDeployOpenaiModelSftJob",
    );
  });

  it.skipIf(!isLive)("should test finetuning deploy openai model dpo job", async () => {
    await deployJobHelper(
      "AZURE_AI_PROJECTS_TESTS_COMPLETED_OAI_MODEL_DPO_FINE_TUNING_JOB_ID",
      "OpenAI",
      50,
      "testFinetuningDeployOpenaiModelDpoJob",
    );
  });

  it.skipIf(!isLive)("should test finetuning deploy openai model rft job", async () => {
    await deployJobHelper(
      "AZURE_AI_PROJECTS_TESTS_COMPLETED_OAI_MODEL_RFT_FINE_TUNING_JOB_ID",
      "OpenAI",
      50,
      "testFinetuningDeployOpenaiModelRftJob",
    );
  });

  it.skipIf(!isLive)("should test finetuning deploy oss model sft job", async () => {
    await deployJobHelper(
      "AZURE_AI_PROJECTS_TESTS_COMPLETED_OSS_MODEL_SFT_FINE_TUNING_JOB_ID",
      "Mistral AI",
      50,
      "testFinetuningDeployOssModelSftJob",
    );
  });

  it.skipIf(!isLive)("should test finetuning infer openai model sft job", async () => {
    await inferJobHelper(
      "AZURE_AI_PROJECTS_TESTS_COMPLETED_OAI_MODEL_SFT_DEPLOYMENT_NAME",
      "testFinetuningInferOpenaiModelSftJob",
      "Who invented the telephone?",
    );
  });

  it.skipIf(!isLive)("should test finetuning infer openai model dpo job", async () => {
    await inferJobHelper(
      "AZURE_AI_PROJECTS_TESTS_COMPLETED_OAI_MODEL_DPO_DEPLOYMENT_NAME",
      "testFinetuningInferOpenaiModelDpoJob",
      "What is the largest desert in the world?",
    );
  });

  it.skipIf(!isLive)("should test finetuning infer openai model rft job", async () => {
    await inferJobHelper(
      "AZURE_AI_PROJECTS_TESTS_COMPLETED_OAI_MODEL_RFT_DEPLOYMENT_NAME",
      "testFinetuningInferOpenaiModelRftJob",
      "Target: 85 Numbers: [20, 4, 15, 10]. Find a mathematical expression using all numbers exactly once to reach the target.",
    );
  });

  it.skipIf(!isLive)("should test finetuning infer oss model sft job", async () => {
    await inferJobHelper(
      "AZURE_AI_PROJECTS_TESTS_COMPLETED_OSS_MODEL_SFT_DEPLOYMENT_NAME",
      "testFinetuningInferOssModelSftJob",
      "Who invented the telephone?",
    );
  });
});
