// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificatesClient } from "../src";
import { retry } from "./utils/recorder";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { stringToUint8Array } from "./utils/crypto"
import { SecretsClient } from "@azure/keyvault-secrets";
import { ClientSecretCredential } from "@azure/identity";

describe("Certificates client - merge and import certificates", () => {
  const prefix = `merge${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificatesClient;
  let testClient: TestClient;
  let recorder: any;
  let keyVaultUrl: string;
  let credential: ClientSecretCredential;
  let secretsClient: SecretsClient;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
    keyVaultUrl = authentication.keyVaultUrl;
    credential = authentication.credential;
    secretsClient = new SecretsClient(keyVaultUrl, credential);
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  it.skip("can import a certificate from a backup", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    await client.createCertificate(certificateNames[0], {
      certificatePolicy: {
        issuerParameters: { name: "Self" },
        x509CertificateProperties: { subject: "cn=MyCert" }
      }
    });
    const certificateSecret = await retry(async () => secretsClient.getSecret(certificateNames[0]));
    const base64EncodedCertificate = certificateSecret.value!;
    await client.importCertificate(certificateNames[1], base64EncodedCertificate);

    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    } 
  });

  // TODO: Certificate can not be read. Please check if certificate is valid.
  it.skip("can merge the backup of a certificate into an exsting certificate", async function() {
    const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
    const certificateNames = [`${certificateName}0`, `${certificateName}1`];
    await client.createCertificate(certificateNames[0], {
      certificatePolicy: {
        issuerParameters: { name: "Self" },
        x509CertificateProperties: { subject: "cn=MyCert" }
      }
    });

    const certificate0Secret = await retry(async () => secretsClient.getSecret(certificateNames[0]));
    const base64EncodedCertificate0 = certificate0Secret.value!;
    const uint8ArrayCertificate0 = stringToUint8Array(base64EncodedCertificate0);

    await client.createCertificate(certificateNames[1], {
      certificatePolicy: {
        keyProperties: {
          exportable: true,
          keyType: "RSA",
          keySize: 2048,
          reuseKey: false,
        },
        secretProperties: {
          contentType: "application/x-pkcs12"
        },
        issuerParameters: { name: "Unknown" },
        x509CertificateProperties: {
          subject: "CN=*.microsoft.com",
          subjectAlternativeNames: {
            dnsNames: ["sdk.azure-int.net"]
          },
          validityInMonths: 24
        },
      }
    });
    // await retry(async () => secretsClient.getSecret(certificateNames[1]));
    await client.mergeCertificate(certificateNames[1], [uint8ArrayCertificate0]);

    for (const name of certificateNames) {
      await testClient.flushCertificate(name);
    }
  });
}); 
