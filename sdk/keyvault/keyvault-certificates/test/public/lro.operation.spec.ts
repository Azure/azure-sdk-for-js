// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { env, Recorder } from "@azure/test-utils-recorder";

import {
  CertificateClient,
  CertificateOperation,
  DefaultCertificatePolicy,
  KeyVaultCertificateWithPolicy
} from "../../src";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Certificates client - LRO - certificate operation", () => {
  const certificatePrefix = `lroOperation${env.CERTIFICATE_NAME || "CertificateName"}`;
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

  it("can wait until a certificate is created by getting the poller from getCertificateOperation", async function() {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`
    );
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties
    );
    createPoller.stopPolling();
    const poller = await client.getCertificateOperation(certificateName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    // The pending certificate operation can be obtained this way:
    assert.equal(poller.getOperationState().certificateOperation!.status, "inProgress");

    const completeCertificate: KeyVaultCertificateWithPolicy = await poller.pollUntilDone();
    assert.equal(completeCertificate.name, certificateName);

    const operation: CertificateOperation = poller.getOperationState().certificateOperation!;
    assert.equal(operation.status, "completed");
    assert.ok(poller.getOperationState().isCompleted);

    // The final certificate operation can also be obtained this way:
    assert.equal(poller.getOperationState().certificateOperation!.status, "completed");

    await testClient.flushCertificate(certificateName);
  });

  it("can resume from a stopped poller", async function() {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`
    );
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties
    );

    createPoller.stopPolling();

    const poller = await client.getCertificateOperation(certificateName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    const serialized = poller.toString();

    const resumePoller = await client.getCertificateOperation(certificateName, {
      resumeFrom: serialized,
      ...testPollerProperties
    });
    assert.ok(resumePoller.getOperationState().isStarted);

    const completeCertificate: KeyVaultCertificateWithPolicy = await resumePoller.pollUntilDone();
    assert.equal(completeCertificate.name, certificateName);

    const operation: CertificateOperation = resumePoller.getOperationState().certificateOperation!;
    assert.equal(operation.status, "completed");
    assert.ok(resumePoller.getOperationState().isCompleted);

    await testClient.flushCertificate(certificateName);
  });
});
