// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { AccessToken, TokenCredential } from "../src/auth/tokenCredential";
import {
  PipelinePolicy,
  PipelineResponse,
  SendRequest,
  bearerTokenAuthenticationPolicy,
  createHttpHeaders,
  createPipelineRequest,
} from "../src";
import { DEFAULT_CYCLER_OPTIONS } from "../src/util/tokenCycler";

const { refreshWindowInMs: defaultRefreshWindow } = DEFAULT_CYCLER_OPTIONS;

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
      Promise.resolve({ token: mockToken, expiresOnTimestamp: new Date().getTime() })
    );
    const mockCredential: TokenCredential = {
      getToken: fakeGetToken,
    };

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const bearerTokenAuthPolicy = createBearerTokenPolicy(tokenScopes, mockCredential);
    await bearerTokenAuthPolicy.sendRequest(request, next);

    assert(
      fakeGetToken.calledWith(tokenScopes, {
        abortSignal: undefined,
        tracingOptions: undefined,
      }),
      "fakeGetToken called incorrectly."
    );
    assert.strictEqual(request.headers.get("Authorization"), `Bearer ${mockToken}`);
  });

  it("refreshes the token on initial request", async () => {
    const expiresOn = Date.now() + 1000 * 60; // One minute later.
    const credential = new MockRefreshCredential(expiresOn);
    const request = createPipelineRequest({ url: "https://example.com" });

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);
  });

  it("refreshes the token during the refresh window", async () => {
    const expireDelayMs = defaultRefreshWindow + 5000;
    let tokenExpiration = Date.now() + expireDelayMs;
    const credential = new MockRefreshCredential(tokenExpiration);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    // The token is cached and remains cached for a bit.
    await policy.sendRequest(request, next);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);

    // The token will remain cached until tokenExpiration - testTokenRefreshBufferMs, so in (5000 - 1000) milliseconds.

    // For safe measure, we test the token is still cached a second earlier than the forced refresh expectation.
    clock.tick(expireDelayMs - defaultRefreshWindow - 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);

    // The new token will last for a few minutes again.
    tokenExpiration = Date.now() + expireDelayMs;
    credential.expiresOnTimestamp = tokenExpiration;

    // Now we wait until it expires:
    clock.tick(expireDelayMs + 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 2);
  });

  it("access token refresher should prevent multiple initial getToken requests to break", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockRefreshCredential(tokenExpiration, getTokenDelay, clock);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    // Now we send some requests.
    const promises = [
      policy.sendRequest(request, next),
      policy.sendRequest(request, next),
      policy.sendRequest(request, next),
    ];
    // Now we wait until they're all resolved.
    for (const promise of promises) {
      await promise;
    }
    assert.strictEqual(credential.authCount, 1, "The first authentication should have happened");
  });

  it("credential errors should bubble up", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockRefreshCredential(tokenExpiration, getTokenDelay, clock);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    credential.shouldThrow = true;

    let error: Error | undefined;
    try {
      await policy.sendRequest(request, next);
    } catch (e: any) {
      error = e;
    }
    assert.equal(error?.message, "Failed to retrieve the token");

    assert.strictEqual(
      credential.authCount,
      1,
      "The first authentication attempt should have happened"
    );
  });

  it("access token refresher should prevent refreshers to happen too fast while the token is about to expire", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + defaultRefreshWindow + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockRefreshCredential(tokenExpiration, getTokenDelay, clock);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1, "The first authentication should have happened");

    clock.tick(tokenExpiration - startTime - defaultRefreshWindow); // Until we start refreshing the token

    // Now we wait until some requests are all resolved.
    await Promise.all([
      policy.sendRequest(request, next),
      policy.sendRequest(request, next),
      policy.sendRequest(request, next),
    ]);

    // Only getTokenDelay should have passed, and only one refresh should have happened.
    assert.strictEqual(
      credential.authCount,
      2,
      "authCode should have been called once during the refresh time"
    );

    const exceptionMessage =
      "the total time passed should be in the refresh room, plus the many getTokens that have happened so far";
    assert.equal(expireDelayMs + 2 * getTokenDelay, Date.now() - startTime, exceptionMessage);
  });

  it("throws if the target URI doesn't start with 'https'", async () => {
    const expireDelayMs = defaultRefreshWindow + 5000;
    const tokenExpiration = Date.now() + expireDelayMs;
    const credential = new MockRefreshCredential(tokenExpiration);

    const request = createPipelineRequest({ url: "http://example.com" });
    const policy = createBearerTokenPolicy("test-scope", credential);
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();

    let error: Error | undefined;
    try {
      await policy.sendRequest(request, next);
    } catch (e: any) {
      error = e;
    }

    assert.equal(
      error?.message,
      "Bearer token authentication is not permitted for non-TLS protected (non-https) URLs."
    );
  });

  function createBearerTokenPolicy(
    scopes: string | string[],
    credential: TokenCredential
  ): PipelinePolicy {
    return bearerTokenAuthenticationPolicy({
      scopes,
      credential,
    });
  }
});

class MockRefreshCredential implements TokenCredential {
  public authCount = 0;
  public shouldThrow: boolean = false;

  constructor(
    public expiresOnTimestamp: number,
    public getTokenDelay?: number,
    public clock?: sinon.SinonFakeTimers
  ) {}

  public async getToken(): Promise<AccessToken> {
    this.authCount++;

    if (this.shouldThrow) {
      throw new Error("Failed to retrieve the token");
    }

    // Allowing getToken to take a while
    if (this.getTokenDelay && this.clock) {
      this.clock.tick(this.getTokenDelay);
    }

    return { token: "mock-token", expiresOnTimestamp: this.expiresOnTimestamp };
  }
}
