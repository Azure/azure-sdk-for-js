// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import assert from "assert";
import { HttpHeaders } from "../../../lib/httpHeaders";
import { HttpOperationResponse } from "../../../lib/httpOperationResponse";
import { HttpClient } from "../../../lib/msRest";
import { DeserializationPolicy, deserializationPolicy } from "../../../lib/policies/deserializationPolicy";
import { RequestPolicy, RequestPolicyOptions } from "../../../lib/policies/requestPolicy";
import { WebResource } from "../../../lib/webResource";

describe("deserializationPolicy", () => {
  const mockPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      return Promise.resolve({
        request: request,
        status: 200,
        headers: new HttpHeaders()
      });
    }
  };

  it(`should not modify a request that has no request body mapper`, async () => {
    const deserializationPolicy = new DeserializationPolicy(mockPolicy, new RequestPolicyOptions());

    const request = new WebResource();
    request.body = "hello there!";

    await deserializationPolicy.sendRequest(request);
    assert.strictEqual(request.body, "hello there!");
  });

  it("should parse a JSON response body", async function() {
    const request = new WebResource();
    const mockClient: HttpClient = {
      sendRequest: req => Promise.resolve({
        request: req,
        status: 200,
        headers: new HttpHeaders({ "Content-Type": "application/json" }),
        bodyAsText: "[123, 456, 789]"
      })
    };

    const policy = deserializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepStrictEqual(response.parsedBody, [123, 456, 789]);
  });

  it("should parse a JSON response body with a charset specified in Content-Type", async function() {
    const request = new WebResource();
    const mockClient: HttpClient = {
      sendRequest: req => Promise.resolve({
        request: req,
        status: 200,
        headers: new HttpHeaders({ "Content-Type": "application/json;charset=UTF-8" }),
        bodyAsText: "[123, 456, 789]"
      })
    };

    const policy = deserializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepStrictEqual(response.parsedBody, [123, 456, 789]);
  });

  it("should parse a JSON response body with an uppercase Content-Type", async function() {
    const request = new WebResource();
    const mockClient: HttpClient = {
      sendRequest: req => Promise.resolve({
        request: req,
        status: 200,
        headers: new HttpHeaders({ "Content-Type": "APPLICATION/JSON" }),
        bodyAsText: "[123, 456, 789]"
      })
    };

    const policy = deserializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepStrictEqual(response.parsedBody, [123, 456, 789]);
  });

  it("should parse a JSON response body with a missing Content-Type", async function() {
    const request = new WebResource();
    const mockClient: HttpClient = {
      sendRequest: req => Promise.resolve({
        request: req,
        status: 200,
        headers: new HttpHeaders(),
        bodyAsText: "[123, 456, 789]"
      })
    };

    const policy = deserializationPolicy().create(mockClient, new RequestPolicyOptions());
    const response = await policy.sendRequest(request);
    assert.deepStrictEqual(response.parsedBody, [123, 456, 789]);
  });
});