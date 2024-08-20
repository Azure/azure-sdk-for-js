// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { PollerStoppedError } from "@azure/core-lro";
import { env, Recorder } from "@azure-tools/test-recorder";

import {
  CertificateClient,
  KeyVaultCertificate,
  DefaultCertificatePolicy,
} from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import TestClient from "./utils/testClient.js";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("Certificates client - LRO - create", () => {
  const certificatePrefix = `lroCreate${env.CERTIFICATE_NAME || "CertificateName"}`;
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

  it("can wait until a certificate is created", async function (ctx) {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${ctx.task.name}-${certificateSuffix}`,
    );
    const poller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties,
    );
    expect(poller.getOperationState().isStarted).toBeTruthy();

    // The pending certificate can be obtained this way:
    expect(poller.getOperationState().result!.name).toEqual(certificateName);

    const createdCertificate: KeyVaultCertificate = await poller.pollUntilDone();
    expect(createdCertificate.name).toEqual(certificateName);
    expect(poller.getOperationState().isCompleted).toBeTruthy();

    // The final certificate can also be obtained this way:
    expect(poller.getOperationState().result!.name).toEqual(certificateName);
  });

  it("can resume from a stopped poller", { retry: 5 }, async function (ctx) {
    const certificateName = testClient.formatName(
      `${certificatePrefix}-${ctx.task.name}-${certificateSuffix}`,
    );
    const poller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      testPollerProperties,
    );
    expect(poller.getOperationState().isStarted).toBeTruthy();

    poller.pollUntilDone().catch((e) => {
      expect(e).toBeInstanceOf(PollerStoppedError);
      expect(e.name).toEqual("PollerStoppedError");
      expect(e.message).toEqual("This poller is already stopped");
    });

    poller.stopPolling();
    expect(poller.isStopped()).toBeTruthy();
    expect(poller.getOperationState().isCompleted).toBeFalsy();

    const serialized = poller.toString();

    const resumePoller = await client.beginCreateCertificate(
      certificateName,
      DefaultCertificatePolicy,
      {
        resumeFrom: serialized,
        ...testPollerProperties,
      },
    );

    expect(resumePoller.getOperationState().isStarted).toBeTruthy();
    const createdCertificate: KeyVaultCertificate = await resumePoller.pollUntilDone();
    expect(createdCertificate.name).toEqual(certificateName);
    expect(resumePoller.getOperationState().isCompleted).toBeTruthy();
  });
});
