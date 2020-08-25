// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { PollerStoppedError } from "@azure/core-lro";
import { env, Recorder } from "@azure/test-utils-recorder";

import { CertificateClient, DeletedCertificate, DefaultCertificatePolicy } from "../../src";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Certificates client - lro - delete", () => {
  const certificatePrefix = `lroDelete${env.CERTIFICATE_NAME || "CertificateName"}`;
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
    await recorder.stop();
  });

  // The tests follow

  it("can wait until a certificate is deleted", async function() {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`
    );
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties
    );
    await createPoller.pollUntilDone();
    const poller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    // The pending deleted certificate can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, certificateName);

    let deletedCertificate: DeletedCertificate = await poller.pollUntilDone();
    assert.equal(deletedCertificate.name, certificateName);
    assert.ok(poller.getOperationState().isCompleted);

    // Retrieving it without the poller
    deletedCertificate = await client.getDeletedCertificate(certificateName);
    assert.equal(deletedCertificate.name, certificateName);

    // The final deleted certificate can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, certificateName);

    await testClient.purgeCertificate(certificateName);
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
    await createPoller.pollUntilDone();
    const poller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
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

    const resumePoller = await client.beginDeleteCertificate(certificateName, {
      resumeFrom: serialized,
      ...testPollerProperties
    });

    assert.ok(resumePoller.getOperationState().isStarted);

    let deletedCertificate: DeletedCertificate = await resumePoller.pollUntilDone();
    assert.equal(deletedCertificate.name, certificateName);

    // Retrieving it without the poller
    deletedCertificate = await client.getDeletedCertificate(certificateName);
    assert.equal(deletedCertificate.name, certificateName);

    await testClient.purgeCertificate(certificateName);
  });
});
