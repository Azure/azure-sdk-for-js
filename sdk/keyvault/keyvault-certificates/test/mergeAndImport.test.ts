// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import fs from "fs";
import childProcess from "child_process";
import { CertificateClient } from "../src";
import { isRecording, testPollerProperties } from "./utils/recorderUtils";
import { isNode } from "@azure/core-http";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { SecretClient } from "@azure/keyvault-secrets";
import { ClientSecretCredential } from "@azure/identity";

describe("Certificates client - merge and import certificates", () => {
  const prefix = `merge${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: any;
  let keyVaultUrl: string;
  let credential: ClientSecretCredential;
  let secretClient: SecretClient;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
    keyVaultUrl = authentication.keyVaultUrl;
    credential = authentication.credential;
    secretClient = new SecretClient(keyVaultUrl, credential);
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can import a certificate from a certificate's base64 secret value", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    const createPoller = await client.beginCreateCertificate(
      certificateNames[0],
      {
        issuerName: "Self",
        subject: "cn=MyCert"
      },
      testPollerProperties
    );
    await createPoller.pollUntilDone();
    const certificateSecret = await secretClient.getSecret(certificateNames[0]);
    const base64EncodedCertificate = certificateSecret.value!;

    let buffer: Uint8Array;
    
    if (isNode) {
      buffer = Buffer.from(base64EncodedCertificate, "base64");
    } else {
      buffer = Uint8Array.from(atob(base64EncodedCertificate), c => c.charCodeAt(0));
    }

    await client.importCertificate(certificateNames[1], buffer);

    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });

  // The signed csr will never be the same.
  if (isNode && isRecording) {
    it("can merge a self signed certificate", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);

      await client.beginCreateCertificate(
        certificateName,
        {
          issuerName: "Unknown",
          certificateTransparency: false,
          subject: "cn=MyCert"
        },
        testPollerProperties
      );

      const certificateOperationPoller = await client.getCertificateOperation(certificateName);
      const { csr } = await certificateOperationPoller.getOperationState().certificateOperation!;
      const base64Csr = Buffer.from(csr!).toString("base64");
      const wrappedCsr = `-----BEGIN CERTIFICATE REQUEST-----
${base64Csr}
-----END CERTIFICATE REQUEST-----`;
      fs.writeFileSync("test.csr", wrappedCsr);

      // Certificate available locally made using:
      //   openssl genrsa -out ca.key 2048
      //   openssl req -new -x509 -key ca.key -out ca.crt
      childProcess.execSync(
        "openssl x509 -req -in test.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out test.crt"
      );
      const base64Crt = fs
        .readFileSync("test.crt")
        .toString()
        .split("\n")
        .slice(1, -1)
        .join("");

      await client.mergeCertificate(certificateName, [Buffer.from(base64Crt)]);

      await testClient.flushCertificate(certificateName);
    });
  }
});
