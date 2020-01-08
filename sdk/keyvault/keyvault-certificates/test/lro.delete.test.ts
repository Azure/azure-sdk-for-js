// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificateClient, DeletedCertificate, DefaultCertificatePolicy } from "../src";
import { testPollerProperties } from "./utils/recorderUtils";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerStoppedError } from "@azure/core-lro";

describe("Certificates client - lro - delete", () => {
  const certificatePrefix = `recover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let certificateSuffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: any;
  
  beforeEach(async function() {
    const authentication = await authenticate(this);
    certificateSuffix = authentication.certificateSuffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can wait until a certificate is deleted", async function() {
    const certificateName = testClient.formatName(`${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`);
    await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties
    );
    const poller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    // The pending deleted certificate can be obtained this way:
    assert.equal(poller.getOperationState().result!.name, certificateName);

    const deletedCertificate: DeletedCertificate = await poller.pollUntilDone();
    assert.equal(deletedCertificate.name, certificateName);
    assert.ok(poller.getOperationState().isCompleted);

    // The final deleted certificate can also be obtained this way:
    assert.equal(poller.getOperationState().result!.name, certificateName);

    await testClient.purgeCertificate(certificateName);
  });

  it("can resume from a stopped poller", async function() {
    const certificateName = testClient.formatName(`${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`);
    await client.beginCreateCertificate(
        certificateName,
        DefaultCertificatePolicy,
        testPollerProperties
      );
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
    const deletedCertificate: DeletedCertificate = await resumePoller.pollUntilDone();
    assert.equal(deletedCertificate.name, certificateName);
    assert.ok(resumePoller.getOperationState().isCompleted);

    await testClient.purgeCertificate(certificateName);
  });
});
