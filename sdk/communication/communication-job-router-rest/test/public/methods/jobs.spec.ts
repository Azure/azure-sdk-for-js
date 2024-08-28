// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import {
  AzureCommunicationRoutingServiceClient,
  paginate,
  RouterJob,
  RouterJobOutput,
  RouterJobPositionDetailsOutput,
} from "../../../src";
import { Context } from "mocha";
import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getJobRequest,
  getQueueRequest,
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";
import { pollForJobQueued, retry } from "../utils/polling";

describe("JobRouterClient", function () {
  let routerClient: AzureCommunicationRoutingServiceClient;
  let recorder: Recorder;

  const testRunId = "recorded-jobs";

  const { distributionPolicyId, distributionPolicyRequest } =
    getDistributionPolicyRequest(testRunId);
  const { exceptionPolicyId, exceptionPolicyRequest } = getExceptionPolicyRequest(testRunId);
  const { queueId, queueRequest } = getQueueRequest(testRunId);
  const { classificationPolicyId, classificationPolicyRequest } =
    getClassificationPolicyRequest(testRunId);
  const { jobId, jobRequest } = getJobRequest(testRunId);

  // function getScheduledJob(scheduledTime: string) {
  //   const matchingMode: ScheduleAndSuspendMode = {
  //     kind: "schedule-and-suspend",
  //     scheduleAt: new Date(scheduledTime)
  //   }
  //   return {
  //     ...jobRequest,
  //     notes: [],
  //     matchingMode: matchingMode,
  //   };
  // }

  describe("Job Operations", function () {
    this.beforeEach(async function (this: Context) {
      ({ routerClient, recorder } = await createRecordedRouterClientWithConnectionString(this));

      await routerClient
        .path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId)
        .patch({
          contentType: "application/merge-patch+json",
          body: distributionPolicyRequest,
        });
      await routerClient
        .path("/routing/exceptionPolicies/{exceptionPolicyId}", exceptionPolicyId)
        .patch({
          contentType: "application/merge-patch+json",
          body: exceptionPolicyRequest,
        });
      await routerClient.path("/routing/queues/{queueId}", queueId).patch({
        contentType: "application/merge-patch+json",
        body: queueRequest,
      });
      await routerClient
        .path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId)
        .patch({
          contentType: "application/merge-patch+json",
          body: classificationPolicyRequest,
        });
    });

    this.afterEach(async function (this: Context) {
      await routerClient
        .path("/routing/classificationPolicies/{classificationPolicyId}", classificationPolicyId)
        .delete();
      await routerClient
        .path("/routing/distributionPolicies/{distributionPolicyId}", distributionPolicyId)
        .delete();
      await routerClient
        .path("/routing/exceptionPolicies/{exceptionPolicyId}", exceptionPolicyId)
        .delete();
      await routerClient.path("/routing/queues/{queueId}", queueId).delete();

      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    it("should create a job", async function () {
      const response = await routerClient.path("/routing/jobs/{jobId}", jobId).patch({
        contentType: "application/merge-patch+json",
        body: jobRequest,
      });
      if (response.status !== "201") {
        throw new Error("request fails");
      }
      const result = response.body as RouterJobOutput;

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
    }).timeout(timeoutMs);

    // TODO. Fix the transient bug on existing job
    // it("should create a scheduled job", async function () {
    //   const currentTime: Date = new Date();
    //   currentTime.setSeconds(currentTime.getSeconds() + 5);
    //   const scheduledTime: string = recorder.variable("scheduledTime", currentTime.toISOString());
    //
    //   const scheduledJob = getScheduledJob(scheduledTime);
    //
    //
    //   const response = await routerClient.path("/routing/jobs/{jobId}", scheduledJobId).patch({
    //     contentType: "application/merge-patch+json",
    //     body: scheduledJob
    //   })
    //   if (response.status !== "201") {
    //     throw new Error("request fails")
    //   }
    //   const result = (response.body as RouterJobOutput)
    //
    //   assert.isDefined(result);
    //   assert.isDefined(result.id);
    //   assert.isDefined(result.matchingMode);
    //   assert.equal(result.id, scheduledJobId);
    //   assert.equal(
    //     (result.matchingMode as ScheduleAndSuspendModeOutput).scheduleAt,
    //     scheduledTime
    //   );
    // }).timeout(timeoutMs);

    it("should get a job", async function () {
      const response = await routerClient.path("/routing/jobs/{jobId}", jobId).get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as RouterJobOutput;

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
    }).timeout(timeoutMs);

    it("should update a job", async function () {
      const updatePatch = { ...jobRequest, priority: 25, dispositionCode: "testCode" };
      let response = await routerClient.path("/routing/jobs/{jobId}", jobId).patch({
        contentType: "application/merge-patch+json",
        body: updatePatch,
      });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const updateResult = response.body as RouterJobOutput;

      const removePatch = { ...jobRequest, priority: null!, dispositionCode: null! };
      response = await routerClient.path("/routing/jobs/{jobId}", jobId).patch({
        contentType: "application/merge-patch+json",
        body: removePatch,
      });

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const removeResult = response.body as RouterJobOutput;

      assert.isDefined(updateResult);
      assert.isDefined(updateResult.id);
      assert.isDefined(removeResult);
      assert.isDefined(removeResult.id);
      assert.equal(updateResult.id, jobId);
      assert.equal(removeResult.id, jobId);
      assert.equal(updateResult.priority, updatePatch.priority);
      assert.equal(removeResult.priority, 1);
      assert.isUndefined(removeResult.dispositionCode);
    }).timeout(timeoutMs);

    it("should get queue position for a job", async function () {
      await pollForJobQueued(jobId, routerClient);
      const response = await routerClient.path("/routing/jobs/{jobId}/position", jobId).get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as RouterJobPositionDetailsOutput;

      assert.isDefined(result);
      assert.isDefined(result.position);
      assert.equal(jobId, result.jobId);
    }).timeout(timeoutMs);

    it("should reclassify a job", async function () {
      let result;
      await retry(
        async () => {
          const response = await routerClient
            .path("/routing/jobs/{jobId}:reclassify", jobId)
            .post();

          if (response.status !== "200") {
            throw new Error("request fails");
          }
          result = response.body;
        },
        { retries: 3, retryIntervalMs: 1500 },
      );

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list jobs", async function () {
      const result: RouterJob[] = [];
      const response = await routerClient
        .path("/routing/jobs")
        .get({ queryParameters: { maxpagesize: 20 } });

      if (response.status === "200") {
        // The paginate helper creates a paged async iterator using metadata from the first page.
        const items = paginate(routerClient, response);

        // We get an PageableAsyncIterator so we need to do `for await`.
        for await (const item of items) {
          result.push(item as RouterJobOutput);
        }
      }

      assert.isNotEmpty(result);
    }).timeout(timeoutMs);

    // it("should list scheduled jobs", async function () {
    //   const currentTime: Date = new Date();
    //   currentTime.setSeconds(currentTime.getSeconds() + 30);
    //   const scheduledTime: string = recorder.variable("scheduledTime", currentTime.toISOString());
    //   const result: RouterJob[] = [];
    //
    //   const response = await routerClient.path("/routing/jobs").get({
    //     queryParameters: {
    //       maxpagesize: 20,
    //       scheduledBefore: new Date(scheduledTime),
    //     },
    //   });
    //
    //   if (response.status === "200") {
    //     // The paginate helper creates a paged async iterator using metadata from the first page.
    //     const items = paginate(routerClient, response);
    //
    //     // We get an PageableAsyncIterator so we need to do `for await`.
    //     for await (const item of items) {
    //       result.push(item as RouterJobOutput);
    //     }
    //   }
    //
    //   assert.isNotEmpty(result);
    // }).timeout(timeoutMs);

    it("should cancel a job", async function () {
      let result;
      await retry(
        async () => {
          const response = await routerClient.path("/routing/jobs/{jobId}:cancel", jobId).post();

          if (response.status !== "200") {
            throw new Error("request fails");
          }
          result = response.body;
        },
        { retries: 3, retryIntervalMs: 1500 },
      );

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should delete a job", async function () {
      let deleted = false;
      await retry(
        async () => {
          const interResponse = await routerClient.path("/routing/jobs/{jobId}", jobId).get();
          if (interResponse.status !== "200") {
            throw new Error("request fails");
          }
          const job = interResponse.body as RouterJobOutput;

          if (job.status !== "cancelled") {
            await routerClient.path("/routing/jobs/{jobId}:cancel", jobId).post();
          } else {
            const response = await routerClient.path("/routing/jobs/{jobId}", jobId).delete();
            if (response.status !== "204") {
              throw new Error("request fails");
            }

            assert.isDefined(response);
            deleted = true;
          }
        },
        { retries: 5, retryIntervalMs: 1500 },
      );

      assert.isTrue(deleted);
    }).timeout(timeoutMs * 4);

    // TODO. Fix the transient bug on existing job
    // it("should delete a scheduled job", async function () {
    //   let deleted = false;
    //   await retry(
    //     async () => {
    //       const interResponse = await routerClient.path("/routing/jobs/{jobId}", scheduledJobId).get()
    //       if (interResponse.status !== "200") {
    //         throw new Error("request fails")
    //       }
    //       const job = (interResponse.body as RouterJobOutput)
    //
    //       if (job.status !== "cancelled") {
    //         await routerClient.path("/routing/jobs/{jobId}:cancel", scheduledJobId).post()
    //       } else {
    //         const response = await routerClient.path("/routing/jobs/{jobId}", scheduledJobId).delete()
    //         if (response.status !== "204") {
    //           throw new Error("request fails")
    //         }
    //
    //         assert.isDefined(response);
    //         deleted = true;
    //       }
    //     },
    //     { retries: 5, retryIntervalMs: 1500 }
    //   );
    //
    //   assert.isTrue(deleted)
    // }).timeout(timeoutMs * 4);
  });
});
