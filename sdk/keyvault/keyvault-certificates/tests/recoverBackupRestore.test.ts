// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificatesClient } from "../src";
import { env, retry } from "./utils/recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";

describe("Certificates client - restore certificates and recover backups", () => {
  const prefix = `recover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificatesClient;
  let testClient: TestClient;
  let recorder: any;

  const basicCertificatePolicy = {
    issuerParameters: { name: "Self" },
    x509CertificateProperties: { subject: "cn=MyCert" }
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

  it("can recover a deleted certificate", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    await client.createCertificate(certificateName, basicCertificatePolicy);
    await client.deleteCertificate(certificateName);
    const getDeletedResult = await retry(async () => client.getDeletedCertificate(certificateName));
    assert.equal(
      getDeletedResult.name,
      certificateName,
      "Unexpected certificate name in result from getCertificateWithPolicy()."
    );
    await client.recoverDeletedCertificate(certificateName);
    const getResult = await retry(async () => client.getCertificateWithPolicy(certificateName));
    assert.equal(getResult.name, certificateName, "Unexpected certificate name in result from getCertificateWithPolicy().");
    await testClient.flushCertificate(certificateName);
  });

  it("can recover a deleted certificate (non existing)", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    let error;
    try {
      await client.recoverDeletedCertificate(certificateName);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.message, `Certificate not found: ${certificateName}`);
  });

  // This is taking forever
  it.skip("can restore a certificate", async function() {
    const certificateName = testClient.formatName(
      `${prefix}-${this!.test!.title}-${suffix}`
    );
    await client.createCertificate(certificateName, basicCertificatePolicy);
    const backup = await client.backupCertificate(certificateName);
    await testClient.flushCertificate(certificateName);
    await retry(async () => client.restoreCertificate(backup as Uint8Array));
    const getResult = await client.getCertificateWithPolicy(certificateName);
    assert.equal(getResult.name, certificateName, "Unexpected certificate name in result from getCertificateWithPolicy().");
    await testClient.flushCertificate(certificateName);
  });

  it("can restore a certificate (Malformed Backup Bytes)", async function() {
    const backup = new Uint8Array(4728);
    let error;
    try {
      await client.restoreCertificate(backup);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(
      error.message,
      "Backup blob contains invalid or corrupt version.",
      "Unexpected error from restoreCertificate()"
    );
  });
});
