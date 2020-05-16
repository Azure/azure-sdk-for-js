// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { CertificateClient } from "../src";
import { env, Recorder } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import {
  AuthenticationChallengeCache,
  AuthenticationChallenge
} from "../src/core/challengeBasedAuthenticationPolicy";
import { testPollerProperties } from "./utils/recorderUtils";

describe("Challenge based authentication tests", () => {
  const certificatePrefix = `challengeAuth${env.KEY_NAME || "CertificateName"}`;
  let certificateSuffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;
  let originalSetCachedChallenge: any;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    certificateSuffix = authentication.certificateSuffix;
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
    // Here we will create a certificates, then we flush it.
    // testClient.flushCertificate deletes, then purges the certificates.
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`
    );
    await client.beginCreateCertificate(
      certificateName,
      {
        issuerName: "Self",
        subject: "cn=MyCert"
      },
      testPollerProperties
    );
    await testClient.flushCertificate(certificateName);

    // We should have recorded a total of ONE challenge.
    // Failing to authenticate will make network requests throw.
    assert.equal(challenges.length, 1);
  });
});
