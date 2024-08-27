// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { env, isPlaybackMode, Recorder, isRecordMode } from "@azure-tools/test-recorder";

import { CertificateClient } from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import TestClient from "./utils/testClient.js";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("Certificates client - restore certificates and recover backups", () => {
  const prefix = `backupRestore${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;

  const basicCertificatePolicy = {
    issuerName: "Self",
    subject: "cn=MyCert",
  };

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can recover a deleted certificate", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      basicCertificatePolicy,
      testPollerProperties,
    );
    await createPoller.pollUntilDone();
    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    const getDeletedResult = await deletePoller.pollUntilDone();
    expect(getDeletedResult.properties.name).toEqual(certificateName);
    const recoverPoller = await client.beginRecoverDeletedCertificate(
      certificateName,
      testPollerProperties,
    );
    const getResult = await recoverPoller.pollUntilDone();
    expect(getResult.properties.name).toEqual(certificateName);
  });

  it("can recover a deleted certificate (non existing)", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    let error;
    try {
      await client.beginRecoverDeletedCertificate(certificateName, testPollerProperties);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    expect(error.code).toEqual("CertificateNotFound");
    expect(error.statusCode).toEqual(404);
  });

  if (isRecordMode() || isPlaybackMode()) {
    // This test can't run live,
    // since the purge operation currently can't be expected to finish anytime soon.
    it("can restore a certificate", async function (ctx) {
      const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
      const createPoller = await client.beginCreateCertificate(
        certificateName,
        basicCertificatePolicy,
        testPollerProperties,
      );
      await createPoller.pollUntilDone();
      const backup = await client.backupCertificate(certificateName);
      const deletePoller = await client.beginDeleteCertificate(
        certificateName,
        testPollerProperties,
      );
      await deletePoller.pollUntilDone();
      await client.purgeDeletedCertificate(certificateName);

      // One would normally do this, but this can't immediately happen after the resource is purged:
      // await client.restoreCertificateBackup(backup as Uint8Array);

      // This test implementation of a restore poller only applies for backups that have been recently deleted.
      // Backups might not be ready to be restored in an unknown amount of time.
      // If this is useful to you, please open an issue at: https://github.com/Azure/azure-sdk-for-js/issues
      const restorePoller = await testClient.beginRestoreCertificateBackup(
        backup as Uint8Array,
        testPollerProperties,
      );
      const restoredCertificate = await restorePoller.pollUntilDone();

      expect(restoredCertificate.name).toEqual(certificateName);
    });
  }

  it("can restore a certificate (Malformed Backup Bytes)", async function () {
    const backup = new Uint8Array(4728);
    let error;
    try {
      await client.restoreCertificateBackup(backup);
      throw Error("Expecting an error but not catching one.");
    } catch (e: any) {
      error = e;
    }
    expect(error.message).toEqual("Backup blob contains invalid or corrupt version.");
  });
});
