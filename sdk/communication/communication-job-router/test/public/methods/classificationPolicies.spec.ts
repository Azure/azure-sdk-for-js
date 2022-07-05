// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ClassificationPolicy, RouterClient } from "../../../src";
import {
  classificationPolicyRequest,
  distributionPolicyRequest,
  exceptionPolicyRequest,
  queueRequest
} from "../../internal/utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../../internal/utils/constants";

describe("RouterClient", function() {
  let recorder: Recorder;
  let client: RouterClient;
  let request: ClassificationPolicy = classificationPolicyRequest;

  describe("Classification Policy Operations", function() {
    this.beforeAll(async function(this: Context) {
      ({ client, recorder } = createRecordedRouterClientWithConnectionString(this));

      await client.createDistributionPolicy(
        distributionPolicyRequest.id!,
        distributionPolicyRequest
      );
      await client.createExceptionPolicy(exceptionPolicyRequest.id!, exceptionPolicyRequest);
      await client.createQueue(queueRequest.id!, queueRequest);
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        // unused
      }

      await client.deleteClassificationPolicy(classificationPolicyRequest.id!, {});
    });

    this.afterAll(async function(this: Context) {
      await client.deleteClassificationPolicy(classificationPolicyRequest.id!, {});
      await client.deleteQueue(queueRequest.id!, {});
      await client.deleteExceptionPolicy(exceptionPolicyRequest.id!, {});
      await client.deleteDistributionPolicy(distributionPolicyRequest.id!, {});
    });

    it("should create a classification policy", async function() {
      const result = await client.createClassificationPolicy(request.id!, request);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, request.name);
    }).timeout(timeoutMs);

    it("should get a classification policy", async function() {
      const response: ClassificationPolicy = await client.createClassificationPolicy(
        request.id!,
        request
      );

      const result = await client.getClassificationPolicy(request.id!);

      assert.equal(result.id, response.id);
      assert.equal(result.name, response.name);
      assert.equal(result.fallbackQueueId, response.fallbackQueueId);
    }).timeout(timeoutMs);

    it("should update a classification policy", async function() {
      var response: ClassificationPolicy = await client.createClassificationPolicy(
        request.id!,
        request
      );

      const patch: ClassificationPolicy = { ...response, name: "new name" };
      const result = await client.updateClassificationPolicy(response.id!, patch);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, patch.name);
    }).timeout(timeoutMs);

    it("should delete a classification policy", async function() {
      const response: ClassificationPolicy = await client.createClassificationPolicy(
        request.id!,
        request
      );

      const result = await client.deleteClassificationPolicy(response.id!);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list classification policies", async function() {
      await client.createClassificationPolicy(request.id!, request);

      const result = await client.listClassificationPolicies({
        maxpagesize: 1
      });

      assert.isNotNull(result.next());
      assert.isNotNull(result.next());
    }).timeout(timeoutMs);
  });
});
