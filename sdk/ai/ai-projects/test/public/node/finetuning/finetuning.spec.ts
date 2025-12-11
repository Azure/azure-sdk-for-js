// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../../src/index.js";
import type { FineTuningJob, JobCreateParams } from "openai/resources/fine-tuning/jobs";
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

  it.skipIf(!isLive)("should test sft finetuning create job openai standard", async () => {
    await sftCreateJobHelper("openai", TrainingType.STANDARD_TRAINING_TYPE);
  });
});
