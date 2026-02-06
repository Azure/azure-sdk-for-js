// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import type {
  BatchClient,
  BatchTask,
  BatchTaskCreateOptions,
  BatchJobCreateOptions,
  OutputFile,
} from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName, waitForNotNull, POLLING_INTERVAL } from "./utils/helpers.js";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } from "vitest";
import {
  getBatchAccountKeys,
  getExistingBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import { createBatchLinuxPool, deleteBatchPool } from "./utils/arm-resources/batch-pool.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";

const BASIC_POOL = getResourceName("Pool-Basic");
const BASIC_POOL_NUM_VMS = 4;
const JOB_NAME = getResourceName("Job-Basic");
const TASK_NAME = `${JOB_NAME}-task1`;
const TASK2_NAME = `${JOB_NAME}-task2`;
const TASK_UPDATE_OPTIONS = {
  constraints: { maxTaskRetryCount: 3 },
} as BatchTask;
const NON_ADMIN_POOL_USER = "nonAdminUser";

describe("Task Operations Test", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;
  let batchAccountEndpoint = fakeAzureBatchEndpoint;
  let batchAccountKey = fakeTestPasswordPlaceholder2;

  /**
   * Provision helper resources needed for testing Batch tasks
   */
  beforeAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    const account = await getExistingBatchAccount(getHoboBatchAccountName());
    batchAccountEndpoint = `https://${account.accountEndpoint!}`;

    const accountKeys = await getBatchAccountKeys(getHoboBatchAccountName());
    console.log("created Batch Account:", getHoboBatchAccountName());

    batchAccountKey = accountKeys.primary!;

    await createBatchLinuxPool(getHoboBatchAccountName(), BASIC_POOL, BASIC_POOL_NUM_VMS);
    console.log("created Batch Pool:", BASIC_POOL);

    // Create a job for tasks
    const jobClient = createBatchClient({
      accountEndpoint: batchAccountEndpoint,
      accountName: getHoboBatchAccountName(),
      accountKey: batchAccountKey,
    });

    const jobAddParam: BatchJobCreateOptions = {
      id: JOB_NAME,
      poolInfo: { poolId: BASIC_POOL },
    };

    await jobClient.createJob(jobAddParam);
    console.log("created Job:", JOB_NAME);
  });

  /**
   * Unprovision helper resources after all tests ran
   */
  afterAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    const cleanupClient = createBatchClient({
      accountEndpoint: batchAccountEndpoint,
      accountName: getHoboBatchAccountName(),
      accountKey: batchAccountKey,
    });

    // Delete job first
    try {
      await cleanupClient.deleteJob(JOB_NAME, {
        updateIntervalInMs: POLLING_INTERVAL,
        force: true,
      });
      console.log("deleted Job:", JOB_NAME);
    } catch (error: any) {
      console.error(`Failed to delete job ${JOB_NAME}: ${error.message}`);
    }

    await deleteBatchPool(getHoboBatchAccountName(), BASIC_POOL);
    console.log("deleted Batch Pool:", BASIC_POOL);
  });

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClient({
      recorder,
      accountEndpoint: batchAccountEndpoint,
      accountName: getHoboBatchAccountName(),
      accountKey: batchAccountKey,
    });

    await recorder.addSanitizers({
      generalSanitizers: [
        {
          target: batchAccountEndpoint,
          value: fakeAzureBatchEndpoint,
        },
      ],
    });
  });

  afterEach(async () => {
    await recorder.stop();
  });

  it("should create a task with container settings successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);

    const taskSettings: BatchTaskCreateOptions = {
      id: "taskWithContainerSettings",
      commandLine: "cat /etc/centos-release",
      containerSettings: { imageName: "centos" },
    };

    await batchClient.createTask(jobId, taskSettings);

    const task = await batchClient.getTask(jobId, taskSettings.id);

    assert.equal(task.containerSettings?.imageName, taskSettings.containerSettings!.imageName);
    assert.equal(task.commandLine, taskSettings.commandLine);

    await batchClient.deleteTask(jobId, taskSettings.id);
  });

  it("should create a task with exit conditions successfully", async () => {
    const jobId = "JobWithAutoComplete";
    const taskId = "TaskWithAutoComplete";
    const jobAddParams: BatchJobCreateOptions = {
      id: jobId,
      poolInfo: {
        poolId: "dummypool",
      },
      allTasksCompleteMode: "noaction",
      taskFailureMode: "performexitoptionsjobaction",
      usesTaskDependencies: true,
    };

    await batchClient.createJob(jobAddParams);

    const taskSettings: BatchTaskCreateOptions = {
      id: taskId,
      commandLine: "echo Hello World",
      exitConditions: {
        default: {
          jobAction: "terminate",
          dependencyAction: "satisfy",
        },
        exitCodes: [
          {
            code: 1,
            exitOptions: {
              jobAction: "none",
              dependencyAction: "block",
            },
          },
        ],
      },
    };

    await batchClient.createTask(jobId, taskSettings);

    const task = await batchClient.getTask(jobId, taskId);

    assert.equal(task.exitConditions!.default!.jobAction, "terminate");
    assert.equal(task.exitConditions!.default!.dependencyAction, "satisfy");
    assert.equal(task.exitConditions!.exitCodes![0].code, 1);
    assert.equal(task.exitConditions!.exitCodes![0].exitOptions!.jobAction, "none");
    assert.equal(task.exitConditions!.exitCodes![0].exitOptions!.dependencyAction, "block");

    await batchClient.deleteJob(jobId, {
      updateIntervalInMs: POLLING_INTERVAL,
      force: true,
    });
  });

  it("should create a task successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    const taskAddParams: BatchTaskCreateOptions = {
      id: taskId,
      commandLine: "cmd /c echo hello > taskHello.txt",
    };

    await batchClient.createTask(jobId, taskAddParams);

    const task = await batchClient.getTask(jobId, taskId);
    assert.equal(task.id, taskId);
  });

  it("should terminate a task successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    await batchClient.terminateTask(jobId, taskId);

    const task = await batchClient.getTask(jobId, taskId);
    assert.equal(task.state, "completed");
  });

  it("should create a second task with output files successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK2_NAME", TASK2_NAME);

    const container = "https://teststorage.blob.core.windows.net/batch-sdk-test?se=REDACTED";
    const outputs = [
      {
        filePattern: "../stdout.txt",
        destination: {
          container: {
            containerUrl: container,
            path: "taskLogs/output.txt",
            uploadHeaders: [
              { name: "x-ms-blob-content-type", value: "text/plain" },
              { name: "x-ms-blob-content-language", value: "en-US" },
            ],
          },
        },
        uploadOptions: { uploadCondition: "taskcompletion" as const },
      },
      {
        filePattern: "../stderr.txt",
        destination: {
          container: { containerUrl: container, path: "taskLogs/error.txt" },
        },
        uploadOptions: { uploadCondition: "taskfailure" as const },
      },
    ] satisfies OutputFile[];

    const taskAddParams: BatchTaskCreateOptions = {
      id: taskId,
      commandLine: "cmd /c echo hello world",
      outputFiles: outputs,
    };

    await batchClient.createTask(jobId, taskAddParams);

    const task = await batchClient.getTask(jobId, taskId);

    assert.isDefined(task.outputFiles);
    assert.equal(task.outputFiles![0].filePattern, outputs[0].filePattern);
    assert.equal(
      task.outputFiles![0].destination!.container?.containerUrl,
      outputs[0].destination.container.containerUrl,
    );
    assert.equal(task.outputFiles![1].filePattern, outputs[1].filePattern);
    assert.equal(
      task.outputFiles![1].destination!.container?.containerUrl,
      outputs[1].destination.container.containerUrl,
    );
  });

  it("should reactivate a task successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    await batchClient.reactivateTask(jobId, taskId);

    const task = await batchClient.getTask(jobId, taskId);
    assert.equal(task.state, "active");
  });

  it("should update a task successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    await batchClient.replaceTask(jobId, taskId, TASK_UPDATE_OPTIONS);

    const task = await batchClient.getTask(jobId, taskId);
    assert.equal(
      task.constraints?.maxTaskRetryCount,
      TASK_UPDATE_OPTIONS.constraints!.maxTaskRetryCount,
    );
  });

  it("should list all tasks successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);

    const tasks: BatchTask[] = [];
    for await (const task of batchClient.listTasks(jobId)) {
      tasks.push(task);
    }

    assert.equal(tasks.length, 2);
  });

  it("should get task reference successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    const task = await batchClient.getTask(jobId, taskId);

    assert.equal(task.id, taskId);
    assert.equal(
      task.constraints?.maxTaskRetryCount,
      TASK_UPDATE_OPTIONS.constraints!.maxTaskRetryCount,
    );
  });

  it("should add a task with an application package reference successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskAddParams: BatchTaskCreateOptions = {
      id: "Task-AppPackage",
      commandLine: "cmd /c echo hello world",
      applicationPackageReferences: [
        {
          applicationId: "REDACTED",
        },
      ],
    };

    await batchClient.createTask(jobId, taskAddParams);

    const task = await batchClient.getTask(jobId, taskAddParams.id);

    assert.isDefined(task.applicationPackageReferences);
    assert.equal(
      task.applicationPackageReferences![0].applicationId.toLowerCase(),
      taskAddParams.applicationPackageReferences![0].applicationId.toLowerCase(),
    );
  });

  it("should create a task with authentication token settings successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = "TaskWithAuthTokenSettings";
    const taskAddParams: BatchTaskCreateOptions = {
      id: taskId,
      commandLine: "cmd /c echo Hello World",
      authenticationTokenSettings: {
        access: ["job"],
      },
    };

    await batchClient.createTask(jobId, taskAddParams);

    const task = await batchClient.getTask(jobId, taskAddParams.id);

    assert.isDefined(task.authenticationTokenSettings);
    assert.isDefined(task.authenticationTokenSettings!.access);
    assert.lengthOf(task.authenticationTokenSettings!.access!, 1);
    assert.equal(task.authenticationTokenSettings!.access![0], "job");
  });

  it("should create a task with a user identity successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = "TaskWithUserIdentity";
    const taskAddParams: BatchTaskCreateOptions = {
      id: taskId,
      // This command should return a non-zero exit code for a non-admin user
      commandLine: "cmd /c net session >nul 2>&1",
      userIdentity: {
        username: NON_ADMIN_POOL_USER,
      },
    };

    await batchClient.createTask(jobId, taskAddParams);

    const getExecutedTask = async (): Promise<BatchTask | null> => {
      const task = await batchClient.getTask(jobId, taskAddParams.id);
      if (task.executionInfo !== undefined && task.executionInfo.result !== undefined) {
        return task;
      }
      return null;
    };

    const task = await waitForNotNull(getExecutedTask);

    assert.isDefined(task.userIdentity);
    assert.equal(task.userIdentity!.username, NON_ADMIN_POOL_USER);
    assert.isDefined(task.executionInfo);
    assert.equal(task.executionInfo!.result, "failure");
    assert.notEqual(task.executionInfo!.exitCode, 0);
  });

  it("should count tasks successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);

    const taskCounts = await batchClient.getJobTaskCounts(jobId);

    assert.isDefined(taskCounts.taskCounts.active);
    assert.isDefined(taskCounts.taskCounts.completed);
    assert.isAtLeast(taskCounts.taskCounts.completed, 1);
  });

  it("should delete a task successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    await batchClient.deleteTask(jobId, taskId);

    try {
      await batchClient.getTask(jobId, taskId);
      assert.fail("Expected task to be deleted");
    } catch (error: any) {
      assert.equal(error.statusCode, 404);
    }
  });

  it("should delete second task successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK2_NAME", TASK2_NAME);

    await batchClient.deleteTask(jobId, taskId);

    try {
      await batchClient.getTask(jobId, taskId);
      assert.fail("Expected task to be deleted");
    } catch (error: any) {
      assert.equal(error.statusCode, 404);
    }
  });
});
