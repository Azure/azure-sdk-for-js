// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { TokenCredential, AccessToken } from "@azure/core-auth";
import {} from "../src/policies/bearerTokenAuthenticationPolicy";
import { DefaultTokenRefreshBufferMs } from "../src/accessTokenCache";
import {
  PipelinePolicy,
  createPipelineRequest,
  createHttpHeaders,
  PipelineResponse,
  bearerTokenAuthenticationPolicy,
  SendRequest
} from "../src";

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

  it("refreshes access tokens when they expire", async () => {
    const now = Date.now();
    const refreshCred1 = new MockRefreshAzureCredential(now);
    const refreshCred2 = new MockRefreshAzureCredential(now + DefaultTokenRefreshBufferMs);
    const notRefreshCred1 = new MockRefreshAzureCredential(
      now + DefaultTokenRefreshBufferMs + 5000
    );

    const credentialsToTest: [MockRefreshAzureCredential, number][] = [
      [refreshCred1, 2],
      [refreshCred2, 2],
      [notRefreshCred1, 1]
    ];

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    for (const [credentialToTest, expectedCalls] of credentialsToTest) {
      const policy = createBearerTokenPolicy("testscope", credentialToTest);
      await policy.sendRequest(request, next);
      await policy.sendRequest(request, next);
      assert.strictEqual(credentialToTest.authCount, expectedCalls);
    }
  });

  function createBearerTokenPolicy(
    scopes: string | string[],
    credential: TokenCredential
  ): PipelinePolicy {
    return bearerTokenAuthenticationPolicy({
      scopes,
      credential
    });
  }
});

class MockRefreshAzureCredential implements TokenCredential {
  private _expiresOnTimestamp: number;
  public authCount = 0;

  constructor(expiresOnTimestamp: number) {
    this._expiresOnTimestamp = expiresOnTimestamp;
  }

  public async getToken(): Promise<AccessToken> {
    this.authCount++;
    return { token: "mocktoken", expiresOnTimestamp: this._expiresOnTimestamp };
  }
}
