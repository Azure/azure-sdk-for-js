// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import { assert } from "chai";
import { fake } from "sinon";
import { OperationSpec } from "../../lib/operationSpec";
import { TokenCredential, GetTokenOptions, AccessToken } from "../../lib/credentials/tokenCredential";
import { RequestPolicy, RequestPolicyOptions, } from "../../lib/policies/requestPolicy";
import { Constants } from "../../lib/util/constants";
import { HttpOperationResponse } from "../../lib/httpOperationResponse";
import { HttpHeaders, } from "../../lib/httpHeaders";
import { WebResource } from "../../lib/webResource";
import { BearerTokenAuthenticationPolicy, TokenRefreshBufferMs } from "../../lib/policies/bearerTokenAuthenticationPolicy";

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

    assert(fakeGetToken.calledWith(tokenScopes, { abortSignal: undefined }));
    assert.strictEqual(
      request.headers.get(Constants.HeaderConstants.AUTHORIZATION),
      `Bearer ${mockToken}`
    );
  });

  it("refreshes access tokens when they expire", async () => {
    const now = Date.now();
    const refreshCred1 = new MockRefreshAzureCredential(new Date(now));
    const refreshCred2 = new MockRefreshAzureCredential(new Date(now + TokenRefreshBufferMs));
    const notRefreshCred1 = new MockRefreshAzureCredential(
      new Date(now + TokenRefreshBufferMs + 5000)
    );

    const credentialsToTest: [MockRefreshAzureCredential, number][] = [
      [refreshCred1, 2],
      [refreshCred2, 2],
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

  function createRequest(operationSpec?: OperationSpec): WebResource {
    const request = new WebResource();
    request.operationSpec = operationSpec;
    return request;
  }

  function createBearerTokenPolicy(scopes: string | string[], credential: TokenCredential) {
    return new BearerTokenAuthenticationPolicy(
      mockPolicy,
      new RequestPolicyOptions(),
      credential,
      scopes);
  }
});

class MockRefreshAzureCredential implements TokenCredential {
  private _expiresOn: Date;
  public authCount = 0;

  constructor(expiresOn: Date) {
    this._expiresOn = expiresOn;
  }

  public getToken(
    _scopes: string | string[],
    _options?: GetTokenOptions
  ): Promise<AccessToken | null> {
    this.authCount++;
    return Promise.resolve({ token: "mocktoken", expiresOn: this._expiresOn });
  }
}
