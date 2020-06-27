// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { PollerStoppedError } from "@azure/core-lro";
import { env, Recorder } from "@azure/test-utils-recorder";

import { CertificateClient, KeyVaultCertificate, DefaultCertificatePolicy } from "../../src";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Certificates client - LRO - create", () => {
  const certificatePrefix = `lroCreate${env.CERTIFICATE_NAME || "CertificateName"}`;
  let certificateSuffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    certificateSuffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can wait until a certificate is created", async function() {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`
    );
    const poller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties
    );
    assert.ok(poller.getOperationState().isStarted);

    // The pending certificate can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, certificateName);

    const createdCertificate: KeyVaultCertificate = await poller.pollUntilDone();
    assert.equal(createdCertificate.name, certificateName);
    assert.ok(poller.getOperationState().isCompleted);

    // The final certificate can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, certificateName);

    await testClient.flushCertificate(certificateName);
  });

  it("can resume from a stopped poller", async function() {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`
    );
    const poller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties
    );
    assert.ok(poller.getOperationState().isStarted);

    poller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    poller.stopPolling();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().isCompleted);

    const serialized = poller.toString();

    const resumePoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      {
        resumeFrom: serialized,
        ...testPollerProperties
      }
    );

    assert.ok(resumePoller.getOperationState().isStarted);
    const createdCertificate: KeyVaultCertificate = await resumePoller.pollUntilDone();
    assert.equal(createdCertificate.name, certificateName);
    assert.ok(resumePoller.getOperationState().isCompleted);

    await testClient.flushCertificate(certificateName);
  });
});
