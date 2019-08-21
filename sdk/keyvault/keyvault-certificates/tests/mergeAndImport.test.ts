// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificatesClient } from "../src";
import { env } from "./utils/recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { uint8ArrayToString } from "./utils/crypto";

describe("Certificates client - merge and import certificates", () => {
  const prefix = `merge${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificatesClient;
  let testClient: TestClient;
  let recorder: any;

  const basicCertificateProperties = {
    certificatePolicy: {
      issuerParameters: { name: "Self" },
      x509CertificateProperties: { subject: "cn=MyCert" }
    }
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

  it.skip("can import a certificates", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    await client.createCertificate(certificateNames[0], basicCertificateProperties);

    const certificate0 = await client.getCertificate(certificateNames[0], "");
    console.log(JSON.stringify({
      cer: certificate0,
    }, null, 2));
    await client.importCertificate(certificateNames[1], uint8ArrayToString(certificate0.cer!));

    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });

  it.only("can merge two certificates", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    for (const name of certificateNames) {
      await client.createCertificate(name, basicCertificateProperties);
    }

    // IMPORTANT: Currently fails
    const certificate1Backup = await client.backupCertificate(certificateNames[1]);
		console.log(certificate1Backup);
    await client.mergeCertificate(certificateNames[0], [certificate1Backup.value!]);

    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });
}); 
