// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import chai from "chai";
import sinon from "sinon";
import {
  HttpOperationResponse,
  WebResource,
  HttpHeaders,
  RequestPolicyOptions,
  RequestPolicy,
  RestError
} from "@azure/core-http";
import { ThrottlingRetryPolicy, getDelayInMs } from "../../src/policies/throttlingRetryPolicy";
import { assertThrowsRestError } from "../public/utils/testHelpers";

describe("ThrottlingRetryPolicy", () => {
  class PassThroughPolicy {
    constructor(private _response: HttpOperationResponse) {}
    public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      const response = {
        ...this._response,
        request: request
      };

      return Promise.resolve(response);
    }
  }

  const defaultResponse = {
    status: 200,
    request: new WebResource(),
    headers: new HttpHeaders()
  };

  function createDefaultThrottlingRetryPolicy(
    response: HttpOperationResponse = defaultResponse,
    nextPolicyCreator: (response: HttpOperationResponse) => RequestPolicy = (response) =>
      new PassThroughPolicy(response)
  ) {
    return new ThrottlingRetryPolicy(nextPolicyCreator(response), new RequestPolicyOptions());
  }

  describe("sendRequest", () => {
    it("should clone the request", async () => {
      const request = new WebResource();
      const nextPolicy = {
        sendRequest: (requestToSend: WebResource): Promise<HttpOperationResponse> => {
          chai.assert(request !== requestToSend);
          return Promise.resolve(defaultResponse);
        }
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
      // requestId is unique, even across retries.
      delete (response.request as any).requestId;
      delete (request as any).requestId;
      chai.assert.deepEqual(response.request, request);
    });

    it("should do nothing when status code is not 429", async () => {
      const request = new WebResource();
      const mockResponse = {
        status: 400,
        headers: new HttpHeaders({
          "Retry-After": "100"
        }),
        request: request
      };
      const policy = createDefaultThrottlingRetryPolicy(mockResponse, (_) => {
        return {
          sendRequest: (_: WebResource) => {
            throw new RestError("some other error, but not an 429 with a timeout", "", 500);
          }
        };
      });

      await assertThrowsRestError(
        () => policy.sendRequest(request),
        500,
        "some other error, but not an 429 with a timeout"
      );
    });

    it("should pass the response to the handler if the status code equals 429", async () => {
      const request = new WebResource();
      const mockResponse = {
        status: 429,
        headers: new HttpHeaders({
          "Retry-After": "100"
        }),
        request: request
      };
      const policy = createDefaultThrottlingRetryPolicy(mockResponse, (response) => {
        return {
          sendRequest: (_: WebResource) => {
            chai.assert.deepEqual(response, mockResponse);
            return Promise.resolve(response);
          }
        };
      });

      const response = await policy.sendRequest(request);
      chai.assert.deepEqual(response, mockResponse);
    });

    it("should extract the header properly", () => {
      const headers = new Map<string, string>();

      // ie, no retry header
      chai.assert.notOk(getDelayInMs(headers));

      headers.set("retry-after-ms", "10");
      chai.assert.equal(getDelayInMs(headers), 10);

      headers.clear();
      headers.set("x-ms-retry-after-ms", "101");
      chai.assert.equal(getDelayInMs(headers), 101);

      // Retry-After's value is actually in seconds, not milliseconds like the
      // other retry headers.
      headers.clear();
      headers.set("Retry-After", "1010");
      chai.assert.equal(getDelayInMs(headers), 1010 * 1000);

      headers.clear();
      headers.set("retry-after-ms", "this is not a number");
      chai.assert.notOk(getDelayInMs(headers));

      headers.clear();
      headers.set("Retry-After", "this is not a number or a date");
      chai.assert.notOk(getDelayInMs(headers));

      // Retry-After can also return a date
      headers.clear();
      const dateOneDayInTheFuture = new Date(Date.now() + 1000 * 60 * 60 * 25);
      headers.set("Retry-After", dateOneDayInTheFuture.toISOString());
      const delayInMsFromDate = getDelayInMs(headers);
      chai.assert.ok(delayInMsFromDate);
      chai.assert.isAtLeast(delayInMsFromDate!, 1000 * 60 * 60 * 24);
    });
  });

  describe("parseRetryAfterHeader", () => {
    it("should return undefined for ill-formed header", function() {
      const retryAfter = ThrottlingRetryPolicy.parseRetryAfterHeader("foobar");
      chai.assert.equal(retryAfter, undefined);
    });

    it("should return sleep interval value in milliseconds if parameter is a number", function(done) {
      const retryAfter = ThrottlingRetryPolicy.parseRetryAfterHeader("1");
      chai.assert.equal(retryAfter, 1000);
      done();
    });

    it("should return sleep interval value in milliseconds for full date format", function(done) {
      const clock = sinon.useFakeTimers(new Date("Fri, 31 Dec 1999 23:00:00 GMT").getTime());
      const retryAfter = ThrottlingRetryPolicy.parseRetryAfterHeader(
        "Fri, 31 Dec 1999 23:02:00 GMT"
      );

      chai.assert.equal(retryAfter, 2 * 60 * 1000);

      clock.restore();
      done();
    });

    it("should return sleep interval value in milliseconds for shorter date format", function(done) {
      const clock = sinon.useFakeTimers(new Date("Fri, 31 Dec 1999 23:00:00 GMT").getTime());
      const retryAfter = ThrottlingRetryPolicy.parseRetryAfterHeader("31 Dec 1999 23:03:00 GMT");

      chai.assert.equal(retryAfter, 3 * 60 * 1000);

      clock.restore();
      done();
    });
  });
});
