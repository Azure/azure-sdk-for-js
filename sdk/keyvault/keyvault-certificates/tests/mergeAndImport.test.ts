// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificatesClient } from "../src";
import { retry } from "./utils/recorder";
import { isNode } from "@azure/core-http";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
import { KeysClient, CryptographyClient } from "@azure/keyvault-keys";
import { SecretsClient } from "@azure/keyvault-secrets";
import { ClientSecretCredential } from "@azure/identity";
// import { stringToUint8Array } from "./utils/crypto"
import { uint8ArrayToString } from "./utils/crypto"
const jwkToPem = require("jwk-to-pem");

describe.only("Certificates client - merge and import certificates", () => {
  const prefix = `merge${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificatesClient;
  let testClient: TestClient;
  let recorder: any;
  let keyVaultUrl: string;
  let credential: ClientSecretCredential;
  let keysClient: KeysClient;
  let secretsClient: SecretsClient;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
    keyVaultUrl = authentication.keyVaultUrl;
    credential = authentication.credential;
    keysClient = new KeysClient(keyVaultUrl, credential);
    secretsClient = new SecretsClient(keyVaultUrl, credential);
  });

  afterEach(async function() {
    recorder.stop();
  });

  // The tests follow

  it("can import a certificate from a backup", async function() {
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

  if (isNode) {
    it.only("can merge a certificate", async function() {
      const certificateName = testClient.formatName(`${prefix}-${this!.test!.title}-${suffix}`);
      const certificateNames = [`${certificateName}0`, `${certificateName}1`];

      await client.createCertificate(certificateNames[0], {
        certificatePolicy: {
          issuerParameters: { name: "Self" },
          x509CertificateProperties: { subject: "cn=MyCert" } 
        }
      });

      console.log("0001");
      const operation0 = await client.getCertificateOperation(certificateNames[0]);
      console.log("0001-csr", { csr: operation0.csr, strCsr: uint8ArrayToString(operation0.csr!), csrLength: operation0.csr!.length });
      // const certificate0Secret = await retry(async () => secretsClient.getSecret(certificateNames[0]));
      // await retry(async () => secretsClient.getSecret(certificateNames[0]));
      console.log("0002");

      await client.createCertificate(certificateNames[1], {
        certificatePolicy: {
          keyProperties: {
            exportable: true,
            keyType: "RSA",
            keySize: 2048,
            reuseKey: false,
          },
          secretProperties: {
            contentType: "application/x-pem-file"
          },
          issuerParameters: {
            name: "Unknown"
          },
          lifetimeActions: [{
            trigger: {
              lifetimePercentage: 2,
            },
            action: {
              actionType: "EmailContacts"
            }
          }],
          x509CertificateProperties: {
            subject: "CN=*.microsoft.com",
            subjectAlternativeNames: {
              dnsNames: ["sdk.azure-int.net"],
            },
            validityInMonths: 24
          }
        }
      });
      console.log("0003");
      const operation1 = await client.getCertificateOperation(certificateNames[1]);
      console.log("0003-csr", { csr: operation1.csr, csrLength: operation1.csr!.length });

      const keyName = `${certificateName}Key`;
      const key = await keysClient.createKey(keyName, "RSA", { keySize: 2048 });
      const cryptoClient = new CryptographyClient(keyVaultUrl, key.keyMaterial!.kid!, credential);
      // csr is in JWK format???
      // const csrPem = keyto.from(operation0.csr!, "pem").toJwk("public");
      console.log({ csrPem });
      // const base64csr = Buffer.from(operation0.csr!).toString("base64");
      // console.log({ base64csr });
      const signed = await cryptoClient.sign("RS256", csrPem);
      console.log("0004", signed);

      await keysClient.deleteKey(keyName);
      console.log("0005");

      await retry(async () => {
        try {
          await keysClient.purgeDeletedKey(keyName);
        } catch (e) {
          if (["Key is currently being deleted."].includes(e.message)) throw e;
          else return;
        }
      }); 

      console.log("0006");

      await client.mergeCertificate(certificateNames[1], [signed.result!]);

      for (const name of certificateNames) {
        await testClient.flushCertificate(name);
      }
    });
  }
}); 
