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

const defaultRefreshWindow = 1000 * 60 * 2; // Start refreshing 2m before expiry

describe("BearerTokenAuthenticationPolicy", function() {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.now());
  });
  afterEach(() => {
    clock.restore();
  });

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
        tracingOptions: undefined
      }),
      "fakeGetToken called incorrectly."
    );
    assert.strictEqual(request.headers.get("Authorization"), `Bearer ${mockToken}`);
  });

  it("credential errors should bubble up", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockAzureCredential(tokenExpiration, getTokenDelay, clock);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createBearerTokenPolicy("test-scope", credential);

    credential.shouldThrow = true;

    let error: Error | undefined;
    try {
      await policy.sendRequest(request, next);
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

  it("throws if the target URI doesn't start with 'https'", async () => {
    const expireDelayMs = defaultRefreshWindow + 5000;
    const tokenExpiration = Date.now() + expireDelayMs;
    const credential = new MockAzureCredential(tokenExpiration);

    const request = createPipelineRequest({ url: "http://example.com" });
    const policy = createBearerTokenPolicy("test-scope", credential);
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();

    let error: Error | undefined;
    try {
      await policy.sendRequest(request, next);
    } catch (e) {
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
      credential
    });
  }
});

class MockAzureCredential implements TokenCredential {
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
