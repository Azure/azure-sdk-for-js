// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { env, Recorder } from "@azure/test-utils-recorder";
import { PollerStoppedError } from "@azure/core-lro";

import { CertificateClient, DeletedCertificate, DefaultCertificatePolicy } from "../../src";
import { assertThrowsAbortError } from "../utils/utils.common";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Certificates client - LRO - recoverDelete", () => {
  const certificatePrefix = `lroRecover${env.CERTIFICATE_NAME || "CertificateName"}`;
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

  it("can wait until a certificate is recovered", async function() {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`
    );
    await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties
    );

    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedCertificate(
      certificateName,
      testPollerProperties
    );
    assert.ok(poller.getOperationState().isStarted);

    // The pending certificate can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, certificateName);

    const deletedCertificate: DeletedCertificate = await poller.pollUntilDone();
    assert.equal(deletedCertificate.name, certificateName);
    assert.ok(poller.getOperationState().isCompleted);

    // The final certificate can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, certificateName);

    await testClient.flushCertificate(certificateName);
  });

  it("can resume from a stopped poller", async function() {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`
    );
    await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties
    );
    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const poller = await client.beginRecoverDeletedCertificate(
      certificateName,
      testPollerProperties
    );
    assert.ok(poller.getOperationState().isStarted);

    poller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await poller.poll(); // Making sure it has some data

    poller.stopPolling();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getOperationState().isCompleted);

    const serialized = poller.toString();

    const resumePoller = await client.beginRecoverDeletedCertificate(certificateName, {
      resumeFrom: serialized,
      ...testPollerProperties
    });

    assert.ok(poller.getOperationState().isStarted);
    const deletedCertificate: DeletedCertificate = await resumePoller.pollUntilDone();
    assert.equal(deletedCertificate.name, certificateName);
    assert.ok(resumePoller.getOperationState().isCompleted);

    await testClient.flushCertificate(certificateName);
  });

  // On playback mode, the tests happen too fast for the timeout to work
  it("can recover a deleted certificate with requestOptions timeout", async function() {
    recorder.skip(undefined, "Timeout tests don't work on playback mode.");
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`
    );
    await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties
    );
    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    await deletePoller.pollUntilDone();
    await assertThrowsAbortError(async () => {
      await client.beginRecoverDeletedCertificate(certificateName, {
        requestOptions: { timeout: 1 },
        ...testPollerProperties
      });
    });
  });
});
