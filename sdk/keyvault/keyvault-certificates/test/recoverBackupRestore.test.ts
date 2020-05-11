// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import * as assert from "assert";
import { CertificateClient } from "../src";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { testPollerProperties, retry, isPlayingBack } from "./utils/recorderUtils";
import { assertThrowsAbortError } from './utils/utils.common';
import { isNode } from '@azure/core-http';

describe("Certificates client - restore certificates and recover backups", () => {
  const prefix = `recover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: any;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subject: "cn=MyCert"
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
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    const getDeletedResult = await deletePoller.pollUntilDone();
    assert.equal(
      getDeletedResult.properties.name,
      certificateName,
      "Unexpected certificate name in result from getCertificate()."
    );
    const recoverPoller = await client.beginRecoverDeletedCertificate(
      certificateName,
      testPollerProperties
    );
    const getResult = await recoverPoller.pollUntilDone();
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
      await client.beginRecoverDeletedCertificate(certificateName, testPollerProperties);
      throw Error("Expecting an error but not catching one.");
    } catch (e) {
      error = e;
    }
    assert.equal(error.code, "CertificateNotFound");
    assert.equal(error.statusCode, 404);
  });

  // This is taking forever
  it("can restore a certificate", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    const backup = await client.backupCertificate(certificateName);
    await testClient.flushCertificate(certificateName);
    await retry(async () => client.restoreCertificateBackup(backup!));
    const getResult = await client.getCertificate(certificateName);
    assert.equal(
      getResult.properties.name,
      certificateName,
      "Unexpected certificate name in result from getCertificate()."
    );
    await testClient.flushCertificate(certificateName);
  });

  if (isNode && !isPlayingBack) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can generate a backup of a certificate with requestOptions timeout", async function() {
      await assertThrowsAbortError(async () => {
        await client.backupCertificate("doesn't matter", { requestOptions: { timeout: 1 } });
      });
    });
  }

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

  if (isNode && !isPlayingBack) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can restore a key with requestOptions timeout", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      const backup = await client.backupCertificate(certificateName);
      await testClient.flushCertificate(certificateName);

      await assertThrowsAbortError(async () => {
        await client.restoreCertificateBackup(backup!, { requestOptions: { timeout: 1 } });
      });
    });
  }
});
