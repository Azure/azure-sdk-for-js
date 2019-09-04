// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { HttpHeaders, HttpOperationResponse, SimpleTokenCredential, WebResource, ServiceClient } from "@azure/core-http";
import { getDelayInSeconds, isFinished } from "../src";

describe("LROPollStrategy - utiliites", function () {
  describe("getDelayInSeconds()", function () {
    it("delay from a fake previous response", function () {
      const serviceClient = new ServiceClient(new SimpleTokenCredential("my-fake-token"));
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders()
      };
      assert.strictEqual(getDelayInSeconds(serviceClient, previousResponse), 30);
    });

    it("with 12 retry-after header", function () {
      const serviceClient = new ServiceClient(new SimpleTokenCredential("my-fake-token"));
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders({ "retry-after": "12" })
      };
      assert.strictEqual(getDelayInSeconds(serviceClient, previousResponse), 12);
    });

    it("with spam retry-after header", function () {
      const serviceClient = new ServiceClient(new SimpleTokenCredential("my-fake-token"));
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders({ "retry-after": "spam" })
      };
      assert.strictEqual(getDelayInSeconds(serviceClient, previousResponse), 30);
    });
  });

  describe("isFinished(LongRunningOperationStates)", function () {
    it(`with undefined`, function () {
      assert(!isFinished(undefined as any));
    });

    it(`with null`, function () {
      // tslint:disable-next-line:no-null-keyword
      assert(!isFinished(null as any));
    });

    it(`with ""`, function () {
      assert(!isFinished("" as any));
    });

    it(`with "spam"`, function () {
      assert(!isFinished("spam" as any));
    });

    it(`with "InProgress"`, function () {
      assert(!isFinished("InProgress"));
    });

    it(`with "succeeded"`, function () {
      assert(isFinished("succeeded" as any));
    });

    it(`with "Succeeded"`, function () {
      assert(isFinished("Succeeded"));
    });

    it(`with "failed"`, function () {
      assert(isFinished("failed" as any));
    });

    it(`with "Failed"`, function () {
      assert(isFinished("Failed"));
    });

    it(`with "cancelled"`, function () {
      assert(isFinished("cancelled" as any));
    });

    it(`with "Cancelled"`, function () {
      assert(isFinished("Cancelled"));
    });

    it(`with "canceled"`, function () {
      assert(isFinished("canceled" as any));
    });

    it(`with "Canceled"`, function () {
      assert(isFinished("Canceled"));
    });
  });
}); 
