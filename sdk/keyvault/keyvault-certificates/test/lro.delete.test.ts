// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificatesClient } from "../src";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { PollerCancelledError, PollerStoppedError } from "@azure/core-lro";

describe("Certificates client - Long Running Operations - delete", () => {
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

  it("can delete a certificate and wait until it's deleted", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const createPoller = await client.beginCreateCertificate(certificateName, basicCertificatePolicy);
    await createPoller.done();

    const deletePoller = await client.beginDeleteCertificate(certificateName);

    await deletePoller.nextPoll();
    assert.ok(deletePoller.getState().started);
    console.log(deletePoller.getProperties()); // TODO: how does the certificate look when it's being deleted?

    const deletedCertificate = await deletePoller.done();
    assert.equal(deletedCertificate.properties.name, certificateName); 
    assert.ok(deletedPoller.getState().completed);

    // The final certificate can also be obtained this way:
    assert.equal(deletedPoller.getState().result!.properties.name, certificateName); 

    await testClient.purgeCertificate(certificateName);
  });

  it("can resume from a stopped poller", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const createPoller = await client.beginCreateCertificate(certificateName, basicCertificatePolicy);
    await createPoller.done();
 
    const deletePoller = await client.beginDeleteCertificate(certificateName);
    deletePoller.done().catch((e) => {
      assert.ok(e instanceof PollerStoppedError);
      assert.equal(e.name, "PollerStoppedError");
      assert.equal(e.message, "This poller is already stopped");
    });

    deletePoller.stop();
    assert.ok(deletePoller.isStopped());
    assert.ok(!deletePoller.getState().completed);

    const serialized = deletePoller.toString();

    const resumePoller = await client.beginCreateCertificate(certificateName, basicCertificatePolicy, {
      resumeFrom: serialized,
    });

    const deletedCertificate = await resumePoller.done();
    assert.equal(deletedCertificate.properties.name, certificateName); 
    assert.ok(resumePoller.getState().completed);
 
    await testClient.purgeCertificate(certificateName);
  });
});
