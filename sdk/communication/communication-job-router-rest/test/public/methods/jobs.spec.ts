// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import type {
  AzureCommunicationRoutingServiceClient,
  RouterJob,
  RouterJobOutput,
  RouterJobPositionDetailsOutput,
} from "../../../src/index.js";
import { paginate } from "@azure-rest/communication-job-router";
import {
  getClassificationPolicyRequest,
  getDistributionPolicyRequest,
  getExceptionPolicyRequest,
  getJobRequest,
  getQueueRequest,
} from "../utils/testData.js";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient.js";
import { timeoutMs } from "../utils/constants.js";
import { pollForJobQueued, retry } from "../utils/polling.js";
import { describe, it, assert, beforeEach, afterEach } from "vitest";

describe("JobRouterClient", () => {
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

  describe("Job Operations", () => {
    beforeEach(async (ctx) => {
      ({ routerClient, recorder } = await createRecordedRouterClientWithConnectionString(ctx));

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

    afterEach(async () => {
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

      await recorder.stop();
    });

    it("should create a job", { timeout: timeoutMs }, async () => {
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
    });

    // TODO. Fix the transient bug on existing job
    // it("should create a scheduled job", async () => {
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

    it("should get a job", { timeout: timeoutMs }, async () => {
      const response = await routerClient.path("/routing/jobs/{jobId}", jobId).get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as RouterJobOutput;

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, jobId);
    });

    it("should update a job", { timeout: timeoutMs }, async () => {
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
    });

    it("should get queue position for a job", { timeout: timeoutMs }, async () => {
      await pollForJobQueued(jobId, routerClient);
      const response = await routerClient.path("/routing/jobs/{jobId}/position", jobId).get();

      if (response.status !== "200") {
        throw new Error("request fails");
      }
      const result = response.body as RouterJobPositionDetailsOutput;

      assert.isDefined(result);
      assert.isDefined(result.position);
      assert.equal(jobId, result.jobId);
    });

    it("should reclassify a job", { timeout: timeoutMs }, async () => {
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
    });

    it("should list jobs", { timeout: timeoutMs }, async () => {
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
    });

    // it("should list scheduled jobs", async () => {
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

    it("should cancel a job", { timeout: timeoutMs }, async () => {
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
    });

    it("should delete a job", { timeout: timeoutMs * 4 }, async () => {
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
    });

    // TODO. Fix the transient bug on existing job
    // it("should delete a scheduled job", async () => {
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
