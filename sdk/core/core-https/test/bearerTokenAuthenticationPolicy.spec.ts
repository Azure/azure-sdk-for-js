// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { TokenCredential, AccessToken } from "@azure/core-auth";
import {
  PipelinePolicy,
  createPipelineRequest,
  createHttpHeaders,
  PipelineResponse,
  bearerTokenAuthenticationPolicy,
  SendRequest
} from "../src";

// Token is refreshed one millisecond BEFORE it expires.
const beforeTokenExpiresInMs = 1000;

// To avoid many refresh requests, we make new refresh requests only after:
const tokenRefreshIntervalInMs = 500;

describe("BearerTokenAuthenticationPolicy", function () {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.now());
  });
  afterEach(() => {
    clock.restore();
  });

  it("correctly adds an Authentication header with the Bearer token", async function () {
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
    clock.tick(expireDelayMs - beforeTokenExpiresInMs - 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);

    // The new token will last 5 seconds again.
    tokenExpiration = Date.now() + expireDelayMs;
    credential.expiresOnTimestamp = tokenExpiration;

    // Now we wait until it starts refreshing:
    clock.tick(1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 2);
  });

  it("access token refresher should prevent refreshers to happen too fast", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockRefreshAzureCredential(tokenExpiration, getTokenDelay, clock);

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
    assert.strictEqual(credential.authCount, 1, "Expected authCount to be initially called");

    clock.tick(expireDelayMs - beforeTokenExpiresInMs); // Until we start refreshing the token

    // Now we send some requests.
    const promises: Promise<PipelineResponse>[] = [
      policy.sendRequest(request, next),
      policy.sendRequest(request, next),
      policy.sendRequest(request, next)
    ];

    // Now we wait until they're all resolved.
    for (const promise of promises) {
      await promise;
    }

    // Only getTokenDelay should have passed, and only one refresh should have happened.
    assert.strictEqual(
      credential.authCount,
      2,
      "authCode should have been called once during the refresh time"
    );

    const exceptionMessage =
      "the total time passed should be in the refresh room, plus the many getTokens that have happened so far";
    assert.equal(
      expireDelayMs - beforeTokenExpiresInMs + getTokenDelay * 2,
      Date.now() - startTime,
      exceptionMessage
    );
  });

  function createBearerTokenPolicy(
    scopes: string | string[],
    credential: TokenCredential
  ): PipelinePolicy {
    return bearerTokenAuthenticationPolicy({
      scopes,
      credential,
      beforeTokenExpiresInMs,
      tokenRefreshIntervalInMs
    });
  }
});

class MockRefreshAzureCredential implements TokenCredential {
  public authCount = 0;

  constructor(
    public expiresOnTimestamp: number,
    public getTokenDelay?: number,
    public clock?: sinon.SinonFakeTimers
  ) { }

  public async getToken(): Promise<AccessToken> {
    this.authCount++;

    // Allowing getToken to take a while
    if (this.getTokenDelay && this.clock) {
      this.clock.tick(this.getTokenDelay);
    }

    return { token: "mock-token", expiresOnTimestamp: this.expiresOnTimestamp };
  }
}
