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
import { stringToUint8Array } from "./utils/crypto"
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

      const pkey = PrivateKey.fromPEM(`-----BEGIN PRIVATE KEY-----
MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCuVsRO1512xWhe
hqzJOjaTVKaWXnU+n9Pz2EQokvaynjpMgcieRwb98QUVJZYIVrCPLFBrPaAEj6dM
baWKgtWsfz0DT+IOugkjDhplgk+j/66GI1nLHGdzx7sKn8vqymqIjqdadmlFb89m
O58KqVg8MNNgOvGsFk33rnKtGLLt8sFyB0+Gfv/A5MgA6VQQ32HdYMXb4MFF1WCZ
a+3NSTP1Z38qevvtuUI026b4Ao6qVWVWK0ypoMP5zsD0k0vi9wvIYO++w6RCJO0I
jxzO6lr0+/bc3V+WTPg+NMnaRIlgIIuPsFEYkbR/xmrWkt9RlXLPm3oZXBxC5nyc
t9T60G7PAgMBAAECggEAetlPaZNMNVZz7jAOb5nivTzoSotzKNbtPyYFGWY+Cq2u
vRyzJr08MxN0lmsu5t9XePwsCvWY3b3wkM2u2gTJ1syuTLgsvl3fdGFKvn7t6c2Q
yJr+ej6gs5hpt9nUkrViDqofSYKpObHJPuwCbTvZnkh1mpjOlYn+FOtLiage5cZ/
8v47v1lXI5m6crd2Dx33qlNW6mAE2M/RWAC+dCVDyWmaI1cJqYvHPEY0hkSG8krD
hsvXFU9pblEXvOCsWwnK8pUTOsrromNxwgx/cc7Fzh88lvoOSHXPXmqcchmhV2S2
3hesfEmwberL01CpoxksWcyNry3FU5eNNw/04lGxwQKBgQDoM8H61LtawiN4VuIK
dafHVn/NaJ7QpzgqXj6VjfGPnWyrVQHsO9Vj6Ma50pvaZVW1MTH//i/qQLBTrA+E
tiHGXFd4EFFl+r2bkQbPGCj7TFNJJOJUZTmeKhbiR7ymF4u9dXv/g+mUEETQYnhq
6yPbQQsu0NvlmBmCRcgcXqYsbwKBgQDANNzWzlQz5h73fQFj/V5b2JD+lTNBE9ek
3hBmar+vv4z1rTt6x3ZtFXzjdB9v3WqTtvlYMY+OjO3xp4bFKhrbjU7xrQa81rSq
IBshBtymPPBwh4Wr+EK+TsFMFkZj2gG0LrZDlAjwNF+ePp4r+4HGudMtmYmP/dpI
e0iX4sHToQKBgAevVtcvXTgGvtfHwFlqRXBCe55XvRHYxvIYBmg6t2jyY9tTx+mC
nXBeDt2ti7zxp6GEjEwVpI5TL8LFKgpRYNLI0ZhGqfr/DnFsnlYSTaDriMId92Ol
qf+DExjQGP1CQDy3+6+cNQnSdASVjbi0KY6jG3SkMvLpUsbN+m5972//AoGAadUx
vH2D08fkSTXlrB748+29eNDClhTM6pTzxtEEl0sL3ML0O1jVFp98Uum/3aK3anqX
tT4k48MpyaQLC0lx3G5kh6JUUWqPtBVVmsvidw6a/ftBWT2r0ooe2TxyqcyCn6oQ
5gj/GvRbqhCkm2czQC9V3ofqPQT0SnDHugo728ECgYAGdwRKpKFk6wzBVoYajDWp
RaBaqum/Qokk1UWL64Nf2L6MOhze1LtMlFfrZPw59EkgWFguHOKwo2DD+Vi4EAr3
X49q8c1abfuE9f3KgvSlXWADMxO5TGj9+C8POIGloXduvStMtvRQ8ZuQd8PHJ4n6
k3uuQ70DrTqXG/UrKtrb4A==
-----END PRIVATE KEY-----`);
      const pksigned = pkey.sign(operation0.csr!, "sha256");
      console.log("pksigned", pksigned);
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

      const base64Signed = stringToUint8Array(Buffer.from(pksigned).toString("base64"));
      await client.mergeCertificate(certificateNames[1], [base64Signed]);

      for (const name of certificateNames) {
        await testClient.flushCertificate(name);
      }
    });
  }
}); 
