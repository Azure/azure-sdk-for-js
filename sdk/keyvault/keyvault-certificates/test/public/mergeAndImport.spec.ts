// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import fs from "fs";
import childProcess from "child_process";
import { isNode } from "@azure/core-http";
import { env, Recorder } from "@azure/test-utils-recorder";
import { SecretClient } from "@azure/keyvault-secrets";
import { ClientSecretCredential } from "@azure/identity";

import { CertificateClient } from "../../src";
import { base64ToUint8Array, stringToUint8Array } from "../../src/utils";
import { testPollerProperties } from "../utils/recorderUtils";
import { authenticate } from "../utils/testAuthentication";
import TestClient from "../utils/testClient";

describe("Certificates client - merge and import certificates", () => {
  const prefix = `merge${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificateClient;
  let testClient: TestClient;
  let recorder: Recorder;
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

  it("can import a certificate from a certificate's non base64 secret value", async function() {
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

    const buffer = base64ToUint8Array(base64EncodedCertificate);

    await client.importCertificate(certificateNames[1], buffer);

    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });

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

    const buffer = stringToUint8Array(base64EncodedCertificate);

    await client.importCertificate(certificateNames[1], buffer, {
      policy: {
        subject: "a conceptual policy, so that we can pass the contentType",
        contentType: "application/x-pem-file"
      }
    });

    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });

  // The signed certificate will never be the same, so we can't play it back.
  // This test is only designed to work on NodeJS, since we use child_process to interact with openssl.
  it("can merge a self signed certificate", async function(): Promise<void> {
    recorder.skip(
      undefined,
      "The signed certificate will never be the same, so we can't play it back."
    );
    if (!isNode) {
      // recorder.skip is not meant for TEST_MODE=live
      return this.skip();
    }
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
});
