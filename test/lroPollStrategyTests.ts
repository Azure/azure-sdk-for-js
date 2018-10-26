// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { HttpHeaders, HttpOperationResponse, TokenCredentials, WebResource } from "ms-rest-js";
import { AzureServiceClient } from "../lib/azureServiceClient";
import { getDelayInSeconds, isFinished } from "../lib/lroPollStrategy";

describe("LROPollStrategy", function () {
  describe("getDelayInMilliseconds()", function () {
    it("with no AzureServiceClient.longRunningOperationRetryTimeout value and no retry-after header", function () {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"));
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders()
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 30);
    });

    it("with 11 AzureServiceClient.longRunningOperationRetryTimeout and no retry-after header", function () {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"), { longRunningOperationRetryTimeout: 11 });
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders()
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 11);
    });

    it("with no AzureServiceClient.longRunningOperationRetryTimeout value and 12 retry-after header", function () {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"));
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders({ "retry-after": "12" })
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 12);
    });

    it("with no AzureServiceClient.longRunningOperationRetryTimeout value and spam retry-after header", function () {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"));
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders({ "retry-after": "spam" })
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 30);
    });

    it("with 11 AzureServiceClient.longRunningOperationRetryTimeout and 12 retry-after header", function () {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"), { longRunningOperationRetryTimeout: 11 });
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders({ "retry-after": "12" })
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 11);
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
      assert(!isFinished("cancelled" as any));
    });

    it(`with "Cancelled"`, function () {
      assert(!isFinished("Cancelled" as any));
    });

    it(`with "canceled"`, function () {
      assert(isFinished("canceled" as any));
    });

    it(`with "Canceled"`, function () {
      assert(isFinished("Canceled"));
    });
  });
});