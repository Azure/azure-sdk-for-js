// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import type { Recorder } from "@azure-tools/test-recorder";
import { env } from "@azure-tools/test-recorder";

import type { CertificateClient } from "../../src/index.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import type TestClient from "./utils/testClient.js";
import { describe, it, expect, beforeEach, afterEach } from "vitest";

describe("Certificates client - SubjectAlternativeNames IP addresses and URIs", () => {
  const prefix = `SAN${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;

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

  it("can create a certificate with ipAddresses in SAN", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const poller = await client.beginCreateCertificate(
      certificateName,
      {
        issuerName: "Self",
        subject: "cn=MyCert",
        subjectAlternativeNames: {
          ipAddresses: ["10.0.0.1"],
        },
      },
      testPollerProperties,
    );

    const certificate = await poller.pollUntilDone();
    expect(certificate.name).toEqual(certificateName);

    const retrieved = await client.getCertificate(certificateName);
    expect(retrieved.policy!.subjectAlternativeNames!.ipAddresses).toEqual(["10.0.0.1"]);
  });

  it("can create a certificate with uniformResourceIdentifiers in SAN", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const poller = await client.beginCreateCertificate(
      certificateName,
      {
        issuerName: "Self",
        subject: "cn=MyCert",
        subjectAlternativeNames: {
          uniformResourceIdentifiers: ["https://example.com"],
        },
      },
      testPollerProperties,
    );

    const certificate = await poller.pollUntilDone();
    expect(certificate.name).toEqual(certificateName);

    const retrieved = await client.getCertificate(certificateName);
    expect(retrieved.policy!.subjectAlternativeNames!.uniformResourceIdentifiers).toEqual([
      "https://example.com",
    ]);
  });

  it("can create a certificate with all SAN fields", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const poller = await client.beginCreateCertificate(
      certificateName,
      {
        issuerName: "Self",
        subject: "cn=MyCert",
        subjectAlternativeNames: {
          emails: ["test@example.com"],
          dnsNames: ["example.com"],
          ipAddresses: ["10.0.0.1", "192.168.1.1"],
          uniformResourceIdentifiers: ["https://example.com", "https://contoso.com"],
        },
      },
      testPollerProperties,
    );

    const certificate = await poller.pollUntilDone();
    expect(certificate.name).toEqual(certificateName);

    const retrieved = await client.getCertificate(certificateName);
    const san = retrieved.policy!.subjectAlternativeNames!;
    expect(san.emails).toEqual(["test@example.com"]);
    expect(san.dnsNames).toEqual(["example.com"]);
    expect(san.ipAddresses).toEqual(["10.0.0.1", "192.168.1.1"]);
    expect(san.uniformResourceIdentifiers).toEqual([
      "https://example.com",
      "https://contoso.com",
    ]);
  });

  it("can create a certificate with IPv6 in ipAddresses SAN", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const poller = await client.beginCreateCertificate(
      certificateName,
      {
        issuerName: "Self",
        subject: "cn=MyCert",
        subjectAlternativeNames: {
          ipAddresses: ["::1"],
        },
      },
      testPollerProperties,
    );

    const certificate = await poller.pollUntilDone();
    expect(certificate.name).toEqual(certificateName);

    const retrieved = await client.getCertificate(certificateName);
    expect(retrieved.policy!.subjectAlternativeNames!.ipAddresses).toEqual(["::1"]);
  });
});
