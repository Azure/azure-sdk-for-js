// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import type {
  BatchClient,
  BatchPoolEnableAutoScaleOptions,
  BatchPoolEvaluateAutoScaleOptions,
} from "../src/index.js";
import { fakeAzureBatchEndpoint, fakeTestPasswordPlaceholder2 } from "./utils/fakeTestSecrets.js";
import { getResourceName } from "./utils/helpers.js";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, expect } from "vitest";
import {
  getBatchAccountKeys,
  getExistingBatchAccount,
} from "./utils/arm-resources/batch-account.js";
import {
  createBatchLinuxPool,
  deleteBatchPool,
  waitForPoolSteady,
} from "./utils/arm-resources/batch-pool.js";
import { getHoboBatchAccountName } from "./utils/arm-resources/env-const.js";

// Helper function for ISO 8601 duration
function durationToIso(minutes?: number, hours?: number): string {
  const totalMinutes = (hours || 0) * 60 + (minutes || 0);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `PT${h > 0 ? h + "H" : ""}${m > 0 ? m + "M" : ""}`;
}

const BASIC_POOL = getResourceName("Pool-Basic");
const BASIC_POOL_NUM_VMS = 4;

describe("Autoscale operations", () => {
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

    const account = await getExistingBatchAccount(getHoboBatchAccountName());
    batchAccountEndpoint = `https://${account.accountEndpoint!}`;

    const accountKeys = await getBatchAccountKeys(getHoboBatchAccountName());
    console.log("created Batch Account:", getHoboBatchAccountName());

    batchAccountKey = accountKeys.primary!;

    await createBatchLinuxPool(getHoboBatchAccountName(), BASIC_POOL, BASIC_POOL_NUM_VMS);
    console.log("created Batch Pool:", BASIC_POOL);

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

  it("should enable autoscale successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const enableAutoScaleOptions: BatchPoolEnableAutoScaleOptions = {
      autoScaleFormula: "$TargetDedicatedNodes=2",
      autoScaleEvaluationInterval: durationToIso(6), // 6 minutes
    };

    await batchClient.enablePoolAutoScale(poolId, enableAutoScaleOptions);

    // Verify autoscale is enabled by getting pool info
    const pool = await batchClient.getPool(poolId);
    expect(pool.enableAutoScale).toBe(true);
  });

  it("should evaluate pool autoscale successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const evaluateAutoScaleOptions: BatchPoolEvaluateAutoScaleOptions = {
      autoScaleFormula: "$TargetDedicatedNodes=3",
    };

    const result = await batchClient.evaluatePoolAutoScale(poolId, evaluateAutoScaleOptions);

    expect(result.error).toBeUndefined();
    expect(result.results).toBe(
      "$TargetDedicatedNodes=3;$TargetLowPriorityNodes=0;$NodeDeallocationOption=requeue",
    );
  });

  it("should fail to evaluate invalid autoscale formula", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    const evaluateAutoScaleOptions: BatchPoolEvaluateAutoScaleOptions = {
      autoScaleFormula: "$something_useless",
    };

    const result = await batchClient.evaluatePoolAutoScale(poolId, evaluateAutoScaleOptions);

    expect(result.error).toBeDefined();
    expect(result.error?.code).toBe("AutoScalingFormulaEvaluationError");
    expect(result.results).toBe(
      "$TargetDedicatedNodes=2;$TargetLowPriorityNodes=0;$NodeDeallocationOption=requeue",
    );
  });

  it("should disable autoscale successfully", async () => {
    const poolId = recorder.variable("BASIC_POOL", BASIC_POOL);

    await batchClient.disablePoolAutoScale(poolId);

    // Verify autoscale is disabled by getting pool info
    const pool = await batchClient.getPool(poolId);
    expect(pool.enableAutoScale).toBeFalsy();
  });
});
