// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

import { CertificatesClient } from "../src";
import { retry } from "./utils/recorder";
import { isNode } from "@azure/core-http";
import { env } from "@azure/test-utils-recorder";
import { authenticate } from "./utils/testAuthentication";
import TestClient from "./utils/testClient";
// import { KeysClient, CryptographyClient } from "@azure/keyvault-keys";
import { SecretsClient } from "@azure/keyvault-secrets";
import { ClientSecretCredential } from "@azure/identity";
// import { stringToUint8Array } from "./utils/crypto"
import { uint8ArrayToString } from "./utils/crypto"
const { PrivateKey } = require('@fidm/x509')

describe.only("Certificates client - merge and import certificates", () => {
  const prefix = `merge${env.CERTIFICATE_NAME || "CertificateName"}`;
  let suffix: string;
  let client: CertificatesClient;
  let testClient: TestClient;
  let recorder: any;
  let keyVaultUrl: string;
  let credential: ClientSecretCredential;
//   let keysClient: KeysClient;
  let secretsClient: SecretsClient;

  beforeEach(async function() {
    const authentication = await authenticate(this);
    suffix = authentication.suffix;
    client = authentication.client;
    testClient = authentication.testClient;
    recorder = authentication.recorder;
    keyVaultUrl = authentication.keyVaultUrl;
    credential = authentication.credential;
//     keysClient = new KeysClient(keyVaultUrl, credential);
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

      // Made with: openssl genrsa 2048
      const pkey = PrivateKey.fromPEM(`-----BEGIN RSA PRIVATE KEY-----
MIIEogIBAAKCAQEArEyiDuEeES4lPM1kGciCVux9uMobF8FonU95U8XfCHEH6ci4
t9hs6aHHjtTV7ZiM0w12Lchl5Etny/OVJfMfKHg7iRUgAlHCPtHfdLzTNNPnftog
kVFgH+IwVo2T8hyosHwnFMCyTrb7CcNEkUSp/BAViPmla+i6I0TrGrhAwUyErKhe
RJSASiwPNCf/1WaCdiRwuSPoFJewJZFfgFF1mrtnS2iGMfaFn7yd8ff97dY4m3dW
3k4X1MvJQlq3kNsXhiDGlnaf8CFlFZW2DD2Z9wn7W560xPVPEJM6fAxLpAA1KxaH
XWutEo9vqdoM0jECKhzaTFox6UB5erzsQ2nETwIDAQABAoIBAGdz4+I3PMxn/qfR
UwdAIzJ58MrhXv8We+/oZhrstgvlgjDW+kI4yrxFDQMvu/tbG0Ml1A2NQ9Cdjgch
jC4rGkw8VNLsQjniSVVawmbfcZlImrjJ08AtMiAyuX9eprQ6jPbatMR7JxSoPXcR
LbxjlATqy2NhMffm1sySdu+mLgthH5428NM1wv9h3IrZl0vsuaBMeigyyk8M+SGM
2PBOO/LXy12mQIy9qjUGnnnhZdYw4zDWOBQ/DN6u1ltxW66bu0mid8w3uz/SIfhX
1p/oPsledAnpcqQKygxuH/cahtfNHKolMQhDqr1Ovg87R5B04B7I9/MeW/uwio/v
PSmTOBECgYEA34RN7WDtq6wP4xnRCjBH5lMC7utmiAZElfDWxW6qcQobD6zdJkWv
NuTkcdPPFymz5byp2pik6kUZ8wqEQIxJNODATgG1yoIbpSBPllRwiijHZOQ4OIxf
q+i6jwgDnHKhWU1+FS/5l0UDY7lVf7KuYp0Rd52OqtfhmM2JzhRHGHsCgYEAxVbW
6iRQkDjZdpANo5/CO0ypp97onzbpdhoy4FlnIUmFQEfJYsrCewrVVs4Z6gI4TdYx
ZPCIXm8aWdO0HtOZQB/Q6BJUZl34ahsFdrojLg9PKSEB+zdJfmqbXst+XDDWXajV
xjV7bxFrBxl0wA0zRpgO3iXSVqOToysc1c8pHT0CgYANtPxeaUpJ89RJlgS2vj06
h66vXio8fz3ngAx7sQysv/Tm4i/xr+ZN1H2Z6WZSwlDw7r/v0tqSL0inGecAWloG
7x176yjt0UrGtpOK4YTBRDzuF/zGov0e+reuG8y05Ga2pkTsIbQJrcbGb9Apc5i0
HXO7xSLBoVmJWFlyFNZDTwKBgEpcAZmy22Ss90yU1X7deTwNFDS8ax1rfKdTEe61
4YWKhZqGMl12l7fzihYujVc/ROYXmv81H72t0dkdS9b91tZx5q88EO+N40hgLDvj
wdPeUu7lkDCQUbJAC5G5zkCA6pXaQ8tvZbahcpn3PqYLk1G7hIay68JX2w719OSg
LhblAoGAQhvumL05lPIiGkHepiXO8Lbq4oxHH9Zbapb8+lBy3L55tMMkrcv7hNa5
PIGltt6+BeSc+Gkpi0iWcpW/t6uvl0dwiEBddfjzO7dD4ANv3oTwo618pm7+KjL7
YlBQ9TcuWqaj3ctKmFAdDPNCGpt3gDlCYPesf+zGaLqC8xmTg9s=
-----END RSA PRIVATE KEY-----`);
      const pksigned = pkey.sign(operation0.csr!, "sha256");
      console.log("pksigned", pksigned);
      console.log("pksigned str", uint8ArrayToString(pksigned));
      // console.log("pksigned, string", uint8ArrayToString(pksigned));

      // const keyName = `${certificateName}Key`;
      // const key = await keysClient.createKey(keyName, "RSA", { keySize: 2048 });
      // const cryptoClient = new CryptographyClient(keyVaultUrl, key.keyMaterial!.kid!, credential);
      // // csr is in JWK format???
      // // const csrPem = keyto.from(operation0.csr!, "pem").toJwk("public");
      // // console.log({ csrPem });
      // const base64csr = Buffer.from(operation0.csr!).toString("base64");
      // console.log({ base64csr });
      // const signed = await cryptoClient.sign("PS512", stringToUint8Array(base64csr));
      // console.log("0004", signed);

      // await keysClient.deleteKey(keyName);
      // console.log("0005");

      // await retry(async () => {
      //   try {
      //     await keysClient.purgeDeletedKey(keyName);
      //   } catch (e) {
      //     if (["Key is currently being deleted."].includes(e.message)) throw e;
      //     else return;
      //   }
      // }); 

      // console.log("0006");

      const base64Signed = Buffer.from(Buffer.from(pksigned).toString("base64"));
      console.log({ base64Signed });
      await client.mergeCertificate(certificateNames[1], [Buffer.from("C2F564D97C3E216")]);

      for (const name of certificateNames) {
        await testClient.flushCertificate(name);
      }
    });
  }
}); 
