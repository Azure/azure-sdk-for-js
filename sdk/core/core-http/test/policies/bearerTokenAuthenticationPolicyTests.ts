// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import Sinon, { fake, createSandbox } from "sinon";
import { OperationSpec } from "../../src/operationSpec";
import { TokenCredential, AccessToken } from "@azure/core-auth";
import { RequestPolicy, RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { Constants } from "../../src/util/constants";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { HttpHeaders } from "../../src/httpHeaders";
import { WebResource } from "../../src/webResource";
import { BearerTokenAuthenticationPolicy } from "../../src/policies/bearerTokenAuthenticationPolicy";
import { ExpiringAccessTokenCache } from "../../src/credentials/accessTokenCache";
import { AccessTokenRefresher } from "../../src/credentials/accessTokenRefresher";

// Token is refreshed one millisecond BEFORE it expires.
const beforeTokenExpiresInMs = 1000;

// To avoid many refresh requests, we make new refresh requests only after:
const tokenRefreshIntervalInMs = 500;

describe("BearerTokenAuthenticationPolicy", function() {
  const mockPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      return Promise.resolve({
        request: request,
        status: 200,
        headers: new HttpHeaders()
      });
    }
  };

  let clock: Sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = Sinon.useFakeTimers(Date.now());
  });
  afterEach(() => {
    clock.restore();
  });

  it("correctly adds an Authentication header with the Bearer token", async function() {
    const mockToken = "token";
    const tokenScopes = ["scope1", "scope2"];
    const fakeGetToken = fake.returns(Promise.resolve({ token: mockToken, expiresOn: new Date() }));
    const mockCredential: TokenCredential = {
      getToken: fakeGetToken
    };

    const request = createRequest();
    const bearerTokenAuthPolicy = createBearerTokenPolicy(tokenScopes, mockCredential);
    await bearerTokenAuthPolicy.sendRequest(request);

    assert(
      fakeGetToken.calledWith(tokenScopes, {
        abortSignal: undefined,
        tracingOptions: { spanOptions: undefined }
      }),
      "fakeGetToken called incorrectly."
    );
    assert.strictEqual(
      request.headers.get(Constants.HeaderConstants.AUTHORIZATION),
      `Bearer ${mockToken}`
    );
  });

  it("tests that AccessTokenRefresher is working", async function() {
    const now = Date.now();
    const credentialToTest = new MockRefreshAzureCredential(now);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credentialToTest);
    await policy.sendRequest(request);

    const sandbox = createSandbox();
    sandbox.replace(AccessTokenRefresher.prototype, "isReady", () => true);
    await policy.sendRequest(request);
    sandbox.restore();
    assert.strictEqual(credentialToTest.authCount, 2);
  });

  it("refreshes the token on initial request", async () => {
    const expiresOn = Date.now() + 1000 * 60; // One minute later.
    const credential = new MockRefreshAzureCredential(expiresOn);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1);
  });

  it("refreshes the token again only once it expired", async () => {
    const expireDelayMs = 5000;
    let tokenExpiration = Date.now() + expireDelayMs;
    const credential = new MockRefreshAzureCredential(tokenExpiration);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credential);

    // The token is cached and remains cached for a bit.
    await policy.sendRequest(request);
    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1);

    // The token will remain cached until tokenExpiration - testTokenRefreshBufferMs, so in (5000 - 1000) milliseconds.

    // For safe measure, we test the token is still cached a second earlier than the refresh expectation.
    clock.tick(expireDelayMs - beforeTokenExpiresInMs - 1000);
    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1);

    // The new token will last 5 seconds again.
    tokenExpiration = Date.now() + expireDelayMs;
    credential.expiresOnTimestamp = tokenExpiration;

    // Now we wait until it expires:
    clock.tick(1000);
    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 2);
  });

  it("access token refresher should prevent multiple initial getToken requests to break", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockRefreshAzureCredential(tokenExpiration, getTokenDelay, clock);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credential);

    // Now we send some requests.
    const promises = [
      policy.sendRequest(request),
      policy.sendRequest(request),
      policy.sendRequest(request)
    ];
    // Now we wait until they're all resolved.
    for (const promise of promises) {
      await promise;
    }
    assert.strictEqual(credential.authCount, 1, "The first authentication should have happened");
  });

  it("access token refresher should prevent refreshers to happen too fast while the token is about to expire", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockRefreshAzureCredential(tokenExpiration, getTokenDelay, clock);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1, "The first authentication should have happened");

    clock.tick(expireDelayMs - beforeTokenExpiresInMs); // Until we start refreshing the token

    // Now we send some requests.
    const promises = [
      policy.sendRequest(request),
      policy.sendRequest(request),
      policy.sendRequest(request)
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

  function createRequest(operationSpec?: OperationSpec): WebResource {
    const request = new WebResource();
    request.operationSpec = operationSpec;
    return request;
  }

  function createBearerTokenPolicy(
    scopes: string | string[],
    credential: TokenCredential
  ): BearerTokenAuthenticationPolicy {
    return new BearerTokenAuthenticationPolicy(
      mockPolicy,
      new RequestPolicyOptions(),
      new ExpiringAccessTokenCache(beforeTokenExpiresInMs),
      new AccessTokenRefresher(credential, scopes, tokenRefreshIntervalInMs)
    );
  }
});

class MockRefreshAzureCredential implements TokenCredential {
  public authCount = 0;

  constructor(
    public expiresOnTimestamp: number,
    public getTokenDelay?: number,
    public clock?: sinon.SinonFakeTimers
  ) {}

  public async getToken(): Promise<AccessToken> {
    this.authCount++;

    // Allowing getToken to take a while
    if (this.getTokenDelay && this.clock) {
      this.clock.tick(this.getTokenDelay);
    }

    return { token: "mock-token", expiresOnTimestamp: this.expiresOnTimestamp };
  }
}
