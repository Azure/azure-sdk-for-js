// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { AccessToken, TokenCredential } from "@azure/core-auth";
import type {
  AuthorizeRequestOnChallengeOptions,
  ChallengeCallbacks,
  PipelinePolicy,
  PipelineResponse,
  SendRequest,
} from "../src/index.js";
import {
  bearerTokenAuthenticationPolicy,
  createHttpHeaders,
  createPipelineRequest,
  RestError,
} from "../src/index.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";
import { DEFAULT_CYCLER_OPTIONS } from "$internal/util/tokenCycler.js";

const { refreshWindowInMs: defaultRefreshWindow } = DEFAULT_CYCLER_OPTIONS;

interface Challenge {
  testName: string;
  challenge: string;
  expectedResponseCode: number;
  expectedClaims: string | null;
}

const caeTestCases: Challenge[] = [
  {
    testName: "unexpected error value",
    challenge: `Bearer authorization_uri="https://login.windows.net/", error="invalid_token", claims="ey=="`,
    expectedResponseCode: 401,
    expectedClaims: null,
  },
  {
    testName: "cannot parse claims",
    challenge: `Bearer claims="not base64", error="insufficient_claims"`,
    expectedResponseCode: 401,
    expectedClaims: null,
  },
  {
    testName: "more parameters, different order",
    challenge: `Bearer realm="", authorization_uri="http://localhost", client_id="00000003-0000-0000-c000-000000000000", error="insufficient_claims", claims="ey=="`,
    expectedResponseCode: 200,
    expectedClaims: "{",
  },
  {
    testName: "standard CAE challenge",
    challenge: `Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNzI2MDc3NTk1In0sInhtc19jYWVlcnJvciI6eyJ2YWx1ZSI6IjEwMDEyIn19fQ=="`,
    expectedResponseCode: 200,
    expectedClaims: `{"access_token":{"nbf":{"essential":true,"value":"1726077595"},"xms_caeerror":{"value":"10012"}}}`,
  },
  {
    testName: "parse multiple challenges with different scheme",
    challenge: `PoP realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", nonce="ey==", Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", error_description="Continuous access evaluation resulted in challenge with result: InteractionRequired and code: TokenIssuedBeforeRevocationTimestamp", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTcyNjI1ODEyMiJ9fX0="`,
    expectedResponseCode: 200,
    expectedClaims: `{"access_token":{"nbf":{"essential":true, "value":"1726258122"}}}`,
  },
  {
    testName: "parse multiple challenges with claims",
    challenge: `Bearer authorization_uri="https://login.windows.net/", error="invalid_token", claims="ey==", Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", client_id="00000003-0000-0000-c000-000000000000", error_description="Continuous access evaluation resulted in challenge with result: InteractionRequired and code: TokenIssuedBeforeRevocationTimestamp", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwgInZhbHVlIjoiMTcyNjI1ODEyMiJ9fX0="`,
    expectedResponseCode: 200,
    expectedClaims: `{"access_token":{"nbf":{"essential":true, "value":"1726258122"}}}`,
  },
];

const nonCaeChallengeTests: Challenge[] = [
  {
    testName: "Challenge with no claims",
    challenge: `Bearer authorization_uri="https://login.windows.net/", error="insufficient_claims"`,
    expectedResponseCode: 200,
    expectedClaims: null,
  },
  {
    testName: "no quotes with the params",
    challenge: `Bearer authorization_uri=https://login.windows.net/, error=insufficient_claims`,
    expectedResponseCode: 200,
    expectedClaims: null,
  },
  {
    testName: "no comma seperating the params",
    challenge: `Bearer authorization_uri="https://login.windows.net/" error_description="ran into some error"`,
    expectedResponseCode: 200,
    expectedClaims: null,
  },
  {
    testName: "Challenge with unexpected error",
    challenge: `Bearer authorization_uri="https://login.windows.net/", error="invalid_token", claims="ey=="`,
    expectedResponseCode: 200,
    expectedClaims: null,
  },
];

type ChallengeType = "CAE" | "NonCAE" | "Success";
interface Challenges {
  testName: string;
  challengeOrder: ChallengeType[];
  shouldResolved: boolean;
  numberOfGetTokenCalls: number;
}
// Number of getToken calls should be 1 + number of challenge handled to account for initial request
const challengesOrderTestCases: Challenges[] = [
  {
    testName: "should handle CAE challenge after non-CAE challenge with custom handler",
    challengeOrder: ["NonCAE", "CAE", "Success"],
    shouldResolved: true,
    numberOfGetTokenCalls: 3,
  },
  {
    testName: "should handle at max 2 challenges with custom handler",
    challengeOrder: ["NonCAE", "CAE", "NonCAE"],
    shouldResolved: false,
    numberOfGetTokenCalls: 3,
  },
  {
    testName: "should not handle 2 CAE challenges",
    challengeOrder: ["CAE", "CAE"],
    shouldResolved: false,
    numberOfGetTokenCalls: 2,
  },
  {
    testName: "should not handle 2 non-CAE challenges with custom handler",
    challengeOrder: ["NonCAE", "NonCAE"],
    shouldResolved: false,
    numberOfGetTokenCalls: 2,
  },
];

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
      enableCae: true,
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
    const credential = new MockRefreshAzureCredential(tokenExpiration, { getTokenDelay });

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
    const credential = new MockRefreshAzureCredential(tokenExpiration, { getTokenDelay });

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
    const credential = new MockRefreshAzureCredential(tokenExpiration, { getTokenDelay });

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

  it("correctly refreshes the accessToken when refreshAfterTimestamp", async () => {
    const refreshAfterWindow = 5000 * 2;
    const expireOnWindow = refreshAfterWindow * 100;

    const tokenRefreshAfter = Date.now() + refreshAfterWindow;
    let tokenExpiration = Date.now() + expireOnWindow;

    const credential = new MockRefreshAzureCredential(tokenExpiration, {
      refreshAfterTimestamp: tokenRefreshAfter,
    });

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

    // The token will refresh after 5000 milliseconds.
    vi.advanceTimersByTime(refreshAfterWindow + 100);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 2);

    // The new token will last for a few seconds with no refreshAfter.
    tokenExpiration = Date.now() + 5000;
    credential.expiresOnTimestamp = tokenExpiration;
    credential.options = {
      refreshAfterTimestamp: undefined,
    };

    // Now we wait until it expires:
    vi.advanceTimersByTime(tokenExpiration + 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(credential.authCount, 3);
  });

  it(`should throw for 401 RestError that we can't handle`, async function () {
    const tokenExpiration = Date.now() + 1000 * 60; // One minute later.
    const getToken = vi.fn<() => Promise<AccessToken | null>>();
    getToken.mockResolvedValue({
      token: "bad-token",
      expiresOnTimestamp: tokenExpiration,
    });
    const credential: TokenCredential = {
      getToken,
    };
    const tokenScopes = ["test-scope"];
    const request = createPipelineRequest({ url: "https://example.com" });

    const next = vi.fn<SendRequest>();

    // An error response we can't handle
    const errorResponse: PipelineResponse = {
      headers: createHttpHeaders({
        "WWW-Authenticate": `Basic realm="Unauthorized"`,
      }),
      request,
      status: 401,
    };
    const requestError = new RestError("Unauthorized Request.", {
      statusCode: 401,
      response: errorResponse,
    });
    next.mockRejectedValue(requestError);

    const policy = createBearerTokenPolicy(tokenScopes, credential);
    await expect(policy.sendRequest(request, next)).rejects.toThrow(requestError);

    // First getToken request will return a bad token
    expect(getToken).toHaveBeenCalledWith(tokenScopes, {
      abortSignal: undefined,
      tracingOptions: undefined,
      enableCae: true,
    });
  });

  it(`should throw regular error we can't handle`, async function () {
    const tokenExpiration = Date.now() + 1000 * 60; // One minute later.
    const getToken = vi.fn<() => Promise<AccessToken | null>>();

    getToken.mockResolvedValue({
      token: "token",
      expiresOnTimestamp: tokenExpiration,
    });
    const credential: TokenCredential = {
      getToken,
    };
    const tokenScopes = ["test-scope"];
    const request = createPipelineRequest({ url: "https://example.com" });

    const next = vi.fn<SendRequest>();
    const requestError = new Error("Arbitray error");
    next.mockRejectedValue(requestError);

    const policy = createBearerTokenPolicy(tokenScopes, credential);
    await expect(policy.sendRequest(request, next)).rejects.toThrow(requestError);

    expect(getToken).toHaveBeenCalledWith(tokenScopes, {
      abortSignal: undefined,
      tracingOptions: undefined,
      enableCae: true,
    });
  });

  describe("tests for challenge handler", function () {
    const standardCAEChallenge = {
      challenge: `Bearer realm="", authorization_uri="https://login.microsoftonline.com/common/oauth2/authorize", error="insufficient_claims", claims="eyJhY2Nlc3NfdG9rZW4iOnsibmJmIjp7ImVzc2VudGlhbCI6dHJ1ZSwidmFsdWUiOiIxNzI2MDc3NTk1In0sInhtc19jYWVlcnJvciI6eyJ2YWx1ZSI6IjEwMDEyIn19fQ=="`,
      expectedClaims: `{"access_token":{"nbf":{"essential":true,"value":"1726077595"},"xms_caeerror":{"value":"10012"}}}`,
    };
    const standardNonCAEChallenge = {
      challenge: `Bearer authorization_uri="https://login.windows.net/", error="invalid_token"`,
      expectedClaims: `Bearer authorization_uri="https://login.windows.net/", error="invalid_token"`,
    };

    it("ChallengeCallbacks are able to access class fields", async function () {
      const policy = bearerTokenAuthenticationPolicy({
        scopes: [],
        challengeCallbacks: new (class implements ChallengeCallbacks {
          private field = "field value";

          async authorizeRequest(): Promise<void> {
            assert.equal(this.field, "field value");
          }

          async authorizeRequestOnChallenge(): Promise<boolean> {
            assert.equal(this.field, "field value");
            return true;
          }
        })(),
      });

      const request = createPipelineRequest({ url: "https://example.com" });

      const challengeResponse: PipelineResponse = {
        headers: createHttpHeaders({
          "WWW-Authenticate": `Basic realm="test"`,
        }),
        request,
        status: 401,
      };

      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200,
      };

      const next = vi.fn<SendRequest>();
      // Mocked a challenge response and a successful response
      next.mockResolvedValueOnce(challengeResponse).mockResolvedValueOnce(successResponse);

      await policy.sendRequest(request, next);

      expect(next).toHaveBeenCalledTimes(2);
    });

    matrix([caeTestCases] as const, async function (testCase: Challenge) {
      // Test different scenarios when we have only 1 CAE challenge returned
      it(`Single CAE Challenge: ${testCase.testName}`, async function () {
        const tokenExpiration = Date.now() + 1000 * 60; // One minute later.
        const getToken = vi.fn<() => Promise<AccessToken | null>>();

        // First time getToken is called will return a bad token that will have authorization challenge
        getToken.mockResolvedValueOnce({
          token: "bad-token",
          expiresOnTimestamp: tokenExpiration,
        });
        // This will return a good token after the authorization challenge is handled
        getToken.mockResolvedValueOnce({
          token: "good-token",
          expiresOnTimestamp: tokenExpiration,
        });
        const credential: TokenCredential = {
          getToken,
        };
        const tokenScopes = ["test-scope"];
        const request = createPipelineRequest({ url: "https://example.com" });

        const challengeResponse: PipelineResponse = {
          headers: createHttpHeaders({
            "WWW-Authenticate": testCase.challenge,
          }),
          request,
          status: 401,
        };

        const successResponse: PipelineResponse = {
          headers: createHttpHeaders(),
          request,
          status: 200,
        };

        const next = vi.fn<SendRequest>();
        // Mocked a challenge response and a successful response
        next.mockResolvedValueOnce(challengeResponse).mockResolvedValueOnce(successResponse);

        const policy = createBearerTokenPolicy(tokenScopes, credential);

        let response: PipelineResponse;
        try {
          response = await policy.sendRequest(request, next);
        } catch (e) {
          // Should not encounter an error. A request with failed status code should be returned
          assert.fail();
        }
        // First getToken request will return a bad token
        expect(getToken).toHaveBeenCalledWith(tokenScopes, {
          abortSignal: undefined,
          tracingOptions: undefined,
          enableCae: true,
        });
        // Second getToken request will inject the correct token with the claims
        if (testCase.expectedClaims) {
          expect(getToken).toHaveBeenLastCalledWith(tokenScopes, {
            enableCae: true,
            claims: testCase.expectedClaims,
            abortSignal: undefined,
            tracingOptions: undefined,
          });
        }

        if (testCase.expectedResponseCode === 200) {
          assert.strictEqual(response.request.headers.get("Authorization"), `Bearer good-token`);
        } else {
          assert.strictEqual(response.request.headers.get("Authorization"), `Bearer bad-token`);
        }
      });
    });

    matrix([nonCaeChallengeTests] as const, async function (testCase: Challenge) {
      // Test different scenarios when we have only 1 non-CAE challenge returned handled by a custom callback
      it(`Non-CAE challenge test: ${testCase.testName}`, async function () {
        const tokenExpiration = Date.now(); // Expire right away
        const getToken = vi.fn<() => Promise<AccessToken | null>>();

        // First time getToken is called will return a bad token
        getToken.mockResolvedValueOnce({
          token: "bad-token",
          expiresOnTimestamp: tokenExpiration,
        });
        // This will return a good token after the authorization challenge is handled
        getToken.mockResolvedValueOnce({
          token: "good-token",
          expiresOnTimestamp: tokenExpiration + 1000 * 60,
        });
        const credential: TokenCredential = {
          getToken,
        };
        const scopes = ["test-scope"];
        const request = createPipelineRequest({ url: "https://example.com" });

        const challengeResponse: PipelineResponse = {
          headers: createHttpHeaders({
            "WWW-Authenticate": testCase.challenge,
          }),
          request,
          status: 401,
        };
        const successResponse: PipelineResponse = {
          headers: createHttpHeaders(),
          request,
          status: 200,
        };

        let isCallbackCalled = false;
        async function authorizeRequestOnChallenge(
          options: AuthorizeRequestOnChallengeOptions,
        ): Promise<boolean> {
          isCallbackCalled = true; // Enable CAE true by default

          assert.equal(testCase.challenge, options.response.headers.get("WWW-Authenticate"));
          // Should set the good token here in the second get access token
          const token = await options.getAccessToken(scopes, {});
          if (token) {
            options.request.headers.set("Authorization", `Bearer ${token.token}`);
            return true;
          }
          return false;
        }

        const next = vi.fn<SendRequest>();
        // Mocked a challenge response and a successful response
        next.mockResolvedValueOnce(challengeResponse).mockResolvedValueOnce(successResponse);

        const policy = bearerTokenAuthenticationPolicy({
          scopes,
          credential,
          challengeCallbacks: {
            authorizeRequestOnChallenge,
          },
        });

        let response: PipelineResponse;
        try {
          response = await policy.sendRequest(request, next);
        } catch (e) {
          // Should not encounter an error. A request with failed status code should be returned
          assert.fail();
        }
        // First getToken request will return a bad token
        expect(getToken).toHaveBeenCalledWith(scopes, {
          enableCae: true,
          abortSignal: undefined,
          tracingOptions: undefined,
        });
        assert.isTrue(isCallbackCalled);
        assert.strictEqual(response.request.headers.get("Authorization"), `Bearer good-token`);
      });
    });

    matrix([challengesOrderTestCases] as const, async function (testCase: Challenges) {
      // Test different scenarios with challenges in different order
      it(`Multiple challenges returned: ${testCase.testName}`, async function () {
        const tokenExpiration = Date.now() + 1000 * 60;
        // Account for the 1st getToken requests called in the intial request
        let getTokenRequests = 0;
        const getToken = vi.fn<() => Promise<AccessToken | null>>(async () => {
          getTokenRequests++;
          return {
            token: "token",
            expiresOnTimestamp: tokenExpiration,
          };
        });

        const credential: TokenCredential = {
          getToken,
        };
        const scopes = ["test-scope"];

        let isCallbackCalled = false;
        async function authorizeRequestOnChallenge(
          options: AuthorizeRequestOnChallengeOptions,
        ): Promise<boolean> {
          isCallbackCalled = true;
          // Should set the good token here in the second get access token
          const token = await options.getAccessToken(scopes, {
            claims: standardNonCAEChallenge.expectedClaims,
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

        let lastChallenge: string = "";
        let containNonCAEChallenge = false;

        const request = createPipelineRequest({ url: "https://example.com" });
        const next = vi.fn<SendRequest>();
        // Mock response based on the order provided
        for (const challengeType of testCase.challengeOrder) {
          const response: PipelineResponse = {
            headers: createHttpHeaders(),
            request,
            status: 401,
          };
          switch (challengeType) {
            case "CAE": {
              response.headers.set("WWW-Authenticate", standardCAEChallenge.challenge);
              next.mockResolvedValueOnce(response);
              lastChallenge = standardCAEChallenge.challenge;
              break;
            }
            case "NonCAE": {
              containNonCAEChallenge = true;
              response.headers.set("WWW-Authenticate", standardNonCAEChallenge.challenge);
              next.mockResolvedValueOnce(response);
              lastChallenge = standardNonCAEChallenge.challenge;
              break;
            }
            default: {
              const successResponse: PipelineResponse = {
                headers: createHttpHeaders(),
                request,
                status: 200,
              };
              next.mockResolvedValueOnce(successResponse);
            }
          }
        }
        let response: PipelineResponse;
        try {
          response = await policy.sendRequest(request, next);
        } catch (e) {
          // Should not encounter an error. A request with failed status code should be returned
          assert.fail();
        }
        assert.strictEqual(testCase.numberOfGetTokenCalls, getTokenRequests);
        // Check value of getTokenRequests called based on the order of challenges
        for (let i = 0; i < testCase.numberOfGetTokenCalls; i++) {
          const challengeType = testCase.challengeOrder[i];
          switch (challengeType) {
            case "CAE":
              expect(getToken).toHaveBeenCalledWith(scopes, {
                enableCae: true,
                abortSignal: undefined,
                tracingOptions: undefined,
                claims: standardCAEChallenge.expectedClaims,
              });
              break;
            case "NonCAE":
              expect(getToken).toHaveBeenCalledWith(scopes, {
                abortSignal: undefined,
                tracingOptions: undefined,
                claims: standardNonCAEChallenge.expectedClaims,
              });
              break;
            default:
              expect(getToken).toHaveBeenCalledWith(scopes, {
                enableCae: true,
                abortSignal: undefined,
                tracingOptions: undefined,
              });
              break;
          }
        }
        if (containNonCAEChallenge) {
          assert.isTrue(isCallbackCalled);
        }
        if (testCase.shouldResolved) {
          assert.strictEqual(response.status, 200);
        } else {
          // For scenarios that should not resolve, the last challenge should be returned
          assert.strictEqual(response.status, 401);
          assert.strictEqual(response.headers.get("WWW-Authenticate"), lastChallenge);
        }
      });
    });

    it(`should handle RestError with CAE`, async function () {
      const tokenExpiration = Date.now() + 1000 * 60; // One minute later.
      const getToken = vi.fn<() => Promise<AccessToken | null>>();

      // First time getToken is called will return a bad token that will have authorization challenge
      getToken.mockResolvedValueOnce({
        token: "bad-token",
        expiresOnTimestamp: tokenExpiration,
      });
      // This will return a good token after the authorization challenge is handled
      getToken.mockResolvedValueOnce({
        token: "good-token",
        expiresOnTimestamp: tokenExpiration,
      });
      const credential: TokenCredential = {
        getToken,
      };
      const tokenScopes = ["test-scope"];
      const request = createPipelineRequest({ url: "https://example.com" });

      const challengeResponse: PipelineResponse = {
        headers: createHttpHeaders({
          "WWW-Authenticate": standardCAEChallenge.challenge,
        }),
        request,
        status: 401,
      };
      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200,
      };

      const next = vi.fn<SendRequest>();
      const requestError = new RestError("Bad Request.", {
        statusCode: 401,
        response: challengeResponse,
      });
      // Throw rest error with a 401 response with valid CAE challenge
      next.mockRejectedValueOnce(requestError).mockResolvedValueOnce(successResponse);

      const policy = createBearerTokenPolicy(tokenScopes, credential);
      let response: PipelineResponse;
      try {
        response = await policy.sendRequest(request, next);
      } catch (e) {
        assert.fail();
      }
      // First getToken request will return a bad token
      expect(getToken).toHaveBeenCalledWith(tokenScopes, {
        abortSignal: undefined,
        tracingOptions: undefined,
        enableCae: true,
      });

      // Last getToken request will be updated with a claim
      expect(getToken).toHaveBeenLastCalledWith(tokenScopes, {
        abortSignal: undefined,
        tracingOptions: undefined,
        enableCae: true,
        claims: standardCAEChallenge.expectedClaims,
      });
      assert.strictEqual(response.request.headers.get("Authorization"), `Bearer good-token`);
    });

    it(`should handle RestError with custom challenge handler`, async function () {
      const tokenExpiration = Date.now() + 1000 * 60; // One minute later.
      const getToken = vi.fn<() => Promise<AccessToken | null>>();

      // First time getToken is called will return a bad token that will have authorization challenge
      getToken.mockResolvedValueOnce({
        token: "bad-token",
        expiresOnTimestamp: tokenExpiration,
      });
      // This will return a good token after the authorization challenge is handled
      getToken.mockResolvedValueOnce({
        token: "good-token",
        expiresOnTimestamp: tokenExpiration,
      });
      const credential: TokenCredential = {
        getToken,
      };
      const scopes = ["test-scope"];
      const request = createPipelineRequest({ url: "https://example.com" });

      const challengeResponse: PipelineResponse = {
        headers: createHttpHeaders({
          "WWW-Authenticate": standardNonCAEChallenge.challenge,
        }),
        request,
        status: 401,
      };

      const successResponse: PipelineResponse = {
        headers: createHttpHeaders(),
        request,
        status: 200,
      };

      let isCallbackCalled = false;
      async function authorizeRequestOnChallenge(
        options: AuthorizeRequestOnChallengeOptions,
      ): Promise<boolean> {
        isCallbackCalled = true;
        assert.equal(
          standardNonCAEChallenge.challenge,
          options.response.headers.get("WWW-Authenticate"),
        );
        // Should set the good token here in the second get access token
        const token = await options.getAccessToken(scopes, {
          claims: "a claim",
        });
        if (token) {
          options.request.headers.set("Authorization", `Bearer ${token.token}`);
          return true;
        }
        return false;
      }

      const next = vi.fn<SendRequest>();
      const requestError = new RestError("Bad Request.", {
        statusCode: 401,
        response: challengeResponse,
      });
      // Mock 401 error with valid challenge we can handle with a custom challenge handler
      next.mockRejectedValueOnce(requestError).mockResolvedValueOnce(successResponse);

      const policy = bearerTokenAuthenticationPolicy({
        scopes,
        credential,
        challengeCallbacks: {
          authorizeRequestOnChallenge,
        },
      });

      let response: PipelineResponse;
      try {
        response = await policy.sendRequest(request, next);
      } catch (e) {
        // Should not encounter an error
        assert.fail();
      }
      expect(getToken).toHaveBeenCalledWith(scopes, {
        abortSignal: undefined,
        tracingOptions: undefined,
        enableCae: true,
      });
      expect(getToken).toHaveBeenLastCalledWith(scopes, {
        abortSignal: undefined,
        tracingOptions: undefined,
        claims: "a claim",
      });
      assert.isTrue(isCallbackCalled);
      assert.strictEqual(response.request.headers.get("Authorization"), `Bearer good-token`);
    });
  });

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
    public options?: {
      getTokenDelay?: number;
      refreshAfterTimestamp?: number;
    },
  ) {}

  public async getToken(): Promise<AccessToken> {
    this.authCount++;

    if (this.shouldThrow) {
      throw new Error("Failed to retrieve the token");
    }

    // Allowing getToken to take a while
    if (this.options?.getTokenDelay && vi.isFakeTimers()) {
      vi.advanceTimersByTime(this.options?.getTokenDelay);
    }

    return {
      token: "mock-token",
      expiresOnTimestamp: this.expiresOnTimestamp,
      refreshAfterTimestamp: this.options?.refreshAfterTimestamp,
    };
  }
}

// Brought over from azure-tools/test-utils-vitest/src/matrix.ts because we cannot depend on the library
/**
 * Takes a jagged 2D array and a function and runs the function with every
 * possible combination of elements of each of the arrays
 *
 * For strong type-checking, it is important that the `matrix` have a strong
 * type, such as a `const` literal.
 *
 * @param values - jagged 2D array specifying the arguments and their possible
 *                 values
 * @param handler - the function to run with the different argument combinations
 *
 * @example
 * ```ts snippet:ignore
 * matrix([
 *     [true, false],
 *     [1, 2, 3]
 *   ] as const,
 *   (useLabels: boolean, attempts: number) => {
 *     // This body will run six times with the following parameters:
 *     // - true, 1
 *     // - true, 2
 *     // - true, 3
 *     // - false, 1
 *     // - false, 2
 *     // - false, 3
 *   });
 * ```
 */
function matrix<T extends ReadonlyArray<readonly unknown[]>>(
  values: T,
  handler: (
    ...args: { [idx in keyof T]: T[idx] extends ReadonlyArray<infer U> ? U : never }
  ) => Promise<void>,
): void {
  // Classic recursive approach
  if (values.length === 0) {
    (handler as () => Promise<void>)();
  } else {
    for (const v of values[0]) {
      matrix(values.slice(1), (...args) => (handler as any)(v, ...args));
    }
  }
}
