// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificateClient, CertificateOperation, CertificatePolicy } from "../src";
import { testPollerProperties } from "./utils/recorderUtils";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerStoppedError } from "@azure/core-lro";

describe("Certificates client - Long Running Operations - certificate operation", () => {
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

  it("can wait until a certificate is created by getting the poller from getCertificateOperation", async function() {
    const certificateName = testClient.formatName(`${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`);
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      CertificatePolicy.Default,
      testPollerProperties
    );
    createPoller.stopPolling();
    const poller = await client.getCertificateOperation(certificateName, testPollerProperties);
    assert.ok(poller.getOperationState().isStarted);

    // The pending certificate operation can be obtained this way:
    assert.equal(poller.getOperationState().result!.status, "inProgress");

    const operation: CertificateOperation = await poller.pollUntilDone();
    assert.equal(operation.status, "completed");
    assert.ok(poller.getOperationState().isCompleted);

    // The final certificate operation can also be obtained this way:
    assert.equal(poller.getOperationState().result!.status, "completed");

    await testClient.flushCertificate(certificateName);
  });

  it("can resume from a stopped poller", async function() {
    const certificateName = testClient.formatName(`${certificatePrefix}-${this!.test!.title}-${certificateSuffix}`);
    const createPoller = await client.beginCreateCertificate(
        certificateName,
        CertificatePolicy.Default,
        testPollerProperties
      );
      createPoller.stopPolling();
    const poller = await client.getCertificateOperation(certificateName, testPollerProperties);
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

    const resumePoller = await client.getCertificateOperation(certificateName, {
      resumeFrom: serialized,
      ...testPollerProperties
    });

    assert.ok(resumePoller.getOperationState().isStarted);
    const operation: CertificateOperation = await resumePoller.pollUntilDone();
    assert.equal(operation.status, "completed");
    assert.ok(resumePoller.getOperationState().isCompleted);

    await testClient.flushCertificate(certificateName);
  });
});
