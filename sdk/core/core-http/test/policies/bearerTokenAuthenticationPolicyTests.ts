// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { fake } from "sinon";
import { OperationSpec } from "../../src/operationSpec";
import { TokenCredential, GetTokenOptions, AccessToken } from "@azure/core-auth";
import { RequestPolicy, RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { Constants } from "../../src/util/constants";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import { HttpHeaders } from "../../src/httpHeaders";
import { WebResource } from "../../src/webResource";
import { BearerTokenAuthenticationPolicy } from "../../src/policies/bearerTokenAuthenticationPolicy";
import {
  ExpiringAccessTokenCache,
  TokenRefreshBufferMs
} from "../../src/credentials/accessTokenCache";
import { delay } from "../../src/coreHttp";

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

  it("refreshes access tokens when they expire", async function() {
    const now = Date.now();
    const refreshCred1 = new MockRefreshAzureCredential(now);
    const refreshCred2 = new MockRefreshAzureCredential(now + TokenRefreshBufferMs);
    const notRefreshCred1 = new MockRefreshAzureCredential(now + TokenRefreshBufferMs + 5000);

    const credentialsToTest: [MockRefreshAzureCredential, number][] = [
      [refreshCred1, 1],
      [refreshCred2, 1],
      [notRefreshCred1, 1]
    ];

    const request = createRequest();
    for (const [credentialToTest, expectedCalls] of credentialsToTest) {
      const policy = createBearerTokenPolicy("testscope", credentialToTest);
      await policy.sendRequest(request);
      await policy.sendRequest(request);
      assert.strictEqual(credentialToTest.authCount, expectedCalls);
    }
  });

  it("tests that AccessTokenRefresher is working", async function() {
    this.timeout(35000);
    const now = Date.now();
    const credentialToTest = new MockRefreshAzureCredential(now);

    const request = createRequest();
    const policy = createBearerTokenPolicy("testscope", credentialToTest);
    await policy.sendRequest(request);
    await delay(30000);
    await policy.sendRequest(request);
    assert.strictEqual(credentialToTest.authCount, 2);
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
      credential,
      scopes,
      new ExpiringAccessTokenCache()
    );
  }
});

class MockRefreshAzureCredential implements TokenCredential {
  private _expiresOnTimestamp: number;
  public authCount = 0;

  constructor(expiresOnTimestamp: number) {
    this._expiresOnTimestamp = expiresOnTimestamp;
  }

  public getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    this.authCount++;
    return Promise.resolve({ token: "mocktoken", expiresOnTimestamp: this._expiresOnTimestamp });
  }
}
