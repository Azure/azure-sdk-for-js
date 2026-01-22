// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import type {
  BatchClient,
  BatchTaskCreateOptions,
  BatchJobCreateOptions,
  BatchNodeFile,
  BatchTask,
  BatchNode,
} from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName, waitForNotNull, POLLING_INTERVAL } from "./utils/helpers.js";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect } from "vitest";
import {
  getBatchAccountKeys,
  getExistingBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import { createBatchLinuxPool, deleteBatchPool } from "./utils/arm-resources/batch-pool.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";
import { RestError } from "@azure/core-rest-pipeline";

const FILE_POOL = getResourceName("Pool-Files");
const FILE_POOL_NUM_VMS = 3;
const JOB_NAME = getResourceName("Job-Files");
const TASK_NAME = `${JOB_NAME}-task1`;
const TEST_FILE_NAME = "stdout.txt";

describe("File Operations Test", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;
  let batchAccountEndpoint = fakeAzureBatchEndpoint;
  let batchAccountKey = fakeTestPasswordPlaceholder2;
  let nodeId: string;

  /**
   * Provision helper resources needed for testing task files
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

    await createBatchLinuxPool(getHoboBatchAccountName(), FILE_POOL, FILE_POOL_NUM_VMS);
    console.log("created Batch Pool:", FILE_POOL);

    // Create a job for tasks
    const jobClient = createBatchClient({
      accountEndpoint: batchAccountEndpoint,
      accountName: getHoboBatchAccountName(),
      accountKey: batchAccountKey,
    });

    const jobAddParam: BatchJobCreateOptions = {
      id: JOB_NAME,
      poolInfo: { poolId: FILE_POOL },
    };

    await jobClient.createJob(jobAddParam);
    console.log("created Job:", JOB_NAME);

    // Create a task that produces output files
    const taskAddParams: BatchTaskCreateOptions = {
      id: TASK_NAME,
      commandLine: "/bin/bash -c 'echo Hello World'",
    };

    await jobClient.createTask(JOB_NAME, taskAddParams);
    console.log("created Task:", TASK_NAME);

    // Wait for task to complete
    const waitForTaskComplete = async (): Promise<BatchTask | null> => {
      const task = await jobClient.getTask(JOB_NAME, TASK_NAME);
      if (task.state === "completed") {
        return task;
      }
      return null;
    };

    await waitForNotNull(waitForTaskComplete);
    console.log("Task completed:", TASK_NAME);

    // Wait for node to be idle (for node file tests)
    const waitForNodeIdle = async (): Promise<BatchNode | null> => {
      for await (const node of jobClient.listNodes(FILE_POOL)) {
        if (node.state === "idle") {
          return node;
        }
      }
      return null;
    };

    const node = await waitForNotNull(waitForNodeIdle);
    nodeId = node.id!;
    console.log("Node is idle:", nodeId);
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
      await cleanupClient.beginDeleteJobAndWait(JOB_NAME, {
        updateIntervalInMs: POLLING_INTERVAL,
        force: true,
      });
      console.log("deleted Job:", JOB_NAME);
    } catch (error: any) {
      console.error(`Failed to delete job ${JOB_NAME}: ${error.message}`);
    }

    await deleteBatchPool(getHoboBatchAccountName(), FILE_POOL);
    console.log("deleted Batch Pool:", FILE_POOL);
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

  it("should list task files successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    const files: BatchNodeFile[] = [];
    for await (const file of batchClient.listTaskFiles(jobId, taskId)) {
      files.push(file);
    }

    expect(files.length).toBeGreaterThanOrEqual(1);
    // Check that stdout.txt exists (from the echo command)
    const stdoutFile = files.find((f) => f.name === TEST_FILE_NAME);
    expect(stdoutFile).toBeDefined();
  });

  it("should get task file properties successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    const file = await batchClient.getTaskFileProperties(jobId, taskId, TEST_FILE_NAME);
    expect(file.name).toBe(TEST_FILE_NAME);
    expect(file.properties).toBeDefined();
    expect(file.url).toBeDefined();
    expect(file.isDirectory).toBe(false);
    expect(Number(file.properties?.contentLength)).toBeGreaterThan(0);
    expect(file.properties?.lastModified).toBeInstanceOf(Date);
    expect(file.properties?.contentType).toBe("text/plain");
  });

  it("should get task file content successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    const fileContent = await batchClient.getTaskFile(jobId, taskId, TEST_FILE_NAME);

    expect(fileContent).toBeDefined();
    expect(fileContent.length).toBeGreaterThan(0);

    // Convert Uint8Array to string and check content
    const contentString = new TextDecoder().decode(fileContent);
    expect(contentString).toContain("Hello World");
  });

  it("should delete task file successfully", async () => {
    const jobId = recorder.variable("JOB_NAME", JOB_NAME);
    const taskId = recorder.variable("TASK_NAME", TASK_NAME);

    // Delete stderr.txt file (which should exist from the task)
    const fileToDelete = "stderr.txt";

    await batchClient.deleteTaskFile(jobId, taskId, fileToDelete);

    // Verify file is deleted by trying to get its properties
    try {
      await batchClient.getTaskFileProperties(jobId, taskId, fileToDelete);
      expect.fail("Expected file to be deleted");
    } catch (error: unknown) {
      if (!(error instanceof RestError)) {
        throw error;
      }
      expect(error.statusCode).toBe(404);
    }
  });

  it("should list node files successfully", async () => {
    const poolId = recorder.variable("POOL_NAME", FILE_POOL);
    const recordedNodeId = recorder.variable("NODE_ID", nodeId);

    const files: BatchNodeFile[] = [];
    for await (const file of batchClient.listNodeFiles(poolId, recordedNodeId, {
      recursive: true,
    })) {
      files.push(file);
    }

    expect(files.length).toBeGreaterThanOrEqual(1);
    // Check that startup directory exists
    const startupDir = files.find((f) => f.name === "startup");
    expect(startupDir).toBeDefined();
    expect(startupDir?.isDirectory).toBe(true);
  });

  it("should get node file properties successfully", async () => {
    const poolId = recorder.variable("POOL_NAME", FILE_POOL);
    const recordedNodeId = recorder.variable("NODE_ID", nodeId);

    // Get properties of the startup/stdout.txt file (from start task)
    const file = await batchClient.getNodeFileProperties(
      poolId,
      recordedNodeId,
      "startup/wd/hello.txt",
    );

    expect(file.name).contains("hello.txt");
    expect(file.properties).toBeDefined();
    expect(file.isDirectory).toBe(false);
    expect(file.properties?.lastModified).toBeInstanceOf(Date);
  });

  it("should get node file content successfully", async () => {
    const poolId = recorder.variable("POOL_NAME", FILE_POOL);
    const recordedNodeId = recorder.variable("NODE_ID", nodeId);

    // Get content of the startup/wd/hello.txt file
    const fileContent = await batchClient.getNodeFile(
      poolId,
      recordedNodeId,
      "startup/wd/hello.txt",
    );

    expect(fileContent).toBeDefined();
    expect(fileContent.length).toBeGreaterThan(0);

    // Convert Uint8Array to string and check content
    const contentString = new TextDecoder().decode(fileContent);
    expect(contentString).toContain("hello");
  });

  it("should delete node file successfully", async () => {
    const poolId = recorder.variable("POOL_NAME", FILE_POOL);
    const recordedNodeId = recorder.variable("NODE_ID", nodeId);

    // Delete startup/wd/hello.txt file (which should exist from start task)
    const fileToDelete = "startup/wd/hello.txt";

    await batchClient.deleteNodeFile(poolId, recordedNodeId, fileToDelete);

    // Verify file is deleted by trying to get its properties
    try {
      await batchClient.getNodeFileProperties(poolId, recordedNodeId, fileToDelete);
      expect.fail("Expected file to be deleted");
    } catch (error: unknown) {
      if (!(error instanceof RestError)) {
        throw error;
      }
      expect(error.statusCode).toBe(404);
    }
  });
});
