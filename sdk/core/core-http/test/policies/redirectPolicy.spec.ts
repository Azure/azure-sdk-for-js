// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { HttpHeaders, RequestPolicyOptions } from "../../src/coreHttp";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { RedirectPolicy } from "../../src/policies/redirectPolicy";
import { WebResource } from "../../src/webResource";
import { assert } from "chai";

describe("RedirectPolicy", () => {
  it("should not follow redirect if no location header", async () => {
    const responseCodes = [301];
    const request = new WebResource("https://example.com", "GET");
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, 301);
  });

  it("should not follow POST 301 redirect", async function () {
    const expectedStatusCode = 301;
    const responseCodes = [301];
    const request = new WebResource("https://example.com", "POST");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow GET 301 redirect", async function () {
    const expectedStatusCode = 200;
    const responseCodes = [301];
    const request = new WebResource("https://example.com", "GET");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow HEAD 301 redirect", async function () {
    const expectedStatusCode = 200;
    const responseCodes = [301];
    const request = new WebResource("https://example.com", "HEAD");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should not follow POST 302 redirect", async function () {
    const expectedStatusCode = 302;
    const responseCodes = [302];
    const request = new WebResource("https://example.com", "POST");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow GET 302 redirect", async function () {
    const expectedStatusCode = 200;
    const responseCodes = [302];
    const request = new WebResource("https://example.com", "GET");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow HEAD 302 redirect", async function () {
    const expectedStatusCode = 200;
    const responseCodes = [302];
    const request = new WebResource("https://example.com", "HEAD");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow POST 303 redirect", async function () {
    const expectedStatusCode = 200;
    const responseCodes = [303];
    const request = new WebResource("https://example.com", "POST");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        if (!responseCodes.length) {
          assert.strictEqual(_requestToSend.method, "GET", "Expected second request to be GET");
        }

        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should not follow GET 303 redirect", async function () {
    const expectedStatusCode = 303;
    const responseCodes = [303];
    const request = new WebResource("https://example.com", "GET");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow GET 307 redirect", async function () {
    const expectedStatusCode = 200;
    const responseCodes = [307];
    const request = new WebResource("https://example.com", "GET");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should follow GET 300 redirect", async function () {
    const expectedStatusCode = 200;
    const responseCodes = [300];
    const request = new WebResource("https://example.com", "GET");
    const headers = [{ location: "https://example.com/new" }];
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders(headers.shift() || {}),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should only try maxretries", async function () {
    const expectedStatusCode = 300;
    const maxretries = 1;
    const responseCodes = [300, 300, 200];
    const request = new WebResource("https://example.com", "GET");
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        return Promise.resolve({
          status: responseCodes.shift() || 200,
          request: _requestToSend,
          headers: new HttpHeaders({ location: "https://example.com/new" }),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions(), maxretries);
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
  });

  it("should try to redirect 3 times by default", async function () {
    const expectedStatusCode = 300;
    let callCount = 0;
    const request = new WebResource("https://example.com", "GET");
    const nextPolicy = {
      sendRequest: (_requestToSend: WebResource): Promise<HttpOperationResponse> => {
        callCount++;
        return Promise.resolve({
          status: 300,
          request: _requestToSend,
          headers: new HttpHeaders({ location: "https://example.com/new" }),
        });
      },
    };
    const policy = new RedirectPolicy(nextPolicy, new RequestPolicyOptions());
    const result = await policy.sendRequest(request);

    assert.strictEqual(result.status, expectedStatusCode);
    assert.strictEqual(callCount, 21);
  });
});
