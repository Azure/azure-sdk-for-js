// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { Context } from "mocha";
import { ClassificationPolicy, RouterAdministrationClient } from "../../../src";
import {
  classificationPolicyRequest,
  distributionPolicyRequest,
  exceptionPolicyRequest,
  queueRequest
} from "../utils/testData";
import { createRecordedRouterClientWithConnectionString } from "../../internal/utils/mockClient";
import { timeoutMs } from "../utils/constants";

describe("RouterClient", function() {
  let recorder: Recorder;
  let administrationClient: RouterAdministrationClient;
  let request: ClassificationPolicy = classificationPolicyRequest;

  describe("Classification Policy Operations", function() {
    this.beforeAll(async function(this: Context) {
      ({ administrationClient, recorder } = await createRecordedRouterClientWithConnectionString(this));

      await administrationClient.createDistributionPolicy(
        distributionPolicyRequest.id!,
        distributionPolicyRequest
      );
      await administrationClient.createExceptionPolicy(exceptionPolicyRequest.id!, exceptionPolicyRequest);
      await administrationClient.createQueue(queueRequest.id!, queueRequest);
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        // unused
      }

      await administrationClient.deleteClassificationPolicy(classificationPolicyRequest.id!);
    });

    this.afterAll(async function(this: Context) {
      await administrationClient.deleteClassificationPolicy(classificationPolicyRequest.id!);
      await administrationClient.deleteQueue(queueRequest.id!);
      await administrationClient.deleteExceptionPolicy(exceptionPolicyRequest.id!);
      await administrationClient.deleteDistributionPolicy(distributionPolicyRequest.id!);
    });

    it("should create a classification policy", async function() {
      const result = await administrationClient.createClassificationPolicy(request.id!, request);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, request.name);
    }).timeout(timeoutMs);

    it("should get a classification policy", async function() {
      const response: ClassificationPolicy = await administrationClient.createClassificationPolicy(
        request.id!,
        request
      );

      const result = await administrationClient.getClassificationPolicy(request.id!);

      assert.equal(result.id, response.id);
      assert.equal(result.name, response.name);
      assert.equal(result.fallbackQueueId, response.fallbackQueueId);
    }).timeout(timeoutMs);

    it("should update a classification policy", async function() {
      var response: ClassificationPolicy = await administrationClient.createClassificationPolicy(
        request.id!,
        request
      );

      const patch: ClassificationPolicy = { ...response, name: "new name" };
      const result = await administrationClient.updateClassificationPolicy(response.id!, patch);

      assert.isDefined(result);
      assert.isDefined(result.id);
      assert.equal(result.name, patch.name);
    }).timeout(timeoutMs);

    it("should delete a classification policy", async function() {
      const response: ClassificationPolicy = await administrationClient.createClassificationPolicy(
        request.id!,
        request
      );

      const result = await administrationClient.deleteClassificationPolicy(response.id!);

      assert.isDefined(result);
    }).timeout(timeoutMs);

    it("should list classification policies", async function() {
      await administrationClient.createClassificationPolicy(request.id!, request);

      const result = await administrationClient.listClassificationPolicies({
        maxPageSize: 1
      });

      assert.isNotNull(result.next());
      assert.isNotNull(result.next());
    }).timeout(timeoutMs);
  });
});
