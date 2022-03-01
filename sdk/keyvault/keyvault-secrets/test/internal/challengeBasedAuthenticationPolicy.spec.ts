// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { assert } from "@azure/test-utils";
import { Context } from "mocha";
import { env, Recorder } from "@azure-tools/test-recorder";
import { createSandbox } from "sinon";

import {
  AuthenticationChallengeCache,
  AuthenticationChallenge,
  parseWWWAuthenticate,
  challengeBasedAuthenticationPolicy,
} from "../../../keyvault-common/src";
import { SecretClient } from "../../src";
import { authenticate } from "../public/utils/testAuthentication";
import TestClient from "../public/utils/testClient";
import { ClientSecretCredential } from "@azure/identity";
import { WebResource } from "@azure/core-http";
import { getServiceVersion } from "../public/utils/common";

// Following the philosophy of not testing the insides if we can test the outsides...
// I present you with this "Get Out of Jail Free" card (in reference to Monopoly).
// Once we move to a common folder, and after some refactoring,
// we will be able to unit test the insides in detail.

describe("Challenge based authentication tests", () => {
  const secretPrefix = `challengeAuthSecretName`;
  let secretSuffix: string;
  let client: SecretClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (this: Context) {
    const authentication = await authenticate(this, getServiceVersion());
    secretSuffix = authentication.secretSuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("Authentication should work for parallel requests", async function (this: Context) {
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const secretNames = [`${secretName}-0`, `${secretName}-1`];

    const sandbox = createSandbox();
    const spy = sandbox.spy(AuthenticationChallengeCache.prototype, "setCachedChallenge");
    const spyEqualTo = sandbox.spy(AuthenticationChallenge.prototype, "equalTo");

    const promises = secretNames.map((name) => {
      const promise = client.setSecret(name, "value");
      return { promise, name };
    });

    for (const promise of promises) {
      await promise.promise;
      await testClient.flushSecret(promise.name);
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

  it("Once authenticated, new requests should not authenticate again", async function (this: Context) {
    // Our goal is to intercept how our pipelines are storing the challenge.
    // The first network call should indeed set the challenge in memory.
    // Subsequent network calls should not set new challenges.

    const sandbox = createSandbox();
    const spy = sandbox.spy(AuthenticationChallengeCache.prototype, "setCachedChallenge");

    // Now we run what would be a normal use of the client.
    // Here we will create two secrets, then flush them.
    // testClient.flushSecret deletes, then purges the secrets.
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const secretNames = [`${secretName}-0`, `${secretName}-1`];
    for (const name of secretNames) {
      await client.setSecret(name, "value");
    }

    // The challenge should have been written to the cache exactly ONCE.
    assert.equal(spy.getCalls().length, 1);

    // Back to normal.
    sandbox.restore();

    // Note: Failing to authenticate will make network requests throw.
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
        },
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

  describe("parseWWWAuthenticate tests", () => {
    it("Should work for known shapes of the WWW-Authenticate header", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net/", resource="https://some.url"`;
      const parsed1 = parseWWWAuthenticate(wwwAuthenticate1);
      assert.deepEqual(parsed1, {
        authorization: "https://login.windows.net/",
        resource: "https://some.url",
      });

      const wwwAuthenticate2 = `Bearer authorization="https://login.windows.net", scope="https://some.url"`;
      const parsed2 = parseWWWAuthenticate(wwwAuthenticate2);
      assert.deepEqual(parsed2, {
        authorization: "https://login.windows.net",
        scope: "https://some.url",
      });
    });

    it("should include the tenantId when present", () => {
      const wwwAuthenticate1 = `Bearer authorization="https://login.windows.net/9999", resource="https://some.url"`;
      const parsed1 = parseWWWAuthenticate(wwwAuthenticate1);
      assert.deepEqual(parsed1, {
        authorization: "https://login.windows.net/9999",
        resource: "https://some.url",
        tenantId: "9999",
      });
    });
  });
});
