// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { SystemErrorRetryPolicy } from "../../src/policies/systemErrorRetryPolicy";
import { RetryError } from "../../src/util/exponentialBackoffStrategy";
import { WebResource } from "../../src/webResource";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { HttpHeaders, RequestPolicyOptions } from "../../src/coreHttp";

describe("SystemErrorRetryPolicy", () => {
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

  // throw error on first sendRequest()
  class FailFirstRequestPolicy {
    count = 0;
    constructor(private _response: HttpOperationResponse, private errorCode: string) {}
    public sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      if (this.count === 0) {
        this.count++;
        const error: RetryError = {
          code: this.errorCode,
          name: "RetryError",
          message: `Error message for ${this.errorCode}`
        };
        return Promise.reject(error);
      }

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

  function createDefaultSystemErrorRetryPolicy(
    response?: HttpOperationResponse
  ): SystemErrorRetryPolicy {
    if (!response) {
      response = defaultResponse;
    }

    const passThroughPolicy = new PassThroughPolicy(response);
    return new SystemErrorRetryPolicy(passThroughPolicy, new RequestPolicyOptions());
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
      const policy = new SystemErrorRetryPolicy(nextPolicy, new RequestPolicyOptions());
      await policy.sendRequest(request);
    });

    it("should not modify the request", async () => {
      const request = new WebResource();
      request.url = "http://url";
      request.method = "PATCH";
      request.body = { someProperty: "someValue" };
      request.headers = new HttpHeaders({ header: "abc" });
      request.query = { q: "param" };

      const policy = createDefaultSystemErrorRetryPolicy();
      const response = await policy.sendRequest(request);
      delete response.request.requestId;
      delete request.requestId;

      assert.deepEqual(response.request, request);
    });

    ["ETIMEDOUT", "ESOCKETTIMEDOUT", "ECONNREFUSED", "ECONNRESET", "ENOENT"].forEach((code) => {
      it(`should retry if the error code is ${code}`, async () => {
        const request = new WebResource();
        const mockResponse = {
          status: 200,
          headers: new HttpHeaders(),
          request: request
        };

        const faultyPolicy = new FailFirstRequestPolicy(mockResponse, code);
        const policy = new SystemErrorRetryPolicy(
          faultyPolicy,
          new RequestPolicyOptions(),
          3,
          10,
          10,
          20
        );

        const response = await policy.sendRequest(request);
        delete request.requestId;
        delete response.request.requestId;
        assert.deepEqual(response, mockResponse, "Expecting response matches after retrying");
      });
    });

    it("should do nothing when error code is not one of the retriable errors", async () => {
      const request = new WebResource();
      const faultyPolicy = new FailFirstRequestPolicy(defaultResponse, "NonRetriableError");
      const policy = new SystemErrorRetryPolicy(
        faultyPolicy,
        new RequestPolicyOptions(),
        3,
        10,
        10,
        20
      );

      try {
        await policy.sendRequest(request);
        assert.fail("Expecting that an error has been thrown");
      } catch (err) {
        assert.equal((err as Error).message, "Error message for NonRetriableError");
      }
    });

    ["ETIMEDOUT", "ESOCKETTIMEDOUT", "ECONNREFUSED", "ECONNRESET", "ENOENT"].forEach((code) => {
      it(`should fail after max retry count for error code ${code}`, async () => {
        class FailEveryRequestPolicy {
          count = 0;
          constructor(private errorCode: string) {}
          public sendRequest(_request: WebResource): Promise<HttpOperationResponse> {
            const error: RetryError = {
              code: this.errorCode,
              name: "RetryError",
              message: `Error message for ${this.errorCode}`
            };
            return Promise.reject(error);
          }
        }
        const request = new WebResource();
        const faultyPolicy = new FailEveryRequestPolicy(code);
        const policy = new SystemErrorRetryPolicy(
          faultyPolicy,
          new RequestPolicyOptions(),
          3,
          10,
          10,
          20
        );

        try {
          await policy.sendRequest(request);
          assert.fail("Expecting that an error has been thrown");
        } catch (err) {
          assert.equal((err as Error).message, `Error message for ${code}`);
        }
      });
    });
  });
}).timeout(60000);
