// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificatesClient } from "../src";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerCancelledError, PollerStoppedError } from "@azure/core-lro";

describe("Certificates client - Long Running Operations - create", () => {
  const prefix = `recover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificatesClient;
  let testClient: TestClient;
  let recorder: any;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subjectName: "cn=MyCert",
  };

  beforeEach(async function() {
    const authentication = await authenticate(this);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can create a certificate and wait until it's signed", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const poller = await client.beginCreateCertificate(certificateName, basicCertificatePolicy);

    await poller.nextPoll();
    assert.ok(poller.getState().started);
    assert.equal(poller.getProperties().initialResponse!.status, "inProgress"); 
    assert.equal(poller.getProperties().previousResponse!.status, "inProgress"); 

    // Getting the pending certificate instantly
    assert.equal(poller.getProperties().pendingCertificate!.properties.name, certificateName); 

    const certificate = await poller.done();
    assert.equal(certificate.properties.name, certificateName); 
    assert.ok(poller.getState().completed);

    // The pending certificate exists no more
    assert.equal(poller.getProperties().pendingCertificate, undefined); 

    // The final certificate can also be obtained this way:
    assert.equal(poller.getState().result!.properties.name, certificateName); 

    await testClient.flushCertificate(certificateName);
  });

  it("can cancel a certificate's creation", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const poller = await client.beginCreateCertificate(certificateName, basicCertificatePolicy);
    poller.done().catch(e => {
      assert.ok(e instanceof PollerCancelledError);
      assert.equal(e.name, "PollerCancelledError");
      assert.equal(e.message, "Poller cancelled");
    });

    await poller.nextPoll();
    assert.ok(poller.getState().started);
    assert.equal(poller.getProperties().initialResponse!.status, "inProgress"); 
    assert.equal(poller.getProperties().previousResponse!.status, "inProgress"); 

    await poller.cancelOperation();
    assert.ok(poller.getState().cancelled);
    assert.ok(poller.isStopped());

    const getResponse = await client.getCertificateOperation(certificateName);
    assert.equal(getResponse.cancellationRequested, true); 

    await testClient.flushCertificate(certificateName);
  });

  it("can resume from a stopped poller", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const poller = await client.beginCreateCertificate(certificateName, basicCertificatePolicy);
    poller.done().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    poller.stop();
    assert.ok(poller.isStopped());
    assert.ok(!poller.getState().completed);

    const serialized = poller.toString();

    const resumePoller = await client.beginCreateCertificate(certificateName, basicCertificatePolicy, {
      resumeFrom: serialized,
    });

    const certificate = await resumePoller.done();
    assert.equal(certificate.properties.name, certificateName); 
    assert.ok(resumePoller.getState().completed);
 
    await testClient.flushCertificate(certificateName);
  });
});
