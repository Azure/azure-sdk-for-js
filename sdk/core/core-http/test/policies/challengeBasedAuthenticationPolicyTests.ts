// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "chai";
import { fake, createSandbox } from "sinon";
// import { env, Recorder } from "@azure/test-utils-recorder";
import { OperationSpec } from "../../src/operationSpec";
import { WebResource } from "../../src/webResource";
import { HttpHeaders } from "../../src/httpHeaders";
import { RequestPolicy, RequestPolicyOptions } from "../../src/policies/requestPolicy";
import { HttpOperationResponse } from "../../src/httpOperationResponse";
import {
  ExpiringAccessTokenCache,
} from "../../src/credentials/accessTokenCache";

import {
  AuthenticationChallengeCache,
  AuthenticationChallenge,
  parseWWWAuthenticate, ChallengeBasedAuthenticationPolicy
  
} from "../../src/policies/challengeBasedAuthenticationPolicy";

import { TokenCredential } from "@azure/core-auth";

// import { authenticate } from "../utils/testAuthentication";
// import TestClient from "../utils/testClient";

// Following the philosophy of not testing the insides if we can test the outsides...
// I present you with this "Get Out of Jail Free" card (in reference to Monopoly).
// Once we move to a common folder, and after some refactoring,
// we will be able to unit test the insides in detail.

describe("Challenge based authentication tests", () => {
  const mockPolicy: RequestPolicy = {
    sendRequest(request: WebResource): Promise<HttpOperationResponse> {
      let headers = new HttpHeaders();
      headers.set("WWW-Authenticate", `Bearer authorization="some_authorization", resource="https://some.url"`);
      return Promise.resolve({
        request: request,
        status: 401,
        headers
      });
    }
  };

  function createChallengeTokenPolicy(
    credential: TokenCredential
  ): ChallengeBasedAuthenticationPolicy {
    return new ChallengeBasedAuthenticationPolicy(
      mockPolicy,
      new RequestPolicyOptions(),
      credential,
      new ExpiringAccessTokenCache(),
      new AuthenticationChallengeCache(),
    );
  }

  beforeEach(async function() {
    // const authentication = await authenticate(this);
    // keySuffix = authentication.keySuffix;
    // client = authentication.client;
    // testClient = authentication.testClient;
    // recorder = authentication.recorder;
  });

  afterEach(async function() {
    // await recorder.stop();
  });

  // The tests follow

  it("Once authenticated, new requests should not authenticate again", async function() {
    // Our goal is to intercept how our pipelines are storing the challenge.
    // The first network call should indeed set the challenge in memory.
    // Subsequent network calls should not set new challenges.

    const sandbox = createSandbox();
    const spy = sandbox.spy(AuthenticationChallengeCache.prototype, "setCachedChallenge");

    const mockToken = "token";
    const fakeGetToken = fake.returns(Promise.resolve({ token: mockToken, expiresOn: new Date() }));
    const mockCredential: TokenCredential = {
      getToken: fakeGetToken
    };

    const challengeTokenPolicy = createChallengeTokenPolicy(mockCredential);

    // Now we run what would be a normal use of the client.
    // Here we will create two keys, then flush them.
    // testClient.flushKey deletes, then purges the keys.
    for (let i = 0; i < 10; ++i) {
      const request = createRequest();
      await challengeTokenPolicy.sendRequest(request);
    }

    // The challenge should have been written to the cache exactly ONCE.
    assert.equal(spy.getCalls().length, 1);

    // Back to normal.
    sandbox.restore();

    // Note: Failing to authenticate will make network requests throw.
    function createRequest(operationSpec?: OperationSpec): WebResource {
      const request = new WebResource("https://test");
      request.operationSpec = operationSpec;
      return request;
    }
  });

  it("Authentication should work for parallel requests", async function() {
    const sandbox = createSandbox();
    const spy = sandbox.spy(AuthenticationChallengeCache.prototype, "setCachedChallenge");
    const spyEqualTo = sandbox.spy(AuthenticationChallenge.prototype, "equalTo");

    const mockToken = "token";
    const fakeGetToken = fake.returns(Promise.resolve({ token: mockToken, expiresOn: new Date() }));
    const mockCredential: TokenCredential = {
      getToken: fakeGetToken
    };

    const challengeTokenPolicy = createChallengeTokenPolicy(mockCredential);

    let promises = [];

    // Now we run what would be a normal use of the client.
    // Here we will create two keys, then flush them.
    // testClient.flushKey deletes, then purges the keys.
    for (let i = 0; i < 10; ++i) {
      const request = createRequest();
      promises.push(challengeTokenPolicy.sendRequest(request));
    }

    for (let i = 0; i < 10; ++i) {
      await promises[i];
    }

    // The challenge should have been written to the cache exactly ONCE.
    assert.equal(spy.getCalls().length, 1);
    // Even though we had parallel requests, only one authentication should have happened.

    // This is determined by the comparison between the cached challenge and the new receive challenge.
    // So, AuthenticationChallenge's equalTo should have returned true at least once.
    assert.ok(spyEqualTo.returned(true));

    // The challenge should have been written to the cache exactly ONCE.
    assert.equal(spy.getCalls().length, 1);

    // Back to normal.
    sandbox.restore();

    // Note: Failing to authenticate will make network requests throw.
    function createRequest(operationSpec?: OperationSpec): WebResource {
      const request = new WebResource("https://test");
      request.operationSpec = operationSpec;
      return request;
    }
  });

  describe("parseWWWAuthenticate tests", () => {
    it("Should work for known shapes of the WWW-Authenticate header", () => {
      const wwwAuthenticate1 = `Bearer authorization="some_authorization", resource="https://some.url"`;
      const parsed1 = parseWWWAuthenticate(wwwAuthenticate1);
      assert.deepEqual(parsed1, {
        authorization: "some_authorization",
        resource: "https://some.url"
      });

      const wwwAuthenticate2 = `Bearer authorization="some_authorization", scope="https://some.url"`;
      const parsed2 = parseWWWAuthenticate(wwwAuthenticate2);
      assert.deepEqual(parsed2, {
        authorization: "some_authorization",
        scope: "https://some.url"
      });
    });

    it("Should skip unexpected properties on the WWW-Authenticate header", () => {
      const wwwAuthenticate1 = `Bearer authorization="some_authorization", a="a", b="b"`;
      const parsed1 = parseWWWAuthenticate(wwwAuthenticate1);
      assert.deepEqual(parsed1 as any, {
        authorization: "some_authorization",
        a: "a",
        b: "b"
      });

      const wwwAuthenticate2 = `scope="https://some.url", a="a", c="c"`;
      const parsed2 = parseWWWAuthenticate(wwwAuthenticate2);
      assert.deepEqual(parsed2 as any, {
        scope: "https://some.url",
        a: "a",
        c: "c"
      });
    });
  });
});
