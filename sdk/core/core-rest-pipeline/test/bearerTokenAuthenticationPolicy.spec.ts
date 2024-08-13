// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-auth";
import type {
  AuthorizeRequestOnChallengeOptions,
  PipelinePolicy,
  PipelineResponse,
  SendRequest,
} from "../src/index.js";
import {
  bearerTokenAuthenticationPolicy,
  createHttpHeaders,
  createPipelineRequest,
} from "../src/index.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import { DEFAULT_CYCLER_OPTIONS } from "../src/util/tokenCycler.js";

const { refreshWindowInMs: defaultRefreshWindow } = DEFAULT_CYCLER_OPTIONS;

describe("BearerTokenAuthenticationPolicy", function () {
  beforeEach(() => {
    vi.useFakeTimers({ now: Date.now() });
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("correctly adds an Authentication header with the Bearer token", async function () {
    const mockToken = "token";
    const tokenScopes = ["scope1", "scope2"];
    const fakeGetToken = vi
      .fn()
      .mockResolvedValue({ token: mockToken, expiresOnTimestamp: new Date().getTime() });
    const mockCredential: TokenCredential = {
      getToken: fakeGetToken,
    };

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const bearerTokenAuthPolicy = createBearerTokenPolicy(tokenScopes, mockCredential);
    await bearerTokenAuthPolicy.sendRequest(request, next);

    expect(fakeGetToken).toHaveBeenCalledWith(tokenScopes, {
      abortSignal: undefined,
      tracingOptions: undefined,
    });
    assert.strictEqual(request.headers.get("Authorization"), `Bearer ${mockToken}`);
  });

  it("refreshes the token on initial request", async () => {
    const expiresOn = Date.now() + 1000 * 60; // One minute later.
    const credential = new MockRefreshAzureCredential(expiresOn);
    const request = createPipelineRequest({ url: "https://example.com" });

    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);
  });

  it("refreshes the token during the refresh window", async () => {
    const expireDelayMs = defaultRefreshWindow + 5000;
    let tokenExpiration = Date.now() + expireDelayMs;
    const credential = new MockRefreshAzureCredential(tokenExpiration);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    // The token is cached and remains cached for a bit.
    await policy.sendRequest(request, next);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);

    // The token will remain cached until tokenExpiration - testTokenRefreshBufferMs, so in (5000 - 1000) milliseconds.

    // For safe measure, we test the token is still cached a second earlier than the forced refresh expectation.
    vi.advanceTimersByTime(expireDelayMs - defaultRefreshWindow - 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);

    // The new token will last for a few minutes again.
    tokenExpiration = Date.now() + expireDelayMs;
    credential.expiresOnTimestamp = tokenExpiration;

    // Now we wait until it expires:
    vi.advanceTimersByTime(expireDelayMs + 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 2);
  });

  it("access token refresher should prevent multiple initial getToken requests to break", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockRefreshAzureCredential(tokenExpiration, getTokenDelay);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

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
    const credential = new MockRefreshAzureCredential(tokenExpiration, getTokenDelay);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

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
      "The first authentication attempt should have happened",
    );
  });

  it("access token refresher should prevent refreshers to happen too fast while the token is about to expire", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + defaultRefreshWindow + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockRefreshAzureCredential(tokenExpiration, getTokenDelay);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<SendRequest>();
    next.mockResolvedValue(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1, "The first authentication should have happened");

    vi.advanceTimersByTime(tokenExpiration - startTime - defaultRefreshWindow); // Until we start refreshing the token

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
      "authCode should have been called once during the refresh time",
    );

    const exceptionMessage =
      "the total time passed should be in the refresh room, plus the many getTokens that have happened so far";
    assert.equal(expireDelayMs + 2 * getTokenDelay, Date.now() - startTime, exceptionMessage);
  });

  it("throws if the target URI doesn't start with 'https'", async () => {
    const expireDelayMs = defaultRefreshWindow + 5000;
    const tokenExpiration = Date.now() + expireDelayMs;
    const credential = new MockRefreshAzureCredential(tokenExpiration);

    const request = createPipelineRequest({ url: "http://example.com" });
    const policy = createBearerTokenPolicy("test-scope", credential);
    const next = vi.fn<SendRequest>();

    let error: Error | undefined;
    try {
      await policy.sendRequest(request, next);
    } catch (e: any) {
      error = e;
    }

    assert.equal(
      error?.message,
      "Bearer token authentication is not permitted for non-TLS protected (non-https) URLs.",
    );
  });

  it("does not wait for token expiry after receiving an authentication challenge", async () => {
    // tokens can live for a long time
    const oneDayInMs = 24 * 60 * 60 * 1000;
    const tokenExpiration = Date.now() + oneDayInMs;
    const getToken = vi.fn<() => Promise<AccessToken | null>>();

    // first time getToken is called to put the header on the initial request
    getToken.mockResolvedValueOnce({
      token: "mock-token",
      expiresOnTimestamp: tokenExpiration,
    });
    // simulate failure of retriving the token, rejecting with an error would also work
    // but returning null exercises a slightly different code path for better coverage
    getToken.mockResolvedValueOnce(null);
    const credential: TokenCredential = {
      getToken,
    };
    const scopes = ["test-scope"];
    const request = createPipelineRequest({ url: "https://example.com" });

    async function authorizeRequestOnChallenge(
      options: AuthorizeRequestOnChallengeOptions,
    ): Promise<boolean> {
      // this will trigger a second call into getToken, which should fail
      // what we don't want is to wait for expiresOnTimestamp of the original credential before giving up
      const token = await options.getAccessToken(scopes, {
        claims: '{"access_token":{"nbf":{"essential":true, "value":"1603742800"}}}',
      });
      if (token) {
        options.request.headers.set("Authorization", `Bearer ${token.token}`);
        return true;
      }
      return false;
    }

    const policy = bearerTokenAuthenticationPolicy({
      scopes,
      credential,
      challengeCallbacks: {
        authorizeRequestOnChallenge,
      },
    });
    const next = vi.fn<SendRequest>();

    // first response is an auth challenge
    const challengeResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "WWW-Authenticate": [
          `Bearer authorization_uri="https://login.windows-ppe.net/", error="invalid_token"`,
          `error_description="User session has been revoked"`,
          `claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTYwMzc0MjgwMCJ9fX0="`,
        ].join(", "),
      }),
      request,
      status: 401,
    };

    next.mockResolvedValueOnce(challengeResponse);

    let error: Error | undefined;
    try {
      await policy.sendRequest(request, next);
    } catch (e: any) {
      error = e;
    }
    assert.isDefined(error);
    assert.equal(error?.message, "Failed to refresh access token.");
  });

  it("correctly refreshes the accessToken when refreshAfterTimestamp",async()=>{
    const refreshAfterWindow = 5000 * 2;
    const expireOnWindow = refreshAfterWindow * 100;

    const tokenRefreshAfter = Date.now() + refreshAfterWindow;
    let tokenExpiration = Date.now() + expireOnWindow;

    const credential = new MockRefreshAzureCredential(tokenExpiration, tokenRefreshAfter);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = vi.fn<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.mockResolvedValue(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    // The token is cached and remains cached for a bit.
    await policy.sendRequest(request, next);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 1);

    // The token will refresh after 5000 milliseconds.
    vi.advanceTimersByTime(refreshAfterWindow + 100);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 2);

    // The new token will last for a few seconds with no refreshAfter.
    tokenExpiration = Date.now() + 5000;
    credential.expiresOnTimestamp = tokenExpiration;
    credential.refreshAfterTimestamp = undefined;

    // Now we wait until it expires:
    vi.advanceTimersByTime(tokenExpiration + 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 3);

  })


  function createBearerTokenPolicy(
    scopes: string | string[],
    credential: TokenCredential,
  ): PipelinePolicy {
    return bearerTokenAuthenticationPolicy({
      scopes,
      credential,
    });
  }
});

class MockRefreshAzureCredential implements TokenCredential {
  public authCount = 0;
  public shouldThrow: boolean = false;

  constructor(
    public expiresOnTimestamp: number,
    public refreshAfterTimestamp?: number,
    public getTokenDelay?: number,  
  ) {}

  public async getToken(): Promise<AccessToken> {
    this.authCount++;

    if (this.shouldThrow) {
      throw new Error("Failed to retrieve the token");
    }

    // Allowing getToken to take a while
    if (this.getTokenDelay && vi.isFakeTimers()) {
      vi.advanceTimersByTime(this.getTokenDelay);
    }

    return { token: "mock-token", expiresOnTimestamp: this.expiresOnTimestamp, refreshAfterTimestamp: this.refreshAfterTimestamp };
  }
  
}
