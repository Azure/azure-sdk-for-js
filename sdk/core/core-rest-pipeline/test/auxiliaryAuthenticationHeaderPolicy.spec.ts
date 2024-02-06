// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import * as sinon from "sinon";
import { AccessToken, TokenCredential } from "@azure/core-auth";
import {
  PipelinePolicy,
  PipelineResponse,
  SendRequest,
  auxiliaryAuthenticationHeaderPolicy,
  createHttpHeaders,
  createPipelineRequest,
} from "../src";
import { DEFAULT_CYCLER_OPTIONS } from "../src/util/tokenCycler";

const { refreshWindowInMs: defaultRefreshWindow } = DEFAULT_CYCLER_OPTIONS;

describe("AuxiliaryAuthenticationHeaderPolicy", function () {
  let clock: sinon.SinonFakeTimers;

  beforeEach(() => {
    clock = sinon.useFakeTimers(Date.now());
  });
  afterEach(() => {
    clock.restore();
  });

  it("correctly adds an Authentication header with one access token", async function () {
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

    const mockAuxiliaryAuthenticationHeaderPolicy = createAuxiliaryAuthenticationHeaderPolicy(
      tokenScopes,
      [mockCredential]
    );
    await mockAuxiliaryAuthenticationHeaderPolicy.sendRequest(request, next);

    assert(
      fakeGetToken.calledWith(tokenScopes, {
        abortSignal: undefined,
        tracingOptions: undefined,
      }),
      "fakeGetToken called incorrectly."
    );
    assert.strictEqual(request.headers.get("x-ms-authorization-auxiliary"), `Bearer ${mockToken}`);
  });

  it("correctly adds an Authentication header with two access tokens", async function () {
    const mockToken1 = "token1",
      mockToken2 = "token2";
    const tokenScopes = ["scope1", "scope2"];
    const fakeGetToken1 = sinon.fake.returns(
      Promise.resolve({ token: mockToken1, expiresOnTimestamp: new Date().getTime() })
    );
    const fakeGetToken2 = sinon.fake.returns(
      Promise.resolve({ token: mockToken2, expiresOnTimestamp: new Date().getTime() })
    );
    const mockCredential1: TokenCredential = {
      getToken: fakeGetToken1,
    };
    const mockCredential2: TokenCredential = {
      getToken: fakeGetToken2,
    };

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const mockAuxiliaryAuthenticationHeaderPolicy = createAuxiliaryAuthenticationHeaderPolicy(
      tokenScopes,
      [mockCredential1, mockCredential2]
    );
    await mockAuxiliaryAuthenticationHeaderPolicy.sendRequest(request, next);

    assert(
      fakeGetToken1.calledWith(tokenScopes, {
        abortSignal: undefined,
        tracingOptions: undefined,
      }),
      "fakeGetToken called incorrectly."
    );
    assert.strictEqual(
      request.headers.get("x-ms-authorization-auxiliary"),
      `Bearer ${mockToken1}, Bearer ${mockToken2}`
    );
  });

  it("only refreshes invalid token during the refresh window", async () => {
    const expireDelayMs = defaultRefreshWindow + 5000;
    let tokenExpiration = Date.now() + expireDelayMs;
    const shortCredential = new MockRefreshAzureCredential(tokenExpiration);
    const longCredential = new MockRefreshAzureCredential(Date.now() + expireDelayMs * 3);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createAuxiliaryAuthenticationHeaderPolicy("test-scope", [
      shortCredential,
      longCredential,
    ]);

    // The token is cached and remains cached for a bit.
    await policy.sendRequest(request, next);
    await policy.sendRequest(request, next);
    assert.strictEqual(shortCredential.authCount, 1);
    assert.strictEqual(longCredential.authCount, 1);
    assert.strictEqual(
      request.headers.get("x-ms-authorization-auxiliary"),
      `Bearer mock-token, Bearer mock-token`
    );

    // The token will remain cached until tokenExpiration - testTokenRefreshBufferMs, so in (5000 - 1000) milliseconds.

    // For safe measure, we test the token is still cached a second earlier than the forced refresh expectation.
    clock.tick(expireDelayMs - defaultRefreshWindow - 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(shortCredential.authCount, 1);
    assert.strictEqual(longCredential.authCount, 1);

    // The new token will last for a few minutes again.
    tokenExpiration = Date.now() + expireDelayMs;
    shortCredential.expiresOnTimestamp = tokenExpiration;

    // Now we wait until it expires:
    clock.tick(expireDelayMs + 1000);
    await policy.sendRequest(request, next);
    assert.strictEqual(shortCredential.authCount, 2);
    assert.strictEqual(longCredential.authCount, 1);
  });

  it("credential errors should bubble up", async () => {
    const expireDelayMs = 5000;
    const startTime = Date.now();
    const tokenExpiration = startTime + expireDelayMs;
    const getTokenDelay = 100;
    const credential = new MockRefreshAzureCredential(tokenExpiration, getTokenDelay, clock);

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const policy = createAuxiliaryAuthenticationHeaderPolicy("test-scope", [credential]);

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

  it("throws if the target URI doesn't start with 'https'", async () => {
    const expireDelayMs = defaultRefreshWindow + 5000;
    const tokenExpiration = Date.now() + expireDelayMs;
    const credential = new MockRefreshAzureCredential(tokenExpiration);

    const request = createPipelineRequest({ url: "http://example.com" });
    const policy = createAuxiliaryAuthenticationHeaderPolicy("test-scope", [credential]);
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();

    let error: Error | undefined;
    try {
      await policy.sendRequest(request, next);
    } catch (e: any) {
      error = e;
    }

    assert.equal(
      error?.message,
      "Bearer token authentication for auxiliary header is not permitted for non-TLS protected (non-https) URLs."
    );
  });

  it("should not add auxiliary header if all tokens are invalid", async function () {
    const tokenScopes = ["scope1", "scope2"];
    const fakeGetToken1 = sinon.fake.returns(
      Promise.resolve({
        token: null,
        expiresOnTimestamp: new Date().getTime(),
      } as unknown as AccessToken)
    );
    const fakeGetToken2 = sinon.fake.returns(
      Promise.resolve({
        token: null,
        expiresOnTimestamp: new Date().getTime(),
      } as unknown as AccessToken)
    );
    const mockCredential1: TokenCredential = {
      getToken: fakeGetToken1,
    };
    const mockCredential2: TokenCredential = {
      getToken: fakeGetToken2,
    };

    const request = createPipelineRequest({ url: "https://example.com" });
    const successResponse: PipelineResponse = {
      headers: createHttpHeaders(),
      request,
      status: 200,
    };
    const next = sinon.stub<Parameters<SendRequest>, ReturnType<SendRequest>>();
    next.resolves(successResponse);

    const mockAuxiliaryAuthenticationHeaderPolicy = createAuxiliaryAuthenticationHeaderPolicy(
      tokenScopes,
      [mockCredential1, mockCredential2]
    );
    await mockAuxiliaryAuthenticationHeaderPolicy.sendRequest(request, next);

    assert(
      fakeGetToken1.calledWith(tokenScopes, {
        abortSignal: undefined,
        tracingOptions: undefined,
      }),
      "fakeGetToken called incorrectly."
    );
    assert.isUndefined(request.headers.get("x-ms-authorization-auxiliary"));
  });

  function createAuxiliaryAuthenticationHeaderPolicy(
    scopes: string | string[],
    credentials: TokenCredential[]
  ): PipelinePolicy {
    return auxiliaryAuthenticationHeaderPolicy({
      scopes,
      credentials,
    });
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
