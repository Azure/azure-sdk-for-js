// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import type {
  BatchClient,
  BatchNode,
  BatchNodeUserCreateOptions,
  BatchNodeUserUpdateOptions,
  UploadBatchServiceLogsOptions,
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

const BASIC_POOL = getResourceName("Pool-Basic");
const BASIC_POOL_NUM_VMS = 4;
const TEST_USER = "JSSDKTestUser";

describe("Compute node operations", () => {
  let recorder: Recorder;
  let batchClient: BatchClient;
  let computeNodes: string[];
  let batchAccountEndpoint = fakeAzureBatchEndpoint;
  let batchAccountKey = fakeTestPasswordPlaceholder2;

  /**
   * Provision helper resources needed for testing jobs
   */
  beforeAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    const account = await getExistingBatchAccount(getHoboBatchAccountName());
    batchAccountEndpoint = `https://${account.accountEndpoint!}`;

    const accountKeys = await getBatchAccountKeys(getHoboBatchAccountName());

    batchAccountKey = accountKeys.primary!;

    await createBatchLinuxPool(getHoboBatchAccountName(), BASIC_POOL, BASIC_POOL_NUM_VMS);
    console.log("created Batch Pool:", BASIC_POOL);
  });

  /**
   * Unprovision helper resources after all tests ran
   */
  afterAll(async () => {
    if (isPlaybackMode()) {
      return;
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

  it("should list compute nodes successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const getListNodesResult = async (): Promise<BatchNode[] | null> => {
      const nodeList: BatchNode[] = [];
      for await (const node of batchClient.listNodes(poolId)) {
        nodeList.push(node);
      }
      if (
        nodeList.length > 0 &&
        nodeList.filter((node) =>
          ["starting", "waitingforstarttask", "creating"].includes(node.state!),
        ).length === 0
      ) {
        return nodeList;
      }
      return null;
    };

    const nodeList = await waitForNotNull(getListNodesResult);
    computeNodes = nodeList.map((x) => x.id!);
    expect(nodeList[0].state).toBe("idle");
    expect(nodeList[0].schedulingState).toBe("enabled");
    expect(nodeList[0].isDedicated).toBe(true);
    expect(nodeList.length).toBe(BASIC_POOL_NUM_VMS);
  });

  it("should get a compute node reference", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const node = await batchClient.getNode(poolId, computeNodes[0]);

    expect(node.id).toBe(computeNodes[0]);
    expect(node.state).toBe("idle");
    expect(node.schedulingState).toBe("enabled");
  });

  it("should add a user to a compute node successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const userOptions: BatchNodeUserCreateOptions = {
      name: TEST_USER,
      isAdmin: false,
      password: isPlaybackMode() ? fakeTestPasswordPlaceholder2 : "user_1account_password2",
    };

    await batchClient.createNodeUser(poolId, computeNodes[0], userOptions);

    // Verify by getting the node (no direct way to list users)
    const node = await batchClient.getNode(poolId, computeNodes[0]);
    expect(node).toBeDefined();
  });

  it("should update a compute node user successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const updateOptions: BatchNodeUserUpdateOptions = {
      password: isPlaybackMode() ? fakeTestPasswordPlaceholder2 : "user_1account_password2",
    };

    await batchClient.replaceNodeUser(poolId, computeNodes[0], TEST_USER, updateOptions);

    // Verify node still exists
    const node = await batchClient.getNode(poolId, computeNodes[0]);
    expect(node).toBeDefined();
  });

  it("should delete a compute node user successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    await batchClient.deleteNodeUser(poolId, computeNodes[0], TEST_USER);

    // Verify node still exists
    const node = await batchClient.getNode(poolId, computeNodes[0]);
    expect(node).toBeDefined();
  });

  it("should disable scheduling on a compute node successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    await batchClient.disableNodeScheduling(poolId, computeNodes[1]);

    // Verify scheduling is disabled
    const node = await batchClient.getNode(poolId, computeNodes[1]);
    expect(node.schedulingState).toBe("disabled");
  });

  it("should enable scheduling on a compute node successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    await batchClient.enableNodeScheduling(poolId, computeNodes[1]);

    // Verify scheduling is enabled
    const node = await batchClient.getNode(poolId, computeNodes[1]);
    expect(node.schedulingState).toBe("enabled");
  });

  it("should reboot a compute node successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    await batchClient.beginRebootNodeAndWait(poolId, computeNodes[0], {
      updateIntervalInMs: POLLING_INTERVAL,
    });

    // After reboot completes, node should be available
    const node = await batchClient.getNode(poolId, computeNodes[0]);
    expect(node).toBeDefined();
  });

  it("should reimage a compute node successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    await batchClient.beginReimageNodeAndWait(poolId, computeNodes[1], {
      updateIntervalInMs: POLLING_INTERVAL,
    });

    // After reimage completes, node should be available
    const node = await batchClient.getNode(poolId, computeNodes[1]);
    expect(node).toBeDefined();
  });

  it("should upload pool node logs", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    const container = "https://teststorage.blob.core.windows.net/fakecontainer";

    const uploadOptions: UploadBatchServiceLogsOptions = {
      containerUrl: container,
      startTime: new Date("2018-02-25T00:00:00.000Z"),
    };

    const result = await batchClient.uploadNodeLogs(poolId, computeNodes[2], uploadOptions);

    expect(result.numberOfFilesUploaded).toBeGreaterThanOrEqual(1);
  });

  it("should deallocate and then start a compute node successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    const nodeId = computeNodes[3];

    await batchClient.beginDeallocateNodeAndWait(poolId, nodeId, {
      updateIntervalInMs: POLLING_INTERVAL,
    });

    // Verify node is deallocated
    const deallocatedNode = await batchClient.getNode(poolId, nodeId);
    expect(deallocatedNode.state).toBe("deallocated");

    await batchClient.beginStartNodeAndWait(poolId, nodeId, {
      updateIntervalInMs: POLLING_INTERVAL,
    });

    // After start, node should be running or idle
    const startedNode = await batchClient.getNode(poolId, nodeId);
    expect(["idle", "running", "starting"]).toContain(startedNode.state);
  });
});
