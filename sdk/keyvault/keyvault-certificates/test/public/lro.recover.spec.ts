// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.
import { env, Recorder } from "@azure-tools/test-recorder";
import { PollerStoppedError } from "@azure/core-lro";

import {
  CertificateClient,
  DeletedCertificate,
  DefaultCertificatePolicy,
} from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import TestClient from "./utils/testClient.js";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("Certificates client - LRO - recoverDelete", () => {
  const certificatePrefix = `lroRecover${env.CERTIFICATE_NAME || "CertificateName"}`;
  let certificateSuffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    certificateSuffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can wait until a certificate is recovered", async function (ctx) {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${ctx.task.name}-${certificateSuffix}`,
    );
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties,
    );
    await createPoller.pollUntilDone();

    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const recoverPoller = await client.beginRecoverDeletedCertificate(
      certificateName,
      testPollerProperties,
    );
    expect(recoverPoller.getOperationState().isStarted).toBeTruthy();

    // The pending certificate can be obtained this way:
    expect(recoverPoller.getOperationState().result!.name).toEqual(certificateName);

    const deletedCertificate: DeletedCertificate = await recoverPoller.pollUntilDone();
    expect(deletedCertificate.name).toEqual(certificateName);
    expect(recoverPoller.getOperationState().isCompleted).toBeTruthy();

    // The final certificate can also be obtained this way:
    expect(recoverPoller.getOperationState().result!.name).toEqual(certificateName);

    await testClient.flushCertificate(certificateName);
  });

  it("can resume from a stopped poller", { retry: 5 }, async function (ctx) {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${ctx.task.name}-${certificateSuffix}`,
    );
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties,
    );
    await createPoller.pollUntilDone();
    const deletePoller = await client.beginDeleteCertificate(certificateName, testPollerProperties);
    await deletePoller.pollUntilDone();

    const recoverPoller = await client.beginRecoverDeletedCertificate(
      certificateName,
      testPollerProperties,
    );
    expect(recoverPoller.getOperationState().isStarted).toBeTruthy();

    recoverPoller.pollUntilDone().catch((e) => {
      expect(e).toBeInstanceOf(PollerStoppedError);
      expect(e.name).toEqual("PollerStoppedError");
      expect(e.message).toEqual("This poller is already stopped");
    });

    await recoverPoller.poll(); // Making sure it has some data

    recoverPoller.stopPolling();
    expect(recoverPoller.isStopped());
    expect(!recoverPoller.getOperationState().isCompleted);

    const serialized = recoverPoller.toString();

    const resumePoller = await client.beginRecoverDeletedCertificate(certificateName, {
      resumeFrom: serialized,
      ...testPollerProperties,
    });

    expect(recoverPoller.getOperationState().isStarted).toBeTruthy();
    const deletedCertificate: DeletedCertificate = await resumePoller.pollUntilDone();
    expect(deletedCertificate.name).toEqual(certificateName);
    expect(resumePoller.getOperationState().isCompleted).toBeTruthy();

    await testClient.flushCertificate(certificateName);
  });
});
