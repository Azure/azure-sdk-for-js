// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { AccessToken, TokenCredential } from "@azure/core-auth";
import { RequestPolicy, RequestPolicyOptions } from "../../src/policies/requestPolicy";
import Sinon, { fake, match } from "sinon";
import { Constants } from "../../src/util/constants";
import { DEFAULT_CYCLER_OPTIONS } from "../../src/policies/bearerTokenAuthenticationPolicy";
import { HttpHeaders } from "../../src/httpHeaders";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { OperationSpec } from "../../src/operationSpec";
import { WebResource } from "../../src/webResource";
import { assert } from "chai";
import { bearerTokenAuthenticationPolicy } from "../../src/coreHttp";

const { refreshWindowInMs: defaultRefreshWindow } = DEFAULT_CYCLER_OPTIONS;

describe("BearerTokenAuthenticationPolicy", function () {
  const mockPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      return Promise.resolve({
        request: request,
        status: 200,
        headers: new HttpHeaders(),
      });
    },
  };

  let clock: Sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = Sinon.useFakeTimers(Date.now());
  });
  afterEach(() => {
    clock.restore();
  });

  it("correctly adds an Authentication header with the Bearer token", async function () {
    const mockToken = "token";
    const tokenScopes = ["scope1", "scope2"];
    const fakeGetToken = fake.returns(Promise.resolve({ token: mockToken, expiresOn: new Date() }));
    const mockCredential: TokenCredential = {
      getToken: fakeGetToken,
    };

    const request = createRequest();
    const bearerTokenAuthPolicy = createBearerTokenPolicy(tokenScopes, mockCredential);
    await bearerTokenAuthPolicy.sendRequest(request);

    assert(
      fakeGetToken.calledWith(
        tokenScopes,
        match({
          abortSignal: undefined,
          tracingOptions: { spanOptions: undefined },
        })
      ),
      "fakeGetToken called incorrectly."
    );
    assert.strictEqual(
      request.headers.get(Constants.HeaderConstants.AUTHORIZATION),
      `Bearer ${mockToken}`
    );
  });

  it("refreshes the token on initial request", async () => {
    const expiresOn = Date.now() + 1000 * 60; // One minute later.
    const credential = new MockRefreshAzureCredential(expiresOn);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1);
  });

  it("refreshes the token during the refresh window", async () => {
    const expireDelayMs = defaultRefreshWindow + 5000;
    let tokenExpiration = Date.now() + expireDelayMs;
    const credential = new MockRefreshAzureCredential(tokenExpiration);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credential);

    // The token is cached and remains cached for a bit.
    await policy.sendRequest(request);
    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1);

    // The token will remain cached until tokenExpiration - testTokenRefreshBufferMs, so in (5000 - 1000) milliseconds.

    // For safe measure, we test the token is still cached a second earlier than the forced refresh expectation.
    clock.tick(expireDelayMs - defaultRefreshWindow - 1000);
    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1);

    // The new token will last for a few minutes again.
    tokenExpiration = Date.now() + expireDelayMs;
    credential.expiresOnTimestamp = tokenExpiration;

    // Now we wait until it expires:
    clock.tick(expireDelayMs + 1000);
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
      policy.sendRequest(request),
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
    const credential = new MockRefreshAzureCredential(tokenExpiration, getTokenDelay, clock);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credential);

    credential.shouldThrow = true;

    let error: Error | undefined;
    try {
      await policy.sendRequest(request);
    } catch (e) {
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
    const credential = new MockRefreshAzureCredential(tokenExpiration, getTokenDelay, clock);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1, "The first authentication should have happened");

    clock.tick(tokenExpiration - startTime - defaultRefreshWindow); // Until we start refreshing the token

    // Now we wait until some requests are all resolved.
    await Promise.all([
      policy.sendRequest(request),
      policy.sendRequest(request),
      policy.sendRequest(request),
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
    const expiresOn = Date.now() + 1000 * 60; // One minute later.
    const credential = new MockRefreshAzureCredential(expiresOn);
    const request = createRequest(undefined, "http://azure.com");
    const policy = createBearerTokenPolicy("test-scope", credential);

    let error: Error | undefined;
    try {
      await policy.sendRequest(request);
    } catch (e) {
      error = e;
    }

    assert.equal(
      error?.message,
      "Bearer token authentication is not permitted for non-TLS protected (non-https) URLs."
    );
  });

  function createRequest(
    operationSpec?: OperationSpec,
    uri: string = "https://azure.com"
  ): WebResource {
    const request = new WebResource(uri);
    request.operationSpec = operationSpec;
    return request;
  }

  function createBearerTokenPolicy(
    scopes: string | string[],
    credential: TokenCredential
  ): RequestPolicy {
    const factory = bearerTokenAuthenticationPolicy(credential, scopes);
    return factory.create(mockPolicy, new RequestPolicyOptions());
  }
});

class MockRefreshAzureCredential implements TokenCredential {
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
