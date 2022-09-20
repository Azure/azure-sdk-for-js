// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { v4 as uuid } from "uuid";
import { Context } from "mocha";
import { Recorder } from "@azure-tools/test-recorder";
import { RouterAdministrationClient, RouterClient } from "../../../src";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import {
  getQueueRequest,
  getExceptionPolicyRequest,
  getDistributionPolicyRequest,
  getClassificationPolicyRequest,
  getJobRequest
} from "../utils/testData";
import { pollForJobCancelled, pollForJobQueued } from "../utils/polling";
import { timeoutMs } from "../utils/constants";

describe("RouterClient", function() {
  let client: RouterClient;
  let administrationClient: RouterAdministrationClient;
  let recorder: Recorder;

  const testRunId = uuid();
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { distributionPolicyId, distributionPolicyRequest } = getDistributionPolicyRequest(
    testRunId
  );
  const { classificationPolicyId, classificationPolicyRequest } = getClassificationPolicyRequest(
    testRunId
  );
  const { jobId, jobRequest } = getJobRequest(testRunId);
  const dispositionCode = `disposition-${testRunId}`;

  describe("Cancellation Scenario", function() {
    this.beforeAll(async function(this: Context) {
      ({
        client,
        administrationClient,
        recorder
      } = await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createDistributionPolicy(
        distributionPolicyId,
        distributionPolicyRequest
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyId, exceptionPolicyRequest);
      await administrationClient.createQueue(queueId, queueRequest);
      await administrationClient.createClassificationPolicy(
        classificationPolicyId,
        classificationPolicyRequest
      );
    });

    this.afterAll(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        await recorder?.stop();
      }

      await client.deleteJob(jobId);
      await administrationClient.deleteClassificationPolicy(classificationPolicyId);
      await administrationClient.deleteQueue(queueId);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyId);
      await administrationClient.deleteDistributionPolicy(distributionPolicyId);
    });

    it("should complete cancellation scenario", async () => {
      await client.createJob(jobId, jobRequest);
      await pollForJobQueued(jobId, client);

      await client.cancelJob(jobId, { dispositionCode });
      const result = await pollForJobCancelled(jobId, client);

      assert.equal(result.jobStatus, "cancelled");
      assert.equal(result.dispositionCode, dispositionCode);
    }).timeout(timeoutMs);
  });
});
