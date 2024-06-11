// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder, VitestTestContext, isPlaybackMode } from "@azure-tools/test-recorder";
import { createBatchClient, createRecorder } from "./utils/recordedClient.js";
import {
  BatchClient,
  CreatePoolParameters,
  EnablePoolAutoScaleParameters,
  EvaluatePoolAutoScaleParameters,
  isUnexpected,
} from "../../src/index.js";
import { fakeTestPasswordPlaceholder1 } from "./utils/fakeTestSecrets.js";
import { getResourceName, waitForNotNull } from "./utils/helpers.js";
// eslint-disable-next-line import/no-extraneous-dependencies
import moment from "moment";
import { describe, it, beforeAll, afterAll, beforeEach, afterEach, assert } from "vitest";

const BASIC_POOL = getResourceName("Pool-Basic");
// const JOB_NAME = getResourceName("Job-Basic");
// const JOB_PRIORITY = 600;

describe("Autoscale operations", async () => {
  let recorder: Recorder;
  let batchClient: BatchClient;

  /**
   * Provision helper resources needed for testing jobs
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
              name: "nonAdminUser",
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
                Unable to provision resource needed for Job Testing.
                Response Body: ${poolPostResult.body.message}`);
      }
      const getSteadyPool = async () => {
        const getPoolResult = await batchClient.path("/pools/{poolId}", BASIC_POOL).get();
        if (isUnexpected(getPoolResult)) {
          assert.fail(`Received unexpected status code from getting pool: ${getPoolResult.status}
                Unable to provision resource needed for Job Testing.
                Response Body: ${getPoolResult.body.message}`);
        }
        if (getPoolResult.body.allocationState === "steady") {
          return getPoolResult;
        }
        return null;
      };
      await waitForNotNull(getSteadyPool);
    }
  });

  /**
   * Unprovision helper resources after all tests ran
   */
  afterAll(async function () {
    if (!isPlaybackMode()) {
      batchClient = createBatchClient();

      const poolDeleteResponse = await batchClient.path("/pools/{poolId}", BASIC_POOL).delete();
      if (isUnexpected(poolDeleteResponse)) {
        assert.fail(`Received unexpected status code from deleting pool: ${poolDeleteResponse.status}.Pool Resource Leaked.
            Respose Body: ${poolDeleteResponse.body.message}`);
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
