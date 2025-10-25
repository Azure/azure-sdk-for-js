// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClientV2, createRecorder } from "./utils/recordedClient.js";
import type {
  BatchClient,
  CreateNodeUserParameters,
  ReplaceNodeUserParameters,
  UploadBatchServiceLogsOptions,
  UploadNodeLogsParameters,
} from "../src/index.js";
import { isUnexpected, type ListNodes200Response, type BatchNodeOutput } from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName, waitForNotNull } from "./utils/helpers.js";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } from "vitest";
import {
  createHoboBatchAccount,
  getBatchAccountKeys,
} from "./utils/arm-resources/batch-account.js";
import { createBatchWindowsPool, deleteBatchPool } from "./utils/arm-resources/batch-pool.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";

const BASIC_POOL = getResourceName("Pool-Basic");
const BASIC_POOL_NUM_VMS = 4;
const TEST_USER = "JSSDKTestUser";

describe("Compute node operations", async () => {
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

    const account = await createHoboBatchAccount(getHoboBatchAccountName());
    batchAccountEndpoint = `https://${account.accountEndpoint!}`;

    const accountKeys = await getBatchAccountKeys(getHoboBatchAccountName());
    console.log("Successfully created Batch Account:", getHoboBatchAccountName());

    batchAccountKey = accountKeys.primary!;

    await createBatchWindowsPool(getHoboBatchAccountName(), BASIC_POOL, BASIC_POOL_NUM_VMS);
    console.log("Successfully created Batch Pool:", BASIC_POOL);
  });

  /**
   * Unprovision helper resources after all tests ran
   */
  afterAll(async () => {
    if (isPlaybackMode()) {
      return;
    }

    await deleteBatchPool(getHoboBatchAccountName(), BASIC_POOL);
    console.log("Successfully deleted Batch Pool:", BASIC_POOL);
  });

  beforeEach(async (ctx) => {
    recorder = await createRecorder(ctx);
    batchClient = createBatchClientV2({
      recorder,
      accountEndpoint: batchAccountEndpoint,
      accountName: getHoboBatchAccountName(),
      accountKey: batchAccountKey,
    });

    recorder.addSanitizers({
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

    const getListNodesResult = async (): Promise<ListNodes200Response | null> => {
      const res = await batchClient.path("/pools/{poolId}/nodes", poolId).get();
      if (isUnexpected(res)) {
        assert.fail(`Received unexpected status code from getting pool: ${res.status}
              Response Body: ${res.body.message}`);
      }
      if (
        (res.body.value?.length ?? 0) > 0 &&
        res.body.value!.filter((node) =>
          ["starting", "waitingforstarttask", "creating"].includes(node.state!),
        ).length === 0
      ) {
        return res;
      }
      return null;
    };

    const listNodesResult = await waitForNotNull(getListNodesResult);
    const nodeList = listNodesResult.body.value!;
    computeNodes = nodeList.map(function (x) {
      return x.id!;
    });
    assert.equal(nodeList[0].state, "idle");
    assert.equal(nodeList[0].schedulingState, "enabled");
    assert.isTrue(nodeList[0].isDedicated);
    assert.equal(listNodesResult.body.value?.length, BASIC_POOL_NUM_VMS);
  });

  it("should get a compute node reference", async () => {
    const getNodeResult = await batchClient
      .path(
        "/pools/{poolId}/nodes/{nodeId}",
        recorder.variable("BASIC_POOL", BASIC_POOL),
        computeNodes[0],
      )
      .get();
    if (isUnexpected(getNodeResult)) {
      assert.fail(`Received unexpected status code from getting compute node: ${getNodeResult.status}
              Response Body: ${getNodeResult.body.message}`);
    }

    assert.equal(getNodeResult.status, "200");
    assert.equal(getNodeResult.body.id, computeNodes[0]);
    assert.equal(getNodeResult.body.state, "idle");
    assert.equal(getNodeResult.body.schedulingState, "enabled");
  });

  it("should add a user to a compute node successfully", async () => {
    const addUserOptions: CreateNodeUserParameters = {
      body: {
        name: TEST_USER,
        isAdmin: false,
        password: isPlaybackMode() ? fakeTestPasswordPlaceholder2 : "user_1account_password2",
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const addUserResult = await batchClient
      .path(
        "/pools/{poolId}/nodes/{nodeId}/users",
        recorder.variable("BASIC_POOL", BASIC_POOL),
        computeNodes[0],
      )
      .post(addUserOptions);
    assert.equal(addUserResult.status, "201");
  });

  it("should update a compute node user successfully", async () => {
    const updateUserOptions: ReplaceNodeUserParameters = {
      body: {
        password: isPlaybackMode() ? fakeTestPasswordPlaceholder2 : "user_1account_password2",
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const updateUserResult = await batchClient
      .path(
        "/pools/{poolId}/nodes/{nodeId}/users/{userName}",
        recorder.variable("BASIC_POOL", BASIC_POOL),
        computeNodes[0],
        TEST_USER,
      )
      .put(updateUserOptions);
    assert.equal(updateUserResult.status, "200");
  });

  it("should delete a compute node user successfully", async () => {
    const updateUserResult = await batchClient
      .path(
        "/pools/{poolId}/nodes/{nodeId}/users/{userName}",
        recorder.variable("BASIC_POOL", BASIC_POOL),
        computeNodes[0],
        TEST_USER,
      )
      .delete();
    assert.equal(updateUserResult.status, "200");
  });

  it("should disable scheduling on a compute node successfully", async () => {
    const disableSchedulingResult = await batchClient
      .path(
        "/pools/{poolId}/nodes/{nodeId}/disablescheduling",
        recorder.variable("BASIC_POOL", BASIC_POOL),
        computeNodes[1],
      )
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(disableSchedulingResult.status, "200");
  });

  it("should enable scheduling on a compute node successfully", async () => {
    const enableSchedulingResult = await batchClient
      .path(
        "/pools/{poolId}/nodes/{nodeId}/enablescheduling",
        recorder.variable("BASIC_POOL", BASIC_POOL),
        computeNodes[1],
      )
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(enableSchedulingResult.status, "200");
  });

  it("should reboot a compute node successfully", async () => {
    const rebootNodeResult = await batchClient
      .path(
        "/pools/{poolId}/nodes/{nodeId}/reboot",
        recorder.variable("BASIC_POOL", BASIC_POOL),
        computeNodes[0],
      )
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(rebootNodeResult.status, "202");
  });

  it("should reimage a compute node successfully", async () => {
    const reimageNodeResult = await batchClient
      .path(
        "/pools/{poolId}/nodes/{nodeId}/reimage",
        recorder.variable("BASIC_POOL", BASIC_POOL),
        computeNodes[1],
      )
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(reimageNodeResult.status, "202");
  });

  it("should upload pool node logs at paas pool", async () => {
    const container = "https://teststorage.blob.core.windows.net/fakecontainer";
    const config: UploadBatchServiceLogsOptions = {
      containerUrl: container,
      startTime: new Date("2018-02-25T00:00:00.000Z"),
    };

    const uploadLogBody: UploadNodeLogsParameters = {
      body: config,
      contentType: "application/json; odata=minimalmetadata",
    };

    const uploadLogResult = await batchClient
      .path(
        "/pools/{poolId}/nodes/{nodeId}/uploadbatchservicelogs",
        recorder.variable("BASIC_POOL", BASIC_POOL),
        computeNodes[2],
      )
      .post(uploadLogBody);
    if (isUnexpected(uploadLogResult)) {
      assert.fail(`Received unexpected status code from uploading log to compute node: ${uploadLogResult.status}
            Response Body: ${uploadLogResult.body.message}`);
    }

    assert.isAtLeast(uploadLogResult.body.numberOfFilesUploaded, 1);
  });

  it("should deallocate and then start a compute node successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);
    const nodeId = computeNodes[3];

    const deallocateNodeResult = await batchClient
      .path("/pools/{poolId}/nodes/{nodeId}/deallocate", poolId, nodeId)
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(deallocateNodeResult.status, "202");

    const checkIfDeallocated = async (): Promise<BatchNodeOutput | null> => {
      const nodes = await batchClient.path("/pools/{poolId}/nodes", poolId).get();
      if (isUnexpected(nodes)) {
        assert.fail(`Received unexpected status code from listing nodes: ${nodes.status}
              Response Body: ${nodes.body.message}`);
      }
      const node = nodes.body.value?.find((n) => n.id === nodeId);
      if (node?.state === "deallocated") {
        return node;
      }
      return null;
    };

    await waitForNotNull(checkIfDeallocated);

    const startNodeResult = await batchClient
      .path("/pools/{poolId}/nodes/{nodeId}/start", poolId, nodeId)
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(startNodeResult.status, "202");
  });
});
