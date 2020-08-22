// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as assert from "assert";
import { env, isPlaybackMode, Recorder, isRecordMode } from "@azure/test-utils-recorder";
import { isNode } from "@azure/core-http";

import { CertificateClient } from "../../src";
import { testPollerProperties } from "../utils/recorderUtils";
import { assertThrowsAbortError } from "../utils/utils.common";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Certificates client - restore certificates and recover backups", () => {
  const prefix = `backupRestore${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;

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
    await recorder.stop();
  });

  // The tests follow

  it("can recover a deleted certificate", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties
    );
    await createPoller.pollUntilDone();
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

  if (isRecordMode() || isPlaybackMode()) {
    // This test can't run live,
    // since the purge operation currently can't be expected to finish anytime soon.
    it("can restore a certificate", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      const createPoller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      await createPoller.pollUntilDone();
      const backup = await client.backupCertificate(certificateName);
      const deletePoller = await client.beginDeleteCertificate(
        certificateName,
        testPollerProperties
      );
      await deletePoller.pollUntilDone();
      await client.purgeDeletedCertificate(certificateName);

      // One would normally do this, but this can't immediately happen after the resource is purged:
      // await client.restoreCertificateBackup(backup as Uint8Array);

      // This test implementation of a restore poller only applies for backups that have been recently deleted.
      // Backups might not be ready to be restored in an unknown amount of time.
      // If this is useful to you, please open an issue at: https://github.com/Azure/azure-sdk-for-js/issues
      const restorePoller = await testClient.beginRestoreCertificateBackup(backup as Uint8Array);
      const restoredCertificate = await restorePoller.pollUntilDone();

      assert.equal(restoredCertificate.name, certificateName);
      await testClient.flushCertificate(certificateName);
    });
  }

  if (isNode && !isPlaybackMode()) {
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

  if (isNode && !isPlaybackMode()) {
    // On playback mode, the tests happen too fast for the timeout to work
    it("can restore a key with requestOptions timeout", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      const createPoller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties
      );
      await createPoller.pollUntilDone();
      const backup = await client.backupCertificate(certificateName);
      await testClient.flushCertificate(certificateName);

      await assertThrowsAbortError(async () => {
        await client.restoreCertificateBackup(backup!, { requestOptions: { timeout: 1 } });
      });
    });
  }
});
