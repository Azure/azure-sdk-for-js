// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { fake, createSandbox } from "sinon";
import { OperationSpec } from "../../src/operationSpec";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { RequestPolicy, RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { Constants } from "../../src/util/constants";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { HttpHeaders } from "../../src/httpHeaders";
import { WebResource } from "../../src/webResource";
import { BearerTokenAuthenticationPolicy } from "../../src/policies/bearerTokenAuthenticationPolicy";
import { ExpiringAccessTokenCache } from "../../src/credentials/accessTokenCache";
import { AccessTokenRefresher } from "../../src/credentials/accessTokenRefresher";
import { delay } from "../../src/coreHttp";

// Token is refreshed one millisecond BEFORE it expires.
const testTokenExpiresThisEarlier = 1000;

// To avoid many refresh requests, we make new refresh requests only after:
const testRequiredMillisecondsBeforeNewRefresh = 500;

describe("BearerTokenAuthenticationPolicy", function () {
  const mockPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      return Promise.resolve({
        request: request,
        status: 200,
        headers: new HttpHeaders()
      });
    }
  };

  it("correctly adds an Authentication header with the Bearer token", async function () {
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

  it("tests that AccessTokenRefresher is working", async function () {
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
    await delay(expireDelayMs - testTokenExpiresThisEarlier - 1000);
    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1);

    // The new token will last 5 seconds again.
    tokenExpiration = Date.now() + expireDelayMs;
    credential.setExpiresOnTimestamp(tokenExpiration);

    // Now we wait until it expires:
    await delay(1000);
    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 2);
  });

  it("access token refresher should prevent refreshers to happen too fast", async () => {
    const expiresOn = Date.now(); // Already expired
    const credential = new MockRefreshAzureCredential(expiresOn);
    const request = createRequest();
    const policy = createBearerTokenPolicy("test-scope", credential);

    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1);
    credential.setExpiresOnTimestamp(Date.now());

    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 1);
    credential.setExpiresOnTimestamp(Date.now());

    await delay(testRequiredMillisecondsBeforeNewRefresh);

    await policy.sendRequest(request);
    assert.strictEqual(credential.authCount, 2);
    credential.setExpiresOnTimestamp(Date.now());
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
      new ExpiringAccessTokenCache(testTokenExpiresThisEarlier),
      new AccessTokenRefresher(credential, scopes, testRequiredMillisecondsBeforeNewRefresh)
    );
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

  public async getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    this.authCount++;
    return { token: "mock-token", expiresOnTimestamp: this._expiresOnTimestamp };
  }
}
