// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { ExponentialRetryPolicy } from "../../src/policies/exponentialRetryPolicy";
import { WebResource } from "../../src/webResource";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { HttpHeaders, RequestPolicyOptions } from "../../src/coreHttp";

describe("ExponentialRetryPolicy", () => {
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

  // Return response with the given status code on first sendRequest()
  class FailFirstRequestPolicy {
    public count = 0;
    constructor(private _response: HttpOperationResponse, private statusCode: number) {}
    public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      this.count++;
      if (this.count === 1) {
        const res = {
          status: this.statusCode,
          request: request,
          headers: new HttpHeaders()
        };
        return Promise.resolve(res);
      }

      return Promise.resolve({ ...this._response, request: request });
    }
  }

  const defaultResponse = {
    status: 200,
    request: new WebResource(),
    headers: new HttpHeaders()
  };

  function createDefaultExponentialRetryPolicy(
    response?: HttpOperationResponse
  ): ExponentialRetryPolicy {
    if (!response) {
      response = defaultResponse;
    }

    const passThroughPolicy = new PassThroughPolicy(response);
    return new ExponentialRetryPolicy(passThroughPolicy, new RequestPolicyOptions());
  }

  describe("sendRequest", () => {
    it("should clone the request", async () => {
      const request = new WebResource();
      const nextPolicy = {
        sendRequest: (requestToSend: WebResource): Promise<HttpOperationResponse> => {
          assert(request !== requestToSend);
          return Promise.resolve(defaultResponse);
        }
      };
      const policy = new ExponentialRetryPolicy(nextPolicy, new RequestPolicyOptions());
      await policy.sendRequest(request);
    });

    it("should not modify the request", async () => {
      const request = new WebResource();
      request.url = "http://url";
      request.method = "PATCH";
      request.body = { someProperty: "someValue" };
      request.headers = new HttpHeaders({ header: "abc" });
      request.query = { q: "param" };

      const policy = createDefaultExponentialRetryPolicy();
      const response = await policy.sendRequest(request);
      delete response.request.requestId;
      delete request.requestId;

      assert.deepEqual(response.request, request);
    });

    [408, 502, 506].forEach((code) => {
      it(`should retry if the status code is ${code}`, async () => {
        const request = new WebResource();
        const mockResponse = {
          status: 200,
          headers: new HttpHeaders(),
          request: request
        };

        const faultyPolicy = new FailFirstRequestPolicy(mockResponse, code);
        const policy = new ExponentialRetryPolicy(
          faultyPolicy,
          new RequestPolicyOptions(),
          3,
          10,
          20
        );

        const response = await policy.sendRequest(request);
        delete request.requestId;
        delete response.request.requestId;
        assert.deepEqual(response, mockResponse, "Expecting response matches after retrying");
        assert.ok(faultyPolicy.count > 1, "Retry should have happened");
      });
    });

    [404, 501, 505].forEach((code) => {
      it("should do nothing when status code is retriable", async () => {
        const request = new WebResource();
        const response = {
          status: code,
          request: request,
          headers: new HttpHeaders()
        };
        const faultyPolicy = new FailFirstRequestPolicy(response, code);
        const policy = new ExponentialRetryPolicy(
          faultyPolicy,
          new RequestPolicyOptions(),
          3,
          10,
          20
        );

        const result = await policy.sendRequest(request);
        assert.equal(result.status, code, "Unexpected response status code");
        assert.equal(faultyPolicy.count, 1, "Retry should NOT have happened");
      });
    });

    [408, 502, 506].forEach((code) => {
      it(`should return after max retry count for retriable status code ${code}`, async () => {
        class FailEveryRequestPolicy {
          public count = 0;
          constructor(private code: number) {}
          public sendRequest(_request: WebResource): Promise<HttpOperationResponse> {
            this.count++;
            const response = {
              status: this.code,
              request: new WebResource(),
              headers: new HttpHeaders()
            };
            return Promise.resolve(response);
          }
        }
        const request = new WebResource();
        const faultyPolicy = new FailEveryRequestPolicy(code);
        const policy = new ExponentialRetryPolicy(
          faultyPolicy,
          new RequestPolicyOptions(),
          3,
          10,
          20
        );

        const res = await policy.sendRequest(request);
        assert.equal(res.status, code, "Unexpected response status code");
        assert.ok(faultyPolicy.count > 1, "Retry should have happened");
      });
    });

    it("should not retry when error is thrown", async () => {
      class FailRequestPolicy {
        public count = 0;
        public sendRequest(_request: WebResource): Promise<HttpOperationResponse> {
          this.count++;
          return Promise.reject(new Error("Unknown Error"));
        }
      }
      const request = new WebResource();
      const faultyPolicy = new FailRequestPolicy();
      const policy = new ExponentialRetryPolicy(
        faultyPolicy,
        new RequestPolicyOptions(),
        3,
        10,
        20
      );

      try {
        await policy.sendRequest(request);
        assert.fail("Expecting that an error has been thrown");
      } catch (err) {
        assert.equal((err as Error).message, "Unknown Error");
        assert.equal(faultyPolicy.count, 1, "Retry should NOT have happened");
      }
    });
  });
}).timeout(60000);
