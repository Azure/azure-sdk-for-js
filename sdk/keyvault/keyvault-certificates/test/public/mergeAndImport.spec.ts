// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "node:fs";
import childProcess from "child_process";
import { isNodeLike } from "@azure/core-util";
import type { Recorder } from "@azure-tools/test-recorder";
import { env, isPlaybackMode } from "@azure-tools/test-recorder";
import { SecretClient } from "@azure/keyvault-secrets";
import type { ClientSecretCredential } from "@azure/identity";
import type { CertificateClient } from "@azure/keyvault-certificates";
import { base64ToUint8Array, stringToUint8Array } from "$internal/utils.js";
import { testPollerProperties } from "./utils/recorderUtils.js";
import { authenticate } from "./utils/testAuthentication.js";
import type TestClient from "./utils/testClient.js";
import { describe, it, beforeEach, afterEach } from "vitest";
import path from "node:path";

describe("Certificates client - merge and import certificates", () => {
  const prefix = `merge${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;
  let keyVaultUrl: string;
  let credential: ClientSecretCredential;
  let secretClient: SecretClient;

  beforeEach(async function (ctx) {
    const authentication = await authenticate(ctx);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
    keyVaultUrl = authentication.keyVaultUrl;
    credential = authentication.credential;
    secretClient = new SecretClient(
      keyVaultUrl,
      credential,
      recorder.configureClientOptions({ disableChallengeResourceVerification: true }),
    );
  });

  afterEach(async function () {
    await recorder.stop();
  });

  // The tests follow

  it("can import a certificate from a certificate's non base64 secret value", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    const createPoller = await client.beginCreateCertificate(
      certificateNames[0],
      {
        issuerName: "Self",
        subject: "cn=MyCert",
      },
      testPollerProperties,
    );
    await createPoller.pollUntilDone();
    const certificateSecret = await secretClient.getSecret(certificateNames[0]);
    const base64EncodedCertificate = certificateSecret.value!;

    const buffer = base64ToUint8Array(base64EncodedCertificate);

    await client.importCertificate(certificateNames[1], buffer);
  });

  it("can import a certificate from a certificate's base64 secret value", async function (ctx) {
    const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    const createPoller = await client.beginCreateCertificate(
      certificateNames[0],
      {
        issuerName: "Self",
        subject: "cn=MyCert",
      },
      testPollerProperties,
    );
    await createPoller.pollUntilDone();
    const certificateSecret = await secretClient.getSecret(certificateNames[0]);
    const base64EncodedCertificate = certificateSecret.value!;

    const buffer = stringToUint8Array(base64EncodedCertificate);

    await client.importCertificate(certificateNames[1], buffer, {
      policy: {
        contentType: "application/x-pem-file",
      },
    });
  });

  // The signed certificate will never be the same, so we can't play it back.
  // This test is only designed to work on NodeJS, since we use child_process to interact with openssl.
  it.skipIf(!isNodeLike || isPlaybackMode())(
    "can merge a self signed certificate",
    async function (ctx): Promise<void> {
      // Use a path relative to this test for these static files, since sometimes (e.g. with minmax) the tests
      // are run from a different working directory to the package root.
      const caKey = path.join(path.dirname(ctx.task.file.filepath), "..", "..", "ca.key");
      const caCrt = path.join(path.dirname(ctx.task.file.filepath), "..", "..", "ca.crt");

      const certificateName = testClient.formatName(`${prefix}-${ctx.task.name}-${suffix}`);

      await client.beginCreateCertificate(
        certificateName,
        {
          issuerName: "Unknown",
          certificateTransparency: false,
          subject: "cn=MyCert",
        },
        testPollerProperties,
      );

      const certificateOperationPoller = await client.getCertificateOperation(certificateName);
      const { csr } = certificateOperationPoller.getOperationState().certificateOperation!;
      const base64Csr = Buffer.from(csr!).toString("base64");
      const wrappedCsr = `-----BEGIN CERTIFICATE REQUEST-----
${base64Csr}
-----END CERTIFICATE REQUEST-----`;
      fs.writeFileSync("test.csr", wrappedCsr);

      // Certificate available locally made using:
      //   openssl genrsa -out ca.key 2048
      //   openssl req -new -x509 -key ca.key -out ca.crt
      childProcess.execSync(
        `openssl x509 -req -in test.csr -CA ${caCrt} -CAkey ${caKey} -CAcreateserial -out test.crt`,
      );
      const base64Crt = fs.readFileSync("test.crt").toString().split("\n").slice(1, -1).join("");

      await client.mergeCertificate(certificateName, [Buffer.from(base64Crt)]);
    },
  );
});
