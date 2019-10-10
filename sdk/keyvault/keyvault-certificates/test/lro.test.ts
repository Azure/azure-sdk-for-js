// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificatesClient } from "../src";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerCancelledError } from "@azure/core-lro";

describe("Certificates client - Long Running Operations", () => {
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

    const result = await poller.done();
    assert.equal(result!.status, "completed"); 
    assert.equal(poller.getState().result!.status, "completed"); 
    assert.ok(poller.getState().completed);

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
});
