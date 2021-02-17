// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { TokenCredential, AccessToken } from "@azure/core-auth";
import {} from "../src/policies/bearerTokenAuthenticationPolicy";
import {
  PipelinePolicy,
  createPipelineRequest,
  createHttpHeaders,
  PipelineResponse,
  bearerTokenAuthenticationPolicy,
  SendRequest
} from "../src";
import { delay } from "../src/util/helpers";

// Token is refreshed one millisecond BEFORE it expires.
const testTokenExpiresThisEarlier = 1000;

// To avoid many refresh requests, we make new refresh requests only after:
const testRequiredMillisecondsBeforeNewRefresh = 500;

describe("BearerTokenAuthenticationPolicy", function() {
  it("correctly adds an Authentication header with the Bearer token", async function() {
    const mockToken = "token";
    const tokenScopes = ["scope1", "scope2"];
    const fakeGetToken = sinon.fake.returns(
      Promise.resolve({ token: mockToken, expiresOn: new Date() })
    );
    const mockCredential: TokenCredential = {
      getToken: fakeGetToken
    };

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const bearerTokenAuthPolicy = createBearerTokenPolicy(tokenScopes, mockCredential);
    await bearerTokenAuthPolicy.sendRequest(request, next);

    assert(
      fakeGetToken.calledWith(tokenScopes, {
        abortSignal: undefined,
        tracingOptions: { spanOptions: undefined }
      }),
      "fakeGetToken called incorrectly."
    );
    assert.strictEqual(request.headers.get("Authorization"), `Bearer ${mockToken}`);
  });

  it("refreshes the token on initial request", async () => {
    const expiresOn = Date.now() + 1000 * 60; // One minute later.
    const credential = new MockRefreshAzureCredential(expiresOn);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);
  });

  it("refreshes the token again only once it expired", async () => {
    const expireDelayMs = 5000;
    let tokenExpiration = Date.now() + expireDelayMs;
    const credential = new MockRefreshAzureCredential(tokenExpiration);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    // The token is cached and remains cached for a bit.
    await policy.sendRequest(request, next);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);

    // The token will remain cached until tokenExpiration - testTokenRefreshBufferMs, so in (5000 - 1000) milliseconds.

    // For safe measure, we test the token is still cached a second earlier than the refresh expectation.
    await delay(expireDelayMs - testTokenExpiresThisEarlier - 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);

    // The new token will last 5 seconds again.
    tokenExpiration = Date.now() + expireDelayMs;
    credential.setExpiresOnTimestamp(tokenExpiration);

    // Now we wait until it expires:
    await delay(1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 2);
  });

  it("access token refresher should prevent refreshers to happen too fast", async () => {
    const expiresOn = Date.now(); // Already expired
    const credential = new MockRefreshAzureCredential(expiresOn);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);
    credential.setExpiresOnTimestamp(Date.now());

    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);
    credential.setExpiresOnTimestamp(Date.now());

    await delay(testRequiredMillisecondsBeforeNewRefresh);

    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 2);
    credential.setExpiresOnTimestamp(Date.now());
  });

  function createBearerTokenPolicy(
    scopes: string | string[],
    credential: TokenCredential
  ): PipelinePolicy {
    return bearerTokenAuthenticationPolicy({
      scopes,
      credential,
      tokenRefreshBufferMs: testTokenExpiresThisEarlier,
      refreshAttemptsBufferMs: testRequiredMillisecondsBeforeNewRefresh
    });
  }
});

class MockRefreshAzureCredential implements TokenCredential {
  private _expiresOnTimestamp: number;
  public authCount = 0;

  constructor(expiresOnTimestamp: number) {
    this._expiresOnTimestamp = expiresOnTimestamp;
  }

  public setExpiresOnTimestamp(expiresOnTimestamp: number): void {
    this._expiresOnTimestamp = expiresOnTimestamp;
  }
  public async getToken(): Promise<AccessToken> {
    this.authCount++;
    return { token: "mock-token", expiresOnTimestamp: this._expiresOnTimestamp };
  }
}
