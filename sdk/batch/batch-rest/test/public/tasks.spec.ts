// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, VitestTestContext, isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import {
  BatchClient,
  BatchTask,
  CreateJobParameters,
  CreatePoolParameters,
  CreateTaskParameters,
  isUnexpected,
  paginate,
} from "../../src/index.js";
import { fakeTestPasswordPlaceholder1 } from "./utils/fakeTestSecrets.js";
import { getResourceName, waitForNotNull } from "./utils/helpers.js";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } from "vitest";

const BASIC_POOL = getResourceName("Pool-Basic");
const JOB_NAME = getResourceName("Job-Basic");
const TASK_NAME = `${JOB_NAME}-task1`;
const TASK2_NAME = `${JOB_NAME}-task2`;
const TASK_UPDATE_OPTIONS: BatchTask = {
  constraints: { maxTaskRetryCount: 3 },
};
const NON_ADMIN_POOL_USER = "nonAdminUser";

describe("Task Operations Test", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;

  /**
   * Provision helper resources needed for testing Batch tasks
   */
  beforeAll(async function () {
    if (!isPlaybackMode()) {
      batchClient = createBatchClient();

      const poolParams: CreatePoolParameters = {
        body: {
          id: BASIC_POOL,
          vmSize: "Standard_D1_v2",
          virtualMachineConfiguration: {
            nodeAgentSKUId: "batch.node.windows amd64",
            imageReference: {
              publisher: "microsoftwindowsserver",
              offer: "windowsserver",
              sku: "2022-datacenter",
            },
          },
          targetDedicatedNodes: 4,
          // Ensures there's a compute node file we can reference later
          startTask: { commandLine: "cmd /c echo hello > hello.txt" },
          // Sets up pool user we can reference later
          userAccounts: [
            {
              name: NON_ADMIN_POOL_USER,
              password: isPlaybackMode() ? fakeTestPasswordPlaceholder1 : "user_1account_password2", // Recorder sanitizer options will replace password with fakeTestPasswordPlaceholder1
              elevationLevel: "nonadmin",
            },
          ],
        },
        contentType: "application/json; odata=minimalmetadata",
      };

      const poolPostResult = await batchClient.path("/pools").post(poolParams);
      if (isUnexpected(poolPostResult)) {
        assert.fail(`Received unexpected status code from creating pool: ${poolPostResult.status}
              Unable to provision resource needed for Task Testing.
              Response Body: ${poolPostResult.body.message}`);
      }

      const jobAddParam: CreateJobParameters = {
        body: {
          id: JOB_NAME,
          poolInfo: { poolId: BASIC_POOL },
        },
        contentType: "application/json; odata=minimalmetadata",
      };

      const jobAddResult = await batchClient.path("/jobs").post(jobAddParam);
      if (isUnexpected(jobAddResult)) {
        assert.fail(`Received unexpected status code from creating job: ${jobAddResult.status}
            Unable to provision resources needed for Task Testing.
            Response Body: ${jobAddResult.body.message}`);
      }
    }
  });

  /**
   * Unprovision helper resources after all tests ran
   */
  afterAll(async function () {
    if (!isPlaybackMode()) {
      type resourceDeleteErr = { id: string; error: any };
      const failedDeletedResources: resourceDeleteErr[] = [];
      batchClient = createBatchClient();

      const poolDeleteResponse = await batchClient.path("/pools/{poolId}", BASIC_POOL).delete();
      if (isUnexpected(poolDeleteResponse)) {
        failedDeletedResources.push({ id: BASIC_POOL, error: poolDeleteResponse.body.message });
      }

      const JobDelete202Response = await batchClient.path("/jobs/{jobId}", JOB_NAME).delete();
      if (isUnexpected(JobDelete202Response)) {
        failedDeletedResources.push({ id: JOB_NAME, error: JobDelete202Response.body.message });
      }

      if (failedDeletedResources.length > 0) {
        console.log(
          "Failed to unprovision helper resources for Task Test. The following resources may be leaked:",
        );
        failedDeletedResources.forEach((resource) =>
          console.log(`Failed to delete ${resource.id} Error Response: ${resource.error}`),
        );
      }
    }
  });

  beforeEach(async function (ctx: VitestTestContext) {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClient(recorder);
  });

  afterEach(async function () {
    await recorder.stop();
  });

  it("should create a task with container settings successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);

    const taskSettings = {
      id: "taskWithContainerSettings",
      commandLine: "cat /etc/centos-release",
      containerSettings: { imageName: "centos" },
    };

    const addTaskResult = await batchClient
      .path("/jobs/{jobId}/tasks", jobId)
      .post({ body: taskSettings, contentType: "application/json; odata=minimalmetadata" });
    assert.equal(addTaskResult.status, "201");

    const getTaskResult = await batchClient
      .path("/jobs/{jobId}/tasks/{taskId}", jobId, taskSettings.id)
      .get();
    if (isUnexpected(getTaskResult)) {
      assert.fail(`Received unexpected status code from getting task: ${getTaskResult.status}
            Response Body: ${getTaskResult.body.message}`);
    }

    assert.equal(
      getTaskResult.body.containerSettings?.imageName,
      taskSettings.containerSettings.imageName,
    );
    assert.equal(getTaskResult.body.commandLine, taskSettings.commandLine);

    await batchClient.path("/jobs/{jobId}/tasks/{taskId}", jobId, taskSettings.id).delete();
  });

  it("should create a task with exit conditions successfully", async () => {
    const jobId = "JobWithAutoComplete";
    const taskId = "TaskWithAutoComplete";
    const jobAddParams: CreateJobParameters = {
      body: {
        id: jobId,
        poolInfo: {
          poolId: "dummypool",
        },
        onAllTasksComplete: "noaction",
        onTaskFailure: "performexitoptionsjobaction",
        usesTaskDependencies: true,
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const jobAddResult = await batchClient.path("/jobs").post(jobAddParams);
    assert.equal(jobAddResult.status, "201");

    const taskSettings = {
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

    const taskAddResult = await batchClient
      .path("/jobs/{jobId}/tasks", jobId)
      .post({ body: taskSettings, contentType: "application/json; odata=minimalmetadata" });
    assert.equal(taskAddResult.status, "201");

    const getTaskResult = await batchClient
      .path("/jobs/{jobId}/tasks/{taskId}", jobId, taskId)
      .get();
    if (isUnexpected(getTaskResult)) {
      assert.fail(`Received unexpected status code from getting task: ${getTaskResult.status}
            Response Body: ${getTaskResult.body.message}`);
    }

    assert.equal(getTaskResult.body.exitConditions!.default!.jobAction, "terminate");
    assert.equal(getTaskResult.body.exitConditions!.default!.dependencyAction, "satisfy");
    assert.equal(getTaskResult.body.exitConditions!.exitCodes![0].code, 1);
    assert.equal(getTaskResult.body.exitConditions!.exitCodes![0].exitOptions.jobAction, "none");
    assert.equal(
      getTaskResult.body.exitConditions!.exitCodes![0].exitOptions.dependencyAction,
      "block",
    );

    const deleteJobResult = await batchClient.path("/jobs/{jobId}", jobId).delete();
    if (isUnexpected(deleteJobResult)) {
      assert.fail(`Failed to delete ${jobId}. Error Response: ${deleteJobResult.body.message}`);
    }
  });

  it("should create a task successfully", async () => {
    const taskAddParams: CreateTaskParameters = {
      body: {
        id: recorder.variable("TASK_NAME", TASK_NAME),
        commandLine: "cmd /c echo hello > taskHello.txt",
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const addTaskResult = await batchClient
      .path("/jobs/{jobId}/tasks", recorder.variable("JOB_NAME", JOB_NAME))
      .post(taskAddParams);
    assert.equal(addTaskResult.status, "201");
  });

  it("should terminate a task successfully", async () => {
    const terminateTaskResult = await batchClient
      .path(
        "/jobs/{jobId}/tasks/{taskId}/terminate",
        recorder.variable("JOB_NAME", JOB_NAME),
        recorder.variable("TASK_NAME", TASK_NAME),
      )
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(terminateTaskResult.status, "204");
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
        uploadOptions: { uploadCondition: "taskCompletion" },
      },
      {
        filePattern: "../stderr.txt",
        destination: {
          container: { containerUrl: container, path: "taskLogs/error.txt" },
        },
        uploadOptions: { uploadCondition: "taskFailure" },
      },
    ];

    const taskAddParams: CreateTaskParameters = {
      body: {
        id: taskId,
        commandLine: "cmd /c echo hello world",
        outputFiles: outputs,
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const addTaskResult = await batchClient.path("/jobs/{jobId}/tasks", jobId).post(taskAddParams);
    assert.equal(addTaskResult.status, "201");

    const getTaskResult = await batchClient
      .path("/jobs/{jobId}/tasks/{taskId}", jobId, taskId)
      .get();
    if (isUnexpected(getTaskResult)) {
      assert.fail(`Received unexpected status code from getting task: ${getTaskResult.status}
            Response Body: ${getTaskResult.body.message}`);
    }

    const batchTaskOutput = getTaskResult.body;
    assert.isDefined(batchTaskOutput.outputFiles);
    assert.equal(batchTaskOutput!.outputFiles![0].filePattern, outputs[0].filePattern);
    assert.equal(
      batchTaskOutput!.outputFiles![0].destination.container?.containerUrl,
      outputs[0].destination.container.containerUrl,
    );
    assert.equal(batchTaskOutput!.outputFiles![1].filePattern, outputs[1].filePattern);
    assert.equal(
      batchTaskOutput!.outputFiles![1].destination.container?.containerUrl,
      outputs[1].destination.container.containerUrl,
    );
  });

  it("should reactivate a task successfully", async () => {
    const reactivateTaskResult = await batchClient
      .path(
        "/jobs/{jobId}/tasks/{taskId}/reactivate",
        recorder.variable("JOB_NAME", JOB_NAME),
        recorder.variable("TASK_NAME", TASK_NAME),
      )
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(reactivateTaskResult.status, "204");
  });

  it("should update a task successfully", async () => {
    const updateTaskResult = await batchClient
      .path(
        "/jobs/{jobId}/tasks/{taskId}",
        recorder.variable("JOB_NAME", JOB_NAME),
        recorder.variable("TASK_NAME", TASK_NAME),
      )
      .put({
        body: TASK_UPDATE_OPTIONS,
        contentType: "application/json; odata=minimalmetadata",
      });

    assert.equal(updateTaskResult.status, "200");
  });

  it("should list all tasks successfully", async () => {
    const listTasksResult = await batchClient
      .path("/jobs/{jobId}/tasks", recorder.variable("JOB_NAME", JOB_NAME))
      .get();
    if (isUnexpected(listTasksResult)) {
      assert.fail(`Received unexpected status code from listing tasks: ${listTasksResult.status}
            Response Body: ${listTasksResult.body.message}`);
    }

    const paginateResponse = paginate(batchClient, listTasksResult);
    let taskCounter = 0;

    for await (const _item of paginateResponse) {
      ++taskCounter;
    }

    assert.equal(taskCounter, 2);
  });

  it("should get task reference successfully", async () => {
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);
    const getTaskResult = await batchClient
      .path("/jobs/{jobId}/tasks/{taskId}", recorder.variable("JOB_NAME", JOB_NAME), taskId)
      .get();
    if (isUnexpected(getTaskResult)) {
      assert.fail(`Received unexpected status code from getting task: ${getTaskResult.status}
            Response Body: ${getTaskResult.body.message}`);
    }

    assert.equal(getTaskResult.body.id, taskId);
    assert.equal(
      getTaskResult.body.constraints?.maxTaskRetryCount,
      TASK_UPDATE_OPTIONS!.constraints!.maxTaskRetryCount,
    );
  });

  it("should add a task with an application package reference successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskAddParams: CreateTaskParameters = {
      body: {
        id: "Task-AppPackage",
        commandLine: "cmd /c echo hello world",
        applicationPackageReferences: [
          {
            applicationId: "REDACTED",
          },
        ],
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const taskAddResult = await batchClient.path("/jobs/{jobId}/tasks", jobId).post(taskAddParams);
    assert.equal(taskAddResult.status, "201");

    const getTaskResult = await batchClient
      .path("/jobs/{jobId}/tasks/{taskId}", jobId, taskAddParams.body.id!)
      .get();
    if (isUnexpected(getTaskResult)) {
      assert.fail(`Received unexpected status code from getting task: ${getTaskResult.status}
            Response Body: ${getTaskResult.body.message}`);
    }

    assert.isDefined(getTaskResult.body.applicationPackageReferences);
    assert.equal(
      getTaskResult.body.applicationPackageReferences![0].applicationId.toLowerCase(),
      taskAddParams.body.applicationPackageReferences![0].applicationId.toLowerCase(),
    );
  });

  it("should create a task with authentication token settings successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = "TaskWithAuthTokenSettings";
    const taskAddParams: CreateTaskParameters = {
      body: {
        id: taskId,
        commandLine: "cmd /c echo Hello World",
        authenticationTokenSettings: {
          access: ["job"],
        },
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const taskAddResult = await batchClient.path("/jobs/{jobId}/tasks", jobId).post(taskAddParams);
    assert.equal(taskAddResult.status, "201");

    const getTaskResult = await batchClient
      .path("/jobs/{jobId}/tasks/{taskId}", jobId, taskAddParams.body.id!)
      .get();
    if (isUnexpected(getTaskResult)) {
      assert.fail(`Received unexpected status code from getting task: ${getTaskResult.status}
            Response Body: ${getTaskResult.body.message}`);
    }

    const taskOutput = getTaskResult.body;
    assert.isDefined(taskOutput.authenticationTokenSettings);
    assert.isDefined(taskOutput.authenticationTokenSettings!.access);
    assert.lengthOf(taskOutput.authenticationTokenSettings!.access!, 1);
    assert.equal(taskOutput.authenticationTokenSettings!.access![0], "job");
  });

  it("should create a task with a user identity successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = "TaskWithUserIdentity";
    const taskAddParams: CreateTaskParameters = {
      body: {
        id: taskId,
        // This command should return a non-zero exit code for a non-admin user
        commandLine: "cmd /c net session >nul 2>&1",
        userIdentity: {
          username: NON_ADMIN_POOL_USER,
        },
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const taskAddResult = await batchClient.path("/jobs/{jobId}/tasks", jobId).post(taskAddParams);
    assert.equal(taskAddResult.status, "201");

    const getExecutedTask = async () => {
      const getTaskResult = await batchClient
        .path("/jobs/{jobId}/tasks/{taskId}", jobId, taskAddParams.body.id!)
        .get();
      if (isUnexpected(getTaskResult)) {
        assert.fail(`Received unexpected status code from getting task: ${getTaskResult.status}
              Response Body: ${getTaskResult.body.message}`);
      }
      if (
        getTaskResult.body.executionInfo !== undefined &&
        getTaskResult.body.executionInfo.result !== undefined
      ) {
        return getTaskResult;
      }
      return null;
    };

    const taskRes = await waitForNotNull(getExecutedTask);

    assert.isDefined(taskRes.body.userIdentity);
    assert.equal(taskRes.body.userIdentity!.username, NON_ADMIN_POOL_USER);
    assert.isDefined(taskRes.body.executionInfo);
    assert.equal(taskRes.body.executionInfo!.result, "failure");
    assert.notEqual(taskRes.body.executionInfo!.exitCode, 0);
  });

  it("should count tasks sucessfully", async () => {
    const getTaskCountsResult = await batchClient
      .path("/jobs/{jobId}/taskcounts", recorder.variable("JOB_NAME", JOB_NAME))
      .get();
    if (isUnexpected(getTaskCountsResult)) {
      assert.fail(`Received unexpected status code from getting task counts: ${getTaskCountsResult.status}
              Unable to provision resource needed for Task Testing.
              Response Body: ${getTaskCountsResult.body.message}`);
    }

    assert.isDefined(getTaskCountsResult.body.taskCounts.active);
    assert.isDefined(getTaskCountsResult.body.taskCounts.completed);
    assert.isAtLeast(getTaskCountsResult.body.taskCounts.completed, 1);
  });

  // TODO: Need to test with actual subtasks
  // it("should list sub tasks successfully", async () => {
  //   const result = await client.task.listSubtasks(JOB_NAME, TASK_NAME);

  //   assert.equal(result._response.status, 200);
  // });

  it("should delete a task successfully", async () => {
    const deleteTaskResult = await batchClient
      .path(
        "/jobs/{jobId}/tasks/{taskId}",
        recorder.variable("JOB_NAME", JOB_NAME),
        recorder.variable("TASK_NAME", TASK_NAME),
      )
      .delete();
    assert.equal(deleteTaskResult.status, "200");
  });

  it("should delete second task successfully", async () => {
    const deleteTaskResult = await batchClient
      .path(
        "/jobs/{jobId}/tasks/{taskId}",
        recorder.variable("JOB_NAME", JOB_NAME),
        recorder.variable("TASK2_NAME", TASK2_NAME),
      )
      .delete();
    assert.equal(deleteTaskResult.status, "200");
  });
});
