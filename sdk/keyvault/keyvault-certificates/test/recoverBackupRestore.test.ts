// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificateClient } from "../src";
import { retry } from "./utils/recorder";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";

describe("Certificates client - restore certificates and recover backups", () => {
  const prefix = `recover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: any;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subjectName: "cn=MyCert"
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
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.createCertificate(certificateName, basicCertificatePolicy);
    await client.deleteCertificate(certificateName);
    const getDeletedResult = await retry(async () => client.getDeletedCertificate(certificateName));
    assert.equal(
      getDeletedResult.properties.name,
      certificateName,
      "Unexpected certificate name in result from getCertificate()."
    );
    await client.recoverDeletedCertificate(certificateName);
    const getResult = await retry(async () => client.getCertificate(certificateName));
    assert.equal(
      getResult.properties.name,
      certificateName,
      "Unexpected certificate name in result from getCertificate()."
    );
    await testClient.flushCertificate(certificateName);
  });

  it("can recover a deleted certificate (non existing)", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
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
  it("can restore a certificate", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.createCertificate(certificateName, basicCertificatePolicy);
    const backup = await client.backupCertificate(certificateName);
    await testClient.flushCertificate(certificateName);
    await retry(async () => client.restoreCertificateBackup(backup.value!));
    const getResult = await client.getCertificate(certificateName);
    assert.equal(
      getResult.properties.name,
      certificateName,
      "Unexpected certificate name in result from getCertificate()."
    );
    await testClient.flushCertificate(certificateName);
  });

  it("can restore a certificate (Malformed Backup Bytes)", async function() {
    const backup = new Uint8Array(4728);
    let error;
    try {
      await client.restoreCertificateBackup(backup);
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
