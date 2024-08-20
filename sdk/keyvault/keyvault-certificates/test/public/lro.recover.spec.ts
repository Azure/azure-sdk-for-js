// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { env, Recorder } from "@azure-tools/test-recorder";
import { PollerStoppedError } from "@azure/core-lro";

import { CertificateClient, DeletedCertificate, DefaultCertificatePolicy } from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import { getServiceVersion } from "./utils/common.js";
import TestClient from "./utils/testClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("Certificates client - LRO - recoverDelete", () => {
  const certificatePrefix = `lroRecover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let certificateSuffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(this, getServiceVersion());
    certificateSuffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can wait until a certificate is recovered", async function (ctx) {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`,
    );
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties,
    );
    await createPoller.pollUntilDone();

    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const recoverPoller = await client.beginRecoverDeletedCertificate(
      certificateName,
      testPollerProperties,
    );
    assert.ok(recoverPoller.getOperationState().isStarted);

    // The pending certificate can be obtained this way:
    assert.equal(recoverPoller.getOperationState().result!.name, certificateName);

    const deletedCertificate: DeletedCertificate = await recoverPoller.pollUntilDone();
    assert.equal(deletedCertificate.name, certificateName);
    assert.ok(recoverPoller.getOperationState().isCompleted);

    // The final certificate can also be obtained this way:
    assert.equal(recoverPoller.getOperationState().result!.name, certificateName);

    await testClient.flushCertificate(certificateName);
  });

  it("can resume from a stopped poller", async function (ctx) {
    this.retries(5);
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`,
    );
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties,
    );
    await createPoller.pollUntilDone();
    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const recoverPoller = await client.beginRecoverDeletedCertificate(
      certificateName,
      testPollerProperties,
    );
    assert.ok(recoverPoller.getOperationState().isStarted);

    recoverPoller.pollUntilDone().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    await recoverPoller.poll(); // Making sure it has some data

    recoverPoller.stopPolling();
    assert.ok(recoverPoller.isStopped());
    assert.ok(!recoverPoller.getOperationState().isCompleted);

    const serialized = recoverPoller.toString();

    const resumePoller = await client.beginRecoverDeletedCertificate(certificateName, {
      resumeFrom: serialized,
      ...testPollerProperties,
    });

    assert.ok(recoverPoller.getOperationState().isStarted);
    const deletedCertificate: DeletedCertificate = await resumePoller.pollUntilDone();
    assert.equal(deletedCertificate.name, certificateName);
    assert.ok(resumePoller.getOperationState().isCompleted);

    await testClient.flushCertificate(certificateName);
  });
});
