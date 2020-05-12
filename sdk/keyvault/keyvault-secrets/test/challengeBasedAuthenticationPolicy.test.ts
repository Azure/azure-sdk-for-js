// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { SecretClient } from "../src";
import { env, Recorder } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import {
  AuthenticationChallengeCache,
  AuthenticationChallenge
} from "../../keyvault-common/src";

// Following the philosophy of not testing the insides if we can test the outsides...
// I present you with this "Get Out of Jail Free" card (in reference to Monopoly).
// Once we move to a common folder, and after some refactoring,
// we will be able to unit test the insides in detail.

describe("Challenge based authentication tests", () => {
  const secretPrefix = `challengeAuth${env.KEY_NAME || "SecretName"}`;
  let secretSuffix: string;
  let client: SecretClient;
  let testClient: TestClient;
  let recorder: Recorder;
  let originalSetCachedChallenge: any;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    secretSuffix = authentication.secretSuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;

    // Since the Challenge based authentication is protected from writing normally,
    // and is involved in considerable core-http machinery,
    // the easiest way to test it is to hack into the `AuthenticationChallengeCache` class.
    // We will restore it on the `afterEach`.
    originalSetCachedChallenge = AuthenticationChallengeCache.prototype.setCachedChallenge;
  });

  afterEach(async function() {
    recorder.stop();

    // Restoring `AuthenticationChallengeCache` back to normal.
    AuthenticationChallengeCache.prototype.setCachedChallenge = originalSetCachedChallenge;
  });

  // The tests follow

  it("Once authenticated, new requests should not authenticate again", async function() {
    // Our goal is to intercept how our pipelines are storing the challenge.
    // The first network call should indeed set the challenge in memory.
    // Subsequent network calls should not set new challenges.

    const challenges: AuthenticationChallenge[] = [];

    AuthenticationChallengeCache.prototype.setCachedChallenge = function(
      challenge: AuthenticationChallenge
    ): void {
      challenges.push(challenge);
      originalSetCachedChallenge.call(this, challenge);
    };

    // Now we run what would be a normal use of the client.
    // Here we will create two secrets, then flush them.
    // testClient.flushSecret deletes, then purges the secrets.
    const secretName = testClient.formatName(
      `${secretPrefix}-${this!.test!.title}-${secretSuffix}`
    );
    const secretNames = [`${secretName}0`, `${secretName}1`];
    for (const name of secretNames) {
      await client.setSecret(name, "RSA");
    }
    for (const name of secretNames) {
      await testClient.flushSecret(name);
    }

    // We should have recorded a total of ONE challenge.
    // Failing to authenticate will make network requests throw.
    assert.equal(challenges.length, 1);
  });
});
