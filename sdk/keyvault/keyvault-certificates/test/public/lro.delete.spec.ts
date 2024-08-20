// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { PollerStoppedError } from "@azure/core-lro";
import { env, Recorder } from "@azure-tools/test-recorder";

import { CertificateClient, DeletedCertificate, DefaultCertificatePolicy } from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import { getServiceVersion } from "./utils/common.js";
import TestClient from "./utils/testClient.js";
import { describe, it, assert, expect, vi, beforeEach, afterEach } from "vitest";

describe("Certificates client - lro - delete", () => {
  const certificatePrefix = `lroDelete${env.CERTIFICATE_NAME || "CertificateName"}`;
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

  it("can wait until a certificate is deleted", async function (ctx) {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`,
    );
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties,
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
      ...testPollerProperties,
    });

    assert.ok(resumePoller.getOperationState().isStarted);

    let deletedCertificate: DeletedCertificate = await resumePoller.pollUntilDone();
    assert.equal(deletedCertificate.name, certificateName);

    // Retrieving it without the poller
    deletedCertificate = await client.getDeletedCertificate(certificateName);
    assert.equal(deletedCertificate.name, certificateName);
  });
});
