// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import Sinon, { createSandbox } from "sinon";
import { env, Recorder } from "@azure/test-utils-recorder";

import {
  AuthenticationChallengeCache,
  AuthenticationChallenge,
  parseWWWAuthenticate,
  challengeBasedAuthenticationPolicy
} from "../../../keyvault-common/src";
import { KeyVaultAccessControlClient } from "../../src";
import { authenticate } from "../utils/authentication";
import { WebResource } from "@azure/core-http";
import { ClientSecretCredential } from "@azure/identity";

describe("Challenge based authentication tests", function() {
  let client: KeyVaultAccessControlClient;
  let recorder: Recorder;
  let sandbox: Sinon.SinonSandbox;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    client = authentication.accessControlClient;
    recorder = authentication.recorder;
    sandbox = createSandbox();
  });

  afterEach(async function() {
    sandbox.restore();
    await recorder.stop();
  });

  it("Authentication should be idempotent", async function() {
    const spy = sandbox.spy(AuthenticationChallengeCache.prototype, "setCachedChallenge");
    const spyEqualTo = sandbox.spy(AuthenticationChallenge.prototype, "equalTo");

    const promises = [
      client.listRoleAssignments("/").next(),
      client.listRoleAssignments("/").next()
    ];
    await Promise.all(promises);

    // Even though we had multiple requests, only one authentication should have happened.

    // This is determined by the comparison between the cached challenge and the new receive challenge.
    // So, AuthenticationChallenge's equalTo should have returned true at least once.
    assert.ok(spyEqualTo.returned(true));

    // The challenge should have been written to the cache exactly ONCE.
    assert.equal(spy.getCalls().length, 1);
  });

  it("Once authenticated, new requests should not authenticate again", async function() {
    const spy = sandbox.spy(AuthenticationChallengeCache.prototype, "setCachedChallenge");

    await client.listRoleAssignments("/").next();
    await client.listRoleAssignments("/").next();

    assert.equal(spy.getCalls().length, 1);
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
