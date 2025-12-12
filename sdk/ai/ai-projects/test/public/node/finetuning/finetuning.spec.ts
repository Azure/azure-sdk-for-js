// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder, VitestTestContext } from "@azure-tools/test-recorder";
import { isLiveMode } from "@azure-tools/test-recorder";
import { createRecorder, createProjectsClient } from "../../utils/createClient.js";
import { assert, beforeEach, afterEach, it, describe } from "vitest";
import type { AIProjectClient } from "../../../../src/index.js";
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

  // it.skipIf(!isLive)("should test sft finetuning create job openai standard", async () => {
  //   await sftCreateJobHelper("openai", TrainingType.STANDARD_TRAINING_TYPE);
  // });

  // it.skipIf(!isLive)("should test sft finetuning create job openai globalstandard", async () => {
  //   await sftCreateJobHelper("openai", TrainingType.GLOBAL_STANDARD_TRAINING_TYPE);
  // });

  // it.skipIf(!isLive)("should test sft finetuning create job openai developer", async () => {
  //   await sftCreateJobHelper("openai", TrainingType.DEVELOPER_TIER_TRAINING_TYPE);
  // });

  // it.skipIf(!isLive)("should test sft finetuning create job oss globalstandard", async () => {
  //   await sftCreateJobHelper("oss", TrainingType.GLOBAL_STANDARD_TRAINING_TYPE);
  // });

  // it.skipIf(!isLive)("should test dpo finetuning create job openai standard", async () => {
  //   await dpoCreateJobHelper("openai", TrainingType.STANDARD_TRAINING_TYPE);
  // });

  // it.skipIf(!isLive)("should test dpo finetuning create job openai globalstandard", async () => {
  //   await dpoCreateJobHelper("openai", TrainingType.GLOBAL_STANDARD_TRAINING_TYPE);
  // });

  // it.skipIf(!isLive)("should test dpo finetuning create job openai developer", async () => {
  //   await dpoCreateJobHelper("openai", TrainingType.DEVELOPER_TIER_TRAINING_TYPE);
  // });

  // it.skipIf(!isLive)("should test rft finetuning create job openai standard", async () => {
  //   await rftCreateJobHelper("openai", TrainingType.STANDARD_TRAINING_TYPE);
  // });

  // it.skipIf(!isLive)("should test rft finetuning create job openai globalstandard", async () => {
  //   await rftCreateJobHelper("openai", TrainingType.GLOBAL_STANDARD_TRAINING_TYPE);
  // });

  // it.skipIf(!isLive)("should test rft finetuning create job openai developer", async () => {
  //   await rftCreateJobHelper("openai", TrainingType.DEVELOPER_TIER_TRAINING_TYPE);
  // });

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

    validateFineTuningJob(retrievedJob);
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

    validateFineTuningJob(retrievedJob);
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

    validateFineTuningJob(retrievedJob);
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
});
