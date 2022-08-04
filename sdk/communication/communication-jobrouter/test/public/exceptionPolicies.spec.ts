// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { Recorder } from "@azure-tools/test-recorder";
import { assert } from "chai";
import { createRecordedRouterClientWithConnectionString } from "../internal/utils/mockClient";
import { Context } from "mocha";
import { exceptionPolicyRequest } from "./utils/testData";
import { RouterAdministrationClient } from "../../src";

describe("RouterClient", function() {
  let recorder: Recorder;
  // let client: RouterClient;
  let administrationClient: RouterAdministrationClient;

  describe("Exception Policy Operations", function() {
    beforeEach(function(this: Context) {
      ({ administrationClient, recorder } = createRecordedRouterClientWithConnectionString(this));
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

    // it("should successfully update a exception policy", async function() {
    //   var exceptionPolicy: ExceptionPolicy = await client.createExceptionPolicy(
    //     exceptionPolicyRequest,
    //     {}
    //   );
    //   exceptionPolicy.name = "some new name"
    //   const result = await client.updateExceptionPolicy(exceptionPolicy, {});
    //
    //   assert.isDefined(result);
    //   assert.isDefined(result?.id);
    //   assert.equal(result.name, exceptionPolicy.name);
    // }).timeout(8000);
    //
    // it("should successfully get a exception policy", async function() {
    //   const exceptionPolicy: ExceptionPolicy = await client.createExceptionPolicy(
    //     exceptionPolicyRequest,
    //     {}
    //   );
    //
    //   const result = await client.getExceptionPolicy(exceptionPolicy.id!, {});
    //
    //   assert.equal(result.id, exceptionPolicyRequest.id);
    //   assert.equal(result.name, exceptionPolicyRequest.name);
    //   assert.deepEqual(result.queueSelectors, exceptionPolicyRequest.queueSelectors);
    //   assert.deepEqual(result.prioritizationRule, exceptionPolicyRequest.prioritizationRule);
    // }).timeout(8000);
    //
    // it("should successfully list exception policies", async function() {
    //   await client.createExceptionPolicy(exceptionPolicyRequest, {});
    //   await client.createExceptionPolicy(exceptionPolicyRequest, {});
    //
    //   const result = await client.listExceptionPolicies({
    //     maxpagesize: 1
    //   });
    //
    //   assert.isNotNull(result.next());
    //   assert.isNotNull(result.next());
    // }).timeout(8000);
    //
    // it("should successfully delete a exception policy", async function() {
    //   const exceptionPolicy: ExceptionPolicy = await client.createExceptionPolicy(
    //     exceptionPolicyRequest,
    //     {}
    //   );
    //   const request = {
    //     name: "some new name"
    //   };
    //   const result = await client.deleteExceptionPolicy(exceptionPolicy.id!, {});
    //   // const result = await client.getExceptionPolicy(exceptionPolicy.id!, {});
    //
    //   assert.isDefined(result);
    //   assert.equal(result.name, request.name);
    // }).timeout(8000);
  });
});
