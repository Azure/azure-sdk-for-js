// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as assert from "assert";
import { HttpHeaders, HttpOperationResponse, TokenCredentials, WebResource } from "ms-rest-js";
import { AzureServiceClient } from "../lib/azureServiceClient";
import { getDelayInSeconds } from "../lib/lroPollStrategy";

describe("LROPollStrategy", () => {
  describe("getDelayInMilliseconds()", () => {
    it("with no AzureServiceClient.longRunningOperationRetryTimeout value and no retry-after header", () => {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"));
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders()
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 30);
    });

    it("with 11 AzureServiceClient.longRunningOperationRetryTimeout and no retry-after header", () => {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"), { longRunningOperationRetryTimeout: 11 });
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders()
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 11);
    });

    it("with no AzureServiceClient.longRunningOperationRetryTimeout value and 12 retry-after header", () => {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"));
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders({ "retry-after": "12" })
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 12);
    });

    it("with no AzureServiceClient.longRunningOperationRetryTimeout value and spam retry-after header", () => {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"));
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders({ "retry-after": "spam" })
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 30);
    });

    it("with 11 AzureServiceClient.longRunningOperationRetryTimeout and 12 retry-after header", () => {
      const azureServiceClient = new AzureServiceClient(new TokenCredentials("my-fake-token"), { longRunningOperationRetryTimeout: 11 });
      const previousResponse: HttpOperationResponse = {
        request: new WebResource(),
        status: 200,
        headers: new HttpHeaders({ "retry-after": "12" })
      };
      assert.strictEqual(getDelayInSeconds(azureServiceClient, previousResponse), 11);
    });
  });
});