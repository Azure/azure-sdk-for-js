// Copyright (c) Microsoft Corporation.
// Licensed under the MIT License.

/**
 * @summary Imports a PFX and PEM certificate and then deletes them.
 */

import { CertificateClient, WellKnownIssuer } from "@azure/keyvault-certificates";
import { DefaultAzureCredential } from "@azure/identity";
// Load the .env file if it exists
import "dotenv/config";

// For convenience in this sample we'll use some self-signed test certificates
// that were generated using openssl
const samplePfxBase64 = `
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
`;

const samplePem = `
-----BEGIN CERTIFICATE-----
MIICszCCAZsCFBtIuxS0jWci0Rcrd71HE2lPEZ5jMA0GCSqGSIb3DQEBCwUAMBYx
FDASBgNVBAMMC2NvbnRvc28uY29tMB4XDTI1MDMxNzIyNTk1N1oXDTI2MDMxNzIy
NTk1N1owFjEUMBIGA1UEAwwLY29udG9zby5jb20wggEiMA0GCSqGSIb3DQEBAQUA
A4IBDwAwggEKAoIBAQDqkWxlgehRB//K58DlTflgYNyUa7lCCuSqYmpV5tcVONZp
+VLgiaVe5YrdF0WHz8pPI7nXfmIykvpBEiOcqjGxMtciwzrDX4pfuv5Z7db91GRw
P5iILIcZJ35nHlcI8p9O0VQFGLj06E1SYNcnzYviPPjL5m8TYQ9zkH7g0quSWAEL
9EEvZeTcmXchIf0zdIMSeiR9ibrQ72L7iUAsOz7IKrbFo/lsLgVw5tm8YepaP8EN
KBqFEooVY7rBXB3Ml1mWq7m50k96yr3PkFItZmcXeB99TDmMCQIrwgytduErsQiO
HxuZl15M0j/EH+KP8NkWpOMqMZwxMaeOQqDNJD4RAgMBAAEwDQYJKoZIhvcNAQEL
BQADggEBABxHrRTamiO3jpW9WKcMJed8zX/6qsZvXdGSjO2+rT5ePw1rbtCsQsk1
pBLSEEP/FKVTf+LXgkoC2JnAFuQgwu1cgAzyeAE/eUPmSgIHcJGqD9FS1vyiK5Sw
+StoVm8+kyGsUmU7vpyDGT4k6l2kECp/UxQmiHHcqUh+IuX2B58tU2nVKdcekWZk
GF8NugG8PeplqXRKDg7Q+SWbXA3mpv3CRB8DB0SJttY33n0X3osLBjn9ffzOCTv0
m/AQpuIMqf2rh48rR2IMyM01NhRWBPkoeg7Z1xkjfqFM3yUB4EcY+za5esbEDV2X
9S/ZjMbA8ZqHhqqZEOhAFFInUa4a74c=
-----END CERTIFICATE-----
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDqkWxlgehRB//K
58DlTflgYNyUa7lCCuSqYmpV5tcVONZp+VLgiaVe5YrdF0WHz8pPI7nXfmIykvpB
EiOcqjGxMtciwzrDX4pfuv5Z7db91GRwP5iILIcZJ35nHlcI8p9O0VQFGLj06E1S
YNcnzYviPPjL5m8TYQ9zkH7g0quSWAEL9EEvZeTcmXchIf0zdIMSeiR9ibrQ72L7
iUAsOz7IKrbFo/lsLgVw5tm8YepaP8ENKBqFEooVY7rBXB3Ml1mWq7m50k96yr3P
kFItZmcXeB99TDmMCQIrwgytduErsQiOHxuZl15M0j/EH+KP8NkWpOMqMZwxMaeO
QqDNJD4RAgMBAAECggEAB9cVfu0RJUg1qgQGBAQPrkN+i+1v0z/G9dT1RerBzKFK
NV+SgBPJtbrJYetptQjic7O3ffbo9FTKTYt8KjvcDlarLyvEVoxmdR2sa7gR5AkJ
1GCjygVm/JW/2VV/xjpJzdocS1FQuUrcbsDy4A80Ojsce8A3fTfUyuGNBBm2h10e
RStZNMJrhStsWAxgR6ZgL7+5s6vjt8R5AYDqKlWXJnqJvdld+6JJco1awPSaJRZi
/+8DEwfoQAzn51isEBoTC0BrCr2J9fJc3f0l0KENlzQdFunwsDrXi5fWRKpw3Y3V
NadOID03i5C9QU3IcuqPUSe24nt96aXjSDS0l5YtcwKBgQDvmNwFbFnmwRs3NRS5
1Cfd11Kqzc4cAvXzxap/+UwsgwkHRSD8TcOT9jvyi7GBJIw+pRaZzA5K3P8YXCyU
DnYfji0EFZvKy+3EPujqA57aD7V81C6YvQ+kgeXCgOKxR/fT6ODSRkD4O3DDuiL9
ntCQaCXBlwLk75IDoAcvqJybswKBgQD6oGz6Pp7OEGW0rUSP3AnB6F0Bu7OCy9k0
i5owEj1CD6RveKs2CJacJ6fjHzvwo1HqCABSfw1Ub9QwxRE4qZp149x2R8K8mzEG
YSUuGxHLhlz78dzfBV9rDXIwhW7JGr7I1gi6Y/N+sbDb7KZD7rqytuhO1qFCUDJv
YykPDloNKwKBgFNjNwgoKq3V/XvcXIdEYE+kNiA+GoLDQQiDfhCmGi3PuR+vnohR
JEVlyH1kwvV4W9sdp90FGOBTQ/Ede2JYGiJnYCFwx9Tv3qOTZYq0kd/A4eA9FK6R
9lTB5M4p/zvGGWnGPiDQ1KHQRjHIoY71bA8mQCW9QgOdoYrjcjzTCRZjAoGANpUz
xrhWm6hEjjniIbaZRWrWvqbjbIv6zQ/OT8PZJYcEl+Ze21C5hF66mKNXyYu4LlD5
yP20qHwGaWyx2HZPlnc+r1/nkG34GlyT3Vu1325u18wP/15LLqRqBxk4TIIPpOvA
UN+tyxzl2K/MciUO8hcVtv3VdvzCTzH4YjgM8qsCgYEApPueucMuQT2t6iPkwDrS
x6FkLJ42fSflU8goacI6HXGAkmim3oQ7SJ29ympMSb4ukIOI/NpUPc5ttYtCDqAa
YYuSQ6RmxoA8pTax5IyoZjoXtr21G3r6vXTaP+3v/w8IFTC+1Jn2GqSd1g3T88H7
6FkJCaotmw64669WNDzhTv0=
-----END PRIVATE KEY-----
`;

// This sample demonstrates how to import both PKCS#12 (PFX) and PEM-formatted certificates
// into Azure Key Vault.
export async function main(): Promise<void> {
  // This sample uses DefaultAzureCredential, which supports a number of authentication mechanisms.
  // See https://learn.microsoft.com/javascript/api/overview/azure/identity-readme?view=azure-node-latest for more information
  // about DefaultAzureCredential and the other credentials that are available for use.
  // If you're using MSI, DefaultAzureCredential should "just work".
  const url = process.env["KEYVAULT_URI"] || "<keyvault-url>";
  const credential = new DefaultAzureCredential();

  const client = new CertificateClient(url, credential);

  // When importing a PFX containing your key pair, the policy is needed if you want the
  // private key to be exportable or to configure actions when a certificate is close to expiration.
  let importedCertificate = await client.importCertificate(
    `import-${Date.now()}`,
    Buffer.from(samplePfxBase64, "base64"),
    {
      policy: {
        contentType: "application/x-pkcs12",
        issuerName: WellKnownIssuer.Self,
        subject: "CN=contoso.com",
      },
    },
  );

  console.log("importedCertificate", importedCertificate);

  let deletePoller = await client.beginDeleteCertificate(importedCertificate.name);
  let deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);

  // PEM-formatted certificates are more common when using tools like openssl. To import a
  // PEM-formatted certificate, you must set a CertificatePolicy that sets the ContentType
  // to Pem or the certificate will fail to import
  importedCertificate = await client.importCertificate(
    `cert${Date.now()}`,
    Buffer.from(samplePem),
    {
      policy: {
        contentType: "application/x-pem-file",
        issuerName: WellKnownIssuer.Self,
        subject: "CN=contoso.com",
      },
    },
  );

  console.log("importedCertificate", importedCertificate);

  deletePoller = await client.beginDeleteCertificate(importedCertificate.name);
  deletedCertificate = await deletePoller.pollUntilDone();
  console.log("Recovery Id: ", deletedCertificate.recoveryId);
  console.log("Deleted Date: ", deletedCertificate.deletedOn);
  console.log("Scheduled Purge Date: ", deletedCertificate.scheduledPurgeDate);
}

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});
