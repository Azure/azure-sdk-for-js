// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClientV2, createRecorder } from "./utils/recordedClient.js";
import type {
  BatchClient,
  EnablePoolAutoScaleParameters,
  EvaluatePoolAutoScaleParameters,
} from "../src/index.js";
import { isUnexpected } from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName } from "./utils/helpers.js";
import moment from "moment";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } from "vitest";
import {
  createHoboBatchAccount,
  getBatchAccountKeys,
} from "./utils/arm-resources/batch-account.js";
import {
  createBatchWindowsPool,
  deleteBatchPool,
  waitForPoolSteady,
} from "./utils/arm-resources/batch-pool.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";

const BASIC_POOL = getResourceName("Pool-Basic");
const BASIC_POOL_NUM_VMS = 4;

describe("Autoscale operations", async () => {
  let recorder: Recorder;
  let batchClient: BatchClient;
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

    await waitForPoolSteady(getHoboBatchAccountName(), BASIC_POOL);
    console.log("Pool is now steady:", BASIC_POOL);
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

  it("should enable autoscale successfully", async () => {
    const poolEnableAutoScaleParams: EnablePoolAutoScaleParameters = {
      body: {
        autoScaleFormula: "$TargetDedicatedNodes=2",
        autoScaleEvaluationInterval: moment.duration({ minutes: 6 }).toISOString(),
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const autoScaleResult = await batchClient
      .path("/pools/{poolId}/enableautoscale", recorder.variable("BASIC_POOL", BASIC_POOL))
      .post(poolEnableAutoScaleParams);
    assert.equal(autoScaleResult.status, "200");
  });

  it("should evaluate pool autoscale successfully", async () => {
    const poolEvaluateAutoScaleParams: EvaluatePoolAutoScaleParameters = {
      body: {
        autoScaleFormula: "$TargetDedicatedNodes=3",
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const evaluateAutoScaleResult = await batchClient
      .path("/pools/{poolId}/evaluateautoscale", recorder.variable("BASIC_POOL", BASIC_POOL))
      .post(poolEvaluateAutoScaleParams);

    if (isUnexpected(evaluateAutoScaleResult)) {
      assert.fail(`Received unexpected status code from evaluating pool autoscale: ${evaluateAutoScaleResult.status}
                Response Body: ${evaluateAutoScaleResult.body.message}`);
    }

    assert.isUndefined(evaluateAutoScaleResult.body.error);
    assert.equal(
      evaluateAutoScaleResult.body.results,
      "$TargetDedicatedNodes=3;$TargetLowPriorityNodes=0;$NodeDeallocationOption=requeue",
    );
  });

  it("should fail to evaluate invalid autoscale formula", async () => {
    const poolEvaluateAutoScaleParams: EvaluatePoolAutoScaleParameters = {
      body: {
        autoScaleFormula: "$something_useless",
      },
      contentType: "application/json; odata=minimalmetadata",
    };

    const evaluateAutoScaleResult = await batchClient
      .path("/pools/{poolId}/evaluateautoscale", recorder.variable("BASIC_POOL", BASIC_POOL))
      .post(poolEvaluateAutoScaleParams);

    if (isUnexpected(evaluateAutoScaleResult)) {
      assert.fail(`Received unexpected status code from evaluating pool autoscale: ${evaluateAutoScaleResult.status}
                Response Body: ${evaluateAutoScaleResult.body.message}`);
    }

    assert.isDefined(evaluateAutoScaleResult.body.error);
    assert.equal(evaluateAutoScaleResult.body.error?.code, "AutoScalingFormulaEvaluationError");

    assert.equal(
      evaluateAutoScaleResult.body.results,
      "$TargetDedicatedNodes=2;$TargetLowPriorityNodes=0;$NodeDeallocationOption=requeue",
    );
  });

  it("should disable autoscale successfully", async () => {
    const disableAutoscaleResult = await batchClient
      .path("/pools/{poolId}/disableautoscale", recorder.variable("BASIC_POOL", BASIC_POOL))
      .post({ contentType: "application/json; odata=minimalmetadata" });
    assert.equal(disableAutoscaleResult.status, "200");
  });
});
