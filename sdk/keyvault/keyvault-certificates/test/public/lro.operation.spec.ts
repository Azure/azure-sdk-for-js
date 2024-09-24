// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.
import { env, Recorder } from "@azure-tools/test-recorder";

import {
  CertificateClient,
  CertificateOperation,
  DefaultCertificatePolicy,
  KeyVaultCertificateWithPolicy,
} from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import TestClient from "./utils/testClient.js";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("Certificates client - LRO - certificate operation", () => {
  const certificatePrefix = `lroOperation${env.CERTIFICATE_NAME || "CertificateName"}`;
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

  it(
    "can wait until a certificate is created by getting the poller from getCertificateOperation",
    { retry: 5 },
    async function (ctx) {
      const certificateName = testClient.formatName(
        `${certificatePrefix}-${ctx.task.name}-${certificateSuffix}`,
      );
      const createPoller = await client.beginCreateCertificate(
        certificateName,
        DefaultCertificatePolicy,
        testPollerProperties,
      );
      createPoller.stopPolling();
      const poller = await client.getCertificateOperation(certificateName, testPollerProperties);
      expect(poller.getOperationState().isStarted).toBeTruthy();

      // The pending certificate operation can be obtained this way:
      expect(poller.getOperationState().certificateOperation!.status).toEqual("inProgress");

      const completeCertificate: KeyVaultCertificateWithPolicy = await poller.pollUntilDone();
      expect(completeCertificate.name).toEqual(certificateName);

      const operation: CertificateOperation = poller.getOperationState().certificateOperation!;
      expect(operation.status).toEqual("completed");
      expect(poller.getOperationState().isCompleted).toBeTruthy();

      // The final certificate operation can also be obtained this way:
      expect(poller.getOperationState().certificateOperation!.status).toEqual("completed");
    },
  );

  it("can resume from a stopped poller", { retry: 5 }, async function (ctx) {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${ctx.task.name}-${certificateSuffix}`,
    );
    const createPoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties,
    );

    createPoller.stopPolling();

    const poller = await client.getCertificateOperation(certificateName, testPollerProperties);
    expect(poller.getOperationState().isStarted).toBeTruthy();

    const serialized = poller.toString();

    const resumePoller = await client.getCertificateOperation(certificateName, {
      resumeFrom: serialized,
      ...testPollerProperties,
    });
    expect(resumePoller.getOperationState().isStarted);

    const completeCertificate: KeyVaultCertificateWithPolicy = await resumePoller.pollUntilDone();
    expect(completeCertificate.name).toEqual(certificateName);

    const operation: CertificateOperation = resumePoller.getOperationState().certificateOperation!;
    expect(operation.status).toEqual("completed");
    expect(resumePoller.getOperationState().isCompleted).toBeTruthy();
  });
});
