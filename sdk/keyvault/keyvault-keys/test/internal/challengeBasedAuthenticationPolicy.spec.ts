// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { Context } from "mocha";
import { createSandbox } from "sinon";
import { env, Recorder } from "@azure-tools/test-recorder";

import {
  AuthenticationChallengeCache,
  AuthenticationChallenge,
  parseWWWAuthenticate,
  challengeBasedAuthenticationPolicy
} from "../../../keyvault-common/src";
import { KeyClient } from "../../src";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";
import { getServiceVersion } from "../utils/utils.common";
import { WebResource } from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";

// Following the philosophy of not testing the insides if we can test the outsides...
// I present you with this "Get Out of Jail Free" card (in reference to Monopoly).
// Once we move to a common folder, and after some refactoring,
// we will be able to unit test the insides in detail.

describe("Challenge based authentication tests", () => {
  const keyPrefix = `challengeAuth${env.KEY_NAME || "KeyName"}`;
  let keySuffix: string;
  let client: KeyClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function(this: Context) {
    const authentication = await authenticate(this, getServiceVersion());
    keySuffix = authentication.keySuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    await recorder.stop();
  });

  // The tests follow

  it("Authentication should work for parallel requests", async function(this: Context) {
    const keyName = testClient.formatName(`${keyPrefix}-${this!.test!.title}-${keySuffix}`);
    const keyNames = [`${keyName}-0`, `${keyName}-1`];

    const sandbox = createSandbox();
    const spy = sandbox.spy(AuthenticationChallengeCache.prototype, "setCachedChallenge");
    const spyEqualTo = sandbox.spy(AuthenticationChallenge.prototype, "equalTo");

    const promises = keyNames.map((name) => {
      const promise = client.listPropertiesOfKeys().next();
      return { promise, name };
    });

    for (const promise of promises) {
      await promise.promise;
      // await testClient.flushKey(promise.name);
    }

    // Even though we had parallel requests, only one authentication should have happened.

    // This is determined by the comparison between the cached challenge and the new receive challenge.
    // So, AuthenticationChallenge's equalTo should have returned true at least once.
    assert.ok(spyEqualTo.returned(true));

    // The challenge should have been written to the cache exactly ONCE.
    assert.equal(spy.getCalls().length, 1);

    // Back to normal.
    sandbox.restore();
  });

  it("Once authenticated, new requests should not authenticate again", async function(this: Context) {
    // Our goal is to intercept how our pipelines are storing the challenge.
    // The first network call should indeed set the challenge in memory.
    // Subsequent network calls should not set new challenges.

    const sandbox = createSandbox();
    const spy = sandbox.spy(AuthenticationChallengeCache.prototype, "setCachedChallenge");

    await client.listDeletedKeys().next();
    await client.listDeletedKeys().next();

    // The challenge should have been written to the cache exactly ONCE.
    assert.equal(spy.getCalls().length, 1);

    // Back to normal.
    sandbox.restore();

    // Note: Failing to authenticate will make network requests throw.
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
      assert.deepEqual(parsed1, {
        authorization: "some_authorization",
        a: "a",
        b: "b"
      });

      const wwwAuthenticate2 = `scope="https://some.url", a="a", c="c"`;
      const parsed2 = parseWWWAuthenticate(wwwAuthenticate2);
      assert.deepEqual(parsed2, {
        scope: "https://some.url",
        a: "a",
        c: "c"
      });
    });
  });
});

describe("Local Challenge based authentication tests", () => {
  it("should recover gracefully when a downstream policy fails", async () => {
    // The simplest possible policy with a _nextPolicy that throws an error.
    const credential = new ClientSecretCredential(
      env.AZURE_TENANT_ID!,
      env.AZURE_CLIENT_ID!,
      env.AZURE_CLIENT_SECRET!
    );

    const policy = challengeBasedAuthenticationPolicy(credential).create(
      {
        sendRequest: () => {
          throw new Error("Boom");
        }
      },
      { log: () => null, shouldLog: () => false }
    );

    const request = new WebResource("https://portal.azure.com", "GET", "request body");

    try {
      await policy.sendRequest(request);
    } catch (err) {
      // the next policy throws
    }

    assert.equal(request.body, "request body");
  });
});
