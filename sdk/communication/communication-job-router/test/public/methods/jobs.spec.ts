// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { RouterJob, RouterClient } from "../../../src";
import { Context } from "mocha";
import {
  classificationPolicyRequest,
  distributionPolicyRequest,
  exceptionPolicyRequest,
  jobRequest,
  queueRequest
} from "../../internal/utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../../internal/utils/constants";

describe("RouterClient", function() {
  let recorder: Recorder;
  let client: RouterClient;
  let response: any;
  let request: RouterJob = jobRequest;
  let count: number = 0;

  describe("RouterJob Operations", function() {
    this.beforeAll(async function(this: Context) {
      ({ client, recorder } = createRecordedRouterClientWithConnectionString(this));

      /**************TEMP**********/
      // const jobs = await client.listJobs("active");
      // while (jobs.next) {
      //   const job = (await jobs.next()).value;
      //   await client.cancelJob(job?.id);
      // }

      // await client.deleteClassificationPolicy(classificationPolicyRequest.id!, {});
      // await client.deleteQueue(queueRequest.id!, {});
      // await client.deleteExceptionPolicy(exceptionPolicyRequest.id!, {});
      // await client.deleteDistributionPolicy(distributionPolicyRequest.id!, {});
      /****************************/

      await client.createDistributionPolicy(distributionPolicyRequest.id!, {
        patch: distributionPolicyRequest
      });
      await client.createExceptionPolicy(exceptionPolicyRequest.id!, {
        patch: exceptionPolicyRequest
      });
      await client.createQueue(queueRequest.id!, { patch: queueRequest });
      await client.createClassificationPolicy(classificationPolicyRequest.id!, {
        patch: classificationPolicyRequest
      });
    });

    beforeEach(async function(this: Context) {
      // await client.cancelJob(jobRequest.id!);
      // let now1 = Date.now();
      // const end1 = now1 + 1000;
      // while (now1 < end1) {
      //   now1 = Date.now();
      // }

      // await client.deleteJob(jobRequest.id!);
      // let now = Date.now();
      // const end = now + 1000;
      // while (now < end) {
      //   now = Date.now();
      // }

      response = await client.createJob(`${jobRequest.id!}${++count}`, { patch: request });
    });

    afterEach(async function(this: Context) {
      // await client.cancelJob(jobRequest.id!);
      // await client.deleteJob(jobRequest.id!);
      if (!this.currentTest?.isPending() && recorder) {
        // unused
      }
    });

    this.afterAll(async function(this: Context) {
      await client.deleteClassificationPolicy(classificationPolicyRequest.id!, {});
      await client.deleteQueue(queueRequest.id!, {});
      await client.deleteExceptionPolicy(exceptionPolicyRequest.id!, {});
      await client.deleteDistributionPolicy(distributionPolicyRequest.id!, {});
    });

    it("should create a job", async function() {
      // const result = await client.createJob(request.id!, { patch: request });

      assert.isDefined(response);
      assert.isDefined(response.id);
      assert.equal(response.id, request.id);
    }).timeout(timeoutMs);

    it("should get a job", async function() {
      // const response: RouterJob = await client.createJob(request.id!, {
      //   patch: request
      // });

      const result = await client.getJob(request.id!);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, request.id);
    }).timeout(timeoutMs);

    it("should update a job", async function() {
      // const response: RouterJob = await client.createJob(request.id!, {
      //   patch: request
      // });

      const patch = { ...response, priority: 5 };
      const result = await client.updateJob(response.id!, { patch });

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.id, request.id);
      assert.equal(result.priority, patch.priority);
    }).timeout(timeoutMs);

    it("should get in-queue position for a job", async function() {
      // const response: RouterJob = await client.createJob(request.id!, {
      //   patch: request
      // });

      const result = await client.getInQueuePosition(response.id!);

      assert.isDefined(result);
      assert.equal(response.id, result.jobId);
    }).timeout(timeoutMs);

    it("should cancel a job", async function() {
      // const response: RouterJob = await client.createJob(request.id!, {
      //   patch: request
      // });

      const result = await client.cancelJob(response.id!, {});

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should complete a job", async function() {
      // const response: RouterJob = await client.createJob(request.id!, {
      //   patch: request
      // });
      const job: RouterJob = await client.getJob(response.id!);
      const assignmentId = Object.keys(job.assignments!)[0] ?? "";

      const result = await client.completeJob(response.id!, assignmentId);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should close a job", async function() {
      // const response: RouterJob = await client.createJob(request.id!, {
      //   patch: request
      // });
      const job: RouterJob = await client.getJob(response.id!);
      const assignmentId = Object.keys(job.assignments!)[0] ?? "";

      const result = await client.closeJob(response.id!, assignmentId);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should reclassify a job", async function() {
      // const response: RouterJob = await client.createJob(request.id!, {
      //   patch: request
      // });

      const result = await client.reclassifyJob(response.id!, {});

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should delete a job", async function() {
      // const response: RouterJob = await client.createJob(request.id!, {
      //   patch: request
      // });

      const result = await client.deleteJob(response.id!, {});

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list jobs", async function() {
      // await client.createJob(request.id!, { patch: request });

      const result = await client.listJobs("all");

      assert.isNotNull(result.next());
      assert.isNotNull(result.next());
    }).timeout(timeoutMs);
  });
});
