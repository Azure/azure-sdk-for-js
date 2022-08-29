// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { ExceptionPolicy, ExceptionPolicyResponse, RouterAdministrationClient } from "../../src";
import { assert } from "chai";
import { createRecordedRouterClientWithConnectionString } from "../internal/utils/mockClient";
import { Context } from "mocha";
import { exceptionPolicyRequest } from "./utils/testData";

// TODO . Complete unit and integration tests https://github.com/Azure/azure-sdk-for-js/issues/23007
describe("RouterClient", function() {
  let recorder: Recorder;
  // let client: RouterClient;
  let administrationClient: RouterAdministrationClient;

  describe("Exception Policy Operations", function() {
    beforeEach(async function(this: Context) {
      ({ administrationClient, recorder } = await createRecordedRouterClientWithConnectionString(
        this
      ));
    });

    afterEach(async function(this: Context) {
      if (!this.currentTest?.isPending() && recorder) {
        await recorder.stop();
      }
    });

    // exception policy actions
    it("should successfully create a exception policy", async function() {
      const request = exceptionPolicyRequest;

      const result = await administrationClient.createExceptionPolicy(request.id!, request);

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, request.name);
    }).timeout(8000);

    it("should successfully update a exception policy", async function() {
      const exceptionPolicy: ExceptionPolicyResponse = await administrationClient.createExceptionPolicy(
        exceptionPolicyRequest.id!,
        exceptionPolicyRequest
      );
      exceptionPolicy.name = "some new name";
      const result = await administrationClient.updateExceptionPolicy(
        exceptionPolicyRequest.id!,
        exceptionPolicy
      );

      assert.isDefined(result);
      assert.isDefined(result?.id);
      assert.equal(result.name, exceptionPolicy.name);
    }).timeout(8000);

    it("should successfully get a exception policy", async function() {
      const exceptionPolicy: ExceptionPolicyResponse = await administrationClient.createExceptionPolicy(
        exceptionPolicyRequest.id!,
        exceptionPolicyRequest
      );

      const result = await administrationClient.getExceptionPolicy(exceptionPolicy.id!, {});

      assert.equal(result.id, exceptionPolicyRequest.id);
      assert.equal(result.name, exceptionPolicyRequest.name);
      assert.deepEqual(result.exceptionRules, exceptionPolicyRequest.exceptionRules);
    }).timeout(8000);

    it("should successfully list exception policies", async function() {
      await administrationClient.createExceptionPolicy("id-1", exceptionPolicyRequest);
      await administrationClient.createExceptionPolicy("id-2", exceptionPolicyRequest);

      const receivedItems: ExceptionPolicy[] = [];
      for await (const policy of administrationClient.listExceptionPolicies({
        maxPageSize: 20
      })) {
        receivedItems.push(policy.exceptionPolicy!);
      }

      assert.isNotNull(receivedItems);
    }).timeout(8000);

    it("should successfully delete a exception policy", async function() {
      await administrationClient.createExceptionPolicy(
        exceptionPolicyRequest.id!,
        exceptionPolicyRequest
      );
      await administrationClient.deleteExceptionPolicy(exceptionPolicyRequest.id!, {});
    }).timeout(8000);
  });
});
