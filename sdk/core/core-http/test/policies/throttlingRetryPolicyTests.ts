// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AssertionError, assert } from "chai";
import { Constants, HttpHeaders, RequestPolicyOptions } from "../../src/coreHttp";
import { AbortController } from "@azure/abort-controller";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { ThrottlingRetryPolicy } from "../../src/policies/throttlingRetryPolicy";
import { WebResource } from "../../src/webResource";
import sinon from "sinon";

describe("ThrottlingRetryPolicy", () => {
  class PassThroughPolicy {
    constructor(private _response: HttpOperationResponse) {}
    public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      const response = {
        ...this._response,
        request: request,
      };

      return Promise.resolve(response);
    }
  }

  const defaultResponse = {
    status: 200,
    request: new WebResource(),
    headers: new HttpHeaders(),
  };

  function createDefaultThrottlingRetryPolicy(
    response?: HttpOperationResponse,
    actionHandler?: (
      httpRequest: WebResource,
      response: HttpOperationResponse
    ) => Promise<HttpOperationResponse>
  ): ThrottlingRetryPolicy {
    if (!response) {
      response = defaultResponse;
    }

    const passThroughPolicy = new PassThroughPolicy(response);
    return new ThrottlingRetryPolicy(passThroughPolicy, new RequestPolicyOptions(), actionHandler);
  }

  describe("sendRequest", () => {
    it("should clone the request", async () => {
      const request = new WebResource();
      const nextPolicy = {
        sendRequest: (requestToSend: WebResource): Promise<HttpOperationResponse> => {
          assert(request !== requestToSend);
          return Promise.resolve(defaultResponse);
        },
      };
      const policy = new ThrottlingRetryPolicy(nextPolicy, new RequestPolicyOptions());
      await policy.sendRequest(request);
    });

    it("should not modify the request", async () => {
      const request = new WebResource();
      request.url = "http://url";
      request.method = "PATCH";
      request.body = { someProperty: "someValue" };
      request.headers = new HttpHeaders({ header: "abc" });
      request.query = { q: "param" };

      const policy = createDefaultThrottlingRetryPolicy();
      const response = await policy.sendRequest(request);
      delete (response.request as any).requestId;
      delete (request as any).requestId;

      assert.deepEqual(response.request, request);
    });

    it("should do nothing when status code is not 429 nor 503", async () => {
      const request = new WebResource();
      const mockResponse = {
        status: 400,
        headers: new HttpHeaders({
          "Retry-After": "100",
        }),
        request: request,
      };
      const policy = createDefaultThrottlingRetryPolicy(mockResponse, (_) => {
        throw new AssertionError("fail");
      });

      const response = await policy.sendRequest(request);
      delete (request as any).requestId;
      delete (response.request as any).requestId;

      assert.deepEqual(response, mockResponse);
    });

    it("should pass the response to the handler if the status code equals 429", async () => {
      const request = new WebResource();
      const mockResponse = {
        status: 429,
        headers: new HttpHeaders({
          "Retry-After": "100",
        }),
        request: request,
      };
      const policy = createDefaultThrottlingRetryPolicy(mockResponse, (_, response) => {
        delete (response.request as any).requestId;
        delete (mockResponse.request as any).requestId;
        assert.deepEqual(response, mockResponse);
        return Promise.resolve(response);
      });

      const response = await policy.sendRequest(request);
      delete (request as any).requestId;
      delete (response.request as any).requestId;
      assert.deepEqual(response, mockResponse);
    });

    it("should pass the response to the handler if the status code equals 503", async () => {
      const request = new WebResource();
      const mockResponse = {
        status: 503,
        headers: new HttpHeaders({
          "Retry-After": "100",
        }),
        request: request,
      };
      const policy = createDefaultThrottlingRetryPolicy(mockResponse, (_, response) => {
        delete (response.request as any).requestId;
        delete (mockResponse.request as any).requestId;
        assert.deepEqual(response, mockResponse);
        return Promise.resolve(response);
      });

      const response = await policy.sendRequest(request);
      delete (request as any).requestId;
      delete (response.request as any).requestId;
      assert.deepEqual(response, mockResponse);
    });

    it("if the status code equals 429, it should retry up to 3 times", async () => {
      const request = new WebResource();
      const status = 429;
      const retryResponse = {
        status,
        headers: new HttpHeaders({
          "Retry-After": "1",
        }),
        request,
      };
      const responses: HttpOperationResponse[] = [
        retryResponse,
        retryResponse,
        retryResponse,
        // This one should be returned
        {
          status,
          headers: new HttpHeaders({
            "Retry-After": "1",
            "final-response": "final-response",
          }),
          request,
        },
      ];

      const clock = sinon.useFakeTimers();

      const policy = new ThrottlingRetryPolicy(
        {
          async sendRequest(): Promise<HttpOperationResponse> {
            return responses.shift()!;
          },
        },
        new RequestPolicyOptions()
      );

      const promise = policy.sendRequest(request);
      clock.tickAsync(3000);

      const response = await promise;
      assert.deepEqual(response.status, status);
      assert.equal(response.headers.get("final-response"), "final-response");

      clock.restore();
    });

    it("if the status code equals 503, it should retry up to 3 times", async () => {
      const request = new WebResource();
      const status = 503;
      const retryResponse = {
        status,
        headers: new HttpHeaders({
          "Retry-After": "1",
        }),
        request,
      };
      const responses: HttpOperationResponse[] = [
        retryResponse,
        retryResponse,
        retryResponse,
        // This one should be returned
        {
          status,
          headers: new HttpHeaders({
            "Retry-After": "1",
            "final-response": "final-response",
          }),
          request,
        },
      ];

      const clock = sinon.useFakeTimers();

      const policy = new ThrottlingRetryPolicy(
        {
          async sendRequest(): Promise<HttpOperationResponse> {
            return responses.shift()!;
          },
        },
        new RequestPolicyOptions()
      );

      const promise = policy.sendRequest(request);
      clock.tickAsync(3000);

      const response = await promise;
      assert.deepEqual(response.status, status);
      assert.equal(response.headers.get("final-response"), "final-response");

      clock.restore();
    });

    it("should honor the abort signal passed", async () => {
      const request = new WebResource(
        "https://fakeservice.io",
        "GET",
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        AbortController.timeout(100)
      );
      const mockResponse = {
        headers: new HttpHeaders({
          "Retry-After": "10000",
        }),
        status: Constants.HttpConstants.StatusCodes.TooManyRequests,
        body: {
          type: "https://fakeservice.io/errors/too-many-requests",
          title: "Resource utilization has surpassed the assigned quota",
          policy: "Total Requests",
          status: Constants.HttpConstants.StatusCodes.TooManyRequests,
        },
        request: request,
      };
      const policy = createDefaultThrottlingRetryPolicy(mockResponse);
      let errorWasThrown = false;
      try {
        await policy.sendRequest(request);
      } catch (error: any) {
        errorWasThrown = true;
        assert.equal((error as any).name, "AbortError", "Unexpected error thrown");
      }
      assert.equal(errorWasThrown, true, "Error was not thrown");
    });
  });

  describe("parseRetryAfterHeader", () => {
    it("should return undefined for ill-formed header", function () {
      const retryAfter = ThrottlingRetryPolicy.parseRetryAfterHeader("foobar");
      assert.equal(retryAfter, undefined);
    });

    it("should return sleep interval value in milliseconds if parameter is a number", function (done) {
      const retryAfter = ThrottlingRetryPolicy.parseRetryAfterHeader("1");
      assert.equal(retryAfter, 1000);
      done();
    });

    it("should return sleep interval value in milliseconds for full date format", function (done) {
      const clock = sinon.useFakeTimers(new Date("Fri, 31 Dec 1999 23:00:00 GMT").getTime());
      const retryAfter = ThrottlingRetryPolicy.parseRetryAfterHeader(
        "Fri, 31 Dec 1999 23:02:00 GMT"
      );

      assert.equal(retryAfter, 2 * 60 * 1000);

      clock.restore();
      done();
    });

    it("should return sleep interval value in milliseconds for shorter date format", function (done) {
      const clock = sinon.useFakeTimers(new Date("Fri, 31 Dec 1999 23:00:00 GMT").getTime());
      const retryAfter = ThrottlingRetryPolicy.parseRetryAfterHeader("31 Dec 1999 23:03:00 GMT");

      assert.equal(retryAfter, 3 * 60 * 1000);

      clock.restore();
      done();
    });
  });
});
